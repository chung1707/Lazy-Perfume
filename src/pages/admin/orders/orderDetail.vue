<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="section">
      <div class="container-fluid" v-if="order">
        <h5 class="success" v-if="success">
          <i class="fas fa-check"></i> Thành công!
        </h5>
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title d-flex align-items-center flex-wrap mb-30">
                <h2 class="mr-40">Đơn hàng: {{ order.transaction_id }}</h2>
                <div class="order_action">
                  <a
                    @click.prevent="markProcess"
                    v-if="order.pending"
                    class="main-btn primary-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-plus mr-5"></i> Nhận đơn</a
                  >
                  <a
                    @click.prevent="markCanceled"
                    v-if="order.pending"
                    class="main-btn danger-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-minus mr-5"></i> Hủy đơn</a
                  >
                </div>
                <div>
                  <a
                    v-if="order.processing"
                    @click.prevent="markDelivered"
                    class="main-btn primary-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-plus mr-5"></i>Đã vận chuyển</a
                  >
                  <a
                    @click.prevent="markCanceled"
                    v-if="order.processing"
                    class="main-btn danger-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-minus mr-5"></i> Hủy đơn</a
                  >
                </div>

                <div>
                  <a
                    @click.prevent="markRefunded"
                    v-if="order.delivered"
                    class="main-btn danger-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-plus mr-5"></i>Khách hoàn đơn</a
                  >
                  <a
                    @click.prevent="markProcess"
                    v-if="order.delivered"
                    class="main-btn secondary-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-plus mr-5"></i>Vận chuyển lại</a
                  >
                </div>
              </div>
            </div>
            <!-- end col -->
            <div class="col-md-6">
              <div class="breadcrumb-wrapper mb-30">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#0">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Đơn hàng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
        <!-- ========== title-wrapper end ========== -->

        <!-- Invoice Wrapper Start -->
        <div class="invoice-wrapper">
          <div class="row">
            <div class="col-12">
              <div class="invoice-card card-style mb-30">
                <div class="invoice-header">
                  <div class="invoice-for">
                    <h2 class="mb-10">
                      Hóa đơn --
                      <span v-if="order.pending">Chưa xác nhận</span>
                      <span v-if="order.processing" style="color: red"
                        >Đang xử lý</span
                      >
                      <span v-if="order.delivered" style="color: red"
                        >Đã giao hàng</span
                      >
                      <span v-if="order.canceled" style="color: red"
                        >Đã hủy</span
                      >
                      <span v-if="order.refunded" style="color: red"
                        >Đơn hoàn trả</span
                      >
                    </h2>
                    <p class="text-sm">
                      Hệ thống bán hàng trực tuyến Lazy Perfume
                    </p>
                  </div>
                  <div class="invoice-logo">
                    <img src="assets/images/invoice/uideck-logo.svg" alt="" />
                  </div>
                  <div class="invoice-date">
                    <p><span>Thời gian lập: </span>{{ order.created_at }}</p>
                    <p><span>Mã đơn hàng:</span>{{ order.transaction_id }}</p>
                  </div>
                </div>
                <div class="invoice-address">
                  <div class="address-item">
                    <h5 class="text-bold">Cửa hàng</h5>
                    <h1>Lazy Perfume</h1>
                    <p class="text-sm">10000 Hà Nội</p>
                    <p class="text-sm">
                      <span class="text-medium">Email:</span>
                      lazyperfume@gmail.com
                    </p>

                    <p class="text-sm">
                      <span class="text-medium">Số điện thoại:</span>
                      123 456 789
                    </p>
                  </div>
                  <div class="address-item">
                    <h5 class="text-bold">Khách hàng</h5>
                    <h1>{{ user.name }}</h1>
                    <p class="text-sm">
                      {{ order.deliveryAddress }}
                    </p>
                    <p class="text-sm">
                      <span class="text-medium">Email:</span>
                      {{ order.email }}
                    </p>
                    <p class="text-sm">
                      <span class="text-medium">Số điện thoại:</span>
                      {{ order.phone_number }}
                    </p>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="invoice-table table">
                    <thead>
                      <tr>
                        <th class="service">
                          <h6 class="text-sm text-medium">Mã sản phẩm</h6>
                        </th>
                        <th class="service">
                          <h6 class="text-sm text-medium">Tên sản phẩm</h6>
                        </th>
                        <th class="desc">
                          <h6 class="text-sm text-medium">Giá thành</h6>
                        </th>
                        <th class="qty">
                          <h6 class="text-sm text-medium">Số lượng</h6>
                        </th>
                        <th class="amount">
                          <h6 class="text-sm text-medium">Tổng giá</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="products">
                      <tr v-for="product in products" :key="product.id">
                        <td>
                          <router-link
                            :to="{ name: 'Product', params: { id: product.id } }"
                          >
                            <p class="text-sm">{{ product.productCode }}</p>
                          </router-link>
                        </td>
                        <td>
                          <router-link
                            :to="{ name: 'Product', params: { id: product.id } }"
                          >
                            <p class="text-sm">{{ product.name }}</p>
                          </router-link>
                        </td>
                        <td>
                          <p class="text-sm">{{ product.pivot.price }} VNĐ</p>
                        </td>
                        <td>
                          <p class="text-sm">{{ product.pivot.quantity }}</p>
                        </td>
                        <td>
                          <p class="text-sm">
                            {{ product.pivot.quantity * product.pivot.price }}
                            VNĐ
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <h6 class="text-sm text-medium">Tổng tiền</h6>
                        </td>
                        <td>
                          <h6 class="text-sm text-bold">
                            {{ order.totalPrice }} VNĐ
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <h6 class="text-sm text-medium">Giảm giá</h6>
                        </td>
                        <td>
                          <h6 class="text-sm text-bold">0%</h6>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <h6 class="text-sm text-medium">Phí vận chuyển</h6>
                        </td>
                        <td>
                          <h6 class="text-sm text-bold">Miễn phí</h6>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <h4>Tổng hóa đơn</h4>
                        </td>
                        <td>
                          <h4 style="color: red">{{ order.totalPrice }} VNĐ</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="note-wrapper warning-alert py-4 px-sm-3 px-lg-5">
                  <div class="alert">
                    <h5 class="text-bold mb-15">Ghi chú của khách hàng:</h5>
                    <p class="text-sm text-gray">
                      {{ order.note }}
                    </p>
                  </div>
                </div>
                <div class="invoice-action">
                  <ul
                    class="d-flex flex-wrap align-items-center"
                    style="justify-content: space-around"
                  >
                    <li class="m-2">
                      <a
                        @click.prevent="$router.back()"
                        href="#0"
                        class="main-btn primary-btn-outline btn-hover"
                      >
                        Quay lại
                      </a>
                    </li>
                    <li class="m-2">
                      <print></print>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- End Card -->
            </div>
            <!-- ENd Col -->
          </div>
          <!-- End Row -->
        </div>
        <!-- Invoice Wrapper End -->
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import baseRequest from "../../../base/baseRequest";
import print from "../../../components/print.vue";

