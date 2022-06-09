<template>
  <main class="products-page">
    <section class="wrapper header-products">
      <h1 class="page-title" v-if="!brandName">Shop</h1>
      <h1 v-else>{{ brandName }}</h1>
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
                  <a @click.prevent="brandFilter(brand)">{{ brand.name }}</a>
                </li>
              </ul>
            </div>
            <div class="gender">
              <h5 class="filter-title">Giới tính</h5>
              <ul>
                <li
                  v-for="category in categories"
                  :key="category.id"
                  @click="selectCategories(category.id)"
                >
                  <div class="div-checkbox">
                    <a
                      class="dispay_hidden"
                      :class="{
                        visible: this.filterSelected.categoryId == category.id,
                      }"
                    >
                      <i class="fa-solid fa-check"></i>
                    </a>
                  </div>
                  <label>{{ category.name }} </label>
                </li>
              </ul>
            </div>
            <div class="price-filter">
              <h5 class="filter-title">Giá</h5>

              <ul class="priceRange">
                <li
                  v-for="range in priceRange"
                  :key="range.id"
                  @click="selectRangePrice(range)"
                >
                  <div class="div-checkbox">
                    <a
                      class="dispay_hidden"
                      :class="{
                        visible: this.filterSelected.priceRange[0] == range.id,
                      }"
                      v-if="this.filterSelected.priceRange != null"
                    >
                      <i class="fa-solid fa-check"></i>
                    </a>
                  </div>
                  <label>{{ range.name }} </label>
                </li>
              </ul>
            </div>
          </div>
          <!-- product-list -->

          <div class="product-list">
            <div class="arrange-result">
              <p class="result">Tổng: {{ totalProducts }} sản phẩm</p>
              <p v-if="this.keyWord" class="result">
                Kết quả tìm kiếm cho: ' {{ this.keyWord }} '!
              </p>
              <div class="arrange">
                <span @click="arrangeActive = !arrangeActive"
                  >{{ filterSelected.arrangeKey[1] }}
                  <i class="fa-solid fa-caret-down"></i
                ></span>
                <ul
                  :class="{
                    dispay_hidden: !arrangeActive,
                    visible: arrangeActive,
                  }"
                  class="arrange-key-list"
                >
                  <i class="fa-solid fa-caret-down"></i>
                  <li
                    v-for="key in arrange"
                    :key="key.id"
                    @click="setArrangKey(key)"
                  >
                    {{ key.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="product-empty"
              v-if="Object.keys(products).length === 0"
            >
              <p v-if="this.keyWord" class="">Không tìm thấy sản phẩm nào!</p>
              <button class="button" @click="removeFilter">
                Bỏ lọc sản phẩm
              </button>
            </div>
            <div class="item-list">
              <div class="item" v-for="item in products" :key="item.id">
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
                    >còn {{ item.quantity }} sản phẩm
                  </span>
                  <span class="discount-info" v-if="item.discount"
                    >Giảm {{ item.discount }}%</span
                  >
                  <addToCart :product="item"></addToCart>

                  <router-link
                    :to="{ name: 'Product', params: { id: item.id } }"
                    class="product-name"
                    >{{ item.name }}</router-link
                  >
                  <p class="thumbnail-price">
                    {{ (item.price * (100 - item.discount)) / 100 }}
                    <span>VNĐ</span>
                  </p>
                </div>
              </div>
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item" v-if="currentPage > 1">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="currentPage--"
                    tabindex="-1"
                    >Trang trước</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ active: currentPage == page }"
                  v-for="page in totalPage"
                  :key="page"
                >
                  <a
                    v-if="Object.keys(products).length !== 0"
                    class="page-link"
                    @click.prevent="currentPage = page"
                    href="#"
                    >{{ page }}</a
                  >
                </li>
                <li class="page-item" v-if="currentPage < totalPage">
                  <a class="page-link" @click.prevent="currentPage++" href="#"
                    >Trang tiếp</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <whyLP class="why"></whyLP>
  </main>
</template>

<script>
import whyLP from "../../components/client/whyLP.vue";
import baseRequest from "../../base/baseRequest";
import { mapGetters } from "vuex";
import addToCart from "../../components/client/addToCart.vue";

export default {
  components: {
    whyLP,
    addToCart,
  },
  computed: {
    ...mapGetters(["imgUrl"]),
  },
  props: {
    key: {
      type: String,
    },
  },
  data() {
    return {
      arrangeActive: false,
      arrange: [
        { name: "Mới nhất", id: 1 },
        { name: "Thứ tự theo giá: Từ thấp đến cao", id: 2 },
        { name: "Thứ tự theo giá: Từ cao đến thấp", id: 3 },
      ],
      priceRange: [
        { name: "0-1.000.000", id: 1, min: "0", max: "1000000" },
        {
          name: "1.000.000 - 3.000.000",
          id: 2,
          min: "1000000",
          max: "3000000",
        },
        {
          name: "3.000.000 - 5.000.000",
          id: 3,
          min: "3000000",
          max: "5000000",
        },
        { name: "> 5.000.000", id: 4, min: "5000000", max: null },
      ],
      filterSelected: {
        categoryId: null,
        priceRange: null,
        arrangeKey: [1, "Mới nhất"],
        keyWord: null,
        brandId: null,
      },
      products: {},
      totalProducts: 0,
      totalPage: 0,
      currentPage: 1,
      categories: {},
      brands: {},
      active: 1,
      keyWord: null,
      brandName: null,
      category_id: null,
    };
  },
  methods: {
    removeFilter() {
      this.filterSelected.categoryId = null;
      this.filterSelected.priceRange = null;
      this.filterSelected.arrangeKey = [1, "Mới nhất"];
      this.filterSelected.keyWord = null;
      this.filterSelected.brandId = null;
      this.keyWord = null;
      this.category_id = null;
      this.getProducts();
    },
    getProducts() {
      baseRequest
        .get("products?page=" + this.currentPage, this.filterSelected)
        .then((response) => {
          this.products = response.data.data;
          this.totalProducts = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    getCategories() {
      baseRequest.get("getCategories").then((response) => {
        this.categories = response.data;
      });
    },
    getBrands() {
      baseRequest.get("getBrands").then((response) => {
        this.brands = response.data;
      });
    },
    selectCategories(id) {
      if (this.filterSelected.categoryId == id) {
        this.filterSelected.categoryId = null;
        this.getProducts();
        return;
      }
      this.filterSelected.categoryId = id;
      this.getProducts();
    },
    selectRangePrice(range) {
      if (this.filterSelected.priceRange != null) {
        if (this.filterSelected.priceRange.includes(range.id)) {
          this.filterSelected.priceRange = null;
          this.getProducts();
          return;
        }
      }
      this.filterSelected.priceRange = [range.id, range.min, range.max];
      this.getProducts();
    },
    setArrangKey(key) {
      this.filterSelected.arrangeKey = [key.id, key.name];
      this.arrangeActive = false;
      this.getProducts();
    },
    brandFilter(brand) {
      this.brandName = brand.name;
      this.filterSelected.brandId = brand.id;
      this.getProducts();
    },
  },
  watch: {
    currentPage() {
      this.getProducts();
    },
    keyWord() {
      this.filterSelected.keyWord = this.keyWord;
      this.getProducts();
    },
    category_id() {
      this.filterSelected.categoryId = this.category_id;
      this.getProducts();
    },
    $route() {
      this.$isLoading(true);
      this.getProducts();
    },
  },
  mounted() {
    this.$isLoading(true);
    this.keyWord = this.$route.params.key;
    if (this.$route.params.categoryId) {
      this.filterSelected.categoryId = this.$route.params.categoryId;
    }
    this.getProducts();
    this.getBrands();
    this.getCategories();
  },
};
</script>

<style scoped lang="scss">
.button {
  color: black;
}
// .item-list {
//   min-height: 600px;
// }
.why {
  padding-top: 50px;
}
.product-empty {
  padding-top: 200px;
  text-align: center;
  p {
    font-size: 24px;
  }
}
</style>
