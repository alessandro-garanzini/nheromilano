import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './next-intl.config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Always use locale prefix (even for default locale)
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except API routes, _next, static files, and /links
  matcher: ['/((?!api|_next|_vercel|links|.*\\..*).*)']
};
