<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <adminNav :class="{adminMainNav: $store.state.hiddenSidebar}" />
      <adminSidebar />
      <slot class="" />
    </div>
  </div>
</template>

<script>
import adminNav from "../components/admin/adminNav.vue";
import adminSidebar from "../components/admin/adminSidebar.vue";

export default {
  components: {
    adminNav,
    adminSidebar,
  },
  
}
</script>

<style scoped lang="css">
.header-right {
  gap: 0px !important;
}
</style>
