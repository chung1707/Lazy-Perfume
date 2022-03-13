<template>
  <!-- slide Product -->
  <section class="wrapper wrapper-slide-product">
    <div class="container">
      <div>
        <h2 class="title-section">Sản phẩm mới nhất</h2>
        <div class="tabs7">
          <div
            class="tab-item"
            :class="{ active: forHim }"
            @click="activeForHim"
          >
            Nước hoa nam
          </div>
          <div
            class="tab-item"
            :class="{ active: forHer }"
            @click="activeForHer"
          >
            Nước hoa nữ
          </div>
        </div>
      </div>

      <div class="slide-product-card-for-him" v-if="forHim">
        <swiper
          class="swiper"
          ref="swiper"
          :slidesPerView="4"
          :spaceBetween="30"
          :loop="true"
          navigation
          pagination
        >
          <swiper-slide
            class="slide-product-card-item"
            v-for="itemForHim in listForHim"
            :key="itemForHim.id"
          >
           <router-link to="/product" class="img-card">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="front">
                    <img
                      :src="require('@/assets/images/' + itemForHim.images[0])"
                    />
                  </div>
                  <div class="back">
                    <img
                      :src="require('@/assets/images/' + itemForHim.images[1])"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </router-link>
            <div class="info-card">
              <span class="quantity-info" v-if="itemForHim.quantity"
                >Còn 10 sản phẩm
              </span>
              <span class="discount-info" v-if="!itemForHim.discount"
                >Giảm 10%</span
              >
              <a class="add-to-cart">
                Thêm vào giỏ hàng
                <span><i class="fa-solid fa-cart-plus"></i></span>
              </a>
              <p class="product-name">{{ itemForHim.name }}</p>
              <p class="thumbnail-price">
                {{ itemForHim.price }} <span>VNĐ</span>
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="slide-product-card-for-her" v-else>
        <swiper
          class="swiper"
          ref="swiper"
          :slidesPerView="4"
          :spaceBetween="30"
          :loop="true"
          navigation
          pagination
        >
          <swiper-slide
            class="slide-product-card-item"
            v-for="itemForHer in listForHer"
            :key="itemForHer.id"
          >
            <a href="#" class="img-card">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="front">
                    <img
                      :src="require('@/assets/images/' + itemForHer.images[0])"
                      alt=""
                    />
                  </div>
                  <div class="back">
                    <img
                      :src="require('@/assets/images/' + itemForHer.images[1])"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </a>
            <div class="info-card">
              <span class="quantity-info" v-if="itemForHer.quantity"
                >Còn 10 sản phẩm
              </span>
              <span class="discount-info" v-if="!itemForHer.discount"
                >Giảm 10%</span
              >
              <a class="add-to-cart">
                Thêm vào giỏ hàng
                <span><i class="fa-solid fa-cart-plus"></i></span>
              </a>
              <p class="product-name">{{ itemForHer.name }}</p>
              <p class="thumbnail-price">
                {{ itemForHer.price }} <span>VNĐ</span>
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <router-link to="/products" class="button btn-black"
        >Khám phá tất cả sản phẩm <i class="fa-solid fa-arrow-right"></i
      ></router-link>
    </div>
  </section>
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
      forHim: true,
      forHer: false,
      listForHim: [
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
        {
          id: 7,

          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
      ],

      listForHer: [
        {
          id: 8,

          images: ["for-her.jpg", "for-him.jpg"],
          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 9,

          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 10,
          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 11,

          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 12,

          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 13,

          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 14,

          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 15,

          images: ["for-her.jpg", "for-him.jpg"],

          name: "Tomford Rose Prick",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
      ],
    };
  },
  methods: {
    activeForHim() {
      this.forHim = true;
      this.forHer = false;
    },
    activeForHer() {
      this.forHim = false;
      this.forHer = true;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  text-align: -webkit-center;
}
.container {
  text-align: center;
  margin-bottom: 20px;
}
</style>
