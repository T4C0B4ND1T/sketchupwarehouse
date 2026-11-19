#!/usr/bin/env bash
# Writes .article/draft.md with Claude Code running through Vercel AI Gateway.
#
# This runs the Claude Code CLI directly instead of anthropics/claude-code-action,
# because Vercel's setup needs ANTHROPIC_API_KEY to be empty (Claude Code would
# otherwise send the key the Anthropic way), and the action insists on an API
# key or a subscription token. Running the CLI also lets us print the gateway's
# error message when a run fails, which the action hides.
#
# Env: AI_GATEWAY_API_KEY (required), GATEWAY_MODEL (optional).
set -uo pipefail

if [ -z "${AI_GATEWAY_API_KEY:-}" ]; then
  echo "::error::AI_GATEWAY_API_KEY is not set."
  exit 1
fi

if ! command -v claude >/dev/null 2>&1; then
  npm install -g --silent @anthropic-ai/claude-code >/dev/null 2>&1 || {
    echo "::error::Couldn't install Claude Code."
    exit 1
  }
fi

export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/claude-code"
export ANTHROPIC_AUTH_TOKEN="$AI_GATEWAY_API_KEY"
export ANTHROPIC_API_KEY=""
export DISABLE_AUTOUPDATER=1
export DISABLE_TELEMETRY=1

PROMPT="Read .article/prompt.md and follow its instructions exactly. Finish by writing the article to .article/draft.md."
OUT="${RUNNER_TEMP:-/tmp}/claude-gateway.json"

run_claude() {
  local model_args=()
  [ -n "$1" ] && model_args=(--model "$1")
  echo "Running Claude Code through Vercel AI Gateway (model: ${1:-gateway default})"
  claude -p "$PROMPT" \
    --allowedTools "WebSearch,WebFetch,Read,Write,Glob,Grep" \
    --max-turns 40 \
    --output-format json \
    "${model_args[@]}" >"$OUT" 2>"$OUT.err"
  local status=$?
  # Show the summary, not the article text.
  jq -c '{is_error, num_turns, total_cost_usd, duration_ms}' "$OUT" 2>/dev/null || true
  if [ $status -ne 0 ] || [ "$(jq -r '.is_error' "$OUT" 2>/dev/null)" != "false" ]; then
    echo "::warning::Gateway run failed: $( (jq -r '.result // empty' "$OUT" 2>/dev/null; head -c 600 "$OUT.err") | tr '\n' ' ' | head -c 800)"
    return 1
  fi
  return 0
}

# Preflight: one tiny request (well under a cent) checks the key and the model
# name, and prints the gateway's own error message if something is wrong.
preflight() {
  local body code
  body=$(jq -nc --arg m "$1" '{model:$m,max_tokens:5,messages:[{role:"user",content:"Say ok."}]}')
  code=$(curl -sS -m 60 -o "$OUT.pre" -w '%{http_code}' "$ANTHROPIC_BASE_URL/v1/messages" \
    -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "content-type: application/json" \
    -H "anthropic-version: 2023-06-01" -d "$body") || code=000
  echo "Preflight with $1: HTTP $code"
  [ "$code" = "200" ] && return 0
  echo "::warning::Gateway said (model $1, HTTP $code): $(head -c 500 "$OUT.pre" | tr '\n' ' ')"
  return 1
}

MODEL="${GATEWAY_MODEL:-anthropic/claude-sonnet-5.5}"
if ! preflight "$MODEL"; then
  # Maybe only the model name is wrong: try Claude Code's own spelling.
  ALT="claude-sonnet-5-5"
  preflight "$ALT" || { echo "::error::Vercel AI Gateway rejected the request; see the warnings above."; exit 1; }
  MODEL="$ALT"
fi

# Claude Code retries failed requests for a long time; cap the whole run.
export -f run_claude
export PROMPT OUT
timeout 1200 bash -c 'run_claude "$0"' "$MODEL" && [ -s .article/draft.md ] && exit 0
exit 1
