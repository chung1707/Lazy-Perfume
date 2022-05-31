<template>
  <main class="wrapper personal-page" v-if="user">
    <section class="header-products">
      <h1 class="page-title">{{ user.name }}</h1>
    </section>
    <section v-if="user">
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <span>Tài khoản</span>
        </div>
      </div>
      <div class="account-content container">
        <div class="left-account">
          <ul>
            <li>
              <a
                href="#"
                @click.prevent="tabActive = 1"
                :class="{ tabActive: tabActive == 1 }"
              >
                Đơn hàng của bạn</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="tabActive = 2"
                :class="{ tabActive: tabActive == 2 }"
              >
                Thông tin cá nhân
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="tabActive = 3"
                :class="{ tabActive: tabActive == 3 }"
              >
                Đổi mật khẩu</a
              >
            </li>
            <li>
              <a @click.prevent="logout" style="cursor: pointer"> Đăng xuất</a>
            </li>
          </ul>
        </div>
        <div class="right-account">
          <div
            class="order-list dispay_hidden"
            :class="{ visible: tabActive == 1 }"
            v-if="orders"
          >
            <div class="order" v-for="order in orders" :key="order.id">
              <span class="order-id"
                >Mã đơn hàng: {{ order.transaction_id }}</span
              >
              <span class="order-status" v-if="order.pending"
                >Trạng thái đơn hàng: Chờ xác nhận!</span
              >
              <span class="order-status" v-if="order.processing"
                >Trạng thái đơn hàng: Đang xử lý!</span
              >
              <span class="order-status" v-if="order.delivered"
                >Trạng thái đơn hàng: Đã giao hàng!</span
              >
              <span class="order-status" v-if="order.canceled"
                >Trạng thái đơn hàng: Đã hủy!</span
              >
              <span class="order-status" v-if="order.refunded"
                >Trạng thái đơn hàng: Đã hoàn trả!</span
              >
              <span class="order-id"
                >Địa chỉ nhận hàng: {{ order.deliveryAddress }}
              </span>
              <button
                class="button"
                v-if="order.pending"
                @click.prevent="cancelOrder(order)"
              >
                Hủy đơn hàng
              </button>
              <span class="created-time"
                >Thời gian bạn đặt hàng: {{ order.created_at }}</span
              >
              <div class="title-list">
                <span>Sản phẩm</span>
                <span>Số lượng</span>
                <span>Giá</span>
                <span>Tổng tiền</span>
              </div>
              <div
                class="item-in-list"
                v-for="product in order.products"
                :key="product"
              >
                <span>
                  <router-link
                    :to="{ name: 'Product', params: { id: product.id } }"
                    >{{ product.name }}</router-link
                  >
                </span>

                <span>{{ product.pivot.quantity }}</span>
                <span>{{ product.pivot.price }}</span>
                <span>{{ product.pivot.price * product.pivot.quantity }}</span>
              </div>
              <div class="discount">
                <span>Giảm giá</span>
                <span v-if="order.discount"
                  >{{ order.discount.discount }}%</span
                >
                <span v-else>Không</span>
              </div>
              <div class="final-price">
                <span>Tổng hóa đơn</span>
                <span>{{ order.totalPrice }}</span>
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
                    v-if="Object.keys(orders).length !== 0"
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
          <div
            class="info-user dispay_hidden"
            :class="{ visible: tabActive == 2 }"
          >
            <h3>Thông tin người dùng</h3>
            <h5 class="success" v-if="success">
              <i class="fas fa-check"></i> Sửa đổi thành công!
            </h5>
            <h5 class="fail" v-if="fail">
              Sửa đổi thất bại. Vui lòng thử lại sau!
            </h5>
            <div class="info">
              <label for="username">Tên người dùng</label>
              <input
                v-model="user.name"
                type="text"
                name="username"
                :class="{ errorInput: error.name }"
                placeholder="Tên người dùng..."
              />
              <span class="error" v-if="error.name">{{ error.name[0] }}</span>
            </div>
            <div class="info">
              <label for="email">Địa chỉ Email</label>
              <input
                type="text"
                name="email"
                v-model="user.email"
                :class="{ errorInput: error.email }"
                placeholder="Tên người dùng..."
              />
              <span class="error" v-if="error.email">{{ error.email[0] }}</span>
            </div>
            <div class="info">
              <label for="phoneNumber">Số điện thoại</label>
              <input
                v-model="user.phone"
                type="text"
                :class="{ errorInput: error.phone }"
                name="phoneNumber"
                placeholder="Tên người dùng..."
              />
              <span class="error" v-if="error.phone">{{ error.phone[0] }}</span>
            </div>
            <div class="info">
              <label for="address">Địa chỉ giao hàng chi tiết</label>
              <input
                type="text"
                :class="{ errorInput: error.address }"
                name="address"
                v-model="user.address"
                placeholder="Địa chỉ chi tiết"
              />
              <span class="error" v-if="error.address">{{
                error.addrees[0]
              }}</span>
            </div>
            <button class="button update-button" @click="changeInfor">
              Cập nhập thông tin
            </button>
          </div>
          <div
            class="change-password info-user dispay_hidden"
            :class="{ visible: tabActive == 3 }"
          >
            <h3>Đổi mật khẩu</h3>
            <span class="error" v-if="error.result">{{ error.result }}</span>
            <div class="info">
              <label for="username">Mật khẩu hiện tại</label>
              <input
                type="password"
                v-model="userPass.currentPass"
                name="username"
                :class="{ errorInput: error.currentPass }"
                placeholder="Nhập mật khẩu hiện tại của bạn"
              />
              <span class="error" v-if="error.currentPass">{{
                error.currentPass[0]
              }}</span>
            </div>
            <div class="info">
              <label for="email">Nhập mật khẩu mới</label>
              <input
                type="password"
                v-model="userPass.password"
                name="email"
                :class="{ errorInput: error.password }"
                placeholder="Nhập mật khẩu mới"
              />
              <span class="error" v-if="error.password">{{
                error.password[0]
              }}</span>
            </div>
            <div class="info">
              <label for="phoneNumber">Xác nhận mật khẩu</label>
              <input
                type="password"
                v-model="userPass.password_confirmation"
                name="phoneNumber"
                :class="{ errorInput: error.password_confirmation }"
                placeholder="Nhập lại mật khẩu mới của bạn"
              />
              <span class="error" v-if="error.password_confirmation">{{
                error.password_confirmation[0]
              }}</span>
            </div>
            <button class="button update-button" @click.prevent="changePass">
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import baseRequest from "../../base/baseRequest";
export default {
  data() {
    return {
      user: this.$store.getters.authUser,
      totalPage: 0,
      currentPage: 1,
      orders: null,
      error: {},
      tabActive: 1,
      success: false,
      fail: false,
      userPass: {
        currentPass: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  methods: {
    getOrders() {
      baseRequest
        .get("orders?page=" + this.currentPage, this.$store.getters.authUser.id)
        .then((response) => {
          this.orders = response.data.orders.data;
          this.totalOrders = response.data.orders.total;
          this.totalPage = response.data.orders.last_page;
          this.$isLoading(false);
        });
    },
    cancelOrder(order) {
      baseRequest.post("order/canceled/" + order.id).then((response) => {
        if (response.data.success) {
          this.success = true;
          order.pending = false;
          order.canceled = true;
        } else {
          order.pending = false;
          order.processing = true;
          this.fail = true;
        }
      });
    },
    changeInfor() {
      this.$isLoading(true);
      baseRequest
        .post("changeInfor", this.user)
        .then((response) => {
          if (response.data.status == 401) {
            this.fail = true;
          } else {
            this.$store.commit("setAuthUser", response.data.user);
            console.log(response.data);
            this.success = true;
            this.error = {};
            this.$isLoading(false);
          }
        })
        .catch((error) => {
          this.error = error.response.data.errors;
          console.log(this.error);
          this.success = false;
          this.$isLoading(false);
        });
    },
    changePass() {
      this.$isLoading(true);
      baseRequest
        .post("changePass", this.userPass)
        .then((response) => {
          if (response.data.success == true) {
            this.success = true;
            this.error = {};
          } else {
            this.success = false;
            this.error = response.data;
          }
          this.$isLoading(false);
        })
        .catch((error) => {
          this.error = error.response.data.errors;
          console.log(this.error);
          this.success = false;
          this.$isLoading(false);
        });
    },
    logout() {
      this.$isLoading(true);
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          alert("Đã có lỗi sảy ra. Thử lại sau!");
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
  },
  watch: {
    currentPage() {
      this.getOrders();
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
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped>
.tabActive {
  color: rgb(255, 120, 57) !important;
}
</style>
