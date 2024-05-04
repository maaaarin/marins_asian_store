import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/products/:id", "'/api/webhook/clerk'", "/favicon.ico"],
  ignoredRoutes: ["/assets/img/(.*)", "/api/webhooks(.*)", "/favicon.ico"],
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
