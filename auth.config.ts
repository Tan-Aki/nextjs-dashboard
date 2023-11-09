import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    providers: [],
    // You can use the pages option to specify the route for custom sign-in, sign-out, and error pages.
    // It is not required, but if you don't provide it, NextAuth.js will use its default sign-in, sign-out, and error pages.
    // By adding signIn: '/login' into our pages option, the user will be redirected to our custom login page, rather than the NextAuth.js default page.
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnLogin = nextUrl.pathname.startsWith('/login');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }

            if (isOnLogin && isLoggedIn) {
                // redirect after login
                // nextUrl contains the "basePath" property, which is probably used by the new URL constructor
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            // Is authorized by default for any other route that is not /dashboard and user not logged in(to access to /login page for example)
            return true;
        },
    },
} satisfies NextAuthConfig;
