import { initializeAtelier } from './atelier.js';

document.addEventListener('click', event => {
  const anchor = event.target instanceof Element ? event.target.closest('a') : null;
  const href = anchor?.getAttribute('href') || '';
  if (href === '#' || /^(?:\/|https?:|mailto:)/i.test(href)) event.preventDefault();
}, true);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.querySelector('span').textContent = '+'; }
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '−' : '+';
});
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
const projects = {
  courtyard: { title: 'The Courtyard House', type: '01 / ARCHITECTURE & INTERIORS', image: 'photo-1600607687920-4e2a09cf159d', alt: 'Light-filled living space overlooking a green courtyard', description: 'A home imagined around an open heart. This study explores the courtyard as both a private landscape and a source of daylight, drawing the seasons into the daily rituals of living. Open rooms and quiet thresholds create a gentle conversation between inside and out.', materials: 'Pale limestone · Natural oak · Lime plaster · Clear glass' },
  stillwater: { title: 'Stillwater Residence', type: '02 / INTERIOR STUDY', image: 'photo-1600210492486-724fe5c67fb0', alt: 'Warm contemporary living room with timber and garden views', description: 'An exploration of stillness through proportion, texture, and light. A restrained palette allows the warmth of timber and the softness of textiles to lead. Spaces flow naturally, offering places to gather and corners to withdraw.', materials: 'Warm oak · Woven linen · Brushed bronze · Soft plaster' },
  stone: { title: 'The Stone Retreat', type: '03 / MATERIAL STUDY', image: 'photo-1600607687939-ce8a6c25118c', alt: 'Quiet natural-toned interior with carefully considered furnishings', description: 'A study in permanence and retreat. Natural materials and simple forms establish a slower rhythm, while carefully framed openings let light become part of the architecture. The idea is a space that feels grounded, intimate, and connected to its surroundings.', materials: 'Honed stone · Solid timber · Textured plaster · Natural wool' }
};
const projectDialog = document.querySelector('#project-dialog');
const inquiryDialog = document.querySelector('#inquiry-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#detail-type').textContent = project.type;
  document.querySelector('#detail-description').textContent = project.description;
  document.querySelector('#detail-materials').textContent = project.materials;
  const image = document.querySelector('#detail-image');
  image.src = `/images/${button.dataset.project}-1200.webp`;
  image.srcset = `/images/${button.dataset.project}-480.webp 480w, /images/${button.dataset.project}-800.webp 800w, /images/${button.dataset.project}-1200.webp 1200w`;
  image.sizes = '(max-width: 700px) calc(100vw - 36px), 800px';
  image.alt = project.alt;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
});
function openInquiry() { inquiryDialog.showModal(); }
initializeAtelier(openInquiry);
document.querySelectorAll('[data-open-inquiry]').forEach(button => button.addEventListener('click', openInquiry));
document.querySelector('#project-inquiry').addEventListener('click', () => { projectDialog.close(); openInquiry(); });
const processList = document.querySelector('.process-list');
const processSteps = [...document.querySelectorAll('.process-list details')];
if (processList && processSteps.length) {
  const progress = processList.querySelector('.process-progress');
  progress?.removeAttribute('aria-hidden');
  progress?.setAttribute('role', 'progressbar');
  progress?.setAttribute('aria-label', 'Approach progress');
  progress?.setAttribute('aria-valuemin', '0');
  progress?.setAttribute('aria-valuemax', '100');
  progress?.setAttribute('aria-valuenow', '0');
  processList.style.setProperty('--process-progress', '0%');
  processSteps.forEach(step => {
    step.open = true;
    const summary = step.querySelector('summary');
    summary?.addEventListener('click', event => event.preventDefault());
  });
  processSteps[0].classList.add('is-active');
  if ('IntersectionObserver' in window) {
    const setActiveStep = step => {
      const index = processSteps.indexOf(step);
      processSteps.forEach(item => {
        item.classList.toggle('is-active', item === step);
      });
      const value = (index / Math.max(1, processSteps.length - 1)) * 100;
      processList.style.setProperty('--process-progress', `${value}%`);
      progress?.setAttribute('aria-valuenow', String(Math.round(value)));
    };
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActiveStep(visible.target);
    }, { rootMargin: '-38% 0px -42% 0px', threshold: 0.1 });
    processSteps.forEach(step => observer.observe(step));
  }
}
let downloadUrl;
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const brief = `FORMA — PROJECT BRIEF\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${data.get('type')}\nLocation: ${data.get('location')}\nMaterial direction: ${data.get('palette')}\n\nTHE VISION\n${data.get('vision')}\n\nPrepared locally on the FORMA concept website. No information has been sent.\n`;
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  downloadUrl = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  const status = document.querySelector('.form-status');
  status.replaceChildren(document.createTextNode('Your brief is ready. '));
  const link = document.createElement('a');
  link.href = downloadUrl; link.download = 'forma-project-brief.txt'; link.className = 'download-link'; link.textContent = 'Download your project brief';
  status.append(link, document.createTextNode('. Your information stays in your browser.'));
  link.click();
});
document.querySelector('#year').textContent = new Date().getFullYear();
