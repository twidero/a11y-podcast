import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@digdir/designsystemet-css';
import '@digdir/designsystemet-theme';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'A11y Activist - An accessibility podcast',
  description: 'A podcast about accessibility and inclusion in the digital and physical life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no-nb" data-theme="light" data-size="medium" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
