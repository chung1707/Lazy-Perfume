export default {
  setSidebar(state) {
    state.hiddenSidebar = !state.hiddenSidebar;
  },
  setRoleId(state, id) {
    state.role_id = id;
  },
  setAuthUser(state, user) {
    state.authUser = user;
  },
  setLatestProducts(state, products) {
    state.latestProductsMale = products.male;
    state.latestProductsFemale = products.female;

  },
  setBestSellers(state, products) {
    state.bestSellersMale = products.male;
    state.bestSellersFemale = products.female;
  },
  setBrandLogos(state, logos) {
    state.brandLogos = logos;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setTotalProductsPages(state, total) {
    state.totalProductsPages = total;
  },
  setCategoriesInProductsPage(state, categories) {
    state.categoriesInProductsPage = categories;
  },
  setBrandsInProductsPage(state, brands) {
    state.brandsInProductsPage = brands;
  },

  // client cart 
  setItemsInCart(state, products) {
    state.itemsInCart = products;
  },
  addToCart(state, product) {
    let qty = Number(product.with.quantity);
    let productIncart = state.itemsInCart.find(item => {
      return item.id === product.id;
    });
    if (productIncart) {
      if (productIncart.pivot.quantity + qty > productIncart.quantity) {
        productIncart.pivot.quantity = productIncart.quantity;
        return;
      }
      productIncart.pivot.quantity += qty;
      return;
    }
    product['pivot'] = {
      'quantity': qty
    };
    state.itemsInCart.push(product);
  },
  deleteProduct(state, product) {
    let index = state.itemsInCart.indexOf(product);
    state.itemsInCart.splice(index, 1);
  },

  // management pages 
  setUser(state, user) {
    state.user = user;
  },

  // upload pictures
  setPictures(state, pictures) {
    state.pictures = pictures;
  },
  addPicture(state, picture) {
    state.pictures.push(picture);
  },
  removePicture(state, index) {
    state.pictures.splice(index, 1);
  },
}
