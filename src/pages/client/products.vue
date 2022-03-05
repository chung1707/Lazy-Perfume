<template>
  <swiper
    :modules="modules"
    :slides-per-view="3"
    :space-between="10"
   
  >
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="../../assets/images/for-him.jpg" alt=""></swiper-slide>
    ...
  </swiper>
</template>
<script>
  // import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles 
  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
  };
</script>
<style scoped>

</style>
