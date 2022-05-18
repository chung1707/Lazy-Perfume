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
              <div class="thumbnails-product">
                <img
                  v-if="product.pictures"
                  :class="{
                    visible: image1 == true,
                    dispay_hidden: image1 == false,
                  }"
                  :src="imgUrl + product.pictures[0].img"
                  alt="product image"
                />
                <img
                  v-if="product.pictures[1]"
                  :class="{
                    visible: image1 == false,
                    dispay_hidden: image1 == true,
                  }"
                  :src="imgUrl + product.pictures[1].img"
                  alt="product image"
                />
                <div class="mini-thumbnails">
                  <a href="#" @click.prevent="image1 = true">
                    <img
                      :src="imgUrl + product.pictures[0].img"
                      alt="product image"
                    />
                  </a>
                  <a href="#" @click.prevent="image1 = false">
                    <img
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
              <h4>{{ product.supplier.name }}</h4>
              <h3>{{ product.name }}</h3>
              <span class="gen">
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
              <span class="price">{{ product.price }} VND</span>
              <div class="quantity">
                <div class="quantity-box">
                  <input
                    type="number"
                    v-model="product.quantity"
                    @change="check()"
                  />
                  <i @click="increase()" class="fa-solid fa-plus plus"></i>
                  <i
                    v-if="this.product.quantity > 1"
                    @click="reduce()"
                    class="fa-solid fa-minus minus"
                  ></i>
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
                        <span>{{ product.category.name }}</span>
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
                              bg_blue: productDetail.saveIncense == it.saving,
                            }"
                          >
                            <span class="number">{{ it.saving }}</span>
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
      image1: true,
      success: false,
      fail: false,
      saveIncense: [
        { id: 1, saving: 3 },
        { id: 2, saving: 6 },
        { id: 3, saving: 8 },
        { id: 4, saving: 12 },
      ],
    };
  },
  methods: {
    setNewQuantity() {
      baseRequest
        .post("admin/updateQty/product/" + this.product.id, this.product)
        .then(() => {
          this.success = true;
        })
        .catch(() => {
          this.fail = true;
        });
    },
    check() {
      if (this.product.quantity > 10000) return (this.product.quantity = 10000);
      if (this.product.quantity < 1) return (this.product.quantity = 1);
      if (this.product.quantity == 0) return (this.product.quantity = 1);
    },
    increase() {
      if (this.product.quantity > 10000) return (this.product.quantity = 10000);
      return this.product.quantity++;
    },
    reduce() {
      if (this.product.quantity < 1) return (this.product.quantity = 1);
      return this.product.quantity--;
    },
    getProduct() {
      baseRequest
        .get("admin/product/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.productDetail = response.data.product_detail;
          this.$isLoading(false);
        });
    },
  },
  watch: {
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
