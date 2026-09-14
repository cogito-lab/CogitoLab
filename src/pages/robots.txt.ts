import type { APIRoute } from 'astro';
import { withBase } from '@/utils/i18n';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL(withBase('/sitemap-index.xml'), site).href}\n` : ''}`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
