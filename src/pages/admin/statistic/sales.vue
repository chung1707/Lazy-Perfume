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
                <h2>Trang thống doanh số</h2>
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
                <h6 class="mb-10">Tổng hóa đơn nhập hàng</h6>
                <h3 class="text-bold mb-10">{{ totalBill }}</h3>
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
                <h6 class="mb-10">Tổng cộng doanh thu</h6>
                <h3 class="text-bold mb-10">{{ turnover }} VNĐ</h3>
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
                <h6 class="mb-10">Tổng phí nhập hàng</h6>
                <h3 class="text-bold mb-10">{{ importFee }} VNĐ</h3>
                <p class="text-sm text-danger">
                  <router-link to="/admin/importHistory" class="text-gray"
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
                <h6 class="mb-10">Chênh lệch thu chi</h6>
                <h3 class="text-bold mb-10">{{ turnover - importFee }} VNĐ</h3>
                <p class="text-sm text-danger"></p>
              </div>
            </div>
            <!-- End Icon Cart -->
          </div>
          <!-- End Col -->
        </div>
        <div class="rangeFilter row">
          <div class="form-elements-wrapper col-6">
            <div class="row">
              <div class="col-lg-12 newAdd">
                <!-- input style start -->
                <div class="card-style mb-30">
                  <h6 class="mb-25">Thống kê doanh thu theo mốc thời gian</h6>

                  <div class="input-style-1">
                    <label>Chọn ngày bắt đầu</label>
                    <input
                      type="date"
                      :class="{ errorInput: errors.start }"
                      v-model="revenuePeriod.start"
                    />
                    <span v-if="errors.start" class="error">{{
                      errors.start[0]
                    }}</span>
                  </div>
                  <div class="input-style-1">
                    <label>Chọn ngày kết thúc</label>
                    <input
                      type="date"
                      v-model="revenuePeriod.end"
                      :class="{ errorInput: errors.end }"
                    />
                    <span v-if="errors.end" class="error">{{
                      errors.end[0]
                    }}</span>
                  </div>
                  <div class="input-style-1">
                    <label
                      >Doanh thu trong khoảng: {{ revenuePeriod.start }} đến:
                      {{ revenuePeriod.end }}
                    </label>
                    <input type="text" disabled v-model="revenueResult" />
                  </div>
                  <div class="btn-zone">
                    <button class="button" @click.prevent="checkTurnOver">
                      Hiển thị kết quả
                    </button>
                  </div>
                  <!-- end input -->
                </div>
              </div>
            </div>
          </div>
          <div class="form-elements-wrapper col-6">
            <div class="row">
              <div class="col-lg-12 newAdd">
                <!-- input style start -->
                <div class="card-style mb-30">
                  <h6 class="mb-25">
                    Thống kê chi phí nhập hàng theo mốc thời gian
                  </h6>

                  <div class="input-style-1">
                    <label>Chọn ngày bắt đầu</label>
                    <input
                      type="date"
                      v-model="costPeriod.Start"
                      :class="{ errorInput: errors.Start }"
                    />
                    <span v-if="errors.Start" class="error">{{
                      errors.Start[0]
                    }}</span>
                  </div>
                  <div class="input-style-1">
                    <label>Chọn ngày kết thúc</label>
                    <input
                      type="date"
                      v-model="costPeriod.End"
                      :class="{ errorInput: errors.End }"
                    />
                    <span v-if="errors.End" class="error">{{
                      errors.End[0]
                    }}</span>
                  </div>
                  <div class="input-style-1">
                    <label
                      >Chi phí nhập hàng trong khoảng:
                      {{ costPeriod.Start }} đến: {{ costPeriod.End }}
                    </label>
                    <input type="text" disabled v-model="costResult" />
                  </div>
                  <div class="btn-zone">
                    <button @click="checkFee" class="button">
                      Hiển thị kết quả
                    </button>
                  </div>
                  <!-- end input -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- End Col -->
          <div class="col-lg-6">
            <div
              class="title d-flex flex-wrap align-items-center justify-content-between"
            >
              <div class="left">
                <h6 class="text-medium mb-30">Doanh thu các tháng gần nhất</h6>
              </div>
            </div>
            <div class="card-style mb-30">
              <canvas id="months" width="400" height="400"></canvas>
            </div>
          </div>
          <div class="col-lg-6">
            <div
              class="title d-flex flex-wrap align-items-center justify-content-between"
            >
              <div class="left">
                <h6 class="text-medium mb-30">Tỷ lệ hoàn thành đơn hàng</h6>
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
      Months: {
        sixMonths: null,
        monthNames: null,
      },
      byCategories: {
        labels: null,
        data: null,
      },
      revenuePeriod: {
        start: null,
        end: null,
      },
      revenueResult: null,
      costPeriod: {
        Start: null,
        End: null,
      },
      costResult: null,
      importFee: 0,
      turnover: 0,
      totalBill: 0,
      errors: {},
    };
  },
  methods: {
    checkTurnOver() {
      this.$isLoading(true);
      baseRequest
        .post("admin/check_turnover", this.revenuePeriod)
        .then((response) => {
          this.revenueResult = response.data + "VNĐ";
          this.errors = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.fail = true;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
    checkFee() {
      this.$isLoading(true);
      baseRequest
        .post("admin/check_fee", this.costPeriod)
        .then((response) => {
          this.costResult = response.data + "VNĐ";
          this.errors = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.fail = true;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
    getCardData() {
      baseRequest.get("admin/get_card_data").then((response) => {
        this.totalBill = response.data.totalBill;
        this.turnover = response.data.turnover;
        this.importFee = response.data.importFee;
      });
    },
    getTurnover6Months() {
      baseRequest
        .get("admin/turnover_6_monthds")
        .then((response) => {
          this.Months.sixMonths = response.data.months;
          this.Months.monthNames = response.data.monthNames;
        })
        .then(() => {
          const ctx = document.getElementById("months");
          const monthds = new Chart(ctx, {
            type: "bar",
            data: {
              labels: this.Months.monthNames,
              datasets: [
                {
                  label: "Doanh thu(VNĐ)",
                  data: this.Months.sixMonths,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
          monthds;
        });
    },
    getTurnoverByCategories() {
      baseRequest
        .get("admin/turnover_by_categories")
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
                label: "Tỷ lệ hoàn thành đơn hàng",
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
    this.getTurnover6Months();
    this.getTurnoverByCategories();
    this.getCardData();
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
