<template>
  <main class="wrapper product-page" v-if="product">
    <section class="header-products">
      <h1 class="page-title">{{ product.name }}</h1>
    </section>
    <section class="wrapper main-product">
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <router-link class="link" to="/products">Sản phẩm</router-link>
          <span class="seperate">/</span>
          <span>{{ product.name }}</span>
        </div>
      </div>
      <div class="container product-content">
        <div class="left-content">
          <div class="thumbnails-product">
            <img
              :class="{
                visible: image1 == true,
                dispay_hidden: image1 == false,
              }"
              v-if="product.pictures.length > 0"
              :src="imgUrl + product.pictures[0].img"
              alt="product image"
            />
            <img
              :class="{
                visible: image1 == false,
                dispay_hidden: image1 == true,
              }"
              v-if="product.pictures.length > 1"
              :src="imgUrl + product.pictures[1].img"
              alt="product image"
            />
            <div class="mini-thumbnails">
              <a href="#" @click.prevent="image1 = true">
                <img
                  v-if="product.pictures.length > 0"
                  :src="imgUrl + product.pictures[0].img"
                  alt="product image"
                />
              </a>
              <a href="#" @click.prevent="image1 = false">
                <img
                  v-if="product.pictures.length > 1"
                  :src="imgUrl + product.pictures[1].img"
                  alt="product image"
                />
              </a>
            </div>
          </div>
          <div class="description-product">
            <h5>Mô tả</h5>
            <p>
              {{ productDetail.description }}
            </p>
          </div>
        </div>
        <div class="right-content">
          <h4>{{ supplier.name }}</h4>
          <h3>{{ product.name }}</h3>
          <span class="gen" v-if="product.category">
            <i v-if="product.category.id == 1" class="fa-solid fa-venus"></i>
            <i v-if="product.category.id == 2" class="fa-solid fa-mars"></i>
            <i
              v-if="product.category.id == 3"
              class="fa-solid fa-mars-and-venus"
            ></i>
            {{ product.category.name }}
          </span>
          <span class="price price-item line-through" v-if="product.discount"
            >{{ (product.price * 100) / 100 }} VNĐ
          </span>
          <span style="color: red" class="price" v-if="product.discount">
            -{{ product.discount }} %</span
          >
          <span class="price new-price"
            >{{ ((100 - product.discount) * product.price) / 100 }}VNĐ
          </span>
          <div class="quantity">
            <div class="quantity-box" v-if="product.quantity > 0">
              <input type="number" v-model="quantity" />
              <a @click.prevent="increase()">
                <i class="fa-solid fa-plus plus"></i>
              </a>
              <a @click.prevent="reduce()">
                <i class="fa-solid fa-minus minus"></i>
              </a>
            </div>

            <button
              class="button"
              @click="addProductToCart"
              v-if="product.quantity > 0"
            >
              Thêm vào giỏ hàng
            </button>
            <button class="button" disabled v-else>Hết hàng</button>
          </div>
          <div class="featured">
            <div class="tabs">
              <a @click.prevent="tabActive = 1">Mùi hương</a>
              <a @click.prevent="tabActive = 2">Đặc điểm</a>
              <a @click.prevent="tabActive = 3">Khuyên dùng</a>
            </div>
            <div class="tab-content">
              <div
                class="fragrant-tab dispay_hidden"
                :class="{ visible: tabActive == 1 }"
              >
                <ul>
                  <li class="tab-item">
                    <span>Mùi hương</span>
                    <ul>
                      <li v-for="sc in productDetail.fragrant.scent" :key="sc">
                        {{ sc }}
                      </li>
                    </ul>
                  </li>
                  <li class="tab-item">
                    <span>Hương đầu</span>
                    <ul>
                      <li
                        v-for="topNote in productDetail.fragrant.topNotes"
                        :key="topNote"
                      >
                        {{ topNote }}
                      </li>
                    </ul>
                  </li>
                  <li class="tab-item">
                    <span>Hương giữa</span>
                    <ul>
                      <li
                        v-for="middleNote in productDetail.fragrant.middleNotes"
                        :key="middleNote"
                      >
                        {{ middleNote }}
                      </li>
                    </ul>
                  </li>
                  <li class="tab-item">
                    <span>Hương cuối</span>
                    <ul>
                      <li
                        v-for="base in productDetail.fragrant.baseNote"
                        :key="base"
                      >
                        {{ base }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div
                class="features-tab dispay_hidden"
                :class="{ visible: tabActive == 2 }"
              >
                <ul>
                  <li class="tab-item">
                    <span class="item-title">Dung tích</span>
                    <span>{{ product.capacity }} ml</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title">Phát hành:</span>
                    <span>{{ productDetail.release }}</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title">Giới tính:</span>
                    <span v-if="product.category">{{
                      product.category.name
                    }}</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title">Nồng độ:</span>
                    <span v-if="product.category">{{
                      productDetail.concentration
                    }}</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title">Độ tuổi:</span>
                    <span>{{ productDetail.age }}</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title"> Độ lưu mùi:</span>
                    <div class="saving">
                      <div
                        v-for="it in saveIncense"
                        :key="it"
                        :class="{
                          bg_blue: it.saving.includes(
                            productDetail.saveIncense
                          ),
                        }"
                      >
                        <span class="number">{{ it.saving[0] }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                class="recommended-tab dispay_hidden"
                :class="{ visible: tabActive == 3 }"
              >
                <div class="season">
                  <span class="item-title">Mùa</span>
                  <div class="rcm-box">
                    <div class="range-rcm">
                      <span class="rcm-name">Mùa xuân</span>
                      <div class="rcm-range">
                        <span
                          v-bind:style="{ width: productDetail.spring + '%' }"
                        ></span>
                      </div>
                    </div>
                    <div class="range-rcm">
                      <span class="rcm-name">Mùa hè</span>
                      <div class="rcm-range">
                        <span
                          v-bind:style="{ width: productDetail.summer + '%' }"
                        ></span>
                      </div>
                    </div>
                    <div class="range-rcm">
                      <span class="rcm-name">Mùa thu</span>
                      <div class="rcm-range">
                        <span
                          v-bind:style="{ width: productDetail.fall + '%' }"
                        ></span>
                      </div>
                    </div>
                    <div class="range-rcm">
                      <span class="rcm-name">Mùa đông</span>
                      <div class="rcm-range">
                        <span
                          v-bind:style="{ width: productDetail.winter + '%' }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="times">
                  <span class="item-title">Thời điểm</span>
                  <div class="rcm-box">
                    <div class="range-rcm">
                      <span class="rcm-name">Ban ngày</span>
                      <div class="rcm-range">
                        <span
                          v-bind:style="{ width: productDetail.daytime + '%' }"
                        ></span>
                      </div>
                    </div>
                    <div class="range-rcm">
                      <span class="rcm-name">Ban đêm</span>
                      <div class="rcm-range">
                        <span
                          v-bind:style="{ width: productDetail.night + '%' }"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="wrapper related-product">
      <h2 class="title-section">Sản phảm liên quan</h2>
      <relatedProducts :products="relatedProducts"></relatedProducts>
    </section>
    <whyLP></whyLP>
  </main>
</template>

<script>
import relatedProducts from "../../components/client/relatedProducts.vue";
import whyLP from "../../components/client/whyLP.vue";
import baseRequest from "../../base/baseRequest";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    relatedProducts,
    whyLP,
  },
  computed: {
    ...mapGetters(["imgUrl", "authenticated"]),
  },
  data() {
    return {
      product: null,
      relatedProducts: {},
      productDetail: null,
      tabActive: 1,
      supplier: {},
      image1: true,
      quantity: 1,
      saveIncense: [
        { id: 1, saving: [3, 4, 5, 1, 2] },
        { id: 2, saving: [6, 7] },
        { id: 3, saving: [8, 9, 10, 11] },
        { id: 4, saving: [12, 13, 14, 15] },
      ],
    };
  },
  methods: {
    ...mapActions(["addToCart"]),
    addProductToCart() {
      if (!this.authenticated) {
        this.$router.push({ name: "Login" });
      } else {
        this.product["with"] = { quantity: this.quantity };
        this.addToCart(this.product);
      }
    },
    increase() {
      if (this.quantity == this.product.quantity) return this.quantity;
      return this.quantity++;
    },
    reduce() {
      if (this.quantity == 1) return this.quantity;
      return this.quantity--;
    },
    getProduct() {
      this.$isLoading(true);
      baseRequest.get("product/" + this.$route.params.id).then((response) => {
        this.product = response.data.product;
        this.supplier =
          response.data.product.supplier != null
            ? response.data.product.supplier
            : {};
        this.relatedProducts = response.data.relatedProducts;
        this.productDetail = this.product.product_detail;
      }).finally(() =>{
        setTimeout(() => this.$isLoading(false), 1000);
      });
    },
  },
  watch: {
    $route() {
      this.getProduct();
    },
    quantity() {
      if (this.quantity > this.product.quantity)
        return (this.quantity = this.product.quantity);
      if (this.quantity < 1) return (this.quantity = 1);
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.quantity {
  margin-top: 50px;
}
</style>
