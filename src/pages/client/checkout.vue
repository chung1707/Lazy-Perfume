<template>
  <main class="checkout-page wrapper">
    <section class="header-products">
      <h1 class="page-title">Thanh Toán</h1>
      <h5 class="unsuccessful" v-if="unsuccessful">
        <i class="fas fa-times-octagon"></i>Đã có lỗi sãy ra, đặt hàng thất bại!
      </h5>
      <h5 class="unsuccessful" v-if="fail">
        <i class="fas fa-times-octagon"></i>Mã không thể sử dụng!
      </h5>
      <h5 class="success" v-if="success">
        <i class="fas fa-check"></i> Đặt hàng thành công!
      </h5>
    </section>
    <section>
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <router-link class="link" to="/cart">Giỏ hàng</router-link>
          <span class="seperate">/</span>
          <span>Thanh toán</span>
        </div>
      </div>
      <div class="checkout-content">
        <form :messages="messagesOverride">
          <div class="container">
            <div class="left-checkout">
              <h3>Chi tiết thanh toán</h3>
              <div class="name-customer">
                <div class="name">
                  <label for="name">Tên khách hàng</label>
                  <input
                    v-model="this.user.name"
                    type="text"
                    name="name"
                    :class="{ errorInput: v$.user.name.$error }"
                    placeholder="Tên của bạn"
                  />
                  <span class="error" v-if="v$.user.name.$error">
                    <span
                      v-if="v$.user.name.$errors[0].$params.type == 'required'"
                    >
                      Trường này không được bỏ trống!
                    </span>
                    <span
                      v-if="v$.user.name.$errors[0].$params.type == 'maxLength'"
                    >
                      Trường này yêu cầu tối đa 255 kí tự!
                    </span>
                  </span>
                </div>
                <div class="name">
                  <label for="phoneNumber">Số điện thoại</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.user.phone.$error }"
                    v-model="this.user.phone"
                    name="phoneNumber"
                    placeholder="Số điện thoại của bạn"
                  />
                  <span class="error" v-if="v$.user.phone.$error">
                    <span
                      v-if="v$.user.phone.$errors[0].$params.type == 'required'"
                    >
                      Trường này không được bỏ trống!
                    </span>
                    <span
                      v-if="
                        v$.user.phone.$errors[0].$params.type == 'maxLength'
                      "
                    >
                      Trường này yêu cầu tối đa 13 kí tự!
                    </span>
                    <span
                      v-if="
                        v$.user.phone.$errors[0].$params.type == 'minLength'
                      "
                    >
                      Trường này yêu cầu tối thiểu 9 kí tự!
                    </span>
                    <span
                      v-if="v$.user.phone.$errors[0].$params.type == 'numeric'"
                    >
                      Trường này yêu cầu là một dãy số!
                    </span>
                  </span>
                </div>
              </div>
              <div class="email-address">
                <div class="email">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.user.email.$error }"
                    v-model="this.user.email"
                    placeholder="Email của bạn"
                  />
                  <span class="error" v-if="v$.user.email.$error">
                    <span
                      v-if="v$.user.email.$errors[0].$params.type == 'required'"
                    >
                      Trường này không được bỏ trống!
                    </span>
                    <span
                      v-if="
                        v$.user.email.$errors[0].$params.type == 'maxLength'
                      "
                    >
                      Trường này yêu cầu tối đa 255 kí tự!
                    </span>
                    <span
                      v-if="v$.user.email.$errors[0].$params.type == 'email'"
                    >
                      Sai định dạng email!
                    </span>
                  </span>
                </div>
                <div class="address-details">
                  <label for="address">Địa chỉ nhận hàng</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.user.address.$error }"
                    v-model="this.user.address"
                  />
                  <span class="error" v-if="v$.user.address.$error">
                    <span
                      v-if="
                        v$.user.address.$errors[0].$params.type == 'required'
                      "
                    >
                      Trường này không được bỏ trống!
                    </span>
                    <span
                      v-if="
                        v$.user.address.$errors[0].$params.type == 'maxLength'
                      "
                    >
                      Trường này yêu cầu tối đa 255 kí tự!
                    </span>
                  </span>
                </div>
              </div>
              <div class="notes">
                <label for="notes"> Ghi chú cho đơn hàng </label>
                <textarea
                  placeholder="Nhập ghi chú cho đơn hàng của bạn"
                  class=""
                  v-model="notes"
                  name="notes"
                  id=""
                ></textarea>
              </div>
              <div class="payment">
                <span class="error" v-if="v$.payment_method.$error">
                  <span> Bạn chưa chọn phương thức thanh toán </span>
                </span>
                <h3 class="filter-title">Phương thức thanh toán</h3>
                <ul class="seasons-filter">
                  <li
                    v-for="payment in payments"
                    :key="payment.id"
                    @click="selectPaymentMethod(payment)"
                  >
                    <div class="div-checkbox">
                      <a
                        :class="{ visible: payment_method.id == payment.id }"
                        class="dispay_hidden"
                      >
                        <i class="fa-solid fa-check"></i>
                      </a>
                    </div>
                    <label>{{ payment.name }} </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right-checkout">
              <div class="discount-box">
                <h3>
                  Mã giảm giá:
                  <span style="color: red" v-if="discount.id"
                    >Đang sử dụng mã: {{ discount.code }}</span
                  >
                </h3>
                <div class="box-content">
                  <div>
                    <input
                      v-model="code"
                      type="text"
                      placeholder="Nhập mã ưu đãi"
                    />
                    <button @click.prevent="getDiscount" class="button">
                      Sử dụng
                    </button>
                  </div>
                </div>
              </div>
              <div class="bill-info">
                <h3>Đơn hàng của bạn</h3>
                <div class="title-bill">
                  <span>Sản phẩm</span>
                  <span>Thành tiền</span>
                </div>
                <div
                  class="products-in-bill"
                  v-for="item in itemsInCart"
                  :key="item"
                >
                  <span class="name"
                    >{{ item.name }} x {{ item.pivot.quantity }}
                  </span>
                  <span class="price">
                    {{
                      item.pivot.quantity *
                      ((item.price * (100 - item.discount)) / 100)
                    }}
                    VNĐ
                  </span>
                </div>
                <div class="total-price">
                  <span>Tổng tiền:</span>
                  <span> {{ totalPrice }} VNĐ</span>
                </div>
                <div class="total-shipping">
                  <span>Phí vận chuyển:</span>
                  <span> Miên phí</span>
                </div>
                <div class="total-discount">
                  <span>Giảm giá:</span>
                  <span v-if="discount.id"> {{ discount.discount }}%</span>
                  <span v-else>Không</span>
                </div>
                <div class="final-price">
                  <span>Tổng hóa đơn:</span>
                  <span v-if="discount.id"
                    >{{
                      (totalPrice * (100 - discount.discount)) / 100
                    }}
                    VNĐ</span
                  >
                  <span v-else> {{ totalPrice }}VNĐ</span>
                </div>
                <button class="button" @click.prevent="submitOrder">
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import baseRequest from "../../base/baseRequest";
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  numeric,
  minLength,
} from "@vuelidate/validators";
export default {
  computed: {
    ...mapGetters(["itemsInCart", "totalPrice", "totalItemInCart"]),
  },
  data() {
    return {
      discount: {
        id: null,
      },
      code: null,
      messagesOverride: {
        required: "You must fill the {attribute} field to continue",
        email: "The email must be a genuine email address.",
      },
      v$: useVuelidate(),
      user: this.$store.state.authUser,
      payment_method: {},
      payments: [
        {
          id: 1,
          name: "Thanh toán khi nhận hàng (COD)",
          description:
            "COD là viết tắt của Cash On Delivery, nghĩa là thanh toán khi nhận hàng. Với phương thức thanh toán này, quý khách trả tiền mặt cho nhân viên giao hàng ngay khi nhận được đơn hàng của mình. Chúng tôi chấp nhận hình thức thanh toán khi nhận hàng (COD) cho hầu hết đơn hàng trên toàn quốc.",
        },
        {
          id: 2,
          name: "Thanh toán bằng tài khoản ngân hàng",
          description:
            "Tài khoản thanh toán là tài khoản sử dụng cho việc thanh toán mở tại trung gian thanh toán. Tài khoản này được dùng với mục đích thanh toán là chủ yếu. Số tiền có trong tài khoản khách hàng có thể thanh toán cho bất kỳ nhu cầu dịch vụ nào, chúng vô cùng tiện lợi và nhanh chón",
        },
      ],
      notes: null,
      success: false,
      fail: false,
      unsuccessful: false,
    };
  },
  validations() {
    return {
      user: {
        name: { required, maxLength: maxLength(255) },
        email: { required, email, maxLength: maxLength(255) },
        phone: {
          required,
          numeric,
          maxLength: maxLength(13),
          minLength: minLength(9),
        },
        address: { required, maxLength: maxLength(255) },
      },
      payment_method: { required },
    };
  },
  methods: {
    ...mapActions(["getCart", "clearCart"]),
    getDiscount() {
      this.$isLoading(true);
      baseRequest.get("admin/use_discount/" + this.code).then((response) => {
        if (response.data.status == 201) {
          this.discount = response.data.discount;
          this.$isLoading(false);
        } else {
          this.fail = true;
          this.$isLoading(false);
        }
      });
    },
    checkItems() {
      if (this.totalItemInCart < 1) {
        this.$router.push({ name: "Cart" });
      }
    },
    submitOrder() {
      this.$isLoading(true);
      this.v$.$validate();
      this.checkItems();
      var orderBill = {};
      orderBill.phone_number = this.user.phone;
      orderBill.deliveryAddress = this.user.address;
      if (this.payment_method) {
        orderBill.payment_methods = this.payment_method.name;
      }
      orderBill.email = this.user.email;
      if (this.discount.id) {
        orderBill.totalPrice =
          (this.totalPrice * (100 - this.discount.discount)) / 100;
      } else {
        orderBill.totalPrice = this.totalPrice;
      }
      orderBill.discount_id = this.discount.id;
      orderBill.products = this.itemsInCart;
      orderBill.note = this.notes;
      baseRequest
        .post("checkout", orderBill)
        .then((response) => {
          if (response.data.success) {
            this.clearCart();
            this.discount.id = null;
            this.$router.push({ name: "Account" });
          } else {
            this.unsuccessful = true;
          }
        })
        .catch(() => {
          this.unsuccessful = true;
          this.success = false;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
    selectPaymentMethod(method) {
      return (this.payment_method = method);
    },
  },
  mounted() {
    this.checkItems();
    this.$isLoading(false);
  },
  watch: {
    unsuccessful() {
      setTimeout(() => (this.unsuccessful = false), 2000);
    },
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
    fail() {
      setTimeout(() => (this.fail = false), 2500);
    },
  },
};
</script>

<style></style>
