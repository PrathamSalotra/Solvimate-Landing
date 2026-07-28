import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Solvimate - Translation, Transcription & Dubbing Solutions',
  description:
    'Solvimate empowers brands with seamless translation, transcription, and dubbing solutions.',
};

const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('solvimate-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <LanguageProvider>
              <ToastProvider>
                <a href="#main-content" className="skip-to-content">
                  Skip to main content
                </a>
                <Navbar />
                <div
                  style={{
                    paddingTop: '72px',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
                    {children}
                  </main>
                  <Footer />
                </div>
              </ToastProvider>
            </LanguageProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
