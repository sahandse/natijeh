import '../styles.css';
import './football-theme.css';
import './iran-matchday.css';
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

const faqItems = document.querySelectorAll<HTMLDetailsElement>('.faq-list details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

const heroVisual = document.querySelector<HTMLElement>('.hero-visual');
if (heroVisual) {
  const stadiumLights = document.createElement('div');
  stadiumLights.className = 'stadium-lights';
  stadiumLights.setAttribute('aria-hidden', 'true');

  const football = document.createElement('div');
  football.className = 'football-mark';
  football.setAttribute('aria-hidden', 'true');

  const cornerFlag = document.createElement('div');
  cornerFlag.className = 'corner-flag';
  cornerFlag.setAttribute('aria-hidden', 'true');

  heroVisual.prepend(stadiumLights);
  heroVisual.append(football, cornerFlag);
}

const matchday = document.querySelector<HTMLElement>('.matchday-section');
if (matchday) {
  const liveStrip = document.createElement('section');
  liveStrip.className = 'matchday-live-strip';
  liveStrip.setAttribute('aria-label', 'نوار زنده مسابقه');
  liveStrip.innerHTML = `
    <div class="shell live-strip-inner">
      <span class="live-badge">LIVE</span>
      <div class="live-items">
        <span>دربی تهران</span><i>•</i>
        <span>استقلال ۱ — ۱ پرسپولیس</span><i>•</i>
        <span>پوشش زنده، آمار و رخدادهای مسابقه در نتیجه</span>
      </div>
    </div>`;

  matchday.parentElement?.insertBefore(liveStrip, matchday);
  matchday.classList.add('iran-matchday');
  matchday.innerHTML = `
    <div class="stadium-photo" aria-hidden="true"></div>
    <div class="iran-player iran-player-blue" aria-hidden="true"></div>
    <div class="iran-player iran-player-red" aria-hidden="true"></div>
    <div class="shell matchday-grid">
      <div class="matchday-copy">
        <span class="section-kicker">روز مسابقه با نتیجه</span>
        <h2>هیجان فوتبال ایران<br><em>در یک نگاه زنده.</em></h2>
        <p>قبل از بازی، حین مسابقه و بعد از سوت پایان، «نتیجه» همه‌چیز را سریع و فارسی در اختیارت می‌گذارد؛ از ترکیب و آمار تا رخدادها، جدول و جزئیات کامل مسابقه.</p>
        <ul class="check-list">
          <li><span>✓</span><div><b>مرکز پیش از مسابقه</b><small>زمان، وضعیت، فرم تیم‌ها و اطلاعات کلیدی پیش از شروع</small></div></li>
          <li><span>✓</span><div><b>پوشش زنده مسابقه</b><small>گل، کارت، تعویض، مالکیت و رخدادهای مهم در لحظه</small></div></li>
          <li><span>✓</span><div><b>فوتبال ایران و جهان</b><small>بازی‌های مهم، تیم‌های محبوب و جدول لیگ‌ها در یک تجربه خلوت</small></div></li>
        </ul>
      </div>
      <div class="match-card iran-derby-card" aria-label="نمونه کارت دربی تهران">
        <div class="match-card-top"><span><i></i> زنده</span><small>دربی تهران · ورزشگاه آزادی</small></div>
        <div class="teams teams-iran-derby">
          <div class="iran-team"><img class="team-logo-svg" src="https://cdn.worldvectorlogo.com/logos/esteghlal-fc-1.svg" alt="لوگوی استقلال"><b>استقلال</b></div>
          <strong class="derby-score">۱ <small>—</small> ۱</strong>
          <div class="iran-team"><img class="team-logo-svg" src="https://cdn.worldvectorlogo.com/logos/perspolis-2.svg" alt="لوگوی پرسپولیس"><b>پرسپولیس</b></div>
        </div>
        <div class="minute">دقیقه ۷۸</div>
        <div class="derby-pressure"><span></span></div>
        <div class="match-data"><span><b>۵۰٪</b><small>مالکیت</small></span><span><b>۱۰</b><small>شوت</small></span><span><b>۴</b><small>در چارچوب</small></span></div>
        <div class="derby-tags"><span class="blue-tag">استقلال</span><span class="red-tag">پرسپولیس</span></div>
      </div>
    </div>`;
}
