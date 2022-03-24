<template>
  <main class="cart-page">
    <div class="header-cart wrapper">
      <h1 class="page-title">Giỏ hàng</h1>
      <div class="cart-content container">
        <div class="left-cart">
          <h3>Sản phẩm đã chọn</h3>
          <ul class="items-in-cart">
            <li>
              <a href="#">
                <img src="../../assets/images/for-him.jpg" alt="item in cart" />
              </a>
              <div class="info-item">
                <a href="#"
                  >Dior Sauvage
                  <span class="discount-item">-10%</span>
                </a>
                <span class="price-item line-through">3.800.000 VNĐ</span>
                <span class="new-price">3.420.000 VNĐ</span>
              </div>
              <div class="quantity-box">
                <input type="number" />
                <i @click="increase()" class="fa-solid fa-plus plus"></i>
                <i @click="reduce()" class="fa-solid fa-minus minus"></i>
              </div>
              <div class="total">
                <span class="title-price">Tổng giá:</span>
                <span class="total-price-item">3.800.000 VNĐ</span>
              </div>
              <i class="fa-solid fa-x"></i>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/images/for-him.jpg" alt="item in cart" />
              </a>
              <div class="info-item">
                <a href="#"
                  >Dior Sauvage
                  <span class="discount-item">-10%</span>
                </a>
                <span class="price-item line-through">3.800.000 VNĐ</span>
                <span class="new-price">3.420.000 VNĐ</span>
              </div>
              <div class="quantity-box">
                <input type="number" />
                <i @click="increase()" class="fa-solid fa-plus plus"></i>
                <i @click="reduce()" class="fa-solid fa-minus minus"></i>
              </div>
              <div class="total">
                <span class="title-price">Tổng giá:</span>
                <span class="total-price-item">3.800.000 VNĐ</span>
              </div>
              <i class="fa-solid fa-x"></i>
            </li>
            <li>
              <a href="#">
                <img src="../../assets/images/for-him.jpg" alt="item in cart" />
              </a>
              <div class="info-item">
                <a href="#"
                  >Dior Sauvage
                  <span class="discount-item">-10%</span>
                </a>
                <span class="price-item line-through">3.800.000 VNĐ</span>
                <span class="new-price">3.420.000 VNĐ</span>
              </div>
              <div class="quantity-box">
                <input type="number" />
                <i @click="increase()" class="fa-solid fa-plus plus"></i>
                <i @click="reduce()" class="fa-solid fa-minus minus"></i>
              </div>
              <div class="total">
                <span class="title-price">Tổng giá:</span>
                <span class="total-price-item">3.800.000 VNĐ</span>
              </div>
              <i class="fa-solid fa-x"></i>
            </li>
          </ul>
          <div class="discount-box">
            <h3>Mã giảm giá</h3>
            <div class="box-content">
              <div>
                <input type="text" placeholder="Nhập mã ưu đãi" />
                <button class="button">Sử dụng</button>
              </div>
              <button class="button">Cập nhập giỏ hàng</button>
            </div>
          </div>
        </div>
        <div class="right-cart">
          <div class="checkout-box">
            <h3>Phiếu thanh toán</h3>
            <div class="total-price">
              <span>Tạm tính: </span>
              <span class="price">10.000.000 VNĐ </span>
            </div>
            <div class="discount">
              <span>Giảm giá: </span>
              <span class="price">0%</span>
            </div>
            <div class="final-price">
              <span>Tổng tiền: </span>
              <span class="price">10.000.000 VNĐ </span>
            </div>
            <button class="button">Tiến hành thanh toán</button>
          </div>
          <div class="help-box">
            <div class="help">
              <span
                >Trợ giúp ?
                <i @click="helpTabActive = 1" v-if="helpTabActive !=1" class="fa-solid fa-plus"></i>
                <i @click="helpTabActive = 0" v-else class="fa-solid fa-minus"></i>
              </span>
              <div class="content dispay_hidden" :class="{visible: helpTabActive==1}">
                <p>
                  Nếu trong quá trình đặt hàng có bất kỳ thắc mắc nào, quý khách
                  vui lòng liên hệ theo Hotline:
                </p>
                <ul>
                  <li>Chi nhánh Hà Nội: 032 681 111</li>
                  <li>Chi nhánh Sài Gòn: 032 681 112</li>
                </ul>
              </div>
            </div>
            <div class="help">
              <span
                >Thông tin ship ?
                <i @click="helpTabActive =2" v-if="helpTabActive !=2" class="fa-solid fa-plus"></i>
                <i @click="helpTabActive =0" v-else class="fa-solid fa-minus"></i>
              </span>
              <div class="content dispay_hidden" :class="{visible: helpTabActive==2}">
                <p>
                  Lazy Perfume miễn phí ship với tất cả các đơn hàng toàn quốc.
                </p>
              </div>
            </div>
            <div class="help">
              <span
                >Đổi trả và hoàn tiền
                <i @click="helpTabActive =3" v-if="helpTabActive !=3" class="fa-solid fa-plus"></i>
                <i @click="helpTabActive =0" v-else class="fa-solid fa-minus"></i>
              </span>
              <ul class="refund content dispay_hidden" :class="{visible: helpTabActive==3}">
                <li>
                  Lazy Perfume hỗ trợ đổi trả sản phẩm trong vòng 3 ngày kể từ
                  khi nhận hàng.
                </li>
                <li>
                  Với việc đổi sản phẩm, chỉ áp dụng với các sản phẩm còn nguyên
                  seal, tem. Chỉ áp dụng đổi sang các sản phẩm có giá trị bằng
                  hoặc cao hơn.
                </li>
                <li>
                  Với việc hoàn tiền, chỉ áp dụng trong trường hợp sản phẩm có
                  lỗi từ nhà sản xuất hoặc bể, vỡ trong quá trình vận chuyển.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      helpTabActive: 1,
    };
  },
};
</script>

<style></style>
