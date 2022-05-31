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
              <div class="titlemb-30">
                <h2>Đơn hàng đã vận chuyển!</h2>
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
                    <li class="breadcrumb-item"><a>Đơn đã vận chuyển</a></li>
                  </ol>
                </nav>
              </div>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="card-style mb-30">
              <h6 class="mb-10">Đơn hàng đã vận chuyển!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="orders">
                    Tổng cộng: {{ total }} đơn hàng
                  </p>
                </div>
                <div class="right">
                  <div class="table-search d-flex">
                    <form action="#">
                      <input
                        type="text"
                        v-model="key.searchKey"
                        placeholder="Search..."
                      />
                      <button class @click.prevent="getOrders">
                        <i class="lni lni-search-alt"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="table-wrapper table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th><h6>id</h6></th>
                      <th><h6>Mã giao dịch</h6></th>
                      <th><h6>Số điện thoại</h6></th>
                      <th><h6>Tổng tiền</h6></th>
                      <th><h6>Trạng thái</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="orders">
                    <tr v-for="order in orders" :key="order.id">
                      <td>
                        <div>
                          {{ order.id }}
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ order.transaction_id }}</p>
                      </td>
                      <td class="min-width">
                        <p>
                          <a href="#0">{{ order.phone_number }}</a>
                        </p>
                      </td>
                      <td class="min-width">
                        <p>
                          <a href="#0">{{ order.totalPrice }} VNĐ</a>
                        </p>
                      </td>
                      <td class="min-width">
                        <button class="status-btn danger-btn">Đã giao hàng</button>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'OrderDetail',
                              params: { id: order.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deleteOrder(order)"
                            v-if="$store.getters.isAdmin"
                            class="text-danger"
                            style="margin-left: 20px"
                          >
                            <i class="lni lni-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  aria-label="Page navigation example"
                  style="margin-top: 20px"
                  v-if="orders"
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
                        v-if="Object.keys(orders).length !== 0"
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
                <!-- end table -->
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import baseRequest from "../../../base/baseRequest";

export default {
  computed: {
    ...mapGetters(["imgUrl"]),
  },
  components: {},
  data() {
    return {
      orders: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
      key: {
        orderType: "delivered",
        searchKey: "",
      },
    };
  },
  methods: {
    getOrders() {
      this.$isLoading(true);
      baseRequest
        .get("admin/orders?page=" + this.currentPage, this.key)
        .then((response) => {
          this.orders = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deleteOrder(order) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            order.transaction_id +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
        let index = this.orders.indexOf(order);
        if (index > -1) {
          this.orders.splice(index, 1);
          this.total -= 1;
        }
        baseRequest.delete("admin/order/" + order.id).then((response) => {
          console.log(response.data);
        });
      }
    },
  },
  watch: {
    currentPage() {
      this.getOrders();
    },
  },
  mounted() {
    this.getOrders();
    this.$isLoading(false);
  },
};
</script>

<style></style>
