import {
  store
} from "../main";
// check logged in
export default {
  requireAuth(to, from, next) {
    // check user in state
    if (store.getters.authenticated&& !store.state.authUser.blocked) {
      next();
    }
    //check user with token 
    else {
      store.dispatch('setAuthUser').then(() => {
        next();
      }).catch(() => {
        next({
          name: 'Login'
        });
      })
    }
  },

  checkManagerRole(to, from, next) {
    // let adminRoleId = 1;
    if (store.getters.isManager&& !store.state.authUser.blocked) {
      next();
    } else {
      next({
        name: 'Error'
      });
    }
  },
  checkAdminRole(to, from, next) {
    // let adminRoleId = 1;
    if (store.getters.isAdmin&& !store.state.authUser.blocked) {
      next();
    } else {
      next({
        name: 'Error'
      });
    }
  },
  // can not to a number of pages when was logged in (login, register, ...)
  checkLoggedIn(to, from, next) {
    if (store.getters.authenticated) {
      next({
        name: 'Home'
      });
    }
    //check user with token 
    else {
      store.dispatch('setAuthUser').then(() => {
        next({
          name: 'Home'
        });
      }).catch(() => {
        next();
      })
    }
  }
}
