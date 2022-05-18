import baseRequest from "../base/baseRequest";

export default {
  //auth
  setAuthUser(context) {
    return baseRequest
      .get("user")
      .then(function (response) {
        context.commit('setAuthUser', response.data);
        context.commit('setRoleId', response.data.role_id)
      })
  },
  logout(context) {
    return baseRequest.get('logout').then(() => {
      context.commit('setAuthUser', null);
      context.commit('role_id', null);
      context.commit('setItemsInCart', null);
      localStorage.removeItem("token");
    })
  },
  login(context, user) {
    return baseRequest.post("login", user).then((response) => {
      window.localStorage.setItem('token', response.data.token);
      context.commit('setAuthUser', response.data.user);
      context.commit('setRoleId', response.data.user.role_id);
    })
  },
  register(context, user) {
    return baseRequest.post('register', user).then(response => {
      window.localStorage.setItem('token', response.data.token);
      context.commit('setAuthUser', response.data.user);
      context.commit('setRoleId', response.data.user.role_id);
    })
  },
  // account
  setLatestProducts(context) {
    return baseRequest.get('latestProducts').then(response => {
      context.commit('setLatestProducts', response.data);
    })
  },
  setBestSellers(context) {
    return baseRequest.get('bestSellers').then(response => {
      context.commit('setBestSellers', response.data);
    })
  },
  setBrandLogos(context) {
    return baseRequest.get('brandLogos').then(response => {
      context.commit('setBrandLogos', response.data.brandLogos);
    })
  },

  // client cart 
  getCart(context) {
    baseRequest.get("get_cart").then(response => {
      context.commit('setItemsInCart', response.data.Products);
    });
  },
  addToCart(context, product) {
    baseRequest.post("add-to-cart", {
      'product_id': product.id,
      'quantity': product.with.quantity
    }).then(() => {
      context.commit('addToCart', product);
    });
  },
  deleteProductInCart(context, product) {
    baseRequest.post("delete_product_in_cart", {
      'product_id': product.id
    });
    context.commit('deleteProduct', product);
  },
  updateQty(context, product) {
    baseRequest.post("update_qty_cart", {
      'product_id': product.id,
      newQuanty: product.pivot.quantity
    });
  },
  clearCart(context) {
    baseRequest.post('clearCart');
    context.commit('setItemsInCart', null);
  },
  // management pages
  getUser(context, id) {
    return baseRequest
      .get("user", id)
      .then(function (response) {
        context.commit('setUser', response.data);
      })
  }
}
