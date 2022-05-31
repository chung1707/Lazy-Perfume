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
                <h2>Thêm mã giảm giá</h2>
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
                      <a href="#0">Thêm mã giảm giá</a>
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
                    <h6 class="mb-25">Thêm mã giảm giá mới</h6>
                    <div class="input-style-1">
                      <label>Mã (code giảm giá)</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.code }"
                        v-model="discount.code"
                        placeholder="Mã"
                      />
                      <span v-if="errors.code" class="error">{{
                        errors.code[0]
                      }}</span>
                    </div>
                    <div class="input-style-1">
                      <label>Mức giảm (%)</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.discount }"
                        v-model="discount.discount"
                        placeholder="vd(10% -> nhập 10)"
                      />
                      <span v-if="errors.discount" class="error">{{
                        errors.discount[0]
                      }}</span>
                    </div>
                    <div class="input-style-1">
                      <label>Hiệu lực đến ngày</label>
                      <input
                        type="date"
                        :class="{ errorInput: errors.validDate }"
                        v-model="discount.validDate"
                        placeholder="vd(10% -> nhập 10)"
                      />
                      <span v-if="errors.validDate" class="error">{{
                        errors.validDate[0]
                      }}</span>
                    </div>

                    <div class="btn-zone">
                      <button @click="addDiscount" class="button">
                        Thêm mã giảm giá
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

export default {
  components: {},
  data() {
    return {
      discount: {
        code: "",
        discount: "",
        validDate: null,
      },
      errors: {},
      success: false,
      fail: false,
    };
  },
  methods: {
    addDiscount() {
      this.$isLoading(true);
      console.log(this.discount.validDate);
      baseRequest
        .post("admin/discount", this.discount)
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
