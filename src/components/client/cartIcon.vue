<template>
  <div>
    <div class="empty-cart" v-if="!itemsInCart">
      <p>Giỏ hàng của bạn chưa có sản phẩm nào!</p>
    </div>
    <div class="not-empty-cart" v-else>
      <ul class="list-product-in-cart">
        <li v-for="item in itemsInCart" :key="item.id">
          <router-link :to="{ name: 'Product', params: { id: item.id } }">
            <img
              v-if="item.pictures"
              :src="imgUrl + item.pictures[0].img"
              alt="product-in-cart-img"
            />
          </router-link>
          <div class="info-product-in-cart">
            <a href="#" class="product-name">{{ item.name }}</a>
            <span>{{ item.price *(100-item.discount)/100 }} VNĐ</span>
            <span>{{ item.pivot.quantity }}</span>
            <a @click="deleteProductInCart(item)">
              <i
                class="remove-item-in-cart fa-solid fa-xmark close-search-results"
              ></i>
            </a>
          </div>
        </li>
      </ul>
      <p class="total-price-in-cart">
        Tổng cộng: <span>{{ totalPrice }}</span>
      </p>
      <div class="button-in-cart-icon">
        <router-link to="/cart" class="button">Đến giỏ hàng</router-link>
        <router-link to="/checkout" class="button">Thanh toán</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["itemsInCart", "imgUrl", "totalPrice", "totalItemInCart"]),
  },
  methods: {
    ...mapActions(["getCart", "deleteProductInCart"]),
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped></style>
