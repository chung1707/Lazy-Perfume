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
                <h2>Trang thống kê sản phẩm</h2>
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
                <h6 class="mb-10">Sản phẩm trong kho</h6>
                <h3 class="text-bold mb-10">{{ totalProduct }}</h3>
                <p class="text-sm text-danger">
                  <router-link to="/admin/importHistory" class="text-gray"
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
                <h6 class="mb-10">Sản phẩm đã bán</h6>
                <h3 class="text-bold mb-10">{{ soldProducts }} sản phẩm</h3>
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
                <h6 class="mb-10">Bán chạy nhất</h6>
                <h4 class="text-bold mb-10">{{ bestSeller.name }}</h4>
                <p class="text-bold mb-10">{{ bestSeller.sold }} sản phẩm</p>
                <p
                  class="text-sm text-danger"
                  style="cursor: pointer"
                  @click="pushToBestSeller()"
                >
                  Xem chi tiết
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
                <h6 class="mb-10">Nhà cung cấp số 1</h6>
                <h3 class="text-bold mb-10">{{ bestSupplier.name }} VNĐ</h3>
                <p class="text-sm text-danger">{{ bestSupplier.email }}</p>
                <p
                  class="text-sm text-danger"
                  style="cursor: pointer"
                  @click="pushToBestSupplier()"
                >
                  Xem chi tiết
                </p>
              </div>
            </div>
            <!-- End Icon Cart -->
          </div>
          <!-- End Col -->
        </div>

        <div class="row">
          <!-- End Col -->
          <div class="col-lg-6">
            <div
              class="title d-flex flex-wrap align-items-center justify-content-between"
            >
              <div class="left">
                <h6 class="text-medium mb-30">Sản phẩm đã hết hàng</h6>
              </div>
            </div>
            <div class="card-style mb-30">
              <div
                class="title d-flex flex-wrap align-items-center justify-content-between"
              >
                <div class="left">
                  <h6 class="text-medium mb-30">Sản phẩm hết hàng</h6>
                  <h6 class="text-medium mb-30">Tổng cộng : {{ total }}</h6>
                </div>
              </div>
              <!-- End Title -->
              <div class="table-responsive">
                <table class="table top-selling-table">
                  <thead>
                    <tr>
                      <th>
                        <h6 class="text-sm text-medium">Mã sản phẩm</h6>
                      </th>
                      <th class="min-width">
                        <h6 class="text-sm text-medium">Tên sản phẩm</h6>
                      </th>
                      <th class="min-width">
                        <h6 class="text-sm text-medium">Nhà cung cấp</h6>
                      </th>
                      <th>
                        <h6 class="text-sm text-medium text-end">Hành động</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products" :key="product.id">
                      <td>
                        <div class="product">
                          <p class="text-sm">{{ product.productCode }}</p>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm">{{ product.name }}</p>
                      </td>
                      <td>
                        <p class="text-sm">{{ product.supplier.name }} VNĐ</p>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'AdminProductDetail',
                            params: { id: product.id },
                          }"
                          class="status-btn btn btn-primary close-btn"
                          >Xem</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  aria-label="Page navigation example"
                  style="margin-top: 20px"
                  v-if="products"
                >
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
                        v-if="Object.keys(products).length !== 0"
                        class="page-link"
                        @click.prevent="currentPage = page"
                        href="#"
                        >{{ page }}</a
                      >
                    </li>
                    <li class="page-item" v-if="currentPage < totalPage">
                      <a
                        class="page-link"
                        @click.prevent="currentPage++"
                        href="#"
                        >Trang tiếp</a
                      >
                    </li>
                  </ul>
                </nav>
                <!-- End Table -->
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div
              class="title d-flex flex-wrap align-items-center justify-content-between"
            >
              <div class="left">
                <h6 class="text-medium mb-30">Sản phẩm đã bán theo danh mục</h6>
              </div>
            </div>
            <div class="card-style mb-30">
              <canvas id="categories" width="400" height="400"></canvas>
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
import baseRequest from "../../../base/baseRequest";
import Chart from "chart.js";
export default {
  data() {
    return {
      byCategories: {
        labels: null,
        data: null,
      },
      bestSeller: {},
      soldProducts: 0,
      totalProduct: 0,
      bestSupplier: {},
      errors: {},
      products: {},
      totalPage: 0,
      currentPage: 1,
      total: 0,
    };
  },
  watch: {
    currentPage() {
      this.getOutOfStock();
    },
  },
  methods: {
    pushToBestSeller() {
      this.$router.push({
        name: "AdminProductDetail",
        params: { id: this.bestSeller.id },
      });
    },
    pushToBestSupplier() {
      this.$router.push({
        name: "SupplierDetail",
        params: { id: this.bestSupplier.id },
      });
    },
    getOutOfStock() {
      this.$isLoading(true);
      baseRequest
        .get("admin/get_out_of_stock?page=" + this.currentPage)
        .then((response) => {
          this.products = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
    getCardData() {
      baseRequest.get("admin/get_card_product_data").then((response) => {
        this.totalProduct = response.data.totalProduct;
        this.soldProducts = response.data.soldProducts;
        this.bestSeller = response.data.bestSeller;
        this.bestSupplier = response.data.bestSupplier;
      });
    },
    getTurnoverByCategories() {
      baseRequest
        .get("admin/get_sold_products")
        .then((response) => {
          this.byCategories.labels = response.data.labels;
          this.byCategories.data = response.data.data;
        })
        .then(() => {
          const cty = document.getElementById("categories");
          const data = {
            labels: this.byCategories.labels,
            datasets: [
              {
                label: "Sản phẩm đã bán theo danh mục",
                data: this.byCategories.data,
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
              },
            ],
          };
          const categories = new Chart(cty, {
            type: "pie",
            data: data,
          });
          categories;
        });
    },
  },
  beforeMount() {
    this.getTurnoverByCategories();
    this.getCardData();
    this.getOutOfStock();
  },
  mounted() {
    this.$isLoading(false);
  },
};
</script>

<style scoped>
button {
  background-color: black;
}
input {
  font-size: 20px;
}
</style>
