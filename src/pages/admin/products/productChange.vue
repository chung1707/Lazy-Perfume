<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="tab-components" v-if="product">
      <div class="container-fluid">
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title mb-30">
                <h2>Sửa đổi thông tin sản phẩm: {{product.productCode}}</h2>
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
                  <input type="text" v-model="product.name" placeholder="Tên sản phẩm" />
                </div>
                <div class="input-style-1">
                  <label>Giá sản phẩm (VNĐ)</label>
                  <input type="text" v-model="product.price" placeholder="Giá sản phẩm" />
                </div>
                <div class="input-style-1">
                  <label>Dung tích (Ml)</label>
                  <input type="text" v-model="product.capacity" placeholder="Dung tích sản phẩm" />
                </div>
                <div class="input-style-1">
                  <label>Giảm giá (%)</label>
                  <input
                  v-model="product.discount"
                    type="text"
                    placeholder="Nhập phần trăm giảm giá (vd: 10)"
                  />
                </div>
                <h6 class="mb-25">Sửa ảnh sản phẩm</h6>

                <div style="margin-bottom: 20px">
                  <loadfile></loadfile>
                </div>
                <div class="btn-zone">
                  <button @click="$router.back()" class="button">
                    quay lại
                  </button>
                  <button class="button">sửa thông tin</button>
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
                  <textarea placeholder="Mô tả" v-model="productDetail.description" rows="5"></textarea>
                </div>
                <div class="input-style-1">
                  <label>Mùi hương chủ đạo</label>
                  <input type="text" v-model="productDetail.fragrant.scent" placeholder="Hương chính của sản phẩm" />
                </div>
                  <div class="input-style-1">
                  <label>Hương đầu</label>
                  <input type="text" v-model="productDetail.fragrant.topNotes" placeholder="vd: hương gỗ,hương trái cây" />
                </div>
                  <div class="input-style-1">
                  <label>Hương giữa</label>
                  <input type="text" v-model="productDetail.fragrant.middleNotes" placeholder="Hương chính của sản phẩm" />
                </div>
                  <div class="input-style-1">
                  <label>Hương cuối</label>
                  <input type="text" v-model="productDetail.fragrant.baseNote" placeholder="Hương chính của sản phẩm" />
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Độ lưu hương (Giờ)</label>
                    <input
                      type="text"
                      v-model="productDetail.saveIncense"
                      placeholder="Thời gian lưu hương (vd: 8 giờ -> 8)"
                    />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Nồng độ</label>
                    <input type="text"
                    v-model="productDetail.concentration"
                    placeholder="Nồng độ (vd: EDP)" />
                  </div>
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Năm xuất bản</label>
                    <input type="number"
                    v-model="productDetail.release"
                    placeholder="Xuất bản" />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Độ tuổi khuyên dùng</label>
                    <input type="number" 
                    v-model="productDetail.age"
                    
                    placeholder="Khuyên dùng" />
                  </div>
                </div>

                <h6 class="mb-25">Điểm khuyên dùng theo mùa</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-3">
                    <label>Xuân</label>
                    <input type="number"
                    v-model="productDetail.spring"
                    
                    placeholder="vd: 70" />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Hạ</label>
                    <input type="number"
                    v-model="productDetail.summer"
                    
                    />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Thu</label>
                    <input type="number"
                    v-model="productDetail.fall"
                    
                    />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Đông</label>
                    <input type="number"
                    v-model="productDetail.winter"
                    
                    />
                  </div>
                </div>
                <h6 class="mb-25">Điểm khuyên dùng trong ngày</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Ban ngày</label>
                    <input type="number" 
                    v-model="productDetail.daytime"
                    
                    />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Ban đêm</label>
                    <input type="number" 
                    v-model="productDetail.night"
                    
                    />
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

export default {
  components: {
    loadfile,
  },
  ...mapGetters(["imgUrl"]),
  data() {
    return {
      product: null,
      productDetail: null,
      tabActive: 1,
      success: false,
      fail: false,
    };
  },
  methods: {
    getProduct() {
      baseRequest
        .get("admin/product/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.productDetail = response.data.product_detail;
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
