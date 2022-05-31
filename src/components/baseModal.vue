<template>
  <div>
    <button
      class="text-danger"
      @click.prevent="modelOn = true"
      style="margin-left: 20px"
    >
      <i class="lni lni-trash-can"></i>
    </button>
    <div class="baseModel" v-if="modelOn">
      <div class="col-xl-12 col-lg-12">
        <div class="card-style-5 mb-30">
          <div class="card-content">
            <h4 v-if="item.name">Xác nhận xóa: {{ item.name }}</h4>
            <h4 v-if="item.transaction_id">
              Xác nhận xóa: {{ item.transaction_id }}
            </h4>
            <h4 v-if="item.title">Xác nhận xóa: {{ item.title }}</h4>
            <p>
              Những dữ liệu liên quan có thể sẽ bị xóa (Có thể khôi phục được)!
              Bạn có chắc muốn xóa?
            </p>
            <button
              @click.prevent="modelOn = false"
              class="main-btn primary-btn btn-hover"
            >
              Hủy
            </button>
            <button
              @click.prevent="deleteItem"
              class="main-btn danger-btn btn-hover"
            >
              Xóa
            </button>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
  </div>
</template>

<script>
import baseRequest from "../base/baseRequest";
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    items: {
      required: true,
      type: Object,
    },
    link: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      modelOn: false,
    };
  },
  methods: {
    deleteItem() {
      let index = this.items.indexOf(this.item);
      if (index > -1) {
        this.total -= 1;
      }
      baseRequest.delete(this.link + this.item.id);
    },
  },
};
</script>

<style scoped>
.baseModel {
  box-shadow: 0px 15px 45px 0px rgb(0 0 0 / 60%);
  position: fixed;
  z-index: 99999;
  top: 40%;
  left: 40%;
  padding: 20px;
  color: red;
  width: 500px;
  background: white;
  text-align: center;
}
p {
  padding: 20px 0px;
}
button {
  margin: 0px 20px;
  font-size: 20px;
}
</style>
