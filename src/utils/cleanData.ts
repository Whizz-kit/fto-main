// Shared data cleaning utilities for listing display

/**
 * Decode HTML entities safely
 */
export function decodeHtml(html?: string): string {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Clean essence/tagline: convert scrape artifacts into a readable tagline.
 * Pattern detected: "Psilocybin mushroom — Vetted provider. 110 Reviews"
 * Becomes: "Psilocybin mushroom · ✓ Vetted · 110 reviews"
 */
export function cleanEssence(essence?: string, about?: string): string {
  const raw = decodeHtml(essence || '');

  // Detect scrape metadata pattern
  const isScrapeMeta = /^[\w\s\d]+—\s*(Vetted|Listed) provider/i.test(raw.replace(/\u2014/g, '—'));

  if (isScrapeMeta || !raw) {
    const normalized = raw.replace(/\u2014/g, '—');
    const substance = normalized.split('—')[0]?.trim();
    const status = normalized.includes('Vetted') ? '✓ Vetted' : '';
    const reviewMatch = normalized.match(/(\d+)\s*Reviews?/i);
    const reviews = reviewMatch ? `${reviewMatch[1]} reviews` : '';

    const parts = [substance, status, reviews].filter(Boolean);
    if (parts.length > 0) return parts.join(' · ');

    // Fallback: first sentence of about
    if (about) {
      const firstSentence = about.split(/[.!?]/)[0]?.trim();
      if (firstSentence) {
        return firstSentence.length > 120 ? firstSentence.substring(0, 120) + '...' : firstSentence;
      }
    }
    return '';
  }
  return raw;
}

