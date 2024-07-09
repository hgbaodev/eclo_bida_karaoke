import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/admin/:path*', '/(vi|en)/:path*'],
};

// Custom middleware function to handle /admin/ routes
export function customMiddleware(req: any, res: any, next: any) {
  const { url } = req;

  // Check if the URL starts with /admin/ and doesn't have a locale prefix
  if (url.startsWith('/admin/') && !url.startsWith('/en/admin/') && !url.startsWith('/vi/admin/')) {
    // Redirect to /en/admin/...
    const redirectedUrl = `/en${url}`;
    res.writeHead(307, { Location: redirectedUrl });
    res.end();
    return;
  }

  // Continue to the next middleware or handler
  next();
}
