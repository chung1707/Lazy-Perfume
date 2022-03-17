<template>
  <main class="wrapper personal-page">
    <section class="header-products">
      <h1 class="page-title">Thanh Toán</h1>
    </section>
    <section>
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <span>Tài khoản</span>
        </div>
      </div>
      <div class="account-content container">
        <div class="left-account">
          <ul>
            <li>
              <a
                href="#"
                @click.prevent="tabActive = 1"
                :class="{ tabActive: tabActive == 1 }"
              >
                <i
                  class="hidden fa-solid fa-arrow-right"
                  :class="{ visible: tabActive == 1 }"
                ></i>
                Thông tin cá nhân</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="tabActive = 2"
                :class="{ tabActive: tabActive == 2 }"
              >
                <i
                  class="hidden fa-solid fa-arrow-right"
                  :class="{ visible: tabActive == 2 }"
                ></i>
                Đơn hàng của bạn
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="tabActive = 3"
                :class="{ tabActive: tabActive == 3 }"
              >
                <i
                  class="hidden fa-solid fa-arrow-right"
                  :class="{ visible: tabActive == 3 }"
                ></i>
                Đổi mật khẩu</a
              >
            </li>
            <li>
              <a href="#">
                <i class="hidden fa-solid fa-arrow-right"></i> Đăng xuất</a
              >
            </li>
          </ul>
        </div>
        <div class="right-account">
          <div class="order-list hidden" :class="{ visible: tabActive == 1 }">
            <div class="order" v-for="test in tests" :key="test.id">
              <span class="order-id">Mã đơn hàng: CCM211</span>
              <span class="order-status"
                >Trạng thái đơn hàng: Chờ xác nhận</span
              >
              <span class="order-id"
                >Địa chỉ nhận hàng: Tây Tựu- Bắc Từ Liêm - Hà Nội
              </span>
              <button class="button">Hủy đơn hàng</button>
              <span class="created-time">Thời gian tạo: 2022-03-16</span>
              <div class="title-list">
                <span>Sản phẩm</span>
                <span>Số lượng</span>
                <span>Giá</span>
                <span>Tổng tiền</span>
              </div>
              <div class="item-in-list">
                <span>Dior Sauvage</span>
                <span>2</span>
                <span>4.000.000 VNĐ</span>
                <span>8.000.000 VNĐ</span>
              </div>
              <div class="item-in-list">
                <span>Creed Aventus</span>
                <span>2</span>
                <span>7.000.000 VNĐ</span>
                <span>14.000.000 VNĐ</span>
              </div>
              <div class="shipping">
                <span>Phí vận chuyển</span>
                <span>10.000 VNĐ</span>
              </div>
              <div class="discount">
                <span>Mã giảm giá</span>
                <span>0%</span>
              </div>
              <div class="final-price">
                <span>Tổng hóa đơn</span>
                <span>10.000.000 VNĐ</span>
              </div>
            </div>
          </div>
          <div class="info-user hidden" :class="{ visible: tabActive == 2 }">
            <h3>Thông tin người dùng</h3>
            <div class="info">
              <label for="username">Tên người dùng</label>
              <input
                type="text"
                name="username"
                placeholder="Tên người dùng..."
              />
            </div>
            <div class="info">
              <label for="email">Địa chỉ Email</label>
              <input type="text" name="email" placeholder="Tên người dùng..." />
            </div>
            <div class="info">
              <label for="phoneNumber">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Tên người dùng..."
              />
            </div>
            <div class="address">
              <div class="location">
                <label for="provinces">Tỉnh / Thành phố</label>
                <div class="arrange">
                  <span @click="arrangeActive = !arrangeActive"
                    >{{ arrangeKey }} <i class="fa-solid fa-caret-down"></i
                  ></span>
                  <ul
                    :class="{ hidden: !arrangeActive, visible: arrangeActive }"
                    class="arrange-key-list"
                  >
                    <i class="fa-solid fa-caret-down"></i>
                    <li
                      v-for="key in arrange"
                      :key="key.id"
                      @click="setArrangKey(key)"
                    >
                      {{ key.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="location">
                <label for="districts">Quận / Huyện</label>
                <div class="arrange">
                  <span @click="arrangeActive = !arrangeActive"
                    >{{ arrangeKey }} <i class="fa-solid fa-caret-down"></i
                  ></span>
                  <ul
                    :class="{ hidden: !arrangeActive, visible: arrangeActive }"
                    class="arrange-key-list"
                  >
                    <i class="fa-solid fa-caret-down"></i>
                    <li
                      v-for="key in arrange"
                      :key="key.id"
                      @click="setArrangKey(key)"
                    >
                      {{ key.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="location">
                <label for="wards">Phường / Xã</label>
                <div class="arrange">
                  <span @click="arrangeActive = !arrangeActive"
                    >{{ arrangeKey }} <i class="fa-solid fa-caret-down"></i
                  ></span>
                  <ul
                    :class="{ hidden: !arrangeActive, visible: arrangeActive }"
                    class="arrange-key-list"
                  >
                    <i class="fa-solid fa-caret-down"></i>
                    <li
                      v-for="key in arrange"
                      :key="key.id"
                      @click="setArrangKey(key)"
                    >
                      {{ key.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="info">
              <label for="address">Địa chỉ giao hàng chi tiết</label>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ chi tiết"
              />
            </div>
            <button class="button update-button">Cập nhập thông tin</button>
          </div>
          <div
            class="change-password info-user hidden"
            :class="{ visible: tabActive == 3 }"
          >
            <h3>Đổi mật khẩu</h3>
            <div class="info">
              <label for="username">Mật khẩu hiện tại</label>
              <input
                type="text"
                name="username"
                placeholder="Nhập mật khẩu hiện tại của bạn"
              />
            </div>
            <div class="info">
              <label for="email">Nhập mật khẩu mới</label>
              <input type="text" name="email" placeholder="Nhập mật khẩu mới" />
            </div>
            <div class="info">
              <label for="phoneNumber">Xác nhận mật khẩu</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Nhập lại mật khẩu mới của bạn"
              />
            </div>
            <button class="button update-button">Đổi mật khẩu</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tabActive: 1,
      arrangeKey: "Mới nhất",
      arrangeActive: false,
      arrange: [
        { name: "Mới nhất", id: 1 },
        { name: "Thứ tự theo giá: Từ thấp đến cao", id: 2 },
        { name: "Thứ tự theo giá: Từ cao đến thấp", id: 3 },
        { name: "Theo mức độ phổ biến", id: 4 },
      ],
      tests: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    };
  },
};
</script>

<style lang="scss" scoped>
.tabActive {
  color: rgb(255, 120, 57) !important;
}
</style>
