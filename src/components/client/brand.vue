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
            v-for="logo in brandLogos"
            :key="logo.id"
          >
            <a href="#" class="logo-img">
              <img :src="imgUrl + logo.logo" />
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import "swiper/swiper-bundle.min.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters(["brandLogos", "imgUrl"]),
  },
  data() {
    return {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      // breakpoints: {
      //   1220: {
      //     slidesPerView: 4,
      //     spaceBetween: 40,
      //   },
      //   768: {
      //     slidesPerView: 3,
      //     spaceBetween: 30,
      //   },
      //   640: {
      //     slidesPerView: 2,
      //     spaceBetween: 20,
      //   },
      //   320: {
      //     slidesPerView: 1,
      //     spaceBetween: 10,
      //   },
      // },
    };
  },
  methods: {
    ...mapActions(["setBrandLogos"]),
  },
  mounted() {
    this.setBrandLogos();
  },
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
