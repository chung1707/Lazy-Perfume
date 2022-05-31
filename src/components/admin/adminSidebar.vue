<template>
  <aside
    class="sidebar-nav-wrapper"
    :class="{
      vis: $store.state.hiddenSidebar,
      hid: !$store.state.hiddenSidebar,
    }"
  >
    <div class="navbar-logo">
      <router-link to="/admin/dashbroad">
        <img src="../../assets/images/icons/LayzyP.gif" alt="logo" />
      </router-link>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li class="nav-item nav-item-has-children">
          <a
            href="#0"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_1"
            aria-controls="ddmenu_1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <svg width="22" height="22" viewBox="0 0 22 22">
                <path
                  d="M17.4167 4.58333V6.41667H13.75V4.58333H17.4167ZM8.25 4.58333V10.0833H4.58333V4.58333H8.25ZM17.4167 11.9167V17.4167H13.75V11.9167H17.4167ZM8.25 15.5833V17.4167H4.58333V15.5833H8.25ZM19.25 2.75H11.9167V8.25H19.25V2.75ZM10.0833 2.75H2.75V11.9167H10.0833V2.75ZM19.25 10.0833H11.9167V19.25H19.25V10.0833ZM10.0833 13.75H2.75V19.25H10.0833V13.75Z"
                />
              </svg>
            </span>
            <span class="text">Trang</span>
          </a>
          <ul id="ddmenu_1" class="collapse show dropdown-nav">
            <li>
              <router-link to="/admin/dashbroad" class="active"
                >Trang quản lý</router-link
              >
            </li>
            <li>
              <router-link to="/">Cửa hàng</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/admin/profile">
            <span class="icon">
              <i class="fa-solid fa-user"></i>
            </span>
            <span class="text">Thông tin tài khoản</span>
          </router-link>
        </li>
        <li
          class="nav-item nav-item-has-children"
          v-if="$store.getters.isAdmin"
        >
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_7"
            aria-controls="ddmenu_7"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </span>
            <span class="text">Quản lý danh mục </span>
          </a>
          <ul id="ddmenu_7" class="collapse dropdown-nav">
            <li>
              <router-link to="/admin/category">Danh sách danh mục</router-link>
            </li>
            <li>
              <router-link to="/admin/add_category">Thêm danh mục</router-link>
            </li>
          </ul>
        </li>
        <li
          class="nav-item nav-item-has-children"
          v-if="$store.getters.isAdmin"
        >
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_8"
            aria-controls="ddmenu_8"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fa-brands fa-docker"></i>
            </span>
            <span class="text">Nhà cung cấp</span>
          </a>
          <ul id="ddmenu_8" class="collapse dropdown-nav">
            <li>
              <router-link to="/admin/supplier">Các nhà cung cấp</router-link>
            </li>
            <li>
              <router-link to="/admin/add_supplier"
                >Thêm nhà cung cấp</router-link
              >
            </li>
          </ul>
        </li>
        <li
          class="nav-item nav-item-has-children"
          v-if="$store.getters.isAdmin"
        >
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_5"
            aria-controls="ddmenu_5"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fas fa-address-book"></i>
            </span>
            <span class="text">Quản lý tài khoản</span>
          </a>
          <ul id="ddmenu_5" class="collapse dropdown-nav">
            <li>
              <router-link to="/admin/clientUsers"
                >Tài khoản thành viên</router-link
              >
            </li>
            <li>
              <router-link to="/admin/employeeUsers"
                >Tài khoản nhân viên</router-link
              >
            </li>
            <li>
              <router-link to="/admin/adminUsers"
                >Tài khoản quản trị</router-link
              >
            </li>
          </ul>
        </li>
        <li class="nav-item nav-item-has-children">
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_2"
            aria-controls="ddmenu_2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fas fa-warehouse"></i>
            </span>
            <span class="text">Sản phẩm</span>
          </a>
          <ul id="ddmenu_2" class="collapse dropdown-nav">
            <li>
              <router-link to="/admin/products">Danh sách</router-link>
            </li>
            <li>
              <router-link to="/admin/import">Nhập sản phẩm</router-link>
            </li>
            <li>
              <router-link
                v-if="this.$store.getters.isAdmin"
                to="/admin/importHistory"
                >Lịch sử nhập kho</router-link
              >
            </li>
          </ul>
        </li>

        <li class="nav-item nav-item-has-children">
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_3"
            aria-controls="ddmenu_3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fa-solid fa-box"></i>
            </span>
            <span class="text">Đơn hàng</span>
          </a>
          <ul id="ddmenu_3" class="collapse dropdown-nav">
            <li>
              <router-link :to="{ name: 'NewOrders' }"
                >Chờ phê duyệt</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'ProcessOrders' }"
                >Đang xử lý</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'DeliveredOrders' }"
                >Đã giao hàng</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'RefundedOrders' }"
                >Đơn hoàn trả</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'CanceledOrders' }">Đã hủy</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item nav-item-has-children">
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_9"
            aria-controls="ddmenu_9"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fa-solid fa-signs-post"></i>
            </span>
            <span class="text">Bài viết</span>
          </a>
          <ul id="ddmenu_9" class="collapse dropdown-nav">
            <li>
              <router-link to="/admin/newPost"
                >Các bài viết chưa duyệt</router-link
              >
            </li>
            <li v-if="$store.getters.isAdmin">
              <router-link to="/admin/approved_post"
                >Danh sách bài viết</router-link
              >
            </li>
            <li>
              <router-link to="/admin/addPost">Thêm bài viết</router-link>
            </li>
          </ul>
        </li>
        <li
          class="nav-item nav-item-has-children"
          v-if="$store.getters.isAdmin"
        >
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_10"
            aria-controls="ddmenu_10"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <i class="fas fa-bullseye"></i>
            </span>
            <span class="text">CSBH và KM</span>
          </a>
          <ul id="ddmenu_10" class="collapse dropdown-nav">
            <li>
              <router-link to="/admin/policy">Chính sách bán hàng</router-link>
            </li>
            <li>
              <router-link to="/admin/discount">Khuyến mãi</router-link>
            </li>
          </ul>
        </li>
        <span class="divider"><hr /></span>
        <li
          class="nav-item nav-item-has-children"
          v-if="$store.getters.isAdmin"
        >
          <a
            href="#0"
            class="collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#ddmenu_4"
            aria-controls="ddmenu_4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.66675 4.58325V16.4999H19.2501V4.58325H3.66675ZM5.50008 14.6666V6.41659H8.25008V14.6666H5.50008ZM10.0834 14.6666V11.4583H12.8334V14.6666H10.0834ZM17.4167 14.6666H14.6667V11.4583H17.4167V14.6666ZM10.0834 9.62492V6.41659H17.4167V9.62492H10.0834Z"
                />
              </svg>
            </span>
            <span class="text">Báo cáo thống kê</span>
          </a>
          <ul id="ddmenu_4" class="collapse dropdown-nav">
            <li>
              <a href="/admin/statistic/sales">Doanh số</a>
            </li>
            <li>
              <a href="/admin/statistic/products">Sản phẩm</a>
            </li>
          </ul>
        </li>

        <span class="divider"><hr /></span>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.icon {
  i {
    margin-left: 3px;
    display: inline-block;
    width: 24px;
    font-size: 20px;
    text-align: center;
  }
}
.navbar-logo {
  img {
    width: 100px;
    height: 100px;
  }
}
.sidebar-nav-wrapper {
  width: 270px !important;
}
</style>
