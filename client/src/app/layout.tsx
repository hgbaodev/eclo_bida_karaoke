import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';
import { inter, lexendDeca } from '@/app/fonts';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { cn } from '@/utils/class-names';
import '@/app/globals.css';
import NextProgress from '@/components/next-progress';
import Providers from '@/store/Provider';
import App from './app';

export const metadata: Metadata = {
  title: 'ECLO',
  description: 'Eclo manager karaoke/bida',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <Providers>
          <App>
            <ThemeProvider>
              <NextProgress />
              {children}
              <Toaster />
              <GlobalDrawer />
              <GlobalModal />
            </ThemeProvider>
          </App>
        </Providers>
      </body>
    </html>
  );
}
