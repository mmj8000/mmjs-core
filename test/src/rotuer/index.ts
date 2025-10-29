import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  Router,
} from "vue-router";
import { createMetaGlobRoutes } from "./utils";
const routerRaws = import.meta.glob<RouteRecordRaw["component"]>(
  "../dev-pages/**/index.vue",
  {
    import: "default",
    eager: false,
  }
);

const routes = createMetaGlobRoutes(routerRaws, ["dev-pages"]);

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
});

export default router;
