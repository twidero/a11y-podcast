import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@digdir/designsystemet-css';
import '@digdir/designsystemet-theme';
import './global.css';
import { Header } from '@/components/Header/Header';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'A11y Activists - An accessibility podcast',
  description: 'A podcast about accessibility and inclusion in the digital and physical life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" data-size="medium" className={inter.variable}>
      <body className="site-body">
        <div className="wrapper">
          <a href="#main-content" className="ds-skip-link">
            Skip to main content
          </a>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
