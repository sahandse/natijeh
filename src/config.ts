export type DownloadSource = 'direct' | 'bazaar' | 'myket';

export const downloadLinks: Record<DownloadSource, string> = {
  direct: 'https://raw.githubusercontent.com/sahandse/natijeh/main/natijeh-1.40.1.apk',
  bazaar: 'http://cafebazaar.ir/app/?id=ir.natijeh.app&ref=share',
  myket: ''
};
