<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="section">
      <div class="container-fluid" v-if="bill">
        <h5 class="success" v-if="success">
          <i class="fas fa-check"></i> Thành công!
        </h5>
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title d-flex align-items-center flex-wrap mb-30">
                <h2 class="mr-40">Hóa đơn nhập: {{ bill.transaction_id }}</h2>
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
                      Hóa đơn nhập
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
                      Chi tiết hóa đơn nhập
                    </h2>
                    <p class="text-sm">
                      Hệ thống bán hàng trực tuyến Lazy Perfume
                    </p>
                  </div>
                  <div class="invoice-logo">
                    <img src="assets/images/invoice/uideck-logo.svg" alt="" />
                  </div>
                  <div class="invoice-date">
                    <p><span>Thời gian lập: </span>{{ bill.created_at }}</p>
                    <p><span>Mã hóa đơn:</span>{{ bill.transaction_id }}</p>
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
                    <h5 class="text-bold">Nhân viên lập hóa đơn</h5>
                    <h1>{{ user.name }}</h1>
                    <p class="text-sm">
                      <span class="text-medium">Email:</span>
                      {{ user.email }}
                    </p>
                    <p class="text-sm">
                      <span class="text-medium">Số điện thoại:</span>
                      {{ user.phone }}
                    </p>
                    <p class="text-sm">
                      <span class="text-medium">Chức vụ:</span>
                      {{ user.position }}
                    </p>
                  </div>
                  <div class="address-item">
                    <h5 class="text-bold">Nhà cung cấp</h5>
                    <h1>{{ bill.supplier.name }}</h1>
                    <p class="text-sm">
                      <span class="text-medium">Email:</span>
                      {{ bill.supplier.email }}
                    </p>
                    <p class="text-sm">
                      <span class="text-medium">Số điện thoại:</span>
                      {{ bill.supplier.phone }}
                    </p>
                    <p class="text-sm">
                      <span class="text-medium">Địa chỉ:</span>
                      {{ bill.supplier.address }}
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
                            {{ bill.totalPrice }} VNĐ
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <h4>Tổng hóa đơn</h4>
                        </td>
                        <td>
                          <h4 style="color: red">{{ bill.totalPrice }} VNĐ</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                      <!-- <a href="#0" class="main-btn primary-btn btn-hover">
                        In hóa đơn
                      </a> -->
                      <printInvoice></printInvoice>
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
import printInvoice from "../../../components/print.vue";
export default {
  components: { printInvoice },
  computed: {
    ...mapGetters(["imgUrl", "authUser", "isAdmin"]),
  },
  data() {
    return {
      bill: null,
      user: null,
      products: null,
      error: {},
      success: false,
      fail: false,
    };
  },
  methods: {
    async getBill() {
      this.$isLoading(true);
      await baseRequest
        .get("admin/bill/" + this.$route.params.id)
        .then((response) => {
          this.bill = response.data;
          this.user = response.data.user;
          this.products = response.data.products;
          this.$isLoading(false);
        });
    },
  },
  watch: {
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
  },
  beforeMount() {
    this.getBill();
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
