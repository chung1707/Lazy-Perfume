<template>
  <a class="add-to-cart" @click.prevent="addBookToCart" v-if="product.quantity>0">
    Thêm vào giỏ hàng
    <span><i class="fa-solid fa-cart-plus"></i></span>
  </a>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      quantity: 1,
      Product: this.product,
    };
  },
  computed: {
    ...mapGetters(["authenticated"]),
  },
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
    addBookToCart() {
      if (!this.authenticated) {
        this.$router.push({name : 'Login'});
      } else {
        this.Product['with'] = {'quantity': this.quantity}
        this.addToCart(this.Product);
      }
    },
  },
};
</script>

<style></style>
