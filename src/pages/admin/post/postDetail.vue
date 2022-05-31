<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="section">
      <div class="container-fluid" v-if="post">
        <h5 class="success" v-if="success">
          <i class="fas fa-check"></i> Thành công!
        </h5>
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title d-flex align-items-center flex-wrap mb-30">
                <h2 class="mr-40">Chi tiết bài viết</h2>
                <div class="post_action">
                  <a
                    @click.prevent="approve"
                    v-if="!post.approved && this.isAdmin"
                    class="main-btn primary-btn btn-hover btn-sm"
                  >
                    <i class="lni lni-plus mr-5"></i> Phê duyệt</a
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
                    <li class="breadcrumb-item active" aria-current="page">
                      Bài viết
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
        <!-- ========== title-wrapper end ========== -->

        <!-- Invoice Wrapper Start -->
        <div class="invoice-wrapper">
          <div class="row">
            <div class="col-12">
              <div class="invoice-card card-style mb-30">
                <div class="invoice-header">
                  <div class="invoice-for">
                    <h2 class="mb-10">
                      Tình trạng bài đăng --
                      <span v-if="!post.approved">Chưa được phê duyệt</span>
                      <span v-if="post.approved">Đã phê duyệt</span>
                    </h2>
                  </div>
                  <div class="invoice-logo">
                    <img src="assets/images/invoice/uideck-logo.svg" alt="" />
                  </div>
                  <div class="address-item">
                    <h5 class="text-bold">Người đăng bài</h5>
                    <h4>{{ user.name }}</h4>
                    <p class="text-sm">Chức vụ: {{ user.position }}</p>
                    <p class="text-sm">
                      <span class="text-medium">Email:</span>
                      {{ user.email }}
                    </p>

                    <p class="text-sm">
                      <span class="text-medium">Số điện thoại:</span>
                      {{ user.phone }}
                    </p>
                  </div>
                  <div class="invoice-date">
                    <p v-if="post.category">
                      <span>Danh mục bài viết: </span> {{ post.category.name }}
                    </p>
                    <p><span>Thời gian lập: </span> {{ post.created_at }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-10 newAdd">
                    <div class="card-style mb-30">
                      <h6 class="mb-25">Nội dung bài viết</h6>
                      <div class="input-style-1">
                        <label>Tiêu đề bài viết</label>
                        <input
                          type="text"
                          :class="{ errorInput: errors.title }"
                          v-model="post.title"
                          placeholder="Tiêu đề bài viết"
                        />
                        <span v-if="errors.title" class="error">{{
                          errors.title[0]
                        }}</span>
                      </div>
                      <div class="select-style-1">
                        <label>Danh mục bài viết</label>
                        <div class="select-position">
                          <select
                            v-model="post.category_id"
                            :class="{ errorInput: errors.category_id }"
                          >
                            <option value="null">
                              Chọn danh mục cho bài viết
                            </option>
                            <option
                              :value="cate.id"
                              v-for="cate in categories"
                              :key="cate.id"
                            >
                              {{ cate.name }}
                            </option>
                          </select>
                          <span v-if="errors.category_id" class="error">{{
                            errors.category_id[0]
                          }}</span>
                        </div>
                        <div class="input-style-1" style="margin-top: 30px">
                          <label>Nội dung bài viết</label>
                          <ckeditor
                            :editor="editor"
                            :class="{ errorInput: errors.content }"
                            v-model="post.content"
                          ></ckeditor>
                          <span v-if="errors.content" class="error">{{
                            errors.content[0]
                          }}</span>
                        </div>
                      </div>
                      <div class="row preview">
                        <p v-if="post.thumbnail">Thumbnail hiện tại</p>
                        <div class="col-md-3">
                          <img
                            :src="imgUrl + post.thumbnail"
                            class="img-responsive"
                            height="70"
                            width="90"
                          />
                        </div>
                      </div>
                      <h6 class="mb-25">Chọn ảnh Khác cho bài viết</h6>
                      <div style="margin-bottom: 20px">
                        <loadfile></loadfile>
                        <span v-if="errors.thumbnail" class="error">{{
                          errors.thumbnail[0]
                        }}</span>
                      </div>

                      <div class="btn-zone">
                        <button @click="$router.back()" class="button">
                          Quay lại
                        </button>
                        <button @click="changeInfor" class="button">
                          Sửa bài viết
                        </button>
                      </div>
                      <!-- end input -->
                    </div>
                  </div>
                </div>
                <!-- End Card -->
              </div>
            </div>
            <!-- ENd Col -->
          </div>
          <!-- End Row -->
        </div>
        <!-- Invoice Wrapper End -->
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import baseRequest from "../../../base/baseRequest";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import loadfile from "../../../components/admin/loadfile.vue";
export default {
  components: { loadfile },
  computed: {
    ...mapGetters(["imgUrl", "pictures", "isAdmin", "authUser"]),
  },
  data() {
    return {
      editor: ClassicEditor,
      categories: {},
      forProduct: "false",
      post: null,
      content: null,
      user: null,
      errors: {},
      success: false,
      fail: false,
    };
  },
  methods: {
    getCategories() {
      baseRequest.get("getCategories", this.forProduct).then((response) => {
        this.categories = response.data;
      });
    },
    async getPost() {
      this.$isLoading(true);
      await baseRequest
        .get("admin/post/" + this.$route.params.id)
        .then((response) => {
          this.post = response.data;
          this.content = response.data.content;
          this.user = response.data.user;
          if (this.authUser.id != this.post.user_id && !this.isAdmin) {
            this.$router.push("/error");
          }
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
    changeInfor() {
      this.$isLoading(true);
      if (this.pictures.length > 0) {
        this.post.thumbnail = this.pictures[0];
      }
      baseRequest
        .put("admin/post/" + this.post.id, this.post)
        .then((response) => {
          if (response.data.success) {
            this.errors = {};
            this.success = true;
          } else {
            this.fail = true;
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
          this.fail = true;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
    approve() {
      baseRequest.post("admin/approve_post/" + this.post.id).then(() => {
        this.post.approved = true;
        this.success = true;
      });
    },
  },
  watch: {
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
  },
  mounted() {},
  beforeMount() {
    this.getPost();

    this.getCategories();
  },
};
</script>

<style scoped lang="scss">
label,
input,
textarea,
i,
select {
  font-size: 16px !important;
}
.primary-btn,
.danger-btn {
  margin-right: 30px;
}
.btn-zone {
  button {
    background-color: black;
  }
}
.newAdd {
  padding-top: 50px;
  margin: 0px auto;
}
</style>
