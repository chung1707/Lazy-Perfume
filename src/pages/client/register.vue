<template>
  <main class="wrapper login-page">
    <div class="container">
      <h1 class="login-title">Đăng Ký</h1>
      <div class="login-box">
         <span
          style="text-align: center; display: block"
          v-if="errors.error"
          class="error"
          >{{ errors.error }}
        </span>
        <div class="info-box">
          <label for="">Tên</label>
          <input type="text" v-model="user.name" placeholder="Nhập tên của bạn">
          <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
                <span class="icon"><i class="fa-solid fa-user"></i> </span>

        </div>
        <div class="info-box">
          <label for="">Email</label>
          <input type="text" v-model="user.email" placeholder="Nhập email của bạn">
          <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
               <span class="icon"><i class="fa-solid fa-user"></i> </span>

        </div>
        <div class="info-box">
          <label for="">Mật khẩu</label>
          <input :type="hiddenPassword ? 'password' : 'text'" v-model="user.password"  name="password" placeholder="Nhập mật khẩu">
          <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
          <span class="icon">   <i class="fa-solid fa-lock"></i> </span>
          <a
            v-if="hiddenPassword"
            @click.prevent="hiddenPassword = false"
          >
            <i class="fa-solid fa-eye"></i>
          </a>
          <a href="" @click.prevent="hiddenPassword = true" v-else>
            <i class="fa-solid fa-eye-slash"></i>
          </a>
        </div>
        <div class="info-box">
          <label for="">Xác nhận mật khẩu</label>
          <input :type="hiddenConfirmPassword ? 'password' : 'text'" v-model="user.password_confirmation" name="password_confirmation"  placeholder="Xác nhận mật khẩu trên">
          <span class="icon">   <i class="fa-solid fa-lock"></i> </span>
          <a
            v-if="hiddenConfirmPassword"
            @click.prevent="hiddenConfirmPassword = false"
          >
            <i class="fa-solid fa-eye"></i>
          </a>
          <a href="" @click.prevent="hiddenConfirmPassword = true" v-else>
            <i class="fa-solid fa-eye-slash"></i>
          </a>
        </div>
      </div>
      <span class="forgot-password">Quên mật khẩu?</span>
      <button @click.prevent="register" class="button login-button">Đăng Ký</button>
      <!-- <div class="socials-login">
        <span>Đăng nhập với</span>
        <div class="socials">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-google"></i>
        </div>
      </div> -->
      <div class="sign-up-box">
        <span>Bạn đã có tài khoản?</span>
        <router-link to="/login" class="button login-button">Đăng nhập</router-link>
      </div>
    </div>
  </main>
</template>

<script>
// import baseRequest from '../../base/baseRequest'
export default {
  data(){
    return {
      errors: {},
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      hiddenPassword: true,
      hiddenConfirmPassword: true,
    }
  },
  methods: {
    register(){
      this.$isLoading(true);
        this.$store.dispatch('register', this.user).then(() => {
          this.$store.dispatch("getCart");
          this.$router.push({name: 'Account'});
          this.errors = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        }).finally(()=>{
          this.$isLoading(false);
        })
    }
  },
  mounted() {
    this.$isLoading(false);
  },
}
</script>

<style>

</style>
