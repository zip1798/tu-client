import axios from "axios";
import appConfig from "../config/app";
import router from "../router";
import Vue from "vue"
import * as generalRepo from "../repository/general";

export default {
  state: {
    profile: {}
  },
  mutations: {
    SET_PROFILE(state, payload) {
    }
  },

  actions: {

/* LOAD_PROFILE action */
    LOAD_PROFILE({ commit, dispatch }, payload) {
/*      
      dispatch("CLEAR_MESSAGES");
      dispatch("SET_PROCESSING", true);
      axios
        .post(appConfig.api + "login", {
          email: payload.email,
          password: payload.password
        })
        .then(response => {
           dispatch("SET_PROCESSING", false);
           // response.status = 200
          if (response.data.success) {
            commit("SET_AUTH_STATUS", response.data.success);
            router.push({path:"/"});
          }
          if (response.error) {
            throw new Error(response.error);
          }
        })
        .catch(error => {
          commit("SET_ERROR", generalRepo.prepareErrorRespond(error));
          dispatch("SET_PROCESSING", false);
        });
*/    

/* CLEAR_PROFILE action */

/* UPDATE_PROFILE action */

},


  },
  getters: {
    getProfile: state => state.profile,
  }
};
