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
                <h2>Quản lý tài khoản khách hàng!</h2>
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
              <h6 class="mb-10">Tài khoản của người dùng!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="clients">
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
                      <button class @click.prevent="getClients">
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
                  <tbody v-if="clients">
                    <tr v-for="client in clients" :key="client.id">
                      <td>
                        <div class="employee-image">
                          <img :src="imgUrl + client.avatar" alt="" />
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ client.name }}</p>
                      </td>
                      <td class="min-width">
                        <p>
                          <a href="#0">{{ client.email }}</a>
                        </p>
                      </td>
                      <td class="min-width">
                        <button
                          class="status-btn active-btn"
                          v-if="!client.blocked"
                          @click="block(client)"
                        >
                          Bình thường
                        </button>
                        <button
                          @click="unBlock(client)"
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
                              params: { id: client.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deleteUser(client)"
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
                  v-if="clients"
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
                        v-if="Object.keys(clients).length !== 0"
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
      clients: {},
      total: 0,
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
    getClients() {
      console.log(this.searchKey);
      this.$isLoading(true);
      baseRequest
        .get("clientAccs?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.clients = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deleteUser(client) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            client.name +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
        let index = this.clients.indexOf(client);
        if (index > -1) {
          this.clients.splice(index, 1);
          this.total -= 1;
        }
        baseRequest.delete("user_delete/" + client.id, client.id);
      }
    },
  },
  watch: {
    currentPage() {
      this.getClients();
    },
  },
  mounted() {
    this.getClients();
    this.$isLoading(false);
  },
};
</script>

<style></style>
