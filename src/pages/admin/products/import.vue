<template>
  <main
    class="main-wrapper"
    :class="{ sidebarHidden: !$store.state.hiddenSidebar }"
  >
    <section class="tab-components">
      <div class="container-fluid">
        <!-- ========== title-wrapper start ========== -->
        <div class="title-wrapper pt-30">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="title mb-30">
                <h2>Nhập sản phẩm</h2>
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
                      <a href="#0">Nhập kho</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card-style mb-30">
                  <h6 class="mb-10">Danh sách sản phẩm</h6>
                  <p class="text-sm mb-20">
                    Các sản phẩm này nằm trong hóa đơn nhập hàng
                  </p>
                  <div class="table-wrapper table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="lead-info"><h6>Ảnh</h6></th>
                          <th class="lead-info"><h6>Mã sản phẩm</h6></th>
                          <th class="lead-email"><h6>Tên sản phẩm</h6></th>
                          <th class="lead-phone"><h6>Giá cả</h6></th>
                          <th class="lead-company"><h6>Số lượng</h6></th>
                          <th><h6>Action</h6></th>
                        </tr>
                        <!-- end table row-->
                      </thead>
                      <tbody>
                        <tr>
                          <td class="min-width">
                            <div class="lead">
                              <div class="lead-image">
                                <img
                                  :src="imgUrl+'product1.jpg'"
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td class="min-width">
                            <p><a href="#0">Replica</a></p>
                          </td>
                          <td class="min-width">
                            <p>Beach Walk</p>
                          </td>
                          <td class="min-width">
                            <p>3000000 VNĐ</p>
                          </td>
                              <td class="min-width">
                            <p>20</p>
                          </td>
                          <td>
                            <div class="action">
                              <button class="text-danger">
                                <i class="lni lni-trash-can"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- end table -->
                  </div>
                </div>
                <div class="btn-zone-top">
                  <button @click="$router.back()" class="button">
                    quay lại
                  </button>
                  <button class="button" @click="AddNew">
                    Thêm sản phẩm mới
                  </button>
                  <button class="button" @click="AddOld">
                    Thêm sản phẩm đã có
                  </button>
                  <button class="button">Nhập hàng</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- addNew -->
        <!-- ========== form-elements-wrapper start ========== -->
        <div class="form-elements-wrapper" v-if="addNew">
          <div class="row">
            <div class="col-lg-6">
              <!-- input style start -->
              <div class="card-style mb-30">
                <h6 class="mb-25">Thêm sản phẩm mới</h6>
                <div class="input-style-1">
                  <label>Mã sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    placeholder="Tên sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    placeholder="Tên sản phẩm"
                  />
                </div>
                <div class="select-style-1">
                  <label>Category</label>
                  <div class="select-position">
                    <select v-model="product.category_id">
                      <option value="null">Chọn giới tính</option>
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Unisex</option>
                    </select>
                  </div>
                </div>
                <div class="input-style-1">
                  <label>Giá sản phẩm (VNĐ)</label>
                  <input
                    type="text"
                    v-model="product.price"
                    placeholder="Giá sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Dung tích (Ml)</label>
                  <input
                    type="text"
                    v-model="product.capacity"
                    placeholder="Dung tích sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Giảm giá (%)</label>
                  <input
                    v-model="product.discount"
                    type="text"
                    placeholder="Nhập phần trăm giảm giá (vd: 10)"
                  />
                </div>
                <h6 class="mb-25">Chọn ảnh cho sản phẩm (Nên chọn 2 ảnh)</h6>
                <div style="margin-bottom: 20px">
                  <loadfile></loadfile>
                </div>
                <div class="btn-zone">
                  <button class="button">Thêm sản phẩm</button>
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
                    v-model="productDetail.description"
                    rows="5"
                  ></textarea>
                </div>
                <div class="input-style-1">
                  <label>Mùi hương chủ đạo</label>
                  <input
                    type="text"
                    v-model="productDetail.fragrant.scent"
                    placeholder="Hương chính của sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Hương đầu</label>
                  <input
                    type="text"
                    v-model="productDetail.fragrant.topNotes"
                    placeholder="vd: hương gỗ,hương trái cây"
                  />
                </div>
                <div class="input-style-1">
                  <label>Hương giữa</label>
                  <input
                    type="text"
                    v-model="productDetail.fragrant.middleNotes"
                    placeholder="Hương chính của sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Hương cuối</label>
                  <input
                    type="text"
                    v-model="productDetail.fragrant.baseNote"
                    placeholder="Hương chính của sản phẩm"
                  />
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
                    <input
                      type="text"
                      v-model="productDetail.concentration"
                      placeholder="Nồng độ (vd: EDP)"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Năm xuất bản</label>
                    <input
                      type="number"
                      v-model="productDetail.release"
                      placeholder="Xuất bản"
                    />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Độ tuổi khuyên dùng</label>
                    <input
                      type="number"
                      v-model="productDetail.age"
                      placeholder="Khuyên dùng"
                    />
                  </div>
                </div>

                <h6 class="mb-25">Điểm khuyên dùng theo mùa</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-3">
                    <label>Xuân</label>
                    <input
                      type="number"
                      v-model="productDetail.spring"
                      placeholder="vd: 70"
                    />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Hạ</label>
                    <input type="number" v-model="productDetail.summer" />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Thu</label>
                    <input type="number" v-model="productDetail.fall" />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Đông</label>
                    <input type="number" v-model="productDetail.winter" />
                  </div>
                </div>
                <h6 class="mb-25">Điểm khuyên dùng trong ngày</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Ban ngày</label>
                    <input type="number" v-model="productDetail.daytime" />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Ban đêm</label>
                    <input type="number" v-model="productDetail.night" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- addOld -->
        </div>
        <div class="form-elements-wrapper" v-if="addOld">
          <div class="row">
            <div class="col-lg-6 newAdd">
              <!-- input style start -->
              <div class="card-style mb-30">
                <h6 class="mb-25">Thêm sản phẩm mới</h6>
                <div class="input-style-1">
                  <label>Mã sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    placeholder="Tên sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    placeholder="Tên sản phẩm"
                  />
                </div>

                <div class="select-style-1">
                  <label>Category</label>
                  <div class="select-position">
                    <select v-model="product.category_id">
                      <option value="null">Chọn giới tính</option>
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Unisex</option>
                    </select>
                  </div>
                </div>

                <div class="input-style-1">
                  <label>Giá sản phẩm (VNĐ)</label>
                  <input
                    type="text"
                    v-model="product.price"
                    placeholder="Giá sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Dung tích (Ml)</label>
                  <input
                    type="text"
                    v-model="product.capacity"
                    placeholder="Dung tích sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Giảm giá (%)</label>
                  <input
                    v-model="product.discount"
                    type="text"
                    placeholder="Nhập phần trăm giảm giá (vd: 10)"
                  />
                </div>

                <div class="btn-zone">
                  <button class="button">Thêm sản phẩm</button>
                </div>
                <!-- end input -->
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
// import baseRequest from "../../../base/baseRequest";
import { mapGetters } from "vuex";

export default {
  components: {
    loadfile,
  },
  computed: {
  ...mapGetters(["imgUrl"]),

  },
  data() {
    return {
      addNew: false,
      addOld: false,
      product: {
        nameproductCode: null,
        name: null,
        price: null,
        quantity: null,
        capacity: null,
        category_id: null,
      },
      productDetail: {
        concentration: "",
        release: "",
        saveIncense: "",
        age: "",
        spring: "",
        summer: "",
        fall: "",
        winter: "",
        daytime: "",
        night: "",

        fragrant: {
          scent: [],
          baseNote: [],
          middleNotes: [],
          topNotes: [],
        },
      },
      tabActive: 1,
      success: false,
      fail: false,
    };
  },
  methods: {
    AddNew() {
      this.addOld = false;
      this.addNew = !this.addNew;
    },
    AddOld() {
      this.addNew = false;
      this.addOld = !this.addOld;
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
</style>
