<template>
  <Swiper
    class="related-items swiper"
    ref="swiper"
    :slidesPerView="6"
    :spaceBetween="20"
    :loop="true"
    pagination
    :autoplay="autoplay"
  >
    <SwiperSlide class="item" v-for="item in relatedProduct" :key="item.id">
      <router-link to="/product" class="img-card">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="front">
              <img
                class="item-img"
                :src="require('@/assets/images/' + item.images[0])"
                alt=""
              />
            </div>
            <div class="back">
              <img :src="require('@/assets/images/' + item.images[1])" alt="" />
            </div>
          </div>
        </div>
      </router-link>
      <div class="info-card">
        <span class="quantity-info" v-if="item.quantity">Còn 10 sản phẩm </span>
        <span class="discount-info" v-if="!item.discount">Giảm 10%</span>
        <a class="add-to-cart">
          Thêm vào giỏ hàng
          <span><i class="fa-solid fa-cart-plus"></i></span>
        </a>
        <p class="product-name">{{ item.name }}</p>
        <p class="thumbnail-price">{{ item.price }} <span>VNĐ</span></p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import "swiper/swiper-bundle.min.css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      relatedProduct: [
        {
          id: 1,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 2,

          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1 sadasnj",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 3,

          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 4,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 5,

          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 6,

          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
      ],
    };
  },
};
</script>

<style></style>
