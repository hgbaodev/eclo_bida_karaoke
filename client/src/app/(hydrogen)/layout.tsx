'use client';

import HydrogenLayout from '@/layouts/hydrogen/layout';
import { useIsMounted } from '@/hooks/use-is-mounted';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }
  return <HydrogenLayout>{children}</HydrogenLayout>;
}
