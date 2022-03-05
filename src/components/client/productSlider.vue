<template>
  <!-- Latest Product -->
  <section class="wrapper wrapper-latest-product">
    <div class="container">
      <div>
        <h2 class="title-section">Sản phẩm mới nhất</h2>
        <div class="tabs7">
          <div class="tab-item active">Nước hoa nam</div>
          <div class="tab-item">Nước hoa nữ</div>
        </div>
      </div>

      <div class="latest-product-card-for-him" v-if="1 < 2">
          <div
            class="latest-product-card-item"
            v-for="itemForHim in listForHim"
            :key="itemForHim.id"
          >
            <a href="#" class="img-card">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="front">
                    <img src="@/assets/images/for-him.jpg" alt="" />
                  </div>
                  <div class="back">
                    <img
                      :src="require('@/assets/images/' + itemForHim.images[1])"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </a>
            <div class="info-card">
              <span v-if="itemForHim.quantity < 10">Còn 5 sản phẩm </span>
              <span v-if="itemForHim.discount > 0">Giảm 10%</span>
              <p>
                Thêm vào giỏ hàng
                <span><i class="fa-solid fa-cart-plus"></i></span>
              </p>
              <p>{{ itemForHim.name }}</p>
              <p>{{ itemForHim.price }} <span>VNĐ</span></p>
            </div>
          </div>
      </div>

      <div class="latest-product-card-for-her" v-else>
        <div
          class="latest-product-card-item"
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
            <span v-if="itemForHer.quantity < 10">Còn 5 sản phẩm </span>
            <span v-if="itemForHer.discount > 0">Giảm 10%</span>
            <p>
              Thêm vào giỏ hàng
              <span><i class="fa-solid fa-cart-plus"></i></span>
            </p>
            <p>{{ itemForHer.name }}</p>
            <p>{{ itemForHer.price }} <span>VNĐ</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  components: {  },
  data() {
    return {
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
          name: "Kilian Black Phantom 1",
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
      ],

      listForHer: [
        {
          id: 6,

          images: ["for-her.jpg", "for-hhim.jpg"],
          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 7,

          images: ["for-her.jpg", "for-hhim.jpg"],

          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 8,
          images: ["for-her.jpg", "for-hhim.jpg"],

          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 9,

          images: ["for-her.jpg", "for-hhim.jpg"],

          name: "Tomford Rose Prick",

          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 10,

          images: ["for-her.jpg", "for-hhim.jpg"],

          name: "Tomford Rose Prick",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
      ],
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.wrapper-latest-product {
  padding: 30px 0px;
  h2 {
    margin-bottom: 30px;
  }
}
.latest-product-card {
  &-for-him,
  &-for-her {
    margin-top: 30px;
  }
  &-item {
  }
}
</style>
