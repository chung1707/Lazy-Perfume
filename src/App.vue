<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { useRoute } from "vue-router";
import { PUBLIC_LAYOUT } from "./constants";
import { computed } from "vue";

export default {
  name: "App",

  setup() {
    const route = useRoute();
    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/app.scss";
</style>
