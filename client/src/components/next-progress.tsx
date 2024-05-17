'use client';

import NextTopLoader from 'nextjs-toploader';

export default function NextProgress() {
  return <NextTopLoader showSpinner={false} crawlSpeed={100} speed={200} easing="ease" />;
}
