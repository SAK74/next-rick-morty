export const publicRoutes = [
  "/",
  // "/example",
];

export const publicRotePrefixes = ["/auth", "/detail"];

// export const authRoute = "/auth";

export const REDIRECT_AFTER_LOGOUT = process.env.REDIRECT_AFTER_LOGOUT || "/";
export const DEFAULT_REDIRECT_AFTER_LOGIN =
  process.env.DEFAULT_REDIRECT_AFTER_LOGIN || "/";
