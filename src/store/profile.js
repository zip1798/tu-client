import router from "../router";
import Vue from "vue"
import server from "../repository/server";

export default {
  state: {
    profile: {
      name: '',
      email: '',
      city: '',
      phone: '',
    }
  },
  mutations: {
    SET_PROFILE(state, payload) {
      state.profile.name = payload.name
      state.profile.email = payload.email
      state.profile.city = payload.city
      state.profile.phone = payload.phone

    }
  },

  actions: {

/* LOAD_PROFILE action */
    LOAD_PROFILE({ commit, dispatch }, payload) {
        server.post("profile", {}, {}, (response) => {
          if (response.data.success) {
            commit("SET_PROFILE", response.data.success);
          }
        });
    },

/* CLEAR_PROFILE action */

/* UPDATE_PROFILE action */



  },
  getters: {
    getProfile: state => state.profile,
  }
};
