import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
// import { authMiddleware } from "@clerk/nextjs";
// export default authMiddleware({
//   publicRoutes: ["/", "/products/:id"],
//   ignoredRoutes: ["/assets/img/(.*)", "/api/webhooks(.*)"],
// });
// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
