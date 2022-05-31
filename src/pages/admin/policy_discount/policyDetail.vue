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
                <h2>Thêm nhà cung cấp</h2>
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
                      <a href="#0">Thêm nhà cung cấp</a>
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
                    <h6 class="mb-25">Thêm nhà cung cấp</h6>
                    <div class="input-style-1">
                      <label>Tiêu đề</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.title }"
                        v-model="policy.title"
                        placeholder="Tiêu đề"
                      />
                      <span v-if="errors.title" class="error">{{
                        errors.title[0]
                      }}</span>
                    </div>
                    <div class="input-style-1">
                      <label>Nội dung chính sách</label>
                      <textarea
                        placeholder="Mô tả"
                        v-model="policy.content"
                        :class="{ errorInput: errors.content }"
                        rows="5"
                      ></textarea>
                      <span v-if="errors.content" class="error">{{
                        errors.content[0]
                      }}</span>
                    </div>
                    <div class="row preview">
                      <p v-if="policy.logo">ảnh hiện tại</p>
                      <div class="col-md-3">
                        <img
                          :src="imgUrl + policy.logo"
                          class="img-responsive"
                          height="70"
                          width="90"
                        />
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
                      <button @click="changeInfor" class="button">
                        Sửa chính sách
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
      policy: {},
      errors: {},
      success: false,
      fail: false,
      newLogo: null,
    };
  },
  methods: {
    changeInfor() {
      this.$isLoading(true);
      if (this.pictures[0]) {
        this.policy.logo = this.pictures[0];
      }
      baseRequest
        .put("admin/policy/" + this.policy.id, this.policy)
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
        .get("admin/policy/" + this.$route.params.id)
        .then((response) => {
          this.policy = response.data;
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
</style>
