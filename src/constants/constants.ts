export const ROUTE_GROUPS = {
  AUTH: "(auth)",
  APP: "(app)",
};

export const ROUTE_PATHS = {
  LOGIN: `/${ROUTE_GROUPS.AUTH}/login`,
  VERIFY: `/${ROUTE_GROUPS.AUTH}/verify`,
  DEFAULT_APP_HOME: `/${ROUTE_GROUPS.APP}/trips`,
};

// You could also export them individually if preferred
export const AUTH_GROUP = "(auth)";
export const APP_GROUP = "(app)";
export const LOGIN_PATH = `/${AUTH_GROUP}/login`;
export const DEFAULT_APP_PATH = `/${APP_GROUP}/trips`;
