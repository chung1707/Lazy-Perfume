<template>
  <form
    class="uploads"
    @submit.prevent="SendFiles"
    ref="myForm"
    enctype="multipart/form-data"
  >
    <div class="click_zone" @click="openFileSelect">
      <p>Chọn ảnh</p>
    </div>
    <div class="preview">
      <div class="imgItem" v-for="(file, index) in files" :key="index">
        <span
          :class="{ error: file.invalidMessage }"
          v-if="file.invalidMessage"
          >{{ file.invalidMessage }}</span
        >
        <img ref="img1" alt="" />
        {{ file.name }}
        <a
          @click.prevent="
            files.splice(index, 1);
            uploadFiles.splice(index, 1);
          "
          ><i class="fa-solid fa-x"></i
        ></a>
      </div>
    </div>
    <input
      type="file"
      ref="files"
      @change="selectFiles"
      multiple
      class="dispay_hidden"
    />
    <!-- <button
      class="button"
      type="submit"
      v-if="uploadFiles.length > 0"
    >
      Tải ảnh
    </button> -->
  </form>
</template>

<script>
import { mapGetters } from "vuex";
// import baseRequest from "../../base/baseRequest";
import axios from "axios";
import _ from "lodash";
export default {
  data() {
    return {
      files: [],
      uploadFiles: [],
      messages: "",
      error: false,
    };
  },
  methods: {
    openFileSelect() {
      this.$refs.files.click();
    },
    async selectFiles() {
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...files];
      this.files = [
        ...this.files,
        ..._.map(files, (file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file),
        })),
      ];
      const formData = new FormData();
      _.forEach(this.uploadFiles, (file) => {
        if (this.validate(file) == "") {
          formData.append("files", file);
        }
      });
          formData.append("pics", this.files[0]);
      try {
        await axios
          .post("http://localhost:8000/api/uploads", formData)
          .then(() => {});
      } catch (e) {
        this.message = e.response;
      }
    },
    // async SendFiles() {
    //   const formData = new FormData();
    //   _.forEach(this.uploadFiles, (file) => {
    //     if (this.validate(file) === "") {
    //       formData.append("files", file);
    //       formData.append("_method", "POST");
    //     }
    //   });
    //   try {
    //     await axios
    //       .post("http://localhost:8000/api/uploads", formData, {
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((response) => {
    //         console.log(response);
    //       });
    //   } catch (e) {
    //     this.message = e.response;
    //   }
    // },
    validate(file) {
      const MAX_SIZE = 5000000;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (file.size > MAX_SIZE) {
        return `Kích thước tối đa: ${MAX_SIZE / 1000}kb`;
      }
      if (!allowedTypes.includes(file.type)) {
        return "Tệp tải lên không phải hình ảnh!";
      }
      return "";
    },
  },
  computed: {
    ...mapGetters(["imgUrl"]),
  },
};
</script>

<style lang="scss"></style>
