<template>
  <main class="wrapper login-page">
    <div class="container">
      <h1>Đăng nhập</h1>
      <div class="login-box">
        <div class="info-box">
          <label for="">Tài khoản</label>
          <input type="text" placeholder="Nhập tài khoản của bạn">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="info-box">
          <label for="">Mật khẩu</label>
          <input :type="hiddenPassword ? 'password' : 'text'"  placeholder="Nhập mật khẩu của bạn">
          <i class="fa-solid fa-lock"></i>
          <i 
          @click="hiddenPassword = false"
          v-if="hiddenPassword" 
          class="fa-solid fa-eye"></i>
          <i 
          @click="hiddenPassword = true"
          v-else 
          class="fa-solid fa-eye-slash"></i>
        </div>
      </div>
      <span class="forgot-password">Quên mật khẩu?</span>
      <button class="button login-button">Đăng nhập</button>
      <div class="socials-login">
        <span>Đăng nhập với</span>
        <div class="socials">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-google"></i>
        </div>
      </div>
      <div class="sign-up-box">
        <span>Bạn chưa có tài khoản?</span>
        <router-link to="/register" class="button login-button">Đăng kí</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return {
      hiddenPassword: true,
    }
  }
}
</script>

<style>

</style>
