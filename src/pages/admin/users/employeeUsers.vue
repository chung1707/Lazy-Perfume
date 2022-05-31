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
                <h2>Quản lý tài khoản nhân viên</h2>
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
                    <li class="breadcrumb-item"><a>Quản lý tài khoản</a></li>
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
              <h6 class="mb-10">Tài khoản của nhân viên!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="employees">
                    Tổng cộng: {{ total }} tài khoản
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
                      <button class @click.prevent="getEmployees">
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
                      <th><h6>#</h6></th>
                      <th><h6>Tên</h6></th>
                      <th><h6>Email</h6></th>
                      <th><h6>Trạng thái</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="employees">
                    <tr v-for="employee in employees" :key="employee.id">
                      <td>
                        <div class="employee-image">
                          <img :src="imgUrl + employee.avatar" alt="" />
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ employee.name }}</p>
                      </td>
                      <td class="min-width">
                        <p>
                          <a href="#0">{{ employee.email }}</a>
                        </p>
                      </td>
                      <td class="min-width">
                        <button
                          class="status-btn active-btn"
                          v-if="!employee.blocked"
                          @click="block(employee)"
                        >
                          Bình thường
                        </button>
                        <button
                          @click="unBlock(employee)"
                          class="status-btn danger-btn"
                          v-else
                        >
                          Bị khóa
                        </button>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'UserDetail',
                              params: { id: employee.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deleteUser(employee)"
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
                  v-if="employees"
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
                        v-if="Object.keys(employees).length !== 0"
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
      employees: {},
      total: 0,
      searchKey: "",
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {
    block(user) {
      user.blocked = true;
      baseRequest.post("block_user/" + user.id);
    },
    unBlock(user) {
      user.blocked = false;
      baseRequest.post("unblock_user/" + user.id);
    },
    deleteUser(employee) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            employee.name +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
        let index = this.employees.indexOf(employee);
        if (index > -1) {
          this.employees.splice(index, 1);
          this.total -= 1;
        }
        baseRequest
          .delete("user_delete/" + employee.id, employee.id)
          .then(() => {});
      }
    },
    getEmployees() {
      this.$isLoading(true);
      baseRequest
        .get("employeeAccs?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.employees = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
  },
  watch: {
    currentPage() {
      this.getEmployees();
    },
  },
  mounted() {
    this.getEmployees();
    this.$isLoading(false);
  },
};
</script>

<style></style>
