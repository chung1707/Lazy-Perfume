<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="tab-components" v-if="product">
      <h5 class="success" v-if="success">
        <i class="fas fa-check"></i> Sửa đổi thông tin thành công!
      </h5>
      <h5 class="fail" v-if="fail">Sửa đổi thất bại!</h5>
      <div class="container-fluid">
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title mb-30">
                <h2>Sửa đổi thông tin sản phẩm: {{ product.productCode }}</h2>
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
                      <a href="#0">Sửa thông tin sản phẩm</a>
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

        <!-- ========== form-elements-wrapper start ========== -->
        <div class="form-elements-wrapper">
          <div class="row">
            <div class="col-lg-6">
              <!-- input style start -->
              <div class="card-style mb-30">
                <h6 class="mb-25">Thông tin sản phẩm</h6>
                <div class="input-style-1">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    :class="{ errorInput: error.name }"
                    placeholder="Tên sản phẩm"
                  />
                  <span class="error" v-if="error.name">{{
                    error.name[0]
                  }}</span>
                </div>
                <div class="input-style-1">
                  <label>Giá sản phẩm (VNĐ)</label>
                  <input
                    type="text"
                    v-model="product.price"
                    :class="{ errorInput: error.price }"
                    placeholder="Giá sản phẩm"
                  />
                  <span class="error" v-if="error.price">{{
                    error.price[0]
                  }}</span>
                </div>
                <div class="input-style-1">
                  <label>Dung tích (Ml)</label>
                  <input
                    type="text"
                    v-model="product.capacity"
                    :class="{ errorInput: error.capacity }"
                    placeholder="Dung tích sản phẩm"
                  />
                  <span class="error" v-if="error.capacity">{{
                    error.capacity[0]
                  }}</span>
                </div>
                <div class="input-style-1">
                  <label>Giảm giá (%)</label>
                  <input
                    v-model="product.discount"
                    type="text"
                    :class="{ errorInput: error.discount }"
                    placeholder="Nhập phần trăm giảm giá (vd: 10)"
                  />
                  <span class="error" v-if="error.discount">{{
                    error.discount[0]
                  }}</span>
                </div>
                <div class="select-style-1">
                  <label>Danh mục sản phẩm</label>
                  <div class="select-position">
                    <select
                      v-model="product.category_id"
                      :class="{ errorInput: v$.product.category_id.$error }"
                    >
                      <option value="null">Chọn danh mục sản phẩm</option>
                      <option
                        :value="cate.id"
                        v-for="cate in categories"
                        :key="cate.id"
                      >
                        {{ cate.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <h6 class="mb-25">Sửa ảnh sản phẩm</h6>

                <div style="margin-bottom: 20px">
                  <loadfile></loadfile>
                </div>
                <div class="btn-zone">
                  <button @click="$router.back()" class="button">
                    quay lại
                  </button>
                  <button class="button" @click="changeProduct">
                    sửa thông tin
                  </button>
                </div>
                <!-- end input -->
              </div>
            </div>

            <!-- end col -->
            <div class="col-lg-6">
              <!-- ======= textarea style start ======= -->
              <div class="card-style mb-30">
                <h6 class="mb-25">Thông tin chi tiết sản phẩm</h6>
                <div class="input-style-1">
                  <label>Mô tả sản phẩm</label>
                  <textarea
                    placeholder="Mô tả"
                    :class="{ errorInput: error.description }"
                    v-model="productDetail.description"
                    rows="5"
                  ></textarea>
                  <span class="error" v-if="error.description">{{
                    error.discount[0]
                  }}</span>
                </div>
                <div class="input-style-1">
                  <label>Mùi hương chủ đạo</label>
                  <input
                    type="text"
                    v-model="productDetail.fragrant.scent"
                    :class="{
                      errorInput: v$.productDetail.fragrant.scent.$error,
                    }"
                    placeholder="Hương chính của sản phẩm"
                  />
                  <span
                    class="error"
                    v-if="v$.productDetail.fragrant.scent.$error"
                  >
                    <span
                      v-if="
                        v$.productDetail.fragrant.scent.$errors[0].$params
                          .type == 'required'
                      "
                    >
                      Trường này không được bỏ trống!
                    </span>
                  </span>
                </div>
                <div class="input-style-1">
                  <label>Hương đầu</label>
                  <input
                    type="text"
                    :class="{
                      errorInput: v$.productDetail.fragrant.topNotes.$error,
                    }"
                    v-model="productDetail.fragrant.topNotes"
                    placeholder="vd: hương gỗ,hương trái cây"
                  />
                  <span
                    class="error"
                    v-if="v$.productDetail.fragrant.topNotes.$error"
                  >
                    <span
                      v-if="
                        v$.productDetail.fragrant.topNotes.$errors[0].$params
                          .type == 'required'
                      "
                    >
                      Trường này không được bỏ trống!
                    </span>
                  </span>
                </div>
                <div class="input-style-1">
                  <label>Hương giữa</label>
                  <input
                    type="text"
                    :class="{
                      errorInput: v$.productDetail.fragrant.middleNotes.$error,
                    }"
                    v-model="productDetail.fragrant.middleNotes"
                    placeholder="Hương chính của sản phẩm"
                  />
                  <span
                    class="error"
                    v-if="v$.productDetail.fragrant.middleNotes.$error"
                  >
                    <span
                      v-if="
                        v$.productDetail.fragrant.middleNotes.$errors[0].$params
                          .type == 'required'
                      "
                    >
                      Trường này không được bỏ trống!
                    </span>
                  </span>
                </div>
                <div class="input-style-1">
                  <label>Hương cuối</label>
                  <input
                    type="text"
                    v-model="productDetail.fragrant.baseNote"
                    :class="{
                      errorInput: v$.productDetail.fragrant.baseNote.$error,
                    }"
                    placeholder="Hương chính của sản phẩm"
                  />
                  <span
                    class="error"
                    v-if="v$.productDetail.fragrant.baseNote.$error"
                  >
                    <span
                      v-if="
                        v$.productDetail.fragrant.baseNote.$errors[0].$params
                          .type == 'required'
                      "
                    >
                      Trường này không được bỏ trống!
                    </span>
                  </span>
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Độ lưu hương (Giờ)</label>
                    <input
                      type="text"
                      :class="{ errorInput: error.saveIncense }"
                      v-model="productDetail.saveIncense"
                      placeholder="Thời gian lưu hương (vd: 8 giờ -> 8)"
                    />
                    <span class="error" v-if="error.saveIncense">{{
                      error.saveIncense[0]
                    }}</span>
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Nồng độ</label>
                    <input
                      type="text"
                      :class="{ errorInput: error.concentration }"
                      v-model="productDetail.concentration"
                      placeholder="Nồng độ (vd: EDP)"
                    />
                    <span class="error" v-if="error.concentration">{{
                      error.concentration[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Năm xuất bản</label>
                    <input
                      type="number"
                      :class="{ errorInput: error.release }"
                      v-model="productDetail.release"
                      placeholder="Xuất bản"
                    />
                    <span class="error" v-if="error.release">{{
                      error.release[0]
                    }}</span>
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Độ tuổi khuyên dùng</label>
                    <input
                      type="number"
                      v-model="productDetail.age"
                      :class="{ errorInput: error.age }"
                      placeholder="Khuyên dùng"
                    />
                    <span class="error" v-if="error.age">{{
                      error.age[0]
                    }}</span>
                  </div>
                </div>

                <h6 class="mb-25">Điểm khuyên dùng theo mùa</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-3">
                    <label>Xuân</label>
                    <input
                      type="number"
                      v-model="productDetail.spring"
                      :class="{ errorInput: error.spring }"
                      placeholder="vd: 70"
                    />
                    <span class="error" v-if="error.spring">{{
                      error.spring[0]
                    }}</span>
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Hạ</label>
                    <input
                      type="number"
                      :class="{ errorInput: error.summer }"
                      v-model="productDetail.summer"
                    />
                    <span class="error" v-if="error.summer">{{
                      error.summer[0]
                    }}</span>
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Thu</label>
                    <input
                      type="number"
                      v-model="productDetail.fall"
                      :class="{ errorInput: error.fall }"
                    />
                    <span class="error" v-if="error.fall">{{
                      error.fall[0]
                    }}</span>
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Đông</label>
                    <input
                      type="number"
                      v-model="productDetail.winter"
                      :class="{ errorInput: error.winter }"
                    />
                    <span class="error" v-if="error.winter">{{
                      error.winter[0]
                    }}</span>
                  </div>
                </div>
                <h6 class="mb-25">Điểm khuyên dùng trong ngày</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Ban ngày</label>
                    <input
                      type="number"
                      :class="{ errorInput: error.daytime }"
                      v-model="productDetail.daytime"
                    />
                    <span class="error" v-if="error.daytime">{{
                      error.daytime[0]
                    }}</span>
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Ban đêm</label>
                    <input
                      type="number"
                      :class="{ errorInput: error.night }"
                      v-model="productDetail.night"
                    />
                    <span class="error" v-if="error.night">{{
                      error.night[0]
                    }}</span>
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
import loadfile from "../../../components/admin/loadfile.vue";
import baseRequest from "../../../base/baseRequest";
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {
    loadfile,
  },
  ...mapGetters(["imgUrl"]),
  data() {
    return {
      v$: useVuelidate(),
      product: null,
      productDetail: null,
      tabActive: 1,
      success: false,
      fail: false,
      error: {},
      fragrant: {
         scent: '',
          baseNote: '',
          middleNotes: '',
          topNotes: '',
      },
    };
  },
  validations() {
    return {
      productDetail: {
        fragrant: {
          scent: { required },
          baseNote: { required },
          middleNotes: { required },
          topNotes: { required },
        },
      },
      product: {
        category_id: { required },
      },
      categories: {},
    };
  },
  methods: {
    getProduct() {
      baseRequest
        .get("admin/product/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.productDetail = response.data.product_detail;
          if(typeof(this.productDetail.fragrant) == 'string')
          {
            this.productDetail.fragrant = this.fragrant;
          }
          this.$isLoading(false);
        });
    },
         getCategories() {
      baseRequest.get("getCategories").then((response) => {
        this.categories = response.data;
      });
    },
    changeProduct() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      this.$isLoading(true);
      this.fragrant = this.productDetail.fragrant;
      var formData = new FormData();
      formData.append("_method", "put");
      formData.append("newPictures", this.$store.state.pictures);
      formData.append("name", this.product.name);
      formData.append("discount", this.product.discount);
      formData.append("category_id", this.product.category_id);
      formData.append("price", this.product.price);
      formData.append("capacity", this.product.capacity);
      formData.append("description", this.productDetail.description);
      formData.append("quantity", this.product.quantity);
      formData.append("fragrant", this.fragrant);
      formData.append("saveIncense", this.productDetail.saveIncense);
      formData.append("concentration", this.productDetail.concentration);
      formData.append("release", this.productDetail.release);
      formData.append("age", this.productDetail.age);
      formData.append("winter", this.productDetail.winter);
      formData.append("summer", this.productDetail.summer);
      formData.append("fall", this.productDetail.fall);
      formData.append("spring", this.productDetail.spring);
      formData.append("daytime", this.productDetail.daytime);
      formData.append("night", this.productDetail.night);
      formData.append("middleNotes", this.fragrant.middleNotes);
      formData.append("scent", this.fragrant.scent);
      formData.append("baseNote", this.fragrant.baseNote);
      formData.append("topNotes", this.fragrant.topNotes);
      baseRequest
        .post("admin/product/" + this.product.id, formData)
        .then((response) => {
          this.$isLoading(false);
          if (response.data.success) {
            this.success = true;
            return;
          }
          this.fail = true;
        })
        .catch((error) => {
          this.error = error.massage.errors;
          this.$isLoading(false);
        });
    },
  },
  watch: {
    $route() {
      this.$isLoading(true);
      this.getProduct();
    },
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
    fail() {
      setTimeout(() => (this.fail = false), 1500);
    },
  },
  mounted() {
    this.$isLoading(true);
    this.getProduct();
    this.getCategories();
  },
  beforeRouteLeave() {
    this.$store.commit("setPictures", []);
  },
};
</script>

<style scoped>
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
</style>
