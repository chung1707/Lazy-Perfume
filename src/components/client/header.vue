<template>
  <div class="wrapper wrapper-top">
    <header class="header-top">
      <div class="container">
        <div class="header-container">
          <h1 class="header-logo">
            <router-link to="/">Lazy Perfume</router-link>
          </h1>
          <ul class="header-menu" :class="{ is_active: menuActive }">
            <li>
              <router-link to="/" class="hover-border-bottom"
                >TRANG CHỦ</router-link
              >
            </li>
            <li>
              <router-link to="/products" class="hover-border-bottom"
                >SẢN PHẨM</router-link
              >
            </li>
            <li>
              <router-link class="hover-border-bottom" to="/products"
                >THƯƠNG HIỆU</router-link
              >
            </li>
            <li>
              <router-link class="hover-border-bottom" to="/blog"
                >BLOG</router-link
              >
            </li>
          </ul>
          <ul class="header-right">
            <div class="header-search">
              <div
                class="search-box"
                :class="{ dispay_hidden: !searchActive, visible: searchActive }"
              >
                <input
                  type="text"
                  class=""
                  placeholder="Nhập tên sản phẩm để tự động tìm kiếm!"
                  @input="search"
                />
                <button>
                  <i class="fa-solid fa-magnifying-glass find-icon"></i>
                </button>
                <a @click.prevent="closeSearchBox">
                  <i class="fa-solid fa-xmark close-find-input"></i>
                </a>
              </div>
              <button
                @click.prevent="closeSearchBox"
                class="hover-border-bottom"
              >
                <i class="fa-solid fa-magnifying-glass find-icon"></i>
              </button>
              <div
                class="search-results"
                :class="{ dispay_hidden: !searchKey, visible: searchKey }"
              >
                <p class="search-title">
                  Kết quả tìm kiếm cho:
                  <span class="key-word">"{{ searchKey }}"</span>
                </p>
                <div>
                  <ul class="search-product-list">
                    <li v-for="product in products" :key="product.id">
                      <router-link
                        @click="closeSearchBox"
                        :to="{ name: 'Product', params: { id: product.id } }"
                      >
                        <img
                          :src="imgUrl + product.pictures[0].img"
                          alt="search-product-img"
                        />
                        <p class="product-name">{{ product.name }}</p>
                        <p class="product-price">{{ product.price }}</p>
                        <p>
                          {{ product.supplier.name }}
                        </p>
                      </router-link>
                    </li>
                  </ul>
                  <router-link
                    class="button"
                    @click="closeSearchBox"
                    :to="{ name: 'Products', params: { key: searchKey } }"
                  >
                    Xem tất cả kết quả liên quan ({{ total }})</router-link
                  >
                </div>
              </div>
            </div>
            <div class="header-auth">
              <router-link
                to="/admin/dashbroad"
                v-if="$store.getters.authenticated && $store.getters.isManager"
                ><i class="fa-solid fa-warehouse"></i
              ></router-link>
              <router-link
                to="/account"
                v-if="$store.getters.isUser && $store.getters.authenticated"
                ><i class="fa-solid fa-user hover-border-bottom"></i
              ></router-link>
              <router-link to="/login" v-if="!$store.getters.authenticated"
                ><i class="fa-solid fa-right-to-bracket"></i
              ></router-link>
            </div>
            <div class="cart-box">
              <div @mouseover="cartActive = !cartActive">
                <router-link to="/cart" class="hover-border-bottom"
                  ><p></p>
                  <i class="fa-solid fa-cart-shopping cart-icon"></i>
                  <span class="quantity-in-cart" v-if="totalItemInCart"
                    >({{ totalItemInCart }})</span
                  >
                </router-link>
              </div>

              <div
                class="cart-box-inside"
                @mouseleave="cartActive = false"
                :class="{ dispay_hidden: !cartActive, visible: cartActive }"
              >
                <cartIcon></cartIcon>
              </div>
            </div>
          </ul>
          <button class="menu-toggle" @click="menuActive = !menuActive">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import baseRequest from "../../base/baseRequest";
import { mapGetters, mapActions } from "vuex";
import cartIcon from "../../components/client/cartIcon.vue";
export default {
  components: {
    cartIcon,
  },
  computed: {
    ...mapGetters(["imgUrl", "totalItemInCart"]),
  },
  data() {
    return {
      debounce: null,
      searchActive: false,
      searchKey: "",
      cartActive: false,
      menuActive: false,
      products: null,
      total: null,
    };
  },
  methods: {
    ...mapActions(["getCart"]),
    closeSearchBox() {
      this.searchKey = "";
      this.searchActive = !this.searchActive;
    },
    search(event) {
      this.searchKey = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchKey = event.target.value;
        baseRequest.get("search", this.searchKey).then((response) => {
          this.products = response.data.products;
          this.total = response.data.total;
        });
      }, 600);
    },
  },
  beforeMount() {
    this.getCart();
  },
};
</script>

<style>
.header-right {
  align-items: baseline !important;
}
</style>
