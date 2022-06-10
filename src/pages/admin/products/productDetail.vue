<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="section">
      <h5 class="success" v-if="success">
        <i class="fas fa-check"></i> Sửa đổi thành công!
      </h5>
      <h5 class="fail" v-if="fail">Sửa đổi thất bại. Vui lòng thử lại sau!</h5>
      <div class="container-fluid">
        <div class="wrapper product-page" v-if="product">
          <section class="header-products">
            <h1 class="page-title">{{ product.name }}</h1>
          </section>
          <div class="container product-content">
            <div class="left-content">
              <div class="thumbnails-product" v-if="product.pictures">
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
                <div class="mini-thumbnails" v-if="product.pictures">
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
                <i
                  v-if="product.category.id == 1"
                  class="fa-solid fa-venus"
                ></i>
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
                <div class="quantity-box">
                  <input type="number" v-model="quantity" />
                  <a @click.prevent="increase()">
                    <i class="fa-solid fa-plus plus"></i>
                  </a>
                  <a @click.prevent="reduce()">
                    <i class="fa-solid fa-minus minus"></i>
                  </a>
                </div>
                <button class="button" @click="setNewQuantity">
                  sửa số lượng
                </button>
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
                          <li
                            v-for="sc in productDetail.fragrant.scent"
                            :key="sc"
                          >
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
                            v-for="middleNote in productDetail.fragrant
                              .middleNotes"
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
                              v-bind:style="{
                                width: productDetail.spring + '%',
                              }"
                            ></span>
                          </div>
                        </div>
                        <div class="range-rcm">
                          <span class="rcm-name">Mùa hè</span>
                          <div class="rcm-range">
                            <span
                              v-bind:style="{
                                width: productDetail.summer + '%',
                              }"
                            ></span>
                          </div>
                        </div>
                        <div class="range-rcm">
                          <span class="rcm-name">Mùa thu</span>
                          <div class="rcm-range">
                            <span
                              v-bind:style="{
                                width: productDetail.fall + '%',
                              }"
                            ></span>
                          </div>
                        </div>
                        <div class="range-rcm">
                          <span class="rcm-name">Mùa đông</span>
                          <div class="rcm-range">
                            <span
                              v-bind:style="{
                                width: productDetail.winter + '%',
                              }"
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
                              v-bind:style="{
                                width: productDetail.daytime + '%',
                              }"
                            ></span>
                          </div>
                        </div>
                        <div class="range-rcm">
                          <span class="rcm-name">Ban đêm</span>
                          <div class="rcm-range">
                            <span
                              v-bind:style="{
                                width: productDetail.night + '%',
                              }"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="action">
                <button @click.prevent="$router.back()" class="button">
                  Quay lại
                </button>
                <router-link
                  :to="{
                    name: 'AdminProductChange',
                    params: { id: this.product.id },
                  }"
                  class="button"
                  >Sửa thông tin</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
    </section>
  </main>
</template>

<script>
import baseRequest from "../../../base/baseRequest";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["imgUrl"]),
  },
  data() {
    return {
      product: null,
      productDetail: null,
      tabActive: 1,
      quantity: 0,
      image1: true,
      success: false,
      fail: false,
      supplier: {},
      saveIncense: [
        { id: 1, saving: [3, 4, 5, 1, 2] },
        { id: 2, saving: [6, 7] },
        { id: 3, saving: [8, 9, 10, 11] },
        { id: 4, saving: [12, 13, 14, 15] },
      ],
    };
  },
  methods: {
    setNewQuantity() {
      baseRequest
        .post("admin/updateQty/product/" + this.product.id, {
          quantity: this.quantity,
        })
        .then(() => {
          this.success = true;
        })
        .catch(() => {
          this.fail = true;
        });
    },

    increase() {
      if (this.quantity == 100000) return this.quantity;
      return this.quantity++;
    },
    reduce() {
      if (this.quantity == 0) return this.quantity;
      return this.quantity--;
    },
    getProduct() {
      baseRequest
        .get("admin/product/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.supplier =
            response.data.supplier != null
              ? response.data.supplier
              : {};
          this.quantity = response.data.quantity;
          this.productDetail = response.data.product_detail;
          this.$isLoading(false);
        });
    },
  },
  watch: {
    quantity() {
      if (this.quantity > 100000) return (this.quantity = 100000);
      if (this.quantity < 0) return (this.quantity = 0);
    },
    $route() {
      this.$isLoading(true);
      this.getProduct();
    },
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
    fail() {
      setTimeout(() => (this.fail = false), 1500);
    },
  },
  mounted() {
    this.$isLoading(true);
    this.getProduct();
  },
};
</script>

<style scoped>
.quantity {
  margin-top: 50px;
}
.header-products,
.wrapper,
.product-page {
  margin-top: 0px !important;
}
</style>
