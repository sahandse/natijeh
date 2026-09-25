import '../styles.css';
import { downloadLinks, type DownloadSource } from './config';

const toast = document.querySelector<HTMLElement>('.toast');
let toastTimer: number | undefined;

function showUnavailableMessage(): void {
  if (!toast) return;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll<HTMLAnchorElement>('[data-download]').forEach((item) => {
  const source = item.dataset.download as DownloadSource | undefined;
  if (!source) return;

  const url = downloadLinks[source];
  if (url) {
    item.href = url;
    item.removeAttribute('aria-disabled');
    item.target = '_blank';
    item.rel = 'noopener';
    return;
  }

  item.addEventListener('click', (event) => {
    event.preventDefault();
    showUnavailableMessage();
  });
});

const dialog = document.querySelector<HTMLDialogElement>('#lightbox');
const dialogImage = dialog?.querySelector<HTMLImageElement>('img');
const closeButton = dialog?.querySelector<HTMLButtonElement>('button');

document.querySelectorAll<HTMLButtonElement>('.shot').forEach((shot) => {
  shot.addEventListener('click', () => {
    if (!dialog || !dialogImage || !shot.dataset.image) return;
    dialogImage.src = shot.dataset.image;
    dialog.showModal();
  });
});

closeButton?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const year = document.querySelector<HTMLElement>('#year');
if (year) {
  year.textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());
}
