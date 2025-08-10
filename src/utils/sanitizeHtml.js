export default function sanitizeHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const scripts = doc.querySelectorAll('script');
  scripts.forEach((s) => s.remove());
  return doc.body.innerHTML;
}
