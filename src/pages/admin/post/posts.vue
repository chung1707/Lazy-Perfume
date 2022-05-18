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
                <h2>Quản lý bài viết</h2>
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
                    <li class="breadcrumb-item"><a>Quản lý bài viết</a></li>
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
              <h6 class="mb-10">Bài viết của người dùng!</h6>
              <div
                class="d-flex flex-wrap justify-content-between align-items-center py-3"
              >
                <div class="left">
                  <p class="text-sm mb-20" v-if="posts">
                    Tổng cộng: {{ total }} bài viết
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
                      <button class @click.prevent="getPosts">
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
                      <th><h6>logo</h6></th>
                      <th><h6>Tiêu đề</h6></th>
                      <th><h6>Thể loại</h6></th>
                      <th><h6>Người đăng</h6></th>
                    </tr>
                    <!-- end table row-->
                  </thead>
                  <tbody v-if="posts">
                    <tr v-for="post in posts" :key="post.id">
                      <td>
                        <div class="employee-image" v-if="post.thumbnail">
                          <img :src="imgUrl + post.thumbnail" alt="" />
                        </div>
                        <div class="employee-image" v-else>
                          <img alt="Không có ảnh" />
                        </div>
                      </td>
                      <td class="min-width">
                        <p>{{ post.title }}</p>
                      </td>
                      <td class="min-width">
                          <p >{{post.category.name}}</p>
                      </td>
                         <td class="min-width">
                          <p >{{post.user.name}}</p>
                      </td>
                      <td>
                        <div class="action">
                          <router-link
                            :to="{
                              name: 'UserDetail',
                              params: { id: post.id },
                            }"
                            class="text-success"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </router-link>
                          <button
                            @click="deleteUser(post)"
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
                  v-if="posts"
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
                        v-if="Object.keys(posts).length !== 0"
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
      posts: {},
      total: 0,
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {

    getPosts() {
      console.log(this.searchKey);
      this.$isLoading(true);
      baseRequest
        .get("admin/post?page=" + this.currentPage, this.searchKey)
        .then((response) => {
          this.posts = response.data.data;
          this.total = response.data.total;
          this.totalPage = response.data.last_page;
          this.$isLoading(false);
        });
    },
    deleteUser(post) {
      let index = this.posts.indexOf(post);
      if (index > -1) {
        this.posts.splice(index, 1);
        this.total -= 1;
      }
      baseRequest
        .delete("user_delete/" + post.id, post.id)
        .then((response) => {
          console.log(response.data);
        });
    },
  },
  watch: {
    currentPage() {
      this.getPosts();
    },
  },
  mounted() {
    this.getPosts();
    this.$isLoading(false);
  },
};
</script>

<style></style>