export default {
  components: {
print
  },
  computed: {
    ...mapGetters(["imgUrl", "authUser", "isAdmin"]),
  },
  data() {
    return {
      order: null,
      user: null,
      products: null,
      error: {},
      success: false,
      fail: false,
    };
  },
  methods: {
    async getOrder() {
      this.$isLoading(true);
      await baseRequest
        .get("admin/order/" + this.$route.params.id)
        .then((response) => {
          this.order = response.data;
          this.user = response.data.user;
          this.products = response.data.products;
          this.$isLoading(false);
        });
    },
    markProcess() {
      this.order.pending = false;
      this.order.delivered = false;
      this.order.processing = true;
      baseRequest
        .post("admin/order/process/" + this.order.id)
        .then((response) => {
          console.log(response);
        });
    },
    markDelivered() {
      this.order.processing = false;
      this.order.delivered = true;
      baseRequest
        .post("admin/order/delivered/" + this.order.id)
        .then((response) => {
          console.log(response);
        });
    },
    markCanceled() {
      this.order.processing = false;
      this.order.pending = false;
      this.order.delivered = false;
      this.order.canceled = true;
      baseRequest
        .post("admin/order/canceled/" + this.order.id)
        .then((response) => {
          console.log(response);
        });
    },
    markRefunded() {
      this.order.processing = false;
      this.order.delivered = false;
      this.order.pending = false;
      this.order.refunded = true;
      baseRequest
        .post("admin/order/refunded/" + this.order.id)
        .then((response) => {
          console.log(response);
        });
    },
  },
  watch: {
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
  },
  beforeMount() {
    this.getOrder();
    this.$isLoading(false);
  },
};
</script>

<style scoped>
label,
input,
textarea,
i,
select {
  font-size: 16px !important;
}
.primary-btn,
.danger-btn {
  margin-right: 30px;
}
</style>
