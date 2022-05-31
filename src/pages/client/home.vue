<template>
  <main>
    <!-- header video -->
    <section class="wrapper wrapper-main">
      <div class="header-video">
        <video autoplay loop muted plays-inline>
          <source src="../../assets/images/videos/video-header.mp4" />
        </video>
      </div>
      <div class="hero">
        <h2>New collection <span>Lazy Perfume</span></h2>
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
          <router-link
                    :to="{ name: 'Products', params: { categoryId: 1 } }"
          >
            <img src="../../assets/images/for-him.jpg" alt="" />
            <div>
              <span>Nước hoa Nam</span>
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
          <router-link
                    :to="{ name: 'Products', params: { categoryId: 2 } }"
          >
            <img src="../../assets/images/for-her.jpg" alt="" />
            <div>
              <span>Nước hoa Nữ</span>
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

export default {
  components: {
    latestProducts,
    bestSeller,
    brand,
    whyLP,
  },
  setup() {},
  data() {
    return {
      glassesForHim: false,
      glassesForHer: false,
    };
  },
  mounted() {
    this.$isLoading(false);
  },
};
</script>

<style></style>
