import createMiddleware from 'next-intl/middleware';
import { useSelector } from 'react-redux';
import { RootState } from './store/types';

const defaultLocale = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';

export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: defaultLocale,
  localePrefix: 'never',
});

export const config = {
  matcher: ['/', '/admin/:path*', '/auth/:path*', '/(vi|en)/:path*'],
};

export function CustomMiddleware(req: any, res: any, next: any) {
  const { role } = useSelector((state: RootState) => state.auth);
  const { url } = req;

  // List of specific paths to redirect
  const pathsToRedirect = ['/admin/', '/auth/']; // Add more paths as needed

  // Check if the URL starts with any of the paths to redirect and doesn't have a locale prefix
  const shouldRedirect = pathsToRedirect.some((path) => {
    return url.startsWith(path) && !url.startsWith(`/en${path}`) && !url.startsWith(`/vi${path}`);
  });

  if (shouldRedirect) {
    const currentPath = pathsToRedirect.find((path) => url.startsWith(path));
    const redirectedUrl = `/en${url.replace(currentPath, `${currentPath}`)}`;

    res.writeHead(301, { Location: redirectedUrl });
    res.end();
    return;
  }

  // Permission check for /admin/users route
  if (url.startsWith('/[locale]/admin/users') || url.startsWith('/admin/users')) {
    // Check if the user has 'user.View' permission
    if (!role.permissions.includes('user.View' as never)) {
      // Redirect to unauthorized page or show error message
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Unauthorized: You do not have permission to view this page.');
      return;
    }
  }

  // Continue to the next middleware or handler
  next();
}
