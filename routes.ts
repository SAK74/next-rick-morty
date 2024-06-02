export const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  // "/example",
];

export const publicRotePrefixes = ["/detail"];

// export const authRoute = "/auth";

export const REDIRECT_AFTER_LOGOUT = process.env.REDIRECT_AFTER_LOGOUT || "/";
export const DEFAULT_REDIRECT_AFTER_LOGIN =
  process.env.DEFAULT_REDIRECT_AFTER_LOGIN || "/";
