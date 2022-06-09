<template>
  <main>
    <!-- header video -->
    <section class="wrapper wrapper-main" v-if="homeBanner">
      <div class="header-video" v-if="homeBanner.type == 'video'">
        <video autoplay loop muted plays-inline>
          <source :src="imgUrl + homeBanner.banner" />
        </video>
      </div>
      <div
        style=" min-height: 600px"
        class="header-video"
        v-if="homeBanner.type == 'image'"
      >
        <img style="width: 100%" :src="imgUrl + homeBanner.banner" alt="" />
      </div>
      <div class="hero">
        <h2>
          {{ homeBanner.title }} <span>{{ homeBanner.description }}</span>
        </h2>
        <router-link class="button" to="/products">Khám phá!</router-link>
      </div>
    </section>
    <!-- category ban -->
    <section class="wrapper category-ban">
      <div class="container">
        <div
          class="for-him"
          @mouseover="glassesForHim = true"
          @mouseout="glassesForHim = false"
        >
          <div
            class="glasses"
            :class="{ dispay_hidden: !glassesForHim, visible: glassesForHim }"
          ></div>
          <router-link :to="{ name: 'Products', params: { categoryId: 1 } }">
            <img :src="imgUrl + thumbnail1.banner" />
            <div>
              <span>{{ thumbnail1.title }}</span>
              <span><i class="fa-solid fa-right-long"></i></span>
            </div>
          </router-link>
        </div>
        <div
          class="for-her"
          @mouseover="glassesForHer = true"
          @mouseout="glassesForHer = false"
        >
          <div
            class="glasses"
            :class="{ dispay_hidden: !glassesForHer, visible: glassesForHer }"
          ></div>
          <router-link :to="{ name: 'Products', params: { categoryId: 2 } }">
            <img :src="imgUrl + thumbnail2.banner" alt="" />
            <div>
              <span>{{ thumbnail2.title }}</span>

              <span><i class="fa-solid fa-right-long"></i></span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <!-- latest-products -->
    <latestProducts></latestProducts>
    <bestSeller></bestSeller>
    <brand></brand>
    <whyLP></whyLP>
  </main>
</template>

<script>
import latestProducts from "../../components/client/latestProducts.vue";
import bestSeller from "../../components/client/bestSeller.vue";
import brand from "../../components/client/brand.vue";
import whyLP from "../../components/client/whyLP.vue";
import baseRequest from "../../base/baseRequest";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["imgUrl"]),
  },
  components: {
    latestProducts,
    bestSeller,
    brand,
    whyLP,
  },
  data() {
    return {
      glassesForHim: false,
      glassesForHer: false,
      homeBanner: {},
      thumbnail1: {},
      thumbnail2: {},
    };
  },
  methods: {
    getBanners() {
      this.$isLoading(true);
      baseRequest
        .get("get_banners")
        .then((response) => {
          this.homeBanner = response.data.homeBanner;
          this.thumbnail1 = response.data.thumbnail1;
          this.thumbnail2 = response.data.thumbnail2;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
  },
  mounted() {
    this.getBanners();
  },
};
</script>

<style></style>
