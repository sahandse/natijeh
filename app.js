const links = window.NATIJEH_DOWNLOADS || {};
const toast = document.querySelector('.toast');

document.querySelectorAll('[data-download]').forEach((item) => {
  const url = links[item.dataset.download];
  if (url) {
    item.href = url;
    item.removeAttribute('aria-disabled');
    item.target = '_blank';
    item.rel = 'noopener';
  } else {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      toast.classList.add('show');
      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    });
  }
});

const dialog = document.querySelector('#lightbox');
document.querySelectorAll('.shot').forEach((shot) => shot.addEventListener('click', () => {
  dialog.querySelector('img').src = shot.dataset.image;
  dialog.showModal();
}));
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());
