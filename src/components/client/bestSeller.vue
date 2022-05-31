<template>
  <!-- slide Product -->
  <section class="wrapper wrapper-slide-product best-seller">
    <div class="container">
      <div>
        <h2 class="title-section">Sản phẩm bán chạy nhất</h2>
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
          <!-- :autoplay="autoplay" -->
          <swiper-slide
            class="slide-product-card-item"
            v-for="itemForHim in bestSellersMale"
            :key="itemForHim.id"
          >
            <router-link
              :to="{ name: 'Product', params: { id: itemForHim.id } }"
              class="img-card"
            >
              <div class="flip-card">
                <div class="flip-card-inner" v-if="itemForHim.pictures">
                  <div class="front">
                    <img
                      v-if="itemForHim.pictures.length > 0"
                      :src="imgUrl + itemForHim.pictures[0].img"
                      alt=""
                    />
                  </div>
                  <div class="back" v-if="itemForHim.pictures[1]">
                    <img
                      v-if="itemForHim.pictures.length > 1"
                      :src="imgUrl + itemForHim.pictures[1].img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </router-link>
            <div class="info-card">
              <span class="quantity-info" v-if="itemForHim.quantity <= 10"
                >Còn {{ itemForHim.quantity }} sản phẩm
              </span>
              <span class="discount-info" v-if="itemForHim.discount"
                >Giảm {{itemForHim.quantity}}%</span
              >
              <addToCart :product="itemForHim"></addToCart>

              <router-link
                :to="{ name: 'Product', params: { id: itemForHim.id } }"
                class="product-name"
                >{{ itemForHim.name }}</router-link
              >
              <p class="thumbnail-price">
                {{  itemForHim.price *(100-itemForHim.discount)/100 }} <span>VNĐ</span>
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
            v-for="itemForHer in bestSellersFemale"
            :key="itemForHer.id"
          >
            <router-link
              :to="{ name: 'Product', params: { id: itemForHer.id } }"
              class="img-card"
            >
              <div class="flip-card">
                <div class="flip-card-inner" v-if="itemForHer.pictures">
                  <div class="front">
                    <img
                      v-if="itemForHer.pictures.length > 0"
                      :src="imgUrl + itemForHer.pictures[0].img"
                    />
                  </div>
                  <div class="back" v-if="itemForHer.pictures[1]">
                    <img
                      v-if="itemForHer.pictures.length > 1"
                      :src="imgUrl + itemForHer.pictures[1].img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </router-link>
            <div class="info-card">
              <span class="quantity-info" v-if="itemForHer.quantity <= 10"
                >Còn {{itemForHer.quantity}} sản phẩm
              </span>
              <span class="discount-info" v-if="itemForHer.discount"
                >Giảm {{itemForHer.discount}}%</span
              >
              <addToCart :product="itemForHer"></addToCart>

              <router-link
                :to="{ name: 'Product', params: { id: itemForHer.id } }"
                class="product-name"
                >{{ itemForHer.name }}</router-link
              >
              <p class="thumbnail-price">
                {{ itemForHer.price *(100-itemForHer.discount)/100 }} <span>VNĐ</span>
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
import { mapActions, mapGetters } from "vuex";
import addToCart from "../../components/client/addToCart.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    addToCart,
  },
  computed: {
    ...mapGetters(["bestSellersMale", "bestSellersFemale", "imgUrl"]),
  },
  data() {
    return {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      forHim: true,
      forHer: false,
    };
  },
  methods: {
    ...mapActions(["setBestSellers"]),
    activeForHim() {
      this.forHim = true;
      this.forHer = false;
    },
    activeForHer() {
      this.forHim = false;
      this.forHer = true;
    },
  },
  mounted() {
    this.setBestSellers();
  },
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
