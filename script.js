const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}));

const streamSwitch = document.querySelector('.stream-switch');
const navCard = document.querySelector('.stream-card-nav');
const manipCard = document.querySelector('.stream-card-manip');
const switchLabel = document.querySelector('.switch-label');
streamSwitch?.addEventListener('click', () => {
  const manipulation = streamSwitch.getAttribute('aria-pressed') !== 'true';
  streamSwitch.setAttribute('aria-pressed', String(manipulation));
  navCard.classList.toggle('is-active', !manipulation);
  manipCard.classList.toggle('is-active', manipulation);
  switchLabel.textContent = manipulation ? 'Show navigation' : 'Show manipulation';
});

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[char]));
const categoryBadge = { manipulation: 'demo-badge-cyan', mobile: 'demo-badge', navigation: 'demo-badge-lime' };
const categoryName = { manipulation: 'Pure manipulation', mobile: 'Mobile manipulation', navigation: 'Pure navigation' };
const categoryGrid = { manipulation: '.demo-grid-manipulation', mobile: '.demo-grid-mobile', navigation: '.demo-grid-navigation' };
const demoTitle = (demo) => {
  if (demo.label) return demo.label;
  return demo.category === 'mobile' ? 'Mobile manipulation demonstration' : 'Fixed-base manipulation demonstration';
};
const mediaType = (path) => /\.mov$/i.test(path) ? 'video/quicktime' : 'video/mp4';
fetch('assets/demos/manifest.json?v=20260929-1')
  .then((response) => response.json())
  .then((demos) => {
    demos.forEach((demo) => {
      const grid = document.querySelector(categoryGrid[demo.category]);
      if (!grid) return;
      const title = demoTitle(demo);
      const platform = demo.platform === 'AGX' ? 'AgileX Cobot Magic' : demo.platform === 'G2' ? 'AgiBot G2' : demo.category === 'mobile' ? 'AgileX Cobot Magic' : 'Real-robot clip';
      grid.insertAdjacentHTML('beforeend', `<article class="demo-card reveal" data-demo-id="${escapeHtml(demo.id)}"><div class="demo-video"><video controls playsinline preload="metadata" poster="${escapeHtml(demo.poster)}" aria-label="${escapeHtml(title)}"><source src="${escapeHtml(demo.video)}" type="${mediaType(demo.video)}"></video><span class="demo-badge ${categoryBadge[demo.category]}">${escapeHtml(categoryName[demo.category])}</span></div><div class="demo-caption"><div><span class="demo-index">${escapeHtml(demo.id.split('-').pop().padStart(2, '0'))}</span><h3>${escapeHtml(title)}</h3></div><p>${escapeHtml(platform)}<br><span>full source clip</span></p></div></article>`);
    });
    document.querySelectorAll('.demo-card.reveal').forEach((item) => revealObserver.observe(item));
  })
  .catch(() => {
    const catalog = document.querySelector('#demo-catalog');
    if (catalog) catalog.insertAdjacentHTML('afterbegin', '<p class="catalog-error">The demo manifest could not be loaded.</p>');
  });

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('figcaption');
const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.removeAttribute('src');
  document.body.classList.remove('menu-open');
};
document.querySelectorAll('[data-lightbox]').forEach((button) => button.addEventListener('click', () => {
  lightboxImage.src = button.dataset.lightbox;
  lightboxImage.alt = button.dataset.caption || 'Expanded research figure';
  lightboxCaption.textContent = button.dataset.caption || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}));
lightbox?.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox(); });

const citation = `@article{xue2026uniwam,
  title   = {UniWAM: Unified Mobile Manipulation via Mixed-Stream World-Action Modeling and Manipulation Anchor Pose Supervision},
  author  = {Xue, Wei and Liu, Keliang and Cui, Mingzhang and Xie, Jinhua and Hou, Jianan and Lu, Jingcheng and Wang, Lintao and Qiu, Kaixiang and Liu, Yizhou and Ye, Xinghai and Han, Jinghang and Li, Mingcheng and Gu, Jie and Wang, Shunli and Yang, Dingkang and Zhang, Lihua},
  year    = {2026},
  note    = {Technical report}
}`;
const copyButton = document.querySelector('#copy-citation');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(citation);
    copyButton.querySelector('.copy-label').textContent = 'Copied';
    setTimeout(() => { copyButton.querySelector('.copy-label').textContent = 'Copy BibTeX'; }, 1800);
  } catch {
    copyButton.querySelector('.copy-label').textContent = 'Select manually';
  }
});

document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('error', () => video.closest('.demo-video, .hero-video-frame')?.classList.add('video-error'));
});
