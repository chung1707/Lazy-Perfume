<template>
  <Swiper
    class="related-items swiper"
    ref="swiper"
    :slidesPerView="6"
    :spaceBetween="20"
    :loop="true"
    pagination
    v-if="products"
  >
    <!-- :autoplay="autoplay" -->
    <SwiperSlide class="item" v-for="item in products" :key="item.id">
      <router-link
        :to="{ name: 'Product', params: { id: item.id } }"
        class="img-card"
      >
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="front">
              <img
                class="item-img"
                v-if="item.pictures.length > 0"
                :src="imgUrl + item.pictures[0].img"
                alt=""
              />
            </div>
            <div class="back">
              <img
                v-if="item.pictures.length > 1"
                :src="imgUrl + item.pictures[1].img"
                alt=""
              />
            </div>
          </div>
        </div>
      </router-link>
      <div class="info-card">
        <span class="quantity-info" v-if="item.quantity <= 10"
          >Còn {{ item.quantity }} sản phẩm
        </span>
        <span class="discount-info" v-if="item.discount"
          >Giảm {{ item.discount }} %</span
        >
        <addToCart :product="item"></addToCart>

        <router-link
          :to="{ name: 'Product', params: { id: item.id } }"
          class="product-name"
          >{{ item.name }}</router-link
        >
        <p class="thumbnail-price">{{item.price *(100-item.discount)/100 }} <span>VNĐ</span></p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { mapGetters } from "vuex";

import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import "swiper/swiper-bundle.min.css";
import addToCart from "../../components/client/addToCart.vue";

export default {
  computed: {
    ...mapGetters(["imgUrl"]),
  },
  props: {
    products: {
      type: Object,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    addToCart,
  },
  data() {
    return {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    };
  },
};
</script>

<style></style>
