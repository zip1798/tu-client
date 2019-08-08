import router from "../router";
import Vue from "vue"
import server from "../repository/server";
import { EventBus } from "../repository/eventBus";

export default {
  state: {
    media_id: 0,
    media_list: [],
    media_filter: {
      category: 'all',
      type: 'all',
    },
    pagination: {
      current_page: 1,
      elements_on_page: 9
    }
  },
  mutations: {
    SET_MEDIA_ID(state, payload) {
      state.media_id = payload
    },

    APPEND_MEDIA(state, payload) {
      state.media_list.push(payload)
    }
  },

  actions: {

/*  CREATE_IMAGE_MEDIA action */
    CREATE_IMAGE_MEDIA({ commit, dispatch, state }, payload) {
      let formData = new FormData();
      formData.append('file', payload.file);
      formData.append('category', payload.category);
      formData.append('type', 'image');
      server.post("media", formData, {is_upload: true}, (response) => {
        if (response.data.success) {
          commit("APPEND_MEDIA", response.data.success)
          commit("SET_MEDIA_ID", response.data.success.id)
          dispatch("SET_SUCCESS_MESSAGE", 'Image has been uploaded')
        }
      });
    },


    LOAD_MEDIA_LIST({ commit, dispatch, state }, payload) {
      server.get("media", (response) => {

      });
    },

    SELECT_MEDIA({ commit, dispatch, state }, payload) {

    },

    SET_PAGE({ commit, state }, payload) {

    },

    SET_FILTER({ commit, state }, payload) {

    }

  },
  getters: {
    getSelectedMedia: state => state.media_id,
    getMediaList: state => state.media_list
  }
};
