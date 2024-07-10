import createMiddleware from 'next-intl/middleware';

const defaultLocale = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';

export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: defaultLocale,
  localePrefix: 'never',
});

export const config = {
  // Match only internationalized pathnames and specific paths
  matcher: ['/', '/admin/:path*', '/auth/:path*', '/(vi|en)/:path*'],
};
// Custom middleware function to handle specific routes
export function customMiddleware(req: any, res: any, next: any) {
  const { url } = req;

  // List of specific paths to redirect
  const pathsToRedirect = ['/admin/', '/auth/']; // Add more paths as needed

  // Check if the URL starts with any of the paths to redirect and doesn't have a locale prefix
  const shouldRedirect = pathsToRedirect.some((path) => {
    return url.startsWith(path) && !url.startsWith(`/en${path}`) && !url.startsWith(`/vi${path}`);
  });

  if (shouldRedirect) {
    // Determine the correct locale prefix based on the current URL
    const currentPath = pathsToRedirect.find((path) => url.startsWith(path));
    const redirectedUrl = `/en${url.replace(currentPath, `${currentPath}`)}`;

    res.writeHead(301, { Location: redirectedUrl });
    res.end();
    return;
  }

  // Continue to the next middleware or handler
  next();
}
