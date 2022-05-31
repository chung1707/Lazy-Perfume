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
                <h2>Quản lý danh mục!</h2>
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
                    <li class="breadcrumb-item"><a>Quản lý danh mục</a></li>
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
              <h6 class="mb-10">Danh mục của người dùng!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="categories">
                    Tổng cộng: {{ total }} danh mục
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
                      <th><h6>loại danh mục</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="categories">
                    <tr v-for="category in categories" :key="category.id">
                      <td>
                        <p>{{ category.id }}</p>
                      </td>
                      <td class="min-width">
                        <p>{{ category.name }}</p>
                      </td>
                      <td class="min-width">
                        <p>
                          <span v-if="category.for_product"
                            >Danh mục sản phẩm</span
                          >
                          <span v-else>Danh mục bài viết</span>
                        </p>
                      </td>

                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'CategoryDetail',
                              params: { id: category.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>

                          <button
                            @click="deleteCategory(category)"
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
                  v-if="categories"
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
                        v-if="Object.keys(categories).length !== 0"
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
      deleteLink: "admin/category/",
      searchKey: "",
      categories: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {
    getClients() {
      console.log(this.searchKey);
      this.$isLoading(true);
      baseRequest
        .get("admin/category?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.categories = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deleteCategory(category) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            category.name +
            "' có thể sẽ bị mất. Vẫn xóa!"
        )
      ) {
        let index = this.categories.indexOf(category);
        if (index > -1) {
          this.categories.splice(index, 1);
          this.total -= 1;
        }
        baseRequest.delete("admin/category/" + category.id);
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
