import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | number | null;
  schemaMarkup?: string | object | null;
  metaKeywords?: string[] | null;
  contentType?: 'news' | 'blog' | 'article' | 'gallery' | string;
  image?: string | null;
}

const DEFAULT_TITLE = 'NexusMind - Psixoloji Dəstək və Maarifləndirmə Platforması';
const DEFAULT_DESCRIPTION =
  'NexusMind - Psixoloji sağlamlıq, peşəkar konsultasiya, elmi məqalələr və maarifləndirici resurslar platforması.';

/**
 * Reusable SEO component that injects dynamic head meta tags, Open Graph,
 * Twitter Card, canonical URLs, and schema.org JSON-LD via react-helmet-async.
 */
export const SEO = ({
  metaTitle,
  metaDescription,
  slug,
  schemaMarkup,
  metaKeywords,
  contentType = 'article',
  image,
}: SEOProps) => {
  // 1. Resolve site base URL (from env or browser origin)
  const rawBaseUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://nexusmind.com');
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  // 2. Titles & Descriptions with sensible fallbacks
  const displayTitle = metaTitle && metaTitle.trim() ? metaTitle.trim() : DEFAULT_TITLE;
  const displayDescription =
    metaDescription && metaDescription.trim() ? metaDescription.trim() : DEFAULT_DESCRIPTION;

  // 3. Keywords - only if present and non-empty
  const validKeywords = Array.isArray(metaKeywords)
    ? metaKeywords.map((k) => k.trim()).filter(Boolean)
    : [];
  const hasKeywords = validKeywords.length > 0;
  const keywordsContent = validKeywords.join(', ');

  // 4. Determine canonical URL based on content type and slug
  const getRoutePrefix = (type?: string) => {
    switch (type) {
      case 'news':
        return 'news';
      case 'blog':
        return 'blog';
      case 'article':
        return 'articles';
      case 'gallery':
        return 'gallery';
      default:
        return type || '';
    }
  };

  const routePrefix = getRoutePrefix(contentType);
  let canonicalPath = '';
  if (slug !== undefined && slug !== null && String(slug).trim() !== '') {
    const slugStr = String(slug).trim();
    canonicalPath = routePrefix ? `/${routePrefix}/${slugStr}` : `/${slugStr}`;
  } else {
    canonicalPath = routePrefix ? `/${routePrefix}` : '/';
  }
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  // 5. Open Graph Type: "article" for news/blog/article, "website" for gallery/other
  const ogType = contentType === 'gallery' ? 'website' : 'article';

  // 6. Resolve Image URL to absolute URL if provided
  let formattedImage: string | undefined = undefined;
  if (image && typeof image === 'string' && image.trim()) {
    const trimmedImg = image.trim();
    if (trimmedImg.startsWith('http://') || trimmedImg.startsWith('https://')) {
      formattedImage = trimmedImg;
    } else {
      formattedImage = `${baseUrl}${trimmedImg.startsWith('/') ? trimmedImg : `/${trimmedImg}`}`;
    }
  }

  // 7. Safely validate and parse schema markup
  let parsedSchema: object | null = null;
  if (schemaMarkup) {
    if (typeof schemaMarkup === 'object') {
      parsedSchema = schemaMarkup;
    } else if (typeof schemaMarkup === 'string') {
      const trimmedSchema = schemaMarkup.trim();
      if (trimmedSchema) {
        try {
          parsedSchema = JSON.parse(trimmedSchema);
        } catch (error) {
          console.warn(
            `[SEO] Failed to parse schemaMarkup for content item with slug "${slug ?? 'unknown'}". Skipping JSON-LD injection.`,
            error,
            '\nRaw schema markup was:',
            trimmedSchema
          );
        }
      }
    }
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      {hasKeywords && <meta name="keywords" content={keywordsContent} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      {formattedImage && <meta property="og:image" content={formattedImage} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      {formattedImage && <meta name="twitter:image" content={formattedImage} />}

      {/* Structured Data (Schema.org JSON-LD) */}
      {parsedSchema && (
        <script type="application/ld+json">{JSON.stringify(parsedSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
