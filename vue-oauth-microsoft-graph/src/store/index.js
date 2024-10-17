// Store data of the user in vuex 

import { createStore } from 'vuex';

const store = createStore({
  state: 
  {
    user: null,
    isCut: false
  },

  mutations: 
  {
    setUser(state, user) 
    {
      state.user = user;
      state.isCut = true;
    },

    clearUser(state) 
    {
      state.user = null;
      state.isCut = false;
    },

    setIsCut(state, isCut) 
    {
      state.isCut = isCut;
    },
  },

  getters: 
  {
    isUserSignedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    isButtonDisabled: (state) => state.isCut
  }
});

export default store;
