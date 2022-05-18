<template>
  <main class="wrapper login-page">
    <div class="container">
      <h1 class="login-title">Đăng nhập</h1>
      <div class="login-box">
        <span
          style="text-align: center; display: block"
          v-if="errors.error"
          class="error"
          >{{ errors.error }}
        </span>
        <div class="info-box">
          <label for="">Email</label>
          <input
            :class="{ errorInput: errors.email }"
            type="text"
            v-model="user.email"
            placeholder="Nhập tài khoản của bạn"
          />
          <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="info-box">
          <label for="">Mật khẩu</label>
          <input
            :class="{ errorInput: errors.email }"
            :type="hiddenPassword ? 'password' : 'text'"
            v-model="user.password"
            placeholder="Nhập mật khẩu của bạn"
          />
          <span v-if="errors.password" class="error">{{
            errors.password[0]
          }}</span>
          <i class="fa-solid fa-lock"></i>
          <i
            @click="hiddenPassword = false"
            v-if="hiddenPassword"
            class="fa-solid fa-eye"
          ></i>
          <i
            @click="hiddenPassword = true"
            v-else
            class="fa-solid fa-eye-slash"
          ></i>
        </div>
      </div>
      <span class="forgot-password">Quên mật khẩu?</span>
      <button class="button login-button" @click.prevent="login">
        Đăng nhập
      </button>
      <!-- <div class="socials-login">
        <span>Đăng nhập với</span>
        <div class="socials">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-google"></i>
        </div>
      </div> -->
      <div class="sign-up-box">
        <span>Bạn chưa có tài khoản?</span>
        <router-link to="/register" class="button login-button"
          >Đăng kí</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
// import BaseRequest from "../../base/baseRequest";
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      hiddenPassword: true,
      errors: {},
    };
  },
  mounted() {
    this.$isLoading(false);
  },
  methods: {
    login() {
      this.$isLoading(true);
      this.$store
        .dispatch("login", this.user)
        .then(() => {
          this.$store.dispatch("getCart");
          if (this.$store.getters.isManager) {
            this.$router.push({ name: "Dashbroad" });
          } else {
            this.$router.push({ name: "Account" });
          }
          this.errors = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        })
        .finally(() => {
          this.$isLoading(false);
        });
    },
  },
};
</script>

<style></style>
