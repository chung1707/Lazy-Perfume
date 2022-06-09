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
                <h2>Sửa banner</h2>
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
                      <a href="#0">Sửa banner</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div class="form-elements-wrapper">
              <div class="row">
                <div class="col-lg-6 newAdd">
                  <!-- input style start -->
                  <div class="card-style mb-30">
                    <h6 class="mb-25">Sửa banner</h6>
                    <div class="input-style-1">
                      <label>Tiêu đề</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.title }"
                        v-model="banner.title"
                        placeholder="Tiêu đề"
                      />
                      <span v-if="errors.title" class="error">{{
                        errors.title[0]
                      }}</span>
                    </div>
                    <div class="input-style-1">
                      <label>Nội dung banner</label>
                      <textarea
                        placeholder="Mô tả"
                        v-model="banner.description"
                        :class="{ errorInput: errors.description }"
                        rows="5"
                      ></textarea>
                      <span v-if="errors.description" class="error">{{
                        errors.description[0]
                      }}</span>
                    </div>
                    <div class="select-style-1">
                      <label>Đặt làm</label>
                      <div class="position_box">
                        <div
                          class="form-check checkbox-style checkbox-success mb-20"
                        >
                          <input
                            class="form-check-input"
                            value="true"
                            type="checkbox"
                            v-model="banner.homeBanner"
                            :checked="banner.homeBanner"
                            id="checkbox-3"
                          />
                          <label
                            class="form-check-label"
                            style=""
                            for="checkbox-3"
                          >
                            Banner chính</label
                          >
                        </div>
                        <div
                          class="form-check checkbox-style checkbox-success mb-20"
                        >
                          <input
                            class="form-check-input"
                            value="true"
                            :checked="banner.thumbnail1"
                            type="checkbox"
                            v-model="banner.thumbnail1"
                            id="checkbox-2"
                          />
                          <label
                            class="form-check-label"
                            style=""
                            for="checkbox-2"
                          >
                            Banner danh mục 1</label
                          >
                        </div>
                        <div
                          class="form-check checkbox-style checkbox-success mb-20"
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :checked="banner.thumbnail2"
                            v-model="banner.thumbnail2"
                            value="true"
                            id="checkbox-1"
                          />
                          <label
                            class="form-check-label"
                            style=""
                            for="checkbox-1"
                          >
                            Banner danh mục 2</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="select-style-1">
                      <label>Chọn loại banner</label>
                      <div class="select-position">
                        <select
                          v-model="banner.type"
                          :class="{ errorInput: errors.for_product }"
                        >
                          <option value="image">Ảnh</option>
                          <option value="video">Video</option>
                        </select>
                        <span v-if="errors.type" class="error">{{
                          errors.type[0]
                        }}</span>
                      </div>
                    </div>
                    <div class="row preview">
                      <p v-if="banner.banner">ảnh hiện tại</p>
                      <div class="col-md-3" v-if="banner.type == 'image'">
                        <img
                          :src="imgUrl + banner.banner"
                          class="img-responsive"
                          height="70"
                          width="90"
                        />
                      </div>
                      <div class="col-md-3" v-if="banner.type == 'video'">
                        <video
                          style="max-width: 500%"
                          autoplay
                          loop
                          muted
                          plays-inline
                        >
                          <source
                            :src="imgUrl + banner.banner"
                            class="img-responsive"
                            height="70"
                            width="90"
                          />
                        </video>
                      </div>
                    </div>
                    <h6 class="mb-25">Chọn ảnh mới</h6>
                    <div style="margin-bottom: 20px">
                      <loadfile></loadfile>
                      <span v-if="errors.logo" class="error">{{
                        errors.logo[0]
                      }}</span>
                    </div>

                    <div class="btn-zone">
                      <button @click.prevent="$router.back()" class="button">
                        Quay lại
                      </button>
                      <button @click="changeInfor" class="button">
                        Sửa banner
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
import { mapGetters } from "vuex";
import loadfile from "../../../components/admin/loadfile.vue";
import baseRequest from "../../../base/baseRequest";
export default {
  components: {
    loadfile,
  },
  computed: {
    ...mapGetters(["imgUrl", "pictures"]),
  },
  data() {
    return {
      banner: {},
      errors: {},
      success: false,
      fail: false,
      newLogo: null,
      type: null,
    };
  },
  methods: {
    changeInfor() {
      this.$isLoading(true);
      if (this.pictures[0]) {
        this.banner.banner = this.pictures[0];
      }
      baseRequest.put("admin/banner/" + this.banner.id, this.banner)
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
    getSupplier() {
      this.$isLoading(true);
      baseRequest
        .get("admin/banner/" + this.$route.params.id)
        .then((response) => {
          this.banner = response.data;
          this.type = response.data.type;
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
    this.getSupplier();
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
.form-check-label {
  line-height: 31px;
}
.position_box {
  display: flex;
  justify-content: space-between;
}
</style>
