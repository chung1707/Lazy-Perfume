<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="tab-components">
      <div class="container-fluid">
        <h5 class="success" v-if="success">
          <i class="fas fa-check"></i>thành công!
        </h5>
        <h5 class="fail" v-if="fail">Đã có lỗi sảy ra!</h5>
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title mb-30">
                <h2>Thêm bài viết</h2>
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
                      <a href="#0">Thêm bài viết</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div class="form-elements-wrapper">
              <div class="row">
                <div class="col-lg-10 newAdd">
                  <!-- input style start -->
                  <div class="card-style mb-30">
                    <h6 class="mb-25">Thêm bài viết mới</h6>
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
                    <h6 class="mb-25">Chọn ảnh cho bài viết</h6>
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
                      <button @click="createPost" class="button">
                        Thêm bài viết
                      </button>
                    </div>
                    <!-- end input -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import baseRequest from "../../base/baseRequest";
import loadfile from "../../components/admin/loadfile.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    loadfile,
  },
  data() {
    return {
      editor: ClassicEditor,
      categories: {},
      forProduct: "false",
      post: {
        title: "",
        content: "",
        category_id: null,
        thumbnail: null,
      },
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
    createPost() {
      this.$isLoading(true);
      this.post.thumbnail = this.$store.state.pictures[0];
      baseRequest
        .post("admin/post", this.post)
        .then((response) => {
          if (response.data.success) {
            this.errors = {};
            this.success = true;
          } else {
            this.errors = {};
            this.fail = true;
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.fail = true;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
  },
  watch: {
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
    fail() {
      setTimeout(() => (this.fail = false), 1500);
    },
  },
  mounted() {
    this.$isLoading(false);
    this.getCategories();
  },
  beforeRouteLeave() {
    this.$store.commit("setPictures", []);
  },
};
</script>

<style scoped lang="scss">
input,
textarea,
select {
  font-size: 13px;
}
.button {
  background-color: black;
  border-color: black;
}
.btn-zone {
  justify-content: space-between;
}
.btn-zone-top {
  margin-bottom: 50px;
  button {
    margin-right: 30px;
  }
}
.newAdd {
  margin: 0px auto;
}
.result {
  padding: 10px 0px;
  border: 1px solid grey;
  border-radius: 3px;
  li {
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
  }
}
.sumPrice {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
