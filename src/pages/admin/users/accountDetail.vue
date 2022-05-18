<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="section">
      <h5 class="success" v-if="success">
        <i class="fas fa-check"></i> Sửa đổi thông tin thành công!
      </h5>
      <h5 class="fail" v-if="fail">Sửa đổi thất bại. Vui lòng thử lại sau!</h5>
      <div class="container-fluid" v-if="user">
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="titlemb-30">
                <h2>Hồ sơ tài khoản: {{ user.name }}</h2>
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
                      <a href="#0">Chi tiết tài khoản</a>
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

        <div class="row">
          <div class="col-lg-6">
            <div class="card-style settings-card-1 mb-30">
              <div
                class="title mb-30 d-flex justify-content-between align-items-center"
              >
                <h6>Thông tin tài khoản</h6>
                <button class="border-0 bg-transparent">
                  <i class="lni lni-pencil-alt"></i>
                </button>
              </div>
              <div class="profile-info">
                <div class="d-flex align-items-center mb-30">
                  <div class="profile-image">
                    <img :src="imgUrl + user.avatar" alt="" />
                    <div class="update-image">
                      <input type="file" />
                      <label for=""><i class="lni lni-cloud-upload"></i></label>
                    </div>
                  </div>
                  <div class="profile-meta">
                    <h5 class="text-bold text-dark mb-10">{{ user.name }}</h5>
                    <p class="text-sm text-gray">
                      Quyền hạn:
                      <span v-if="user.role_id == 1">Quản trị viên</span>
                      <span v-if="user.role_id == 2">Khách hàng</span>
                      <span v-if="user.role_id == 3">Nhân viên</span>
                    </p>
                  </div>
                </div>
                <!-- <div>
                  <ImgUploader></ImgUploader>
                </div> -->
                <div>
                  <loadfile></loadfile>
                </div>
                <!-- <loader></loader> -->
                <div class="input-style-1" v-if="isAdmin">
                  <label>Chức vụ:</label>
                  <input
                    type="text"
                    v-model="user.position"
                    :class="{ errorInput: error.position }"
                  />
                  <span class="error" v-if="error.position">{{
                    error.position[0]
                  }}</span>
                </div>
                <div class="input-style-1"  v-if="roles">
                  <label>Quyền tài khoản</label>
                  <div class="select-style-2">
                    <div class="select-position">
                      <select v-model="user.role_id">
                        <option :value="role.id" v-for="role in roles" :key="role.id">{{role.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="input-style-1">
                  <label>Thời gian tạo tài khoản:</label>
                  <input type="text" disabled v-model="user.created_at" />
                </div>
                <div class="input-style-1" v-if="isAdmin">
                  <label>Hưởng lương:</label>
                  <input
                    type="text"
                    :class="{ errorInput: error.wage }"
                    v-model="user.wage"
                  />
                  <span class="error" v-if="error.wage">{{
                    error.wage[0]
                  }}</span>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
          <div class="col-lg-6">
            <div class="card-style settings-card-2 mb-30">
              <div class="title mb-30">
                <h6>Thông tin cá nhân</h6>
              </div>
              <form action="#">
                <div class="row">
                  <div class="col-12">
                    <div class="input-style-1">
                      <label>Tên người dùng:</label>
                      <input
                        type="text"
                        v-model="user.name"
                        :class="{ errorInput: error.name }"
                        placeholder="Full Name"
                      />
                      <span class="error" v-if="error.name">{{
                        error.name[0]
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-style-1">
                      <label>Email</label>
                      <input
                        type="email"
                        v-model="user.email"
                        :class="{ errorInput: error.email }"
                        placeholder="Email"
                      />
                      <span class="error" v-if="error.email">{{
                        error.email[0]
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-style-1">
                      <label>Số điện thoại</label>
                      <input
                        :class="{ errorInput: error.phone }"
                        type="text"
                        v-model="user.phone"
                        placeholder="Số điện thoại"
                      />
                      <span class="error" v-if="error.phone">{{
                        error.phone[0]
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-style-1">
                      <label>Address</label>
                      <input
                        :class="{ errorInput: error.address }"
                        type="text"
                        v-model="user.address"
                        placeholder="Address"
                      />
                      <span class="error" v-if="error.address">{{
                        error.address[0]
                      }}</span>
                    </div>
                  </div>
                  <div class="col-12 btn-zone">
                    <button
                      @click.prevent="changeInfor"
                      class="main-btn primary-btn btn-hover"
                    >
                      Cập nhập
                    </button>
                    <button
                      @click.prevent="$router.back()"
                      class="main-btn danger-btn btn-hover"
                    >
                      Quay lại
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import baseRequest from "../../../base/baseRequest";
import loadfile from "../../../components/admin/loadfile.vue";
export default {
  components: {
    // ImgUploader,
    loadfile,
  },
  computed: {
    ...mapGetters(["imgUrl", "authUser", "isAdmin"]),
  },
  data() {
    return {
      user: null,
      error: {},
      success: false,
      fail: false,
      roles: null,
    };
  },
  methods: {
    async getUser() {
      await baseRequest
        .get("admin/user/" + this.$route.params.id)
        .then((response) => {
          this.user = response.data.user;
          this.roles = response.data.roles;
          this.$isLoading(false);
        });
    },
    changeInfor() {
      this.$isLoading(true);
      if (this.$store.state.pictures.length > 0) {
        this.user.avatar = this.$store.state.pictures[0];
      }
      baseRequest
        .post("admin/changeInfor", this.user)
        .then((response) => {
          if (response.data.status == 401) {
            return (this.fail = true);
          } else {
            // this.$store.commit("setAuthUser", response.data.user);
            console.log(response.data);
            this.success = true;
            this.error = {};
            this.$isLoading(false);
          }
        })
        .catch((error) => {
          this.error = error.response.data.errors;
          console.log(this.error);
          this.success = false;
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
    this.getUser();
    this.$isLoading(false);
  },
  beforeRouteLeave() {
    this.$store.commit("setPictures", []);
  },
};
</script>

<style scoped>
label,
input,
textarea,
i,
select {
  font-size: 16px !important;
}
</style>
