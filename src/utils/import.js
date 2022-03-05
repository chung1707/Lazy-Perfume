import { defineAsyncComponent } from 'vue';

export function registerGlobalComponents(app) {
  app.component(
    'admin-layout', 
    defineAsyncComponent(() => import("../layouts/admin"))
  );
  app.component(
    'client-layout', 
    defineAsyncComponent(() => import("../layouts/client"))
  );
}
