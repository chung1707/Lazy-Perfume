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
                <h2>Lịch sử nhập kho!</h2>
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
                    <li class="breadcrumb-item"><a>Lịch sử nhập kho</a></li>
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
              <h6 class="mb-10">Hóa đơn nhập kho!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="bills">
                    Tổng cộng: {{ total }} hóa đơn
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
                      <button class @click.prevent="getBills">
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
                      <th><h6>Người nhập hàng</h6></th>
                      <th><h6>Nhà cung cấp</h6></th>
                      <th><h6>Tổng tiền</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="bills">
                    <tr v-for="bill in bills" :key="bill.id">
                      <td>
                        <div>
                          {{bill.id}}
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ bill.transaction_id }}</p>
                      </td>
                      <td class="min-width">
                        <p>
                          <span>{{ bill.user.name }}</span>
                        </p>
                      </td>
                            <td class="min-width">
                        <p>
                          <span >{{ bill.supplier.name }}</span>
                        </p>
                      </td>
                      <td class="min-width">
                          <p>{{bill.totalPrice}} VNĐ</p>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'BillDetail',
                              params: { id: bill.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                        </div>
                        
                      </td>
                      <td><button
                            @click="deleteBill(bill)"
                            v-if="$store.getters.isAdmin"
                            class="text-danger"
                            style="margin-left: 20px"
                          >
                            <i class="lni lni-trash-can"></i>
                          </button></td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  aria-label="Page navigation example"
                  style="margin-top: 20px"
                  v-if="bills"
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
                        v-if="Object.keys(bills).length !== 0"
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
      bills: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
      key: {
      searchKey: "",
      }
    };
  },
  methods: {
    getBills() {
      this.$isLoading(true);
      baseRequest
        .get("admin/importBills?page=" + this.currentPage, this.key)
        .then((response) => {
          this.bills = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deleteBill(bill){
       if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            bill.transaction_id +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
      let index = this.bills.indexOf(bill);
      if (index > -1) {
        this.bills.splice(index, 1);
        this.total -= 1;
      }
      baseRequest
        .delete("admin/bill/" + bill.id)
        .then((response) => {
          console.log(response.data);
        });}
    }
  },
  watch: {
    currentPage() {
      this.getBills();
    },
  },
  mounted() {
    this.getBills();
    this.$isLoading(false);
  },
};
</script>

<style></style>
