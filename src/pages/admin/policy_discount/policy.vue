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
                <h2>Quản lý chính sách bán hàng</h2>
              </div>
              <div class="post_action">
                <router-link
                  to="/admin/addPolicy"
                  class="main-btn primary-btn btn-hover btn-sm"
                >
                  <i class="lni lni-plus mr-5"></i>Thêm chính sách</router-link
                >
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
                    <li class="breadcrumb-item">
                      <a>Quản lý chính sách bán hàng</a>
                    </li>
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
              <h6 class="mb-10">Chính sách bán hàng của hệ thống!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="policies">
                    Tổng cộng: {{ total }} chính sách
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
                      <button class @click.prevent="getPolicies">
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
                      <th><h6>Logo</h6></th>
                      <th><h6>Tên chính sách</h6></th>
                      <th><h6>Nội dung</h6></th>
                      <th><h6>Người tạo</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="policies">
                    <tr v-for="policy in policies" :key="policy.id">
                      <td>
                        <div class="employee-image" v-if="policy.logo">
                          <img :src="imgUrl + policy.logo" alt="" />
                        </div>
                        <div class="employee-image" v-else>
                          <img alt="Không có ảnh" />
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ policy.title }}</p>
                      </td>
                      <td class="min-width">
                        <p>{{ policy.content }}</p>
                      </td>
                      <td class="min-width">
                        <p>{{ policy.user.name }}</p>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'PolicyDetail',
                              params: { id: policy.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deletePolicy(policy)"
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
                  v-if="policies"
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
                        v-if="Object.keys(policies).length !== 0"
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
      policies: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {
    getPolicies() {
      console.log(this.searchKey);
      this.$isLoading(true);
      baseRequest
        .get("admin/policy?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.policies = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deletePolicy(policy) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            policy.title +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
        let index = this.policies.indexOf(policy);
        if (index > -1) {
          this.policies.splice(index, 1);
          this.total -= 1;
        }
        baseRequest
          .delete("admin/policy/" + policy.id, policy.id)
          .then((response) => {
            console.log(response.data);
          });
      }
    },
  },
  watch: {
    currentPage() {
      this.getPolicies();
    },
  },
  mounted() {
    this.getPolicies();
    this.$isLoading(false);
  },
};
</script>

<style scoped>
.post_action {
  margin: 20px 0px;
}
</style>
