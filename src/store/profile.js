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
      icon: '',
    }
  },
  mutations: {
    SET_PROFILE(state, payload) {
      state.profile.id = payload.id
      state.profile.name = payload.name
      state.profile.email = payload.email
      state.profile.city = payload.city
      state.profile.phone = payload.phone
      state.profile.icon = payload.icon_url
      
      EventBus.notify("loaded_profile", state.profile);
    }
  },

  actions: {

/*  LOAD_PROFILE action */
    LOAD_PROFILE({ commit, dispatch, state }, payload) {
      if (!!payload || state.profile.id == 0) {
        server.post("profile", {}, {}, (response) => {
          if (response.data.success) {
            commit("SET_PROFILE", response.data.success);
          }
        });
      }
    },

    SILENT_LOAD_PROFILE({ commit, dispatch, state }, payload) {
      if (!!payload || state.profile.id == 0) {
        server.simple_get("silent_profile", (response) => {
          if (response.data.success) {
            commit("SET_PROFILE", response.data.success);
          }
        });
      }
    },

/*  CLEAR_PROFILE action */
    CLEAR_PROFILE({ state }) {
      EventBus.notify("loaded_profile", state.profile);
    },

/*  UPDATE_PROFILE action */
    UPDATE_PROFILE({ commit, dispatch }, payload) {
      server.post("profile/update", payload, {}, (response) => {
        if (response.data.success) {
          commit("SET_PROFILE", response.data.success);
          dispatch("SET_SUCCESS_MESSAGE", 'Profile has been updated');
        }
      });
    },

/*  CHANGE_PASSWORD action */
    CHANGE_PASSWORD({ dispatch }, payload) {
      server.post("password/update", payload, {}, (response) => {
        if (response.data.success) {
          dispatch("SET_SUCCESS_MESSAGE", 'Password has been updated');
          router.push({path:"/profile/info"});
        }
      });
    },


    UPDATE_AVATAR({commit, dispatch}, payload) {
      let formData = new FormData();
      formData.append('file', payload);
      server.post("profile/update_avatar", formData, {is_upload: true}, (response) => {
        if (response.data.success) {
          commit("SET_PROFILE", response.data.success);
          dispatch("SET_SUCCESS_MESSAGE", 'Avatar has been updated');
        }
      });
    }

  },
  getters: {
    getProfile: state => state.profile,
  }
};
