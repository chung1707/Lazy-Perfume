<template>
  <main class="cart-page">
    <div class="header-cart wrapper">
      <h1 class="page-title">Giỏ hàng</h1>
      <div class="cart-empty container" v-if="1 > totalItemInCart">
        <p>Giỏ hàng của bạn chưa có sản phẩm nào!</p>
        <router-link to="/products" class="button"
          >Tiếp tục mua sắm!</router-link
        >
      </div>
      <div v-else class="cart-content container">
        <div class="left-cart">
          <h3>Sản phẩm đã chọn</h3>
          <ul class="items-in-cart">
            <li v-for="item in itemsInCart" :key="item.id">
              <router-link :to="{ name: 'Product', params: { id: item.id } }">
                <img :src="imgUrl + item.pictures[0].img" alt="item in cart" />
              </router-link>
              <div class="info-item">
                <router-link :to="{ name: 'Product', params: { id: item.id } }"
                  >{{ item.name }}
                  <span class="discount-item">{{ item.discount }}%</span>
                </router-link>
                <span class="price-item line-through"
                  >{{ (item.price * 100) / 100 }} VNĐ</span
                >
                <span class="new-price"
                  >{{ ((100 - item.discount) * item.price) / 100 }}VNĐ</span
                >
              </div>
              <div class="quantity-box">
                <input
                  type="number"
                  v-model="item.pivot.quantity"
                  @change="check(item)"
                />
                <i @click="increase(item)" class="fa-solid fa-plus plus"></i>
                <i @click="reduce(item)" class="fa-solid fa-minus minus"></i>
              </div>
              <div class="total">
                <span class="title-price">Tổng giá:</span>
                <span class="total-price-item">
                  {{
                    (((100 - item.discount) * item.price) / 100) *
                    item.pivot.quantity
                  }}
                  VNĐ
                </span>
              </div>
              <i class="fa-solid fa-x" @click="deleteProductInCart(item)"></i>
            </li>
          </ul>
          <div class="discount-box">
            <span v-show="reload" class="success"
              ><i class="fas fa-check"></i> thành công</span
            >
            <div class="box-content">
              <button
                class="button"
                style="margin-top: 50px"
                @click="reloadCart"
              >
                Cập nhập giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div class="right-cart">
          <div class="checkout-box">
            <h3>Phiếu thanh toán</h3>
            <div class="total-price">
              <span>Tạm tính: </span>
              <span class="price">{{ totalPrice }} </span>
            </div>
            <div class="discount">
              <span>Giảm giá: </span>
              <span class="price">0%</span>
            </div>
            <div class="final-price">
              <span>Tổng tiền: </span>
              <span class="price">{{ totalPrice }}</span>
            </div>
            <router-link class="button btn-checkout" to="checkout"
              >Tiến hành thanh toán</router-link
            >
          </div>
          <div class="help-box">
            <div class="help">
              <span
                >Trợ giúp ?
                <i
                  @click="helpTabActive = 1"
                  v-if="helpTabActive != 1"
                  class="fa-solid fa-plus"
                ></i>
                <i
                  @click="helpTabActive = 0"
                  v-else
                  class="fa-solid fa-minus"
                ></i>
              </span>
              <div
                class="content dispay_hidden"
                :class="{ visible: helpTabActive == 1 }"
              >
                <p>
                  Nếu trong quá trình đặt hàng có bất kỳ thắc mắc nào, quý khách
                  vui lòng liên hệ theo Hotline:
                </p>
                <ul>
                  <li>Chi nhánh Hà Nội: 032 681 111</li>
                  <li>Chi nhánh Sài Gòn: 032 681 112</li>
                </ul>
              </div>
            </div>
            <div class="help">
              <span
                >Thông tin ship ?
                <i
                  @click="helpTabActive = 2"
                  v-if="helpTabActive != 2"
                  class="fa-solid fa-plus"
                ></i>
                <i
                  @click="helpTabActive = 0"
                  v-else
                  class="fa-solid fa-minus"
                ></i>
              </span>
              <div
                class="content dispay_hidden"
                :class="{ visible: helpTabActive == 2 }"
              >
                <p>
                  Lazy Perfume miễn phí ship với tất cả các đơn hàng toàn quốc.
                </p>
              </div>
            </div>
            <div class="help">
              <span
                >Đổi trả và hoàn tiền
                <i
                  @click="helpTabActive = 3"
                  v-if="helpTabActive != 3"
                  class="fa-solid fa-plus"
                ></i>
                <i
                  @click="helpTabActive = 0"
                  v-else
                  class="fa-solid fa-minus"
                ></i>
              </span>
              <ul
                class="refund content dispay_hidden"
                :class="{ visible: helpTabActive == 3 }"
              >
                <li>
                  Lazy Perfume hỗ trợ đổi trả sản phẩm trong vòng 3 ngày kể từ
                  khi nhận hàng.
                </li>
                <li>
                  Với việc đổi sản phẩm, chỉ áp dụng với các sản phẩm còn nguyên
                  seal, tem. Chỉ áp dụng đổi sang các sản phẩm có giá trị bằng
                  hoặc cao hơn.
                </li>
                <li>
                  Với việc hoàn tiền, chỉ áp dụng trong trường hợp sản phẩm có
                  lỗi từ nhà sản xuất hoặc bể, vỡ trong quá trình vận chuyển.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["itemsInCart", "imgUrl", "totalPrice", "totalItemInCart"]),
  },
  methods: {
    ...mapActions(["getCart", "deleteProductInCart", "updateQty"]),
    increase(item) {
      if (item.pivot.quantity < item.quantity) {
        item.pivot.quantity++;
        this.updateQty(item);
      }
    },
    reduce(item) {
      if (1 < item.pivot.quantity) {
        item.pivot.quantity--;
        this.updateQty(item);
      }
    },
    check(item) {
      if (item.pivot.quantity > item.quantity) {
        item.pivot.quantity = item.quantity;
      }
      if (item.pivot.quantity < 1) {
        item.pivot.quantity = 1;
      }
      this.updateQty(item);
    },
    reloadCart() {
      this.getCart();
      this.reload = true;
    },
  },
  data() {
    return {
      helpTabActive: 1,
      reload: false,
    };
  },
  mounted() {
    this.getCart();
    this.$isLoading(false);
  },
  watch: {
    reload() {
      setTimeout(() => (this.reload = false), 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.btn-checkout {
  display: block;
  background-color: black;
  text-align: center;
}
.success {
  font-size: 20px;
}
.cart-empty {
  height: 600px;
  margin: 0px auto;
  padding: 10% 0%;
  text-align: center;
  p {
    color: black;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .button {
    background-color: black;
    color: white;
    font-size: 20px;
  }
}
</style>
