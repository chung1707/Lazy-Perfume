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
                <h2>Quản lý giao diện trang chủ</h2>
              </div>
              <div class="post_action">
                <router-link
                  to="/admin/addbanner/"
                  class="main-btn primary-btn btn-hover btn-sm"
                >
                  <i class="lni lni-plus mr-5"></i>Thêm Banner</router-link
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
                  <p class="text-sm mb-20" v-if="banners">
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
                      <button class @click.prevent="getBanners">
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
                      <th><h6>Banner</h6></th>
                      <th><h6>Tiêu đề</h6></th>
                      <th><h6>Người tạo</h6></th>
                      <th><h6>Trạng thái</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="banners">
                    <tr v-for="banner in banners" :key="banner.id">
                      <td>
                        <div
                          class="employee-image"
                          v-if="banner.banner && banner.type == 'video'"
                        >
                          <video autoplay loop muted plays-inline>
                            <source :src="imgUrl + banner.banner" />
                          </video>
                        </div>
                        <div
                          class="employee-image"
                          v-if="banner.banner && banner.type == 'image'"
                        >
                          <img :src="imgUrl + banner.banner" alt="" />
                        </div>
                        <div class="employee-image" v-if="!banner.banner">
                          <img alt="Không có ảnh" />
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ banner.title }}</p>
                      </td>
   
                      <td class="min-width">
                        <p>{{ banner.user.name }}</p>
                      </td>
                      <td class="min-width">
                        <p v-if="banner.homeBanner">Banner chính</p>
                        <p v-if="banner.thumbnail1">Ảnh danh mục 1</p>
                        <p v-if="banner.thumbnail2">Ảnh danh mục 2</p>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'BannerDetail',
                              params: { id: banner.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deletePolicy(banner)"
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
                  v-if="banners"
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
                        v-if="Object.keys(banners).length !== 0"
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
      banners: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {
    getBanners() {
      this.$isLoading(true);
      baseRequest
        .get("admin/banners?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.banners = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deletePolicy(banner) {
      if (
        confirm(
          "Một số dữ liệu liên quan đến: '" +
            banner.title +
            "' có thể sẽ bị mất. Vẫn xóa?"
        )
      ) {
        let index = this.banners.indexOf(banner);
        if (index > -1) {
          this.banners.splice(index, 1);
          this.total -= 1;
        }
        baseRequest
          .delete("admin/banner/" + banner.id, banner.id)
          .then((response) => {
            console.log(response.data);
          });
      }
    },
  },
  watch: {
    currentPage() {
      this.getBanners();
    },
  },
  mounted() {
    this.getBanners();
  },
};
</script>

<style scoped>
.post_action {
  margin: 20px 0px;
}
</style>
