export default {
  pictures: state => state.pictures,
  imgUrl: state => state.imgUrl,
  // auth
  authUser(state) {
    return state.authUser;
  },
  authenticated: state => state.authUser != null && !state.authUser.blocked,
  isManager: state => state.role_id == 1 || state.role_id == 3,
  isAdmin: state => state.role_id == 1,
  isUser: state => state.role_id == 2,
  role_id: state => state.role_id,

  //home 
  latestProductsMale: state => state.latestProductsMale,
  latestProductsFemale: state => state.latestProductsFemale,
  bestSellersMale: state => state.bestSellersMale,
  bestSellersFemale: state => state.bestSellersFemale,
  brandLogos: state => state.brandLogos,

  // client cart 
  itemsInCart: state => state.itemsInCart,
  totalPrice(state) {
    let sum = null;
    if (state.itemsInCart) {
      for (var i = 0; i < state.itemsInCart.length; i++) {
        sum +=
          state.itemsInCart[i].price *
          state.itemsInCart[i].pivot.quantity *
          ((100 - state.itemsInCart[i].discount) / 100);
      }
    }
    return sum;
    // return sum *((100-state.discountCode) /100 );
  },
  totalItemInCart(state) {
    let total = 0;
    if (state.itemsInCart) {
      for (let i = 0; i < state.itemsInCart.length; i++) {
        total += Number(state.itemsInCart[i].pivot.quantity);
      }
    }
    return Number(total);
  },
  // import
  itemsInBill: state => state.itemsInBill,
  sumPrice(state){
    let total = 0;
    for(let i = 0; i < state.itemsInBill.length; i++){
        total += state.itemsInBill[i].quantity * state.itemsInBill[i].price;
    }
    return total;
},
}
