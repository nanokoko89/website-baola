// Utility to list available fonts from assets directory
// Exports FONTS (array of unique font families) and DEFAULT_FONT

// import.meta.glob returns an object mapping file paths to loader functions
const fontFiles = import.meta.glob('../assets/fonts/**/*.{ttf,otf,woff,woff2}');

const parseFontFamily = (p) => {
  const parts = p.split('/');
  const fileName = parts.pop().replace(/\.[^.]+$/, '');
  const folder = parts[parts.indexOf('fonts') + 1] || '';
  let family = folder.replace(/[_-]+/g, ' ').replace(/\(.*?\)/g, '').trim();
  if (!family) family = fileName.replace(/[_-]+/g, ' ');
  return family.trim();
};

// Gather fonts from the assets folder
const assetFonts = Array.from(
  new Set(Object.keys(fontFiles).map((p) => parseFontFamily(p)))
).sort();

// Include the browser default font as the first option
export const FONTS = ['system-ui', ...assetFonts];

// The browser default font should be selected initially
export const DEFAULT_FONT = 'Roboto';
