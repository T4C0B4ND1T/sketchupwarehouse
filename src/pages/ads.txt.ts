import type { APIRoute } from 'astro';
import { MONETIZATION } from '../site.config';

// AdSense requires ads.txt at the domain root. Generated from PUBLIC_ADSENSE_CLIENT.
export const GET: APIRoute = () => {
  const pub = MONETIZATION.adsenseClient.replace(/^ca-/, '');
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : '# No ad networks configured yet\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
