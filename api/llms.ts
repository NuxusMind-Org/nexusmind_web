/**
 * Server-side route handler for /llms.txt
 * Fetches dynamic llms.txt from the backend site-settings-controller (GET /llms.txt),
 * returning text/plain with status 200 and ~10 minute cache revalidation.
 */

export const config = {
  runtime: 'nodejs',
};

const SAFE_DEFAULT = `# NexusMind

> NexusMind - onlayn psixologiya və mental sağlamlıq platformasıdır.

Bu sayt AI modellərinə saytın məzmununu (məqalələr, bloqlar) icazə əsasında xülasə etmək üçün açıqdır.

Sitemap: https://nexusmind.com/sitemap.xml
`;

const NON_PROD_LLMS = `# NexusMind (Non-Production)

> LLM indexing and scraping are disabled in non-production environments.
`;

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
let inMemoryCache: { body: string; expiresAt: number } | null = null;

export async function resolveLlmsTxt(): Promise<string> {
  // Check for non-production environments
  const vercelEnv = process.env.VERCEL_ENV;
  const appEnv = process.env.APP_ENV || process.env.ENVIRONMENT;
  const nodeEnv = process.env.NODE_ENV;

  const isNonProduction =
    (vercelEnv && vercelEnv !== 'production') ||
    (appEnv && appEnv !== 'production') ||
    (!vercelEnv && nodeEnv !== 'production');

  // In non-production environments, restrict crawling/scraping by LLMs
  if (isNonProduction && process.env.FORCE_PROD_LLMS !== 'true') {
    return NON_PROD_LLMS;
  }

  // Check in-memory cache to prevent unnecessary backend requests
  const now = Date.now();
  if (inMemoryCache && inMemoryCache.expiresAt > now) {
    return inMemoryCache.body;
  }

  const backendBaseUrl = (
    process.env.BACKEND_API_URL ||
    process.env.VITE_API_BASE_URL ||
    'https://api.nexusmind.az'
  ).replace(/\/+$/, '');

  // Server-side authentication token (never exposed to client bundle)
  const serverAuthToken = process.env.LLMS_AUTH_TOKEN || process.env.BACKEND_API_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: 'text/plain',
      'User-Agent': 'NexusMind-Web/1.0',
    };

    if (serverAuthToken) {
      headers['Authorization'] = `Bearer ${serverAuthToken}`;
    }

    const response = await fetch(`${backendBaseUrl}/llms.txt`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      const body = await response.text();
      if (body && body.trim().length > 0) {
        const normalized = body.trim() + '\n';
        inMemoryCache = { body: normalized, expiresAt: now + CACHE_TTL_MS };
        return normalized;
      }
    }
  } catch (error) {
    console.error('[llms.txt] Failed to fetch llms.txt from backend:', error);
  }

  // Safe fallback in production if backend call fails or returns empty
  inMemoryCache = { body: SAFE_DEFAULT, expiresAt: now + CACHE_TTL_MS };
  return SAFE_DEFAULT;
}

export default async function handler(_req?: any, res?: any) {
  const content = await resolveLlmsTxt();
  const cacheControlHeader = 'public, max-age=600, s-maxage=600, stale-while-revalidate=60';

  // Support Node.js / Connect / Vercel Serverless environment
  if (res && typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', cacheControlHeader);

    if (typeof res.status === 'function' && typeof res.send === 'function') {
      return res.status(200).send(content);
    }

    res.statusCode = 200;
    return res.end(content);
  }

  // Support Web Standard Response / Edge runtime
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': cacheControlHeader,
    },
  });
}
