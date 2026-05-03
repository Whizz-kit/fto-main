import DOMPurify from 'dompurify';

/**
 * Shared content formatting utility.
 * Converts markdown-style content or raw HTML into clean, well-formatted HTML.
 * Used by EventDetailPage, NewsArticleDetail, and KnowledgeArticleDetail.
 * All output is sanitized with DOMPurify to prevent XSS.
 */
export function formatContent(content: string): string {
  if (!content) return '';
  let html = content;

  // If already contains HTML, clean it up
  if (/<[a-z][\s\S]*>/i.test(html)) {
    // Remove empty <p> tags
    html = html.replace(/<p>\s*<\/p>/g, '');
    // Remove <p>/<div> wrapping <li> elements
    html = html.replace(/<p>\s*<li>/g, '<li>');
    html = html.replace(/<\/li>\s*<\/p>/g, '</li>');
    html = html.replace(/<div>\s*<li>/g, '<li>');
    html = html.replace(/<\/li>\s*<\/div>/g, '</li>');
    // Remove <br> tags between list items
    html = html.replace(/<\/li>\s*(?:<br\s*\/?>)\s*<li>/g, '</li><li>');
    // Remove blank lines between list items
    html = html.replace(/<\/li>\s*\n[\s\n]*<li>/g, '</li>\n<li>');
    // Collapse consecutive lists
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    html = html.replace(/<\/ol>\s*<ol>/g, '');
    // Collapse multiple <br>
    html = html.replace(/(<br\s*\/?>[\s]*){2,}/g, '<br/>');
    // Remove <p>/<div> inside <li>
    html = html.replace(/<li>\s*<p>/g, '<li>');
    html = html.replace(/<\/p>\s*<\/li>/g, '</li>');
    html = html.replace(/<li>\s*<div>/g, '<li>');
    html = html.replace(/<\/div>\s*<\/li>/g, '</li>');
    // Remove empty <p> between list items
    html = html.replace(/<\/li>\s*<p>\s*<\/p>\s*<li>/g, '</li><li>');
    // Convert pseudo-lists: <p> tags starting with bullet chars
    html = html.replace(/<p>\s*[•●○▪▸►‣]\s*/g, '<li>');
    html = html.replace(/<li>([^<]*)<\/p>/g, '<li>$1</li>');
    // Final cleanup pass
    html = html.replace(/<\/li>\s*(?:<p>\s*<\/p>\s*|<br\s*\/?>[\s]*)*<li>/g, '</li><li>');
    return DOMPurify.sanitize(html);
  }

  // Plain text / markdown conversion
  // Escape HTML entities
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Headers
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  html = html.replace(/^[\s]*[•\-\*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/<\/li>\s*\n[\s\n]*<li>/g, '</li>\n<li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Clean up <p> wrapping <ul>
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/<\/ul>\s*<\/p>/g, '</ul>');

  // Paragraphs: split on double newlines
  html = html.split(/\n\n+/).map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h[2-4]|ul|ol|li|p|div|blockquote)/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
  }).filter(Boolean).join('\n');

  return DOMPurify.sanitize(html);
}
