import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

// One-time asset preparation. Production never contacts Unsplash.
await mkdir(new URL('../public/images/', import.meta.url), { recursive: true });
const photos = {
  hero: 'photo-1613977257363-707ba9348227',
  courtyard: 'photo-1600607687920-4e2a09cf159d',
  stillwater: 'photo-1600210492486-724fe5c67fb0',
  stone: 'photo-1600607687939-ce8a6c25118c',
};
for (const [name, id] of Object.entries(photos)) {
  const response = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=90`);
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  for (const width of name === 'hero' ? [640, 960, 1440, 1920] : [480, 800, 1200]) {
    const output = new URL(`../public/images/${name}-${width}.webp`, import.meta.url);
    const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: name === 'hero' ? 76 : 78, effort: 6 }).toFile(output.pathname.replace(/^\/(\w:)/, '$1'));
    console.log(`${name}-${width}.webp: ${(info.size / 1024).toFixed(1)} KB`);
  }
  if (name === 'hero') {
    for (const width of [480, 800]) {
      const output = new URL(`../public/images/hero-mobile-${width}.webp`, import.meta.url);
      const info = await sharp(input).resize(width, Math.round(width * 1.2), { fit: 'cover', position: 'centre' }).webp({ quality: 75, effort: 6 }).toFile(output.pathname.replace(/^\/(\w:)/, '$1'));
      console.log(`hero-mobile-${width}.webp: ${(info.size / 1024).toFixed(1)} KB`);
    }
  }
}
