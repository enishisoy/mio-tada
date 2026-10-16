const langButtons = document.querySelectorAll('[data-lang]');
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
  document.querySelectorAll('[data-alt-en]').forEach(el => { el.alt = el.dataset[lang === 'ja' ? 'altJa' : 'altEn']; });
  document.querySelectorAll('[data-label-en]').forEach(el => { el.setAttribute('aria-label',el.dataset[lang === 'ja' ? 'labelJa' : 'labelEn']); });
  langButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  document.title = lang === 'ja' ? '多田味央 | 書道家' : 'Mio Tada | Japanese Calligraphy';
  document.querySelector('meta[name="description"]').content = lang === 'ja' ? '書道家・多田味央の作品と活動。日本文化に息づく、想いを込める精神を未来へ。作品制作・命名書・イベント出演・広告やポスターの筆文字制作のご相談はInstagramへ。' : 'Mio Tada, Japanese calligrapher. Art commissions, personalised baby-name calligraphy, event appearances, and lettering for posters and advertising. Enquire via Instagram.';
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
  try { localStorage.setItem('mio-language',lang); } catch {}
}
langButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
try { const saved = localStorage.getItem('mio-language'); if(saved === 'ja') setLanguage(saved); } catch {}
const dialog = document.querySelector('#art-dialog');
const dialogImage = document.querySelector('#dialog-image');
document.querySelectorAll('.art-button').forEach(button => button.addEventListener('click', () => {
  dialogImage.src = button.dataset.full;
  dialogImage.alt = button.querySelector('img').alt;
  document.querySelector('#dialog-caption').textContent = button.closest('figure').querySelector('figcaption span').textContent;
  dialog.showModal(); document.body.classList.add('dialog-open');
}));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog){ const box = dialog.getBoundingClientRect(); if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); }});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

const videoDetails = document.querySelector(".video-detail");
videoDetails.addEventListener("toggle", () => { if (!videoDetails.open) videoDetails.querySelector("video").pause(); });
