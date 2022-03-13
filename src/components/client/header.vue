<template>
  <div class="wrapper wrapper-top">
    <header class="header-top">
      <div class="container">
        <div class="header-container">
          <h1 class="header-logo">
            <router-link to="/">Lazy Perfume</router-link>
          </h1>
          <ul class="header-menu" :class="{is_active: menuActive}">
            <li>
              <router-link to="/" class="hover-border-bottom">TRANG CHỦ</router-link>
            </li>
            <li>
              <router-link to="/products" class="hover-border-bottom">SẢN PHẨM</router-link>
            </li>
            <li>
              <a class="hover-border-bottom" href="#">THƯƠNG HIỆU</a>
            </li>
            <li>
              <a class="hover-border-bottom" href="#">BLOG</a>
            </li>
          </ul>
          <ul class="header-right">
            <div class="header-search">
              <div
                class="search-box"
                :class="{ hidden: !searchActive, visible: searchActive }"
              >
                <input type="text" class="" v-model="searchKey" />
                <button>
                  <i class="fa-solid fa-magnifying-glass find-icon"></i>
                </button>
                <i
                  class="fa-solid fa-xmark close-find-input"
                  @click="closeSearchBox"
                ></i>
              </div>
              <button
                @click.prevent="closeSearchBox"
                class="hover-border-bottom"
              >
                <i class="fa-solid fa-magnifying-glass find-icon"></i>
              </button>
              <div
                class="search-results"
                :class="{ hidden: !searchKey, visible: searchKey }"
              >
                <p class="search-title">
                  Kết quả tìm kiếm cho:
                  <span class="key-word">"{{ searchKey }}"</span>
                </p>
                <i
                  class="fa-solid fa-xmark close-search-results"
                  @click="searchKey = ''"
                ></i>
                <p v-if="1 > 2">Không tìm thấy sản phẩm liên quan!</p>

                <div v-else>
                  <ul class="search-product-list">
                    <li>
                      <a href="#">
                        <img src="#" alt="search-product-img" />
                        <p class="product-name">Dior Sauvage</p>
                        <p class="product-price">2.000.000 VNĐ</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Iusto perferendis ipsum harum ut nemo omnis.
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="#" alt="search-product-img" />
                        <p class="product-name">Dior Sauvage</p>
                        <p class="product-price">2.000.000 VNĐ</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Iusto perferendis ipsum harum ut nemo omnis.
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="#" alt="search-product-img" />
                        <p class="product-name">Dior Sauvage</p>
                        <p class="product-price">2.000.000 VNĐ</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Iusto perferendis ipsum harum ut nemo omnis.
                        </p>
                      </a>
                    </li>
                  </ul>
                  <a class="button" href="#">
                    Xem tất cả kết quả liên quan (20)</a
                  >
                </div>
              </div>
            </div>
            <div class="header-auth">
              <a href="#"
                ><i class="fa-solid fa-user hover-border-bottom"></i
              ></a>
              <a href="#"
                ><i class="fa-solid fa-right-to-bracket hidden"></i
              ></a>
            </div>
            <div class="cart-box">
              <router-link to="/cart" class="hover-border-bottom"
                ><i
                  class="fa-solid fa-cart-shopping cart-icon"
                  @mouseover="cartActive = !cartActive"
                ></i>
                <span class="quantity-in-cart">(1)</span>
              </router-link>

              <div
                class="cart-box-inside"
                @mouseleave="cartActive = false"
                :class="{ hidden: !cartActive, visible: cartActive }"
              >
                <div class="empty-cart" v-if="1 > 2">
                  <p>Giỏ hàng của bạn chưa có sản phẩm nào!</p>
                </div>
                <div class="not-empty-cart" v-else>
                  <ul class="list-product-in-cart">
                    <li>
                      <a href="#">
                        <img
                          src="../../assets/images/icons/LayzyP.gif"
                          alt="product-in-cart-img"
                        />
                      </a>
                      <div class="info-product-in-cart">
                        <a href="#" class="product-name">Dior Sauvage</a>
                        <span>2.500.000 VNĐ</span>
                        <span>Số lượng: 1</span>
                        <i
                          class="remove-item-in-cart fa-solid fa-xmark close-search-results"
                        ></i>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="../../assets/images/icons/LayzyP.gif"
                          alt="product-in-cart-img"
                        />
                      </a>
                      <div class="info-product-in-cart">
                        <a href="#" class="product-name">Creed Aventus</a>
                        <span>7.500.000 VNĐ</span>
                        <span>Số lượng: 1</span>
                        <i
                          class="remove-item-in-cart fa-solid fa-xmark close-search-results"
                        ></i>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="../../assets/images/icons/LayzyP.gif"
                          alt="product-in-cart-img"
                        />
                      </a>
                      <div class="info-product-in-cart">
                        <a class="product-name" href="#">Versace Eros</a>
                        <span>1.500.000 VNĐ</span>
                        <span>Số lượng: 1</span>
                        <i class="fa-solid fa-xmark remove-item-in-cart"></i>
                      </div>
                    </li>
                  </ul>
                  <p class="total-price-in-cart">
                    Tổng cộng: <span>11.500.000 VNĐ</span>
                  </p>
                  <div class="button-in-cart-icon">
                    <button class="button">Đến giỏ hàng</button>
                    <button class="button">Thanh toán</button>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <button class="menu-toggle"
          @click="menuActive =!menuActive">
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

export default {

  setup() {},
  data() {
    return {
      searchActive: false,
      searchKey: "",
      cartActive: false,
      menuActive: false,
    };
  },
  methods: {
    closeSearchBox() {
      this.searchKey = "";
      this.searchActive = !this.searchActive;
    },
  },
  mounted(){
  }
};
</script>

<style></style>
