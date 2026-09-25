# صفحه دانلود نتیجه

لندینگ‌پیج فارسی، واکنش‌گرا و نوشته‌شده با TypeScript و Vite برای معرفی و دانلود اپلیکیشن «نتیجه».

## تنظیم لینک‌های دانلود

آدرس نسخه مستقیم، کافه‌بازار و مایکت در فایل `src/config.ts` قرار دارند. پس از انتشار برنامه در هر فروشگاه، لینک آن را در همین فایل وارد کنید.

## اجرا و ساخت

```bash
npm install
npm run dev
npm run build
```

## انتشار با GitHub Pages

Workflow موجود در `.github/workflows/deploy-pages.yml` بعد از هر Push روی شاخه `main` نسخه Production را می‌سازد و منتشر می‌کند. در تنظیمات Pages، منبع انتشار باید روی **GitHub Actions** باشد.
