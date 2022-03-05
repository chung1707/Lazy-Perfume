<template>
  <baseHeader/>
  <slot />
  <baseFooter/>
</template>

<script>
import baseHeader from "../components/client/header.vue";
import baseFooter from "../components/client/footer.vue";
export default {
  components: {
    baseHeader,
    baseFooter
  }
};
</script>

<style></style>
