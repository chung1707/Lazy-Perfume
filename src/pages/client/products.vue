<template>
  <main class="products-page">
    <section class="wrapper header-products">
      <h1 class="page-title" v-if="1 < 2">Shop</h1>
      <h1 v-else>Dior Sauvage</h1>
    </section>
    <section class="wrapper main-products">
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <span>Sản phẩm</span>
        </div>
      </div>
      <div class="container">
        <div class="products-content">
          <!-- products-filter -->
          <div class="product-filter">
            <div class="brands">
              <h5 class="filter-title">Thương hiệu</h5>
              <input type="text" placeholder="Tìm kiếm..." />
              <ul class="brand-list">
                <li v-for="brand in brands" :key="brand.id">
                  <a href="#">{{ brand.name }}</a>
                </li>
              </ul>
            </div>
            <div class="gender">
              <h5 class="filter-title">Giới tính</h5>
              <ul>
                <li
                  v-for="gen in gender"
                  :key="gen.id"
                  @click="selectGender(gen.id)"
                >
                  <div class="div-checkbox">
                    <i
                      :class="{ visible: this.filterSelected.genderId == gen.id }"
                      class="dispay_hidden fa-solid fa-check"
                    ></i>
                  </div>
                  <label>{{ gen.name }} </label>
                </li>
              </ul>
            </div>
            <div class="seasons">
              <h5 class="filter-title">Mùa</h5>

              <ul class="seasons-filter">
                <li 
                v-for="season in seasons" 
                :key="season.id"
                @click="selectSeason(season.id)"
                >
                  <div class="div-checkbox">
                    <i
                      :class="{ visible: this.filterSelected.seasonId == season.id }"
                      class="dispay_hidden fa-solid fa-check"
                    ></i>
                  </div>
                  <label>{{ season.name }} </label>
                </li>
              </ul>
            </div>
            <div class="price-filter">
              <h5 class="filter-title">Giá</h5>

              <ul class="priceRange">
                <li 
                v-for="range in priceRange" 
                :key="range.id"
                @click="selectRangePrice(range.id)"
                >
                  <div class="div-checkbox">
                    <i
                      :class="{ visible: this.filterSelected.priceRangeId == range.id }"
                      class="dispay_hidden fa-solid fa-check"
                    ></i>
                  </div>
                  <label>{{ range.name }} </label>
                </li>
              </ul>
            </div>
          </div>
          <!-- product-list -->
          <div class="product-list">
            <div class="arrange-result">
              <p class="result">Hiển thị: 1-16 trên tổng: 300 sản phẩm</p>
              <div class="arrange">
                <span
                @click="arrangeActive = !arrangeActive"
                >{{ arrangeKey }} <i class="fa-solid fa-caret-down"></i></span>
                <ul 
                :class="{dispay_hidden: !arrangeActive, visible: arrangeActive}"
                class="arrange-key-list">
                  <i class="fa-solid fa-caret-down"></i>
                  <li v-for="key in arrange" :key="key.id"
                  @click="setArrangKey(key)"
                  >
                    {{ key.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item-list">
              <div class="item" v-for="item in products" :key="item.id">
                <a href="#" class="img-card">
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="front">
                        <img
                          class="item-img"
                          :src="require('@/assets/images/' + item.images[0])"
                          alt=""
                        />
                      </div>
                      <div class="back">
                        <img
                          :src="require('@/assets/images/' + item.images[1])"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </a>
                <div class="info-card">
                  <span class="quantity-info" v-if="item.quantity">Còn 10 sản phẩm </span>
                  <span class="discount-info" v-if="!item.discount">Giảm 10%</span>
                  <a class="add-to-cart">
                    Thêm vào giỏ hàng
                    <span><i class="fa-solid fa-cart-plus"></i></span>
                  </a>
                  <p class="product-name">{{ item.name }}</p>
                  <p class="thumbnail-price">
                    {{ item.price }} <span>VNĐ</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      arrangeKey: "Mới nhất",
      arrangeActive: false,
      filterSelected: 
        {
          genderId: null,
          seasonId: null,
          priceRangeId: null, 
        },

      products: [
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
          name: "Kilian Black Phantom 1 sadasnj",
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
        {
          id: 6,

          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 7,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 8,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 9,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 10,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 11,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
        {
          id: 12,
          images: ["for-him.jpg", "for-her.jpg"],
          name: "Kilian Black Phantom 1",
          price: 7500000,
          quantity: 20,
          discount: 0,
        },
      ],
      brands: [
        { name: "amouage", id: 1 },
        { name: "dior", id: 2 },
        { name: "creed", id: 3 },
        { name: "arrazo", id: 4 },
        { name: "chanel", id: 5 },
        { name: "le labo", id: 6 },
        { name: "guerlain", id: 7 },
        { name: "hermes", id: 8 },
        { name: "prada", id: 9 },
        { name: "nishane", id: 10 },
        { name: "nautica", id: 11 },
      ],
      gender: [
        { name: "Nam", id: 1 },
        { name: "Nữ", id: 2 },
        { name: "Unisex", id: 3 },
      ],
      seasons: [
        { name: "Spring", id: 1 },
        { name: "Summer", id: 2 },
        { name: "Fall", id: 3 },
        { name: "Winter", id: 4 },
      ],
      priceRange: [
        { name: "0-1.000.000", id: 1 },
        { name: "1.000.000 - 3.000.000", id: 2 },
        { name: "3.000.000 - 5.000.000", id: 3 },
        { name: "> 5.000.000", id: 4 },
      ],
      arrange: [
        { name: "Mới nhất", id: 1 },
        { name: "Thứ tự theo giá: Từ thấp đến cao", id: 2 },
        { name: "Thứ tự theo giá: Từ cao đến thấp", id: 3 },
        { name: "Theo mức độ phổ biến", id: 4 },
      ],
    };
  },
  methods: {
    selectGender(id) {
      if (this.filterSelected.genderId == id) {
        return (this.filterSelected.genderId = null);
      }
      this.filterSelected.genderId= id;
    },
    selectSeason(id) {
      if (this.filterSelected.seasonId == id) {
        return (this.filterSelected.seasonId = null);
      }
      this.filterSelected.seasonId= id;
    },
    selectRangePrice(id) {
      if (this.filterSelected.priceRangeId == id) {
        return (this.filterSelected.priceRangeId = null);
      }
      this.filterSelected.priceRangeId= id;
    },
    setArrangKey(key){
      this.arrangeKey = key.name;
      this.arrangeActive = false;
    }
  },
};
</script>

<style></style>
