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
                      <tbody v-if="itemsInBill">
                        <tr v-for="(item, index) in itemsInBill" :key="index">
                          <td class="min-width">
                            <div class="lead">
                              <div class="lead-image" v-if="item.pictures">
                                <img :src="imgUrl + item.pictures[0]" alt="" />
                              </div>
                            </div>
                          </td>
                          <td class="min-width">
                            <p>
                              <a href="#0">{{ item.productCode }}</a>
                            </p>
                          </td>
                          <td class="min-width">
                            <p>{{ item.name }}</p>
                          </td>
                          <td class="min-width">
                            <p>{{ item.price }} VNĐ</p>
                          </td>
                          <td class="min-width">
                            <p>{{ item.quantity }}</p>
                          </td>
                          <td>
                            <div class="action">
                              <button
                                class="text-danger"
                                @click="removeItemInBill(item)"
                              >
                                <i class="lni lni-trash-can"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- end table -->
                  </div>
                  <div class="sumPrice" v-if="sumPrice">
                    <h3>Tổng giá:</h3>
                    <div class="">
                      <h3 style="color: red">{{ sumPrice }} VNĐ</h3>
                    </div>
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
                  <button
                    class="button"
                    v-if="itemsInBill.length > 0"
                    @click="importPanel"
                  >
                    Nhập hàng
                  </button>
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
                  <label>Mã sản phẩm (Tối thiểu 4 kí tự)</label>
                  <input
                    type="text"
                    v-model="product.productCode"
                    placeholder="Tên sản phẩm"
                    :class="{ errorInput: v$.product.productCode.$error }"
                  />
                </div>
                <div class="input-style-1">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    placeholder="Tên sản phẩm"
                    :class="{ errorInput: v$.product.name.$error }"
                  />
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
                <div class="input-style-1">
                  <label>Giá sản phẩm (VNĐ)</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.product.price.$error }"
                    v-model="product.price"
                    placeholder="Giá sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Số lượng</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.product.quantity.$error }"
                    v-model="product.quantity"
                    placeholder="Giá sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Dung tích: Ml (vd: 100)</label>
                  <input
                    type="text"
                    v-model="product.capacity"
                    :class="{ errorInput: v$.product.capacity.$error }"
                    placeholder="Dung tích sản phẩm"
                  />
                </div>

                <h6 class="mb-25">Chọn ảnh cho sản phẩm (Nên chọn 2 ảnh)</h6>
                <div style="margin-bottom: 20px">
                  <loadfile></loadfile>
                </div>
                <div class="btn-zone">
                  <button class="button" @click="addProductToBill">
                    Thêm sản phẩm
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
                    v-model="product.description"
                    :class="{ errorInput: v$.product.description.$error }"
                    rows="5"
                  ></textarea>
                </div>
                <div class="input-style-1">
                  <label>Mùi hương chủ đạo(vd: Hương gỗ, hương trái cây)</label>
                  <input
                    type="text"
                    v-model="product.fragrant.scent"
                    :class="{ errorInput: v$.product.fragrant.scent.$error }"
                    placeholder="Hương chính của sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Hương đầu</label>
                  <input
                    type="text"
                    v-model="product.fragrant.topNotes"
                    :class="{ errorInput: v$.product.fragrant.topNotes.$error }"
                    placeholder="vd: hương gỗ,hương trái cây"
                  />
                </div>
                <div class="input-style-1">
                  <label>Hương giữa</label>
                  <input
                    type="text"
                    :class="{
                      errorInput: v$.product.fragrant.middleNotes.$error,
                    }"
                    v-model="product.fragrant.middleNotes"
                    placeholder="Hương chính của sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Hương cuối</label>
                  <input
                    type="text"
                    v-model="product.fragrant.baseNote"
                    :class="{ errorInput: v$.product.fragrant.baseNote.$error }"
                    placeholder="Hương chính của sản phẩm"
                  />
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Độ lưu hương (Giờ)</label>
                    <input
                      type="text"
                      v-model="product.saveIncense"
                      :class="{ errorInput: v$.product.saveIncense.$error }"
                      placeholder="(vd: 8 giờ -> 8)"
                    />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Nồng độ</label>
                    <input
                      type="text"
                      :class="{ errorInput: v$.product.concentration.$error }"
                      v-model="product.concentration"
                      placeholder="Nồng độ (vd: EDP)"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Năm xuất bản(vd: 2010)</label>
                    <input
                      type="number"
                      :class="{ errorInput: v$.product.release.$error }"
                      v-model="product.release"
                      placeholder="Xuất bản (vd: 2010)"
                    />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Độ tuổi khuyên dùng</label>
                    <input
                      type="number"
                      :class="{ errorInput: v$.product.age.$error }"
                      v-model="product.age"
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
                      :class="{ errorInput: v$.product.spring.$error }"
                      v-model="product.spring"
                      placeholder="vd: 70"
                    />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Hạ</label>
                    <input
                      type="number"
                      v-model="product.summer"
                      :class="{ errorInput: v$.product.summer.$error }"
                    />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Thu</label>
                    <input
                      type="number"
                      v-model="product.fall"
                      :class="{ errorInput: v$.product.fall.$error }"
                    />
                  </div>
                  <div class="input-style-2 col-lg-3">
                    <label>Đông</label>
                    <input
                      type="number"
                      v-model="product.winter"
                      :class="{ errorInput: v$.product.winter.$error }"
                    />
                  </div>
                </div>
                <h6 class="mb-25">Điểm khuyên dùng trong ngày</h6>
                <div class="row">
                  <div class="input-style-2 col-lg-6">
                    <label>Ban ngày</label>
                    <input
                      type="number"
                      v-model="product.daytime"
                      :class="{ errorInput: v$.product.daytime.$error }"
                    />
                  </div>
                  <div class="input-style-2 col-lg-6">
                    <label>Ban đêm</label>
                    <input
                      type="number"
                      v-model="product.night"
                      :class="{ errorInput: v$.product.night.$error }"
                    />
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
                  <label>Mã sản phẩm (Tối thiểu 4 kí tự)</label>
                  <input
                    type="text"
                    v-model="product.productCode"
                    :class="{ errorInput: v$.product.productCode.$error }"
                    placeholder="Tên sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    v-model="product.name"
                    :class="{ errorInput: v$.product.name.$error }"
                    placeholder="Tên sản phẩm"
                  />
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

                <div class="input-style-1">
                  <label>Giá sản phẩm (VNĐ)</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.product.price.$error }"
                    v-model="product.price"
                    placeholder="Giá sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Số lượng</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.product.quantity.$error }"
                    v-model="product.quantity"
                    placeholder="Giá sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Dung tích: Ml (vd: 100)</label>
                  <input
                    type="text"
                    :class="{ errorInput: v$.product.capacity.$error }"
                    v-model="product.capacity"
                    placeholder="Dung tích sản phẩm"
                  />
                </div>
                <div class="input-style-1">
                  <label>Tìm sản phẩm đã có (Theo tên hoặc mã)</label>
                  <input
                    type="text"
                    v-model="key"
                    @input="getOldProducts"
                    placeholder="Tự động tìm theo tên hoặc mã sản phẩm"
                  />
                  <span v-if="notSelectedYet" class="error">
                    Bạn chưa chọn sản phẩm cũ!
                  </span>
                  <ul class="result" v-if="oldProducts">
                    <li
                      @click="setProduct(item)"
                      v-for="item in oldProducts"
                      :key="item.id"
                    >
                      {{ item.productCode }} ---{{ item.name }}
                    </li>
                  </ul>
                </div>
                <div class="input-style-1" v-if="productSelected">
                  <label>Sản phẩm đã chọn: </label>
                  <input
                    type="text"
                    disabled
                    v-model="productSelected.name"
                    placeholder="Dung tích sản phẩm"
                  />
                </div>
                <h6 class="mb-25">Chọn ảnh cho sản phẩm (Nên chọn 2 ảnh)</h6>
                <div style="margin-bottom: 20px">
                  <loadfile></loadfile>
                </div>

                <div class="btn-zone">
                  <button class="button" @click="addOldProductToBill">
                    Thêm sản phẩm
                  </button>
                </div>
                <!-- end input -->
              </div>
            </div>
          </div>
        </div>
        <div class="form-elements-wrapper" v-if="importForm">
          <div class="row">
            <div class="col-lg-6 newAdd">
              <!-- input style start -->
              <div class="card-style mb-30">
                <h6 class="mb-25">Chọn nhà cung cấp</h6>
                <div class="select-style-1">
                  <label>Nhà cung cấp: </label>
                  <div class="select-position">
                    <select
                      v-model="supplier_id"
                      :class="{ errorInput: notSupplierId }"
                    >
                      <option value="null">Chọn nhà cung cấp</option>
                      <option
                        :value="supp.id"
                        v-for="supp in suppliers"
                        :key="supp"
                      >
                        {{ supp.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="btn-zone">
                  <button class="button" @click="onImport">In hóa đơn</button>
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
import baseRequest from "../../../base/baseRequest";
import { mapGetters, mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, numeric, minLength } from "@vuelidate/validators";
export default {
  components: {
    loadfile,
  },
  computed: {
    ...mapGetters(["imgUrl", "pictures", "itemsInBill", "sumPrice"]),
  },
  data() {
    return {
      v$: useVuelidate(),
      categories: {},
      addNew: false,
      addOld: false,
      importForm: false,
      product: {
        product_detail_id: null,
        supplier_id: null,
        productCode: null,
        name: null,
        price: null,
        quantity: null,
        capacity: null,
        category_id: null,
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
        description: "",
        fragrant: {
          scent: [],
          baseNote: [],
          middleNotes: [],
          topNotes: [],
        },
        pictures: null,
      },
      suppliers: null,
      supplier_id: null,
      key: null,
      oldProducts: null,
      productSelected: null,
      tabActive: 1,
      success: false,
      fail: false,
      notSelectedYet: false,
      notSupplierId: false,
    };
  },
  validations() {
    return {
      product: {
        name: { required, maxLength: maxLength(255) },
        productCode: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(4),
        },
        price: { required, maxLength: maxLength(255), numeric },
        quantity: { required, maxLength: maxLength(255), numeric },
        capacity: { required, maxLength: maxLength(5), numeric },
        category_id: { required, maxLength: maxLength(5), numeric },
        concentration: { required, maxLength: maxLength(255) },
        release: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(4),
        },
        saveIncense: { required, maxLength: maxLength(2), numeric },
        age: { required, maxLength: maxLength(5), numeric },
        spring: { required, maxLength: maxLength(2), numeric },
        summer: { required, maxLength: maxLength(2), numeric },
        fall: { required, maxLength: maxLength(2), numeric },
        winter: { required, maxLength: maxLength(2), numeric },
        daytime: { required, maxLength: maxLength(2), numeric },
        night: { required, maxLength: maxLength(2), numeric },
        description: { required },
        fragrant: {
          scent: { required },
          baseNote: { required },
          middleNotes: { required },
          topNotes: { required },
        },
      },
    };
  },
  methods: {
    ...mapActions(["importBill", "removeItemInBill", "addItemToBill"]),
    AddNew() {
      this.addOld = false;
      this.addNew = !this.addNew;
      this.importForm = false;
    },
    AddOld() {
      this.addNew = false;
      this.importForm = false;
      this.addOld = !this.addOld;
    },
    importPanel() {
      this.addNew = false;
      this.importForm = !this.importForm;
      this.addOld = false;
    },
    getBrands() {
      baseRequest.get("getBrands").then((response) => {
        this.suppliers = response.data;
      });
    },
    getCategories() {
      baseRequest.get("getCategories").then((response) => {
        this.categories = response.data;
      });
    },
    addOldProductToBill() {
      if (!this.productSelected) {
        return (this.notSelectedYet = true);
      }
      this.v$.$validate();
      if (!this.v$.$error) {
        this.product.pictures = this.pictures;
        this.addItemToBill(this.product);
        this.resetProduct();
        this.addOld = false;
      }
      return;
    },
    addProductToBill() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.product.pictures = this.pictures;
        this.product.fragrant.scent = this.product.fragrant.scent.split(",");
        this.product.fragrant.baseNote =
          this.product.fragrant.baseNote.split(",");
        this.product.fragrant.middleNotes =
          this.product.fragrant.middleNotes.split(",");
        this.product.fragrant.topNotes =
          this.product.fragrant.topNotes.split(",");
        this.addItemToBill(this.product);
        this.resetProduct();
        this.addNew = false;
      }
      return;
    },
    onImport() {
      this.$isLoading(true);
      if (!this.supplier_id) {
        return (this.notSupplierId = true);
      }
      let product_import = [this.itemsInBill, this.supplier_id, this.sumPrice];
      this.importBill(product_import);
      setTimeout(() => {
        this.success = true;
        this.$isLoading(false);
      }, 1000);
      this.importForm = false;
      this.notSupplierId = false;
    },
    getOldProducts(event) {
      this.searchKey = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchKey = event.target.value;
        baseRequest
          .get("admin/get_old_products", this.searchKey)
          .then((response) => {
            this.oldProducts = response.data;
          });
      }, 600);
    },
    setProduct(product) {
      var item = product.product_detail;
      this.product.concentration = item.concentration;
      this.product.product_detail_id = item.id;
      this.product.age = item.age;
      this.product.description = item.description;
      this.product.release = item.release;
      this.product.saveIncense = item.saveIncense;
      this.product.daytime = item.daytime;
      this.product.night = item.night;
      this.product.spring = item.spring;
      this.product.summer = item.summer;
      this.product.winter = item.winter;
      this.product.fall = item.fall;
      this.product.fragrant.scent = item.fragrant.scent;
      this.product.fragrant.baseNote = item.fragrant.baseNote;
      this.product.fragrant.middleNotes = item.fragrant.middleNotes;
      this.product.fragrant.topNotes = item.fragrant.topNotes;
      (this.oldProducts = null), (this.key = null);
      this.productSelected = product;
    },
    resetProduct() {
      this.product = {
        productCode: null,
        name: null,
        price: null,
        quantity: null,
        capacity: null,
        category_id: null,
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
        description: "",
        fragrant: {
          scent: [],
          baseNote: [],
          middleNotes: [],
          topNotes: [],
        },
        pictures: null,
      };
      this.key = null;
      this.oldProducts = null;
      this.productSelected = null;
    },
  },

  watch: {
    success() {
      setTimeout(() => (this.success = false), 1500);
    },
    fail() {
      setTimeout(() => (this.fail = false), 1500);
    },
    productSelected() {
      this.notSelectedYet = false;
    },
  },
  mounted() {
    this.$isLoading(false);
    this.getBrands();
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
