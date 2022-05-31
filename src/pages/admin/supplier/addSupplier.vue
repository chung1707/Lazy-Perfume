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
                    <h6 class="mb-25">Thêm nhà cung cấp mới</h6>
                    <div class="input-style-1">
                      <label>Tên nhà cung cấp</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.name }"
                        v-model="supplier.name"
                        placeholder="Tên nhà cung cấp"
                      />
                      <span v-if="errors.name" class="error">{{
                        errors.name[0]
                      }}</span>
                    </div>
                    <div class="input-style-1">
                      <label>Email</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.email }"
                        v-model="supplier.email"
                        placeholder="Email"
                      />
                      <span v-if="errors.email" class="error">{{
                        errors.email[0]
                      }}</span>
                    </div>
                    <div class="input-style-1">
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.phone }"
                        v-model="supplier.phone"
                        placeholder="Số điện thoại"
                      />
                      <span v-if="errors.phone" class="error">{{
                        errors.phone[0]
                      }}</span>
                    </div>

                    <div class="input-style-1">
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.address }"
                        v-model="supplier.address"
                        placeholder="Địa chỉ"
                      />
                      <span v-if="errors.address" class="error">{{
                        errors.address[0]
                      }}</span>
                    </div>
                    <h6 class="mb-25">Chọn logo</h6>
                    <div style="margin-bottom: 20px">
                      <loadfile></loadfile>
                    </div>

                    <div class="btn-zone">
                      <button @click="addSupplier" class="button">
                        Thêm nhà cung cấp
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
import baseRequest from "../../../base/baseRequest";
import loadfile from "../../../components/admin/loadfile.vue";

export default {
  components: {
    loadfile,
  },
  data() {
    return {
      supplier: {
        name: "",
        email: "",
        phone: null,
        address: null,
        logo: null,
      },
      errors: {},
      success: false,
      fail: false,
    };
  },
  methods: {
    addSupplier() {
      this.$isLoading(true);
      this.supplier.logo = this.$store.state.pictures[0];
      baseRequest
        .post("admin/add_supplier", this.supplier)
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
