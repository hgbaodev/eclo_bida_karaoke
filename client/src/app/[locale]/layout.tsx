import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';
import { inter, lexendDeca } from '@/app/[locale]/fonts';
import GlobalDrawer from '@/app/[locale]/shared/drawer-views/container';
import GlobalModal from '@/app/[locale]/shared/modal-views/container';
import { cn } from '@/utils/class-names';
import '@/app/globals.css';
import NextProgress from '@/components/next-progress';
import Providers from '@/store/Provider';
import App from './app';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'ECLO',
  description: 'Eclo manager karaoke/bida',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
