<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="section">
      <div class="container-fluid">
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title mb-30">
                <h2>Lazy Perfume Trang Quản Trị</h2>
              </div>
            </div>
          </div>
          <!-- end row -->
        </div>
        <!-- ========== title-wrapper end ========== -->
        <div class="row">
          <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="icon-card mb-30">
              <div class="icon primary">
                <i class="lni lni-cart-full"></i>
              </div>
              <div class="content">
                <h6 class="mb-10">Đơn hàng đang xử lý</h6>
                <h3 class="text-bold mb-10">{{ totalProcessOrder }}</h3>
                <p class="text-sm text-danger">
                  <router-link to="/admin/processOrders" class="text-gray"
                    >Xem chi tiết</router-link
                  >
                </p>
              </div>
            </div>
            <!-- End Icon Cart -->
          </div>
          <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="icon-card mb-30">
              <div class="icon primary">
                <i class="lni lni-cart-full"></i>
              </div>
              <div class="content">
                <h6 class="mb-10">Đơn hàng đã giao</h6>
                <h3 class="text-bold mb-10">{{ totalDeliveredOrder }}</h3>
                <p class="text-sm text-danger">
                  <router-link to="/admin/deliveredOrders" class="text-gray"
                    >Xem chi tiết</router-link
                  >
                </p>
              </div>
            </div>
            <!-- End Icon Cart -->
          </div>
          <!-- End Col -->
          <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="icon-card mb-30">
              <div class="icon primary">
                <i class="lni lni-credit-cards"></i>
              </div>
              <div class="content">
                <h6 class="mb-10">Tổng số sản phẩm</h6>
                <h3 class="text-bold mb-10">{{ totalProduct }}</h3>
                <p class="text-sm text-danger">
                  <router-link to="/admin/products" class="text-gray"
                    >Xem chi tiết</router-link
                  >
                </p>
              </div>
            </div>
            <!-- End Icon Cart -->
          </div>
          <!-- End Col -->
          <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="icon-card mb-30">
              <div class="icon orange">
                <i class="lni lni-user"></i>
              </div>
              <div class="content">
                <h6 class="mb-10">Tổng số người dùng</h6>
                <h3 class="text-bold mb-10">{{ totalUser }}</h3>
                <p class="text-sm text-danger">
                  <router-link to="/admin/clientUsers" class="text-gray"
                    >Xem chi tiết</router-link
                  >
                </p>
              </div>
            </div>
            <!-- End Icon Cart -->
          </div>
          <!-- End Col -->
        </div>
        <div class="row">
          <!-- End Col -->
          <div class="col-lg-6" v-if="newOrders">
            <div class="card-style mb-30">
              <div
                class="title d-flex flex-wrap align-items-center justify-content-between"
              >
                <div class="left">
                  <h6 class="text-medium mb-30">Đơn hàng mới</h6>
                </div>
              </div>
              <!-- End Title -->
              <div class="table-responsive">
                <table class="table top-selling-table">
                  <thead>
                    <tr>
                      <th>
                        <h6 class="text-sm text-medium">Mã đơn hàng</h6>
                      </th>
                      <th class="min-width">
                        <h6 class="text-sm text-medium">Số điện thoại</h6>
                      </th>
                      <th class="min-width">
                        <h6 class="text-sm text-medium">Tổng tiền</h6>
                      </th>
                      <th>
                        <h6 class="text-sm text-medium text-end">Hành động</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in newOrders" :key="order.id">
                      <td>
                        <div class="product">
                          <p class="text-sm">{{ order.transaction_id }}</p>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm">{{ order.phone_number }}</p>
                      </td>
                      <td>
                        <p class="text-sm">{{ order.totalPrice }} VNĐ</p>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'OrderDetail',
                            params: { id: order.id },
                          }"
                          class="status-btn btn btn-primary close-btn"
                          >Xem</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- End Table -->
              </div>
            </div>
          </div>
          <div class="col-lg-6" v-if="newAccounts && $store.getters.isAdmin">
            <div class="card-style mb-30">
              <div
                class="title d-flex flex-wrap align-items-center justify-content-between"
              >
                <div class="left">
                  <h6 class="text-medium mb-30">Người dùng mới</h6>
                </div>
              </div>
              <!-- End Title -->
              <div class="table-responsive">
                <table class="table top-selling-table">
                  <thead>
                    <tr>
                      <th>
                        <h6 class="text-sm text-medium">Tên</h6>
                      </th>
                      <th class="min-width">
                        <h6 class="text-sm text-medium">Email</h6>
                      </th>
                      <th class="min-width">
                        <h6 class="text-sm text-medium">Quyền</h6>
                      </th>
                      <th>
                        <h6 class="text-sm text-medium text-end">Hành động</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in newAccounts" :key="user.id">
                      <td>
                        <div class="product">
                          <p class="text-sm">{{ user.name }}</p>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm">{{ user.email }}</p>
                      </td>
                      <td>
                        <p class="text-sm">{{ user.role.name }}</p>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'UserDetail',
                            params: { id: user.id },
                          }"
                          class="status-btn btn btn-primary close-btn"
                          >Xem</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- End Table -->
              </div>
            </div>
          </div>
          <!-- End Col -->
        </div>
        <!-- End Row -->
      </div>
      <!-- end container -->
    </section>
    <!-- ========== section end ========== -->

    <!-- ========== footer start =========== -->
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 order-last order-md-first">
            <div class="copyright text-center text-md-start">
              <p class="text-sm">Designed and Developed by PlainAdmin</p>
            </div>
          </div>
          <!-- end col-->
          <div class="col-md-6">
            <div
              class="terms d-flex justify-content-center justify-content-md-end"
            >
              <a href="#0" class="text-sm">Term & Conditions</a>
              <a href="#0" class="text-sm ml-15">Privacy & Policy</a>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </footer>
    <!-- ========== footer end =========== -->
  </main>
</template>

<script>
// import guards from "../../router/guards"
import baseRequest from "../../base/baseRequest";
export default {
  // beforeRouteEnter: guards.checkRole,
  data() {
    return {
      totalProduct: null,
      totalProcessOrder: null,
      totalDeliveredOrder: null,
      newAccounts: null,
      totalUser: null,
      newOrders: null,
    };
  },
  methods: {
    getDashbroadInfo() {
      this.$isLoading(true);
      baseRequest.get("admin/get_dashboard_info").then((response) => {
        this.totalProduct = response.data.totalProduct;
        this.totalProcessOrder = response.data.totalProcessOrder;
        this.totalDeliveredOrder = response.data.totalDeliveredOrder;
        this.newAccounts = response.data.newAccounts;
        this.totalUser = response.data.totalUser;
        this.newOrders = response.data.newOrders;
        this.$isLoading(false);
      });
    },
  },
  mounted() {
    this.getDashbroadInfo();
    this.$isLoading(false);
  },
};
</script>

<style></style>
