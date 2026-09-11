const palettes = {
  earth: { title: 'Earth & light', kicker: '01 — SUN-WASHED & GROUNDED', image: 'courtyard', alt: 'Sunlit dining space with pale stone tones and natural wood', description: 'Chalky stone, pale oak, and sun-warmed clay. A gentle palette that lets the changing daylight do the talking.', materials: [['Limestone', '#d5c6ab'], ['Pale oak', '#b28a60'], ['Terracotta', '#b97556']] },
  forest: { title: 'Forest & warmth', kicker: '02 — SHELTERED & CONNECTED', image: 'stillwater', alt: 'Warm living room with timber furniture, greenery, and soft natural light', description: 'Deep green, warm walnut, and soft woven linen. An enveloping palette inspired by the shelter and stillness of a woodland canopy.', materials: [['Forest green', '#778267'], ['Walnut', '#805b42'], ['Natural linen', '#d4cbb6']] },
  stone: { title: 'Stone & stillness', kicker: '03 — QUIET & ELEMENTAL', image: 'stone', alt: 'Restrained contemporary living room with stone-grey tones and wood panelling', description: 'Honed stone, dark timber, and mineral plaster. A restrained palette of tactile contrasts, grounded in the beauty of simple materials.', materials: [['Honed stone', '#969792'], ['Smoked oak', '#615347'], ['Mineral plaster', '#d5d3c9']] },
};

export function initializeAtelier(openInquiry) {
  let selected = 'earth';
  let request = 0;
  const image = document.querySelector('#palette-image');
  const frame = image.parentElement;
  const status = document.querySelector('.atelier-loading');
  const buttons = [...document.querySelectorAll('[data-palette]')];
  const field = document.createElement('div');
  field.className = 'palette-inquiry';
  const label = document.createElement('label');
  label.textContent = 'Material direction (optional)';
  const select = document.createElement('select');
  select.name = 'palette';
  select.add(new Option('Let’s explore together', 'Not yet chosen'));
  for (const palette of Object.values(palettes)) select.add(new Option(palette.title, palette.title));
  label.append(select);
  field.append(label);
  document.querySelector('#inquiry-form').prepend(field);

  async function choose(key) {
    selected = key;
    const palette = palettes[key];
    const currentRequest = ++request;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.palette === key)));
    document.querySelector('#palette-title').textContent = palette.title;
    document.querySelector('#palette-description').textContent = palette.description;
    document.querySelector('#sample-number').textContent = `N° 0${Object.keys(palettes).indexOf(key) + 1}`;
    document.querySelector('.sample-line').style.background = palette.materials[0][1];
    document.querySelectorAll('.material-swatches>div').forEach((swatch, i) => {
      swatch.querySelector('.swatch').style.setProperty('--swatch', palette.materials[i][1]);
      swatch.querySelector('.swatch-name').textContent = palette.materials[i][0];
    });
    frame.setAttribute('aria-busy', 'true');
    status.textContent = 'Loading material reference…';
    status.hidden = false;
    image.srcset = `/images/${palette.image}-480.webp 480w, /images/${palette.image}-800.webp 800w, /images/${palette.image}-1200.webp 1200w`;
    image.src = `/images/${palette.image}-800.webp`;
    image.alt = palette.alt;
    try {
      await image.decode();
      if (request === currentRequest) status.hidden = true;
    } catch {
      if (request === currentRequest) status.textContent = 'Image unavailable. You can still explore the palette and add it to your brief.';
    } finally {
      if (request === currentRequest) frame.setAttribute('aria-busy', 'false');
    }
  }
  buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.palette)));
  document.querySelector('#use-palette').addEventListener('click', () => {
    select.value = palettes[selected].title;
    openInquiry();
  });
}
