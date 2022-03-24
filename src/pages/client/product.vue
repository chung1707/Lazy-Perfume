<template>
  <main class="wrapper product-page">
    <section class="header-products">
      <h1 class="page-title">White Cristal</h1>
    </section>
    <section class="wrapper main-product">
      <div class="path">
        <div class="container">
          <router-link class="link" to="/">Trang chủ</router-link>
          <span class="seperate">/</span>
          <router-link class="link" to="/">Kilian</router-link>
          <span class="seperate">/</span>
          <span>Kilian White Sristal</span>
        </div>
      </div>
      <div class="container product-content">
        <div class="left-content">
          <div class="thumbnails-product">
            <img
              :class="{ visible: image1 == true, dispay_hidden: image1 == false }"
              src="../../assets/images/for-him.jpg"
              alt="product image"
            />
            <img
              :class="{ visible: image1 == false, dispay_hidden: image1 == true }"
              src="../../assets/images/for-her.jpg"
              alt="product image"
            />
            <div class="mini-thumbnails">
              <a href="#" @click.prevent="image1 = true">
                <img
                  src="../../assets/images/for-him.jpg"
                  alt="product image"
                />
              </a>
              <a href="#" @click.prevent="image1 = false">
                <img
                  src="../../assets/images/for-her.jpg"
                  alt="product image"
                />
              </a>
            </div>
          </div>
          <div class="description-product">
            <h5>Mô tả</h5>
            <p>
              Hương chính: Xạ hương, Hoa nhài, Hoắc hương, Gỗ tuyết tùng, Hổ
              phách, Nhục đậu khấu, Vanilla, Rượu Rum, Trái cây sấy khô Vượt qua
              mọi giới hạn, ranh giới đề ra trong những tầng hương vốn cần có
              của một chai nước hoa, Killian Straight to Heaven đưa tới một minh
              chứng mới dành cho các quý ông mạnh mẽ, thanh lịch chỉ bằng một cú
              hích ngay từ tầng hương chủ đạo của mình. Không phức tạp, rườm rà
              bởi sự phân bố từ các tầng hương, Killian Straight to Heaven đi
              thẳng vào vấn đề như những người đàn ông thực thụ khi sử dụng sức
              mạnh từ Rượu Rum và sức nóng từ Gỗ tuyết tùng để thể hiện đẳng cấp
              khác biệt của mình. Ở trên da càng lâu , những nốt hương được bao
              phủ xung quanh như Xạ hương, Hoa nhài, Hoắc hướng, Hổ Phách, Nhục
              đậu khấu, Vanilla càng xuất hiện rõ ràng hơn, tấn công dồn dập vào
              khứu giác của các nàng. Gây ra những cảm giác ngây ngất, say mê
              khiến đối phương phải quỳ rạp mà cầu xin các quý ngài tiến lại
              gần.
            </p>
          </div>
        </div>
        <div class="right-content">
          <h4>By Kilian</h4>
          <h3>Kilian white cristal</h3>
          <span class="gen"><i class="fa-solid fa-venus"></i>Nam</span>
          <span class="price">7.500.000 VNĐ</span>
          <div class="capacity">
            <label> Dung tích: </label>
            <div class="capacity-box" @click="selectCapacity = !selectCapacity">
              <i class="fa-solid fa-caret-down"></i>
              <span>{{ capacity }} ml</span>
              <ul :class="{ dispay_hidden: !selectCapacity, visible: selectCapacity }">
                <li>50 ml</li>
                <li>100 ml</li>
              </ul>
            </div>
          </div>
          <div class="quantity">
            <div class="quantity-box">
              <input type="number" v-model="quantity" />
              <i @click="increase()" class="fa-solid fa-plus plus"></i>
              <i @click="reduce()" class="fa-solid fa-minus minus"></i>
            </div>

            <button class="button">Thêm vào giỏ hàng</button>
          </div>
          <div class="featured">
            <div class="tabs">
              <a @click.prevent="tabActive = 1">Mùi hương</a>
              <a @click.prevent="tabActive = 2">Đặc điểm</a>
              <a @click.prevent="tabActive = 3">Khuyên dùng</a>
            </div>
            <div class="tab-content">
              <div
                class="fragrant-tab dispay_hidden"
                :class="{ visible: tabActive == 1 }"
              >
                <ul>
                  <li class="tab-item">
                    <span>Mùi hương</span>
                    <ul>
                      <li>Hương gỗ</li>
                      <li>Hương trái cây</li>
                    </ul>
                  </li>
                  <li class="tab-item">
                    <span>Hương đầu</span>
                    <ul>
                      <li>Cam begamot</li>
                      <li>Quả dừa</li>
                      <li>Táo xanh</li>
                      <li>Quả lý chua đen</li>
                    </ul>
                  </li>
                  <li class="tab-item">
                    <span>Hương giữa</span>
                    <ul>
                      <li>Hoắc Hương</li>
                      <li>Hoa nhài Morocco</li>
                      <li>Gỗ Bu-lô</li>
                      <li>Hoa Hồng</li>
                    </ul>
                  </li>
                  <li class="tab-item">
                    <span>Hương cuối</span>
                    <ul>
                      <li>Hương vani</li>
                      <li>Xạ hương</li>
                      <li>Rêu xồi</li>
                      <li>Long diên hương</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div
                class="features-tab dispay_hidden"
                :class="{ visible: tabActive == 2 }"
              >
                <ul>
                  <li class="tab-item">
                    <span class="item-title">Phát hành:</span> <span>2010</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title">Giới tính:</span> <span>Nam</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title">Độ tuổi:</span> <span>25+</span>
                  </li>
                  <li class="tab-item">
                    <span class="item-title"> Độ lưu mùi:</span>
                    <div class="saving">
                      <div
                        v-for="it in saveIncense"
                        :key="it"
                        :class="{ bg_blue: it.id == test }"
                      >
                        <span class="number">{{ it.saving }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                class="recommended-tab dispay_hidden"
                :class="{ visible: tabActive == 3 }"
              >
                <div class="season">
                  <span class="item-title">Mùa</span>
                  <div class="rcm-box">
                    <div class="range-rcm" v-for="ss in seasons" :key="ss.id">
                      <span class="rcm-name">{{ ss.name }}</span>
                      <div class="rcm-range">
                        <span v-bind:style="{ width: ss.rcm + '%' }"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="times">
                  <span class="item-title">Thời điểm</span>
                  <div class="rcm-box">
                    <div class="range-rcm" v-for="time in times" :key="time.id">
                      <span class="rcm-name">{{ time.name }}</span>
                      <div class="rcm-range">
                        <span v-bind:style="{ width: time.rcm + '%' }"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="wrapper related-product">
        <h2 class="title-section">Sản phảm liên quan</h2>
        <relatedProducts></relatedProducts>
    </section>
  </main>
</template>

<script>
import relatedProducts from '../../components/client/relatedProducts.vue'

export default {
  components: {
    relatedProducts
  },
  data() {
    return {
      tabActive: 1,
      test: 4,
      selectCapacity: false,
      capacity: 100,
      image1: true,
      quantity: 1,
      saveIncense: [
        { id: 1, saving: 3 },
        { id: 2, saving: 6 },
        { id: 3, saving: 8 },
        { id: 4, saving: 12 },
      ],
      seasons: [
        { id: 1, name: "Xuân", rcm: "60" },
        { id: 2, name: "Hạ", rcm: "20" },
        { id: 3, name: "Thu", rcm: "78" },
        { id: 4, name: "Đông", rcm: "95" },
      ],
      times: [
        { id: 1, name: "Ngày", rcm: "70" },
        { id: 2, name: "Đêm", rcm: "95" },
      ],
    };
  },
  methods: {
    increase() {
      return this.quantity++;
    },
    reduce() {
      if (this.quantity == 1) return this.quantity;
      return this.quantity--;
    },
  },
};
</script>

<style></style>
