<template>
  <section class="wrapper">
    <div class="container">
      <div class="why-lp">
        <h3 class="title-section">Tại sao chọn Lazy Perfume</h3>
        <div class="reasons">
          <swiper
            class="swiper"
            ref="swiper"
            :spaceBetween="50"
                        :autoplay="autoplay"
x          >
            <!-- :allowTouchMove="false" -->

            <swiper-slide
              class="why_slide"
              v-for="policy in policies"
              :key="policy"
            >
              <div class="reason">
                <img
                  :src="imgUrl + policy.logo"
                  alt=""
                />
                <h5 class="reason-title">{{policy.title}}</h5>
                <p class="reason-description">
                  {{policy.content}}
                </p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import "swiper/swiper-bundle.min.css";
import baseRequest from "../../base/baseRequest"
import { mapGetters } from "vuex";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
    computed: {
    ...mapGetters(["imgUrl"]),
  },
  data() {
    return {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      policies: [],
    };
  },
  methods: {
    getPolices(){
      baseRequest.get('polices').then(response => {
        this.policies = response.data.policies;
      })
    }
  },
  mounted() {
    this.getPolices();
  }
};
</script>

<style lang="scss" scoped>
// .slide-product-card-item {
//   max-width: 30%;
// }
// .why_slide{
//   width: 30% !important; 
// }
// .swiper-container {
//   max-width: 1200px !important;
// }
</style>
