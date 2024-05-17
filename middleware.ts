import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/products/:id",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/favicon.ico",
    "/categories/snack",
    "/categories/soup",
    "/categories/candy",
    "/categories/drink",
    "/api/:path*",
  ],
  ignoredRoutes: [
    "/assets/img/(.*)",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/webhooks(.*)",
    "/favicon.ico",
  ],
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
