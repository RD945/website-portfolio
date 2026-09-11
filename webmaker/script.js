const packages = [
  { id:'launch', name:'The Launchpad', category:'Business', price:299, tagline:'One great page. One clear first impression.', label:'A confident first step', pages:'1 landing page', theme:'sage', preview:'Small beginnings.\nBig possibilities.', features:['Responsive landing page','Brand color and typography setup','Contact links and call-to-action sections','Source files and launch checklist'], description:'A focused single-page website for a new idea, a service, or an upcoming launch. Keep your message clear and give visitors one great next step.' },
  { id:'folio', name:'The Creative Portfolio', category:'Portfolio', price:449, tagline:'Your work deserves its own spotlight.', label:'For independent creatives', pages:'Up to 4 pages', theme:'peach', preview:'Good work.\nWorth a closer look.', features:['Home, about, work, and contact pages','Project gallery with up to 6 case studies','Responsive image layouts','Source files and handover guide'], description:'An editorial home for designers, photographers, writers, and anyone with work to share. Built around strong imagery and the story behind your projects.' },
  { id:'business', name:'The Business Essential', category:'Business', price:699, tagline:'A polished home for a growing business.', label:'Room to tell your story', pages:'Up to 5 pages', theme:'sand', preview:'Good people.\nGreat possibilities.', features:['Up to 5 business pages','Service and team sections','Editable CMS setup','Contact form integration setup','Page titles and descriptions','Handover and editing guide'], description:'A multi-page foundation for a service business. Explain what you do, introduce your team, and help the right people get in touch. Hosting and third-party form service costs are separate.' },
  { id:'shop', name:'The Storefront', category:'Ecommerce', price:999, tagline:'Turn your collection into a destination.', label:'Your products, beautifully presented', pages:'Store + up to 10 products', theme:'rose', preview:'Everyday things.\nExtraordinary details.', features:['Product catalog and category pages','Up to 10 initial product listings','Cart and checkout integration setup','Responsive product detail layouts','Store management handover'], description:'A considered ecommerce starting point for a small product collection. Payment-provider activation, platform subscriptions, and transaction fees are separate and require your own accounts.' },
  { id:'studio', name:'The Studio Edition', category:'Portfolio', price:799, tagline:'A distinctive space for ambitious work.', label:'For studios and small teams', pages:'Up to 6 pages', theme:'lavender', preview:'Ideas with purpose.\nWork with feeling.', features:['Up to 6 editorial pages','Up to 10 project case studies','Editable project CMS','Team and service sections','Handover and editing guide'], description:'A larger portfolio package for creative teams. Bring your case studies, services, and people together in a consistent visual identity.' },
  { id:'growth', name:'The Growth Store', category:'Ecommerce', price:1499, tagline:'More products. More room to grow.', label:'For an expanding collection', pages:'Store + up to 30 products', theme:'blue', preview:'Find your favorites.\nMake them yours.', features:['Up to 30 initial product listings','Collection filtering and product search','Cart and checkout integration setup','Shipping and tax configuration setup','Store management handover'], description:'An expanded storefront for a larger catalog. Includes product organization and configuration guidance. Payment, shipping, tax, and subscription costs remain separate; final configuration depends on your business requirements.' },
];
document.addEventListener('click', event => {
  const anchor = event.target instanceof Element ? event.target.closest('a') : null;
  const href = anchor?.getAttribute('href') || '';
  if (href === '#' || /^(?:\/|https?:|mailto:)/i.test(href)) event.preventDefault();
}, true);
const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
const escape = text => String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let filter='all', sort='featured', cart=[];
try { const saved=JSON.parse(localStorage.getItem('sitecraft-cart')||'[]'); if(Array.isArray(saved)) cart=[...new Set(saved)].filter(id=>packages.some(p=>p.id===id)); } catch {}
const save = () => { try {localStorage.setItem('sitecraft-cart',JSON.stringify(cart));} catch {} document.querySelector('#cart-count').textContent=cart.length; };
const preview = p => `<div class="product-preview ${p.theme}"><div class="preview-nav"><b>${escape(p.name.replace('The ',''))}</b><span>About &nbsp; Work &nbsp; ↗</span></div><h3>${escape(p.preview).replace('\n','<br>')}</h3><div class="preview-art" aria-hidden="true">${p.category==='Ecommerce'?'◒ ◇':'✳'}</div><span class="preview-caption">A DESIGN DIRECTION / ${escape(p.category.toUpperCase())}</span></div>`;
function renderProducts(){
  let results=packages.filter(p=>filter==='all'||p.category===filter);
  if(sort!=='featured') results.sort((a,b)=>sort==='low'?a.price-b.price:b.price-a.price);
  document.querySelector('#products').innerHTML=results.map(p=>`<article class="product-card"><button class="preview-button" data-details="${p.id}" aria-label="View ${escape(p.name)} details">${preview(p)}</button><div class="product-copy"><span class="eyebrow">${escape(p.category)} / ${escape(p.pages)}</span><div class="product-title-row"><h3>${escape(p.name)}</h3><strong>${money(p.price)}</strong></div><p>${escape(p.tagline)}</p><div class="product-actions"><button class="text-link" data-details="${p.id}">View package ↗</button><button class="button dark" data-add="${p.id}">${cart.includes(p.id)?'In your cart ✓':'Add to cart +'}</button></div></div></article>`).join('');
  document.querySelector('#catalog-status').textContent=`Showing ${results.length} website packages`;
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b.dataset.filter===filter);b.setAttribute('aria-pressed',String(b.dataset.filter===filter));});
}
let toastTimer;
function notify(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2500);}
function openDialog(id){document.querySelectorAll('dialog[open]').forEach(d=>d.close());document.querySelector(id).showModal();document.body.classList.add('dialog-open');}
function details(id){const p=packages.find(p=>p.id===id);if(!p)return;document.querySelector('#product-detail').innerHTML=`${preview(p)}<p class="eyebrow">${escape(p.label)}</p><h2 id="product-title">${escape(p.name)}</h2><p>${escape(p.description)}</p><ul class="feature-list">${p.features.map(f=>`<li>${escape(f)}</li>`).join('')}</ul><p class="sample-note">Sample price · USD · Final scope and schedule require confirmation.</p><div class="detail-bottom"><strong>${money(p.price)}</strong><button class="button orange" data-add="${p.id}">${cart.includes(p.id)?'View cart →':'Add to cart +'}</button></div>`;openDialog('#product-dialog');}
function renderCart(){
  const selected=cart.map(id=>packages.find(p=>p.id===id));
  document.querySelector('#cart-items').innerHTML=selected.length?selected.map(p=>`<article class="cart-item"><div class="cart-art ${p.theme}" aria-hidden="true">✳</div><div><h3>${escape(p.name)}</h3><p>${escape(p.pages)}</p><button class="remove" data-remove="${p.id}">Remove</button></div><strong>${money(p.price)}</strong></article>`).join(''):'<div class="empty-cart"><span>✳</span><h3>A new beginning starts here.</h3><p>Your cart is empty. Find a website for your next idea.</p><button class="button orange" data-browse>Browse websites →</button></div>';
  document.querySelector('#cart-summary').innerHTML=selected.length?`<div class="cart-total"><span>Sample package subtotal</span><strong>${money(selected.reduce((sum,p)=>sum+p.price,0))}</strong></div><p class="sample-note">One of each package. Taxes, hosting, domains, and third-party costs are not calculated. This is not a final quote.</p>`:'';
  document.querySelector('#brief-form').hidden=!selected.length;
  document.querySelector('#brief-status').textContent='';save();
}
document.addEventListener('click',event=>{
  const button=event.target.closest('button,a');if(!button)return;
  if(button.hasAttribute('data-details')) details(button.dataset.details);
  if(button.hasAttribute('data-add')) {const id=button.dataset.add;if(!packages.some(p=>p.id===id))return;if(cart.includes(id)){renderCart();openDialog('#cart-dialog');}else{cart.push(id);save();renderProducts();notify(`${packages.find(p=>p.id===id).name} added to cart`);if(document.querySelector('#product-dialog').open) button.textContent='View cart →';}}
  if(button.hasAttribute('data-cart')){renderCart();openDialog('#cart-dialog');}
  if(button.hasAttribute('data-remove')){cart=cart.filter(id=>id!==button.dataset.remove);renderCart();renderProducts();}
  if(button.hasAttribute('data-close')) button.closest('dialog').close();
  if(button.hasAttribute('data-filter')){filter=button.dataset.filter;renderProducts();}
  if(button.hasAttribute('data-category')){filter=button.dataset.category;renderProducts();}
  if(button.hasAttribute('data-browse')){document.querySelector('#cart-dialog').close();document.querySelector('#shop').scrollIntoView({behavior:'smooth'});}
});
document.querySelector('#sort').addEventListener('change',event=>{sort=event.target.value;renderProducts();});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));document.querySelector('#navigation').classList.toggle('open',expanded);});
document.querySelectorAll('#navigation a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('#navigation').classList.remove('open');}));
document.querySelector('#brief-form').addEventListener('submit',event=>{
  event.preventDefault();if(!cart.length)return;const data=new FormData(event.target);const selected=cart.map(id=>packages.find(p=>p.id===id));
  const text=`SITECRAFT — WEBSITE ORDER BRIEF\nDraft only. Not submitted. No payment taken.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\n\nPACKAGES (SAMPLE PRICES, USD)\n${selected.map(p=>`${p.name} — ${money(p.price)}\n${p.features.map(f=>`  - ${f}`).join('\n')}`).join('\n\n')}\n\nSample subtotal: ${money(selected.reduce((sum,p)=>sum+p.price,0))}\nTaxes, hosting, domains, and third-party fees are excluded. Final pricing and schedule require confirmation.\n\nYOUR REQUIREMENTS\n${data.get('requirements')}\n`;
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='sitecraft-order-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#brief-status').textContent='Your brief has been downloaded. It has not been submitted as an order.';
});
save();renderProducts();
