<template>
  <!-- slide Product -->
  <section class="wrapper wrapper-slide-product brand">
    <div class="container">
      <div>
        <h2 class="title-section">Thương hiệu nổi tiếng</h2>
      </div>
      <div class="slide-product-card-for-him">
        <swiper
          class="swiper"
          ref="swiper"
          :slidesPerView="6"
          :spaceBetween="30"
          :loop="true"
          pagination
          :autoplay="autoplay"
        >
          <swiper-slide
            class="slide-brand-item"
            v-for="brand in listBrand"
            :key="brand.id"
          >
            <a href="#" class="logo-img">
              <img :src="require('@/assets/images/' + brand.images[0])" />
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import "swiper/swiper-bundle.min.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
      breakpoints: {
        1220: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
      listBrand: [
        {
          id: 1,
          images: ["brand1.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 2,

          images: ["brand2.png"],
          name: "Kilian Black Phantom 1 sadasnj",
        },
        {
          id: 3,

          images: ["brand3.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 4,
          images: ["brand4.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 5,

          images: ["brand5.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 6,

          images: ["brand6.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 7,

          images: ["brand7.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 7,

          images: ["brand8.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 7,

          images: ["brand9.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 7,

          images: ["brand10.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 7,

          images: ["brand11.png"],
          name: "Kilian Black Phantom 1",
        },
        {
          id: 7,

          images: ["brand12.png"],
          name: "Kilian Black Phantom 1",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  text-align: -webkit-center;
}
.logo-img {
  width: 300px;
  text-align: center;
  img {
    margin-top: 0px;
    width: 200px;
    height: 200px;
    object-fit: contain;
    object-position: center;
    border: 1px solid grey;
    padding: 15px;
    border-radius: 15px;
  }
}
</style>
