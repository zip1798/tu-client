import router from "../router";
import Vue from "vue"
import server from "../repository/server";
import { EventBus } from "../repository/eventBus";

export default {
  state: {
    profile: {
      id: 0,
      name: '',
      email: '',
      city: '',
      phone: '',
    }
  },
  mutations: {
    SET_PROFILE(state, payload) {
      state.profile.id = payload.id
      state.profile.name = payload.name
      state.profile.email = payload.email
      state.profile.city = payload.city
      state.profile.phone = payload.phone
      
      EventBus.notify("loaded_profile", state.profile);
    }
  },

  actions: {

/* LOAD_PROFILE action */
    LOAD_PROFILE({ commit, dispatch, state }, payload) {
      if (!!payload || state.profile.id == 0) {
        server.post("profile", {}, {}, (response) => {
          if (response.data.success) {
            commit("SET_PROFILE", response.data.success);
          }
        });
      }
    },

/* CLEAR_PROFILE action */

/* UPDATE_PROFILE action */



  },
  getters: {
    getProfile: state => state.profile,
  }
};
