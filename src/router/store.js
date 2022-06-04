import { createStore } from 'vuex'

const store = createStore(
    {
      state() {
        return {
          isAuthen:false,
        }
      },
      mutations: {
        setIsAuthen(state, isAuth) {
          if(isAuth == true) {
            state.isAuthen = true;
          } else state.isAuth = false;
        }
      },
      getters: {
        isAuthentication(state) {
          return state.isAuthen
        }
      }
    }
  )

export default store