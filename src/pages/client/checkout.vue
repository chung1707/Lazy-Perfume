<template>
  <main class="checkout-page wrapper">
    <section class="header-products">
      <h1 class="page-title">Thanh Toán</h1>
    </section>
    <section>
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <router-link class="link" to="/cart">Giỏ hàng</router-link>
          <span class="seperate">/</span>
          <span>Thanh toán</span>
        </div>
      </div>
      <div class="checkout-content">
        <div class="container">
          <div class="left-checkout">
            <h3>Chi tiết thanh toán</h3>
            <div class="name-customer">
              <div class="name">
                <label for="name">Tên khách hàng</label>
                <input type="text" name="name" placeholder="Tên của bạn" />
              </div>
              <div class="name">
                <label for="phoneNumber">Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Số điện thoại của bạn"
                />
              </div>
            </div>
            <div class="email-address">
              <div class="email">
                <label for="email">Email</label>
                <input type="text" placeholder="Email của bạn" />
              </div>
              <div class="address-details">
                <label for="address">Địa chỉ nhận hàng</label>
                <input type="text" />
              </div>
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
            <div class="notes">
              <label for="notes"> Ghi chú cho đơn hàng </label>
              <textarea
                placeholder="Nhập ghi chú cho đơn hàng của bạn"
                class=""
                name="notes"
                id=""
              ></textarea>
            </div>
            <div class="payment">
              <h3 class="filter-title">Phương thức thanh toán</h3>
              <ul class="seasons-filter">
                <li
                  v-for="payment in payments"
                  :key="payment.id"
                  @click="selectPaymentMethod(payment.id)"
                >
                  <div class="div-checkbox">
                    <i
                      :class="{visible: payment_method == payment.id}"
                      class="hidden fa-solid fa-check"
                    ></i>
                  </div>
                  <label>{{ payment.name }} </label>
                </li>
              </ul>
            </div>
          </div>
          <div class="right-checkout">
            <div class="discount-box">
              <h3>Mã giảm giá</h3>
              <div class="box-content">
                <div>
                  <input type="text" placeholder="Nhập mã ưu đãi" />
                  <button class="button">Sử dụng</button>
                </div>
              </div>
            </div>
            <div class="bill-info">
              <h3>Đơn hàng của bạn</h3>
              <div class="title-bill">
                <span>Sản phẩm</span>
                <span>Thành tiền</span>
              </div>
              <div class="products-in-bill">
                <span class="name"> Dior Sauvage x 2 </span>
                <span class="price"> 3.500.000 VNĐ </span>
              </div>
              <div class="products-in-bill">
                <span class="name"> Dior Sauvage x 2 </span>
                <span class="price"> 3.500.000 VNĐ </span>
              </div>
              <div class="total-price">
                <span>Tổng tiền:</span>
                <span> 10.000.000 VNĐ</span>
              </div>
              <div class="total-shipping">
                <span>Phí vận chuyển:</span>
                <span> 10.000 VNĐ</span>
              </div>
              <div class="total-discount">
                <span>Giảm giá:</span>
                <span> 10%</span>
              </div>
              <div class="final-price">
                <span>Tổng hóa đơn:</span>
                <span> 10.000.000 VNĐ</span>
              </div>
              <button class="button">Thanh toán</button>
            </div>
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
      payment_method: 0,
      arrangeKey: "Mới nhất",
      arrangeActive: false,
      arrange: [
        { name: "Mới nhất", id: 1 },
        { name: "Thứ tự theo giá: Từ thấp đến cao", id: 2 },
        { name: "Thứ tự theo giá: Từ cao đến thấp", id: 3 },
        { name: "Theo mức độ phổ biến", id: 4 },
      ],
      payments: [
        {
          id: 1,
          name: "Thanh toán khi nhận hàng (COD)",
          description:
            "COD là viết tắt của Cash On Delivery, nghĩa là thanh toán khi nhận hàng. Với phương thức thanh toán này, quý khách trả tiền mặt cho nhân viên giao hàng ngay khi nhận được đơn hàng của mình. Chúng tôi chấp nhận hình thức thanh toán khi nhận hàng (COD) cho hầu hết đơn hàng trên toàn quốc.",
        },
        {
          id: 2,
          name: "Thanh toán bằng tài khoản ngân hàng",
          description:"Tài khoản thanh toán là tài khoản sử dụng cho việc thanh toán mở tại trung gian thanh toán. Tài khoản này được dùng với mục đích thanh toán là chủ yếu. Số tiền có trong tài khoản khách hàng có thể thanh toán cho bất kỳ nhu cầu dịch vụ nào, chúng vô cùng tiện lợi và nhanh chón"
        },
      ],
    };
  },
  methods: {
    selectPaymentMethod(id){
      if(this.payment_method ==id) return this.payment_method=0;
      return this.payment_method = id;
    }
  }
};
</script>

<style></style>
