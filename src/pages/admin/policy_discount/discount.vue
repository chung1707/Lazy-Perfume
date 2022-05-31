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
                <h2>Quản lý mã giảm giá</h2>
                <div class="post_action">
                  <router-link
                    to="/admin/addDiscount"
                    class="main-btn primary-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-plus mr-5"></i>Thêm mã giảm giá</router-link
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
                    <li class="breadcrumb-item"><a>Quản lý mã giảm giá</a></li>
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
              <h6 class="mb-10">Mã giảm giá của hệ thống!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="discounts">
                    Tổng cộng: {{ total }} mã giảm giá
                  </p>
                </div>
                <div class="right">
                  <div class="table-search d-flex">
                    <form action="#">
                      <input
                        type="text"
                        v-model="searchKey"
                        placeholder="Search..."
                      />
                      <button class @click.prevent="getDiscounts">
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
                      <th><h6>mã giảm giá</h6></th>
                      <th><h6>Lượng giảm</h6></th>
                      <th><h6>Thời hạn</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="discounts">
                    <tr v-for="discount in discounts" :key="discount.id">
                      <td>
                        <p>{{ discount.code }}</p>
                      </td>
                      <td class="min-width">
                        <p>{{ discount.discount }} %</p>
                      </td>
                      <td class="min-width">
                        <p>{{ discount.validDate }}</p>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'DiscountDetail',
                              params: { id: discount.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deleteDiscount(discount)"
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
                  v-if="discounts"
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
                        v-if="Object.keys(discounts).length !== 0"
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
      searchKey: "",
      discounts: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {
    getDiscounts() {
      console.log(this.searchKey);
      this.$isLoading(true);
      baseRequest
        .get("admin/discount?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.discounts = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deleteDiscount(discount) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            discount.code +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
      let index = this.discounts.indexOf(discount);
      if (index > -1) {
        this.discounts.splice(index, 1);
        this.total -= 1;
      }
      baseRequest
        .delete("admin/discount/" + discount.id, discount.id)
        .then((response) => {
          console.log(response.data);
        });}
    },
  },
  watch: {
    currentPage() {
      this.getDiscounts();
    },
  },
  mounted() {
    this.getDiscounts();
    this.$isLoading(false);
  },
};
</script>
<style scoped>
.post_action {
  margin: 20px 0px;
}
</style>
