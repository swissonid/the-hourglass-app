import { withAuth } from "next-auth/middleware";

/**
 * Like that each route / page is protected by default
 * for more info see https://next-auth.js.org/tutorials/securing-pages-and-api-routes#nextjs-middleware
 */
export default withAuth({});
