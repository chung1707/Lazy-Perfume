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
                <h2>Thêm danh mục</h2>
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
                      <a href="#0">Thêm danh mục</a>
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
                    <h6 class="mb-25">Thêm danh mục mới</h6>
                    <div class="input-style-1">
                      <label>Tên danh mục</label>
                      <input
                        type="text"
                        :class="{ errorInput: errors.name }"
                        v-model="category.name"
                        placeholder="Tên sản phẩm"
                      />
                      <span v-if="errors.name" class="error">{{
                        errors.name[0]
                      }}</span>
                    </div>

                    <div class="select-style-1">
                      <label>Chọn loại danh mục</label>
                      <div class="select-position">
                        <select
                          v-model="category.for_product"
                          :class="{ errorInput: errors.for_product }"
                        >
                          <option value="null">Chọn loại danh mục</option>
                          <option value="1">Danh mục cho sản phẩm</option>
                          <option value="0">Danh mục cho bài viết</option>
                        </select>
                        <span v-if="errors.for_product" class="error">{{
                          errors.for_product[0]
                        }}</span>
                      </div>
                    </div>
                    <div class="input-style-1">
                      <label>Mô tả danh mục</label>
                      <textarea
                        placeholder="Mô tả"
                        v-model="category.description"
                        :class="{ errorInput: errors.description }"
                        rows="5"
                      ></textarea>
                      <span v-if="errors.description" class="error">{{
                        errors.name[0]
                      }}</span>
                    </div>

                    <div class="btn-zone">
                      <button @click="addCategory" class="button">
                        Thêm danh mục
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
  data() {
    return {
      category: {
        name: "",
        description: "",
        for_product: null,
      },
      errors: {},
      success: false,
      fail: false,
    };
  },
  methods: {
    addCategory() {
      this.$isLoading(true);
      baseRequest
        .post("admin/add_category", this.category)
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
