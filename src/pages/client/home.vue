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
        <a class="button" href="#">Khám phá!</a>
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
            :class="{ hidden: !glassesForHim, visible: glassesForHim }"
          ></div>
          <a href="#">
            <img src="../../assets/images/for-him.jpg" alt="" />
            <div>
              <span>Nước hoa Nam</span>
              <span><i class="fa-solid fa-right-long"></i></span>
            </div>
          </a>
        </div>
        <div
          class="for-her"
          @mouseover="glassesForHer = true"
          @mouseout="glassesForHer = false"
        >
          <div
            class="glasses"
            :class="{ hidden: !glassesForHer, visible: glassesForHer }"
          ></div>
          <a href="#">
            <img src="../../assets/images/for-her.jpg" alt="" />
            <div>
              <span>Nước hoa Nữ</span>
              <span><i class="fa-solid fa-right-long"></i></span>
            </div>
          </a>
        </div>
      </div>
    </section>
    
    <!-- latest-products -->
    <productSlider></productSlider>
  </main>
</template>

<script>
import productSlider from "../../components/client/productSlider.vue";
export default {
  components: {
    productSlider
  },
  setup() {},
  data() {
    return {
      glassesForHim: false,
      glassesForHer: false,
    };
  },
};
</script>

<style></style>
