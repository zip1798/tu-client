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
    },

    DELETE_MEDIA_FROM_LIST(state, payload) {
      state.media_list = state.media_list.filter(media => media.id != payload)
    },

    CLEAR_MEDIA_LIST(state) {
      state.media_list = []
      state.media_filter = {
        category: 'all',
        type: 'all',
      }
      state.pagination = {
        current_page: 1,
        elements_on_page: 9
      }
      // state.media_id = 0
    },

    SET_CURRENT_PAGE(state, payload) {
      state.pagination.current_page = payload
    },

    SET_FILTER(state, payload) {
      if (payload.category) {
        state.media_filter.category = payload.category
      }
      if (payload.type) {
        state.media_filter.type = payload.type
      }
    }

  },

  actions: {

/*  CREATE_IMAGE_MEDIA action */
    CREATE_IMAGE_MEDIA({ commit, dispatch, state }, payload) {
      let formData = new FormData()
      formData.append('file', payload.file)
      formData.append('category', payload.category)
      formData.append('type', 'image')
      server.post("media", formData, {is_upload: true}, (response) => {
        if (response.data.success) {
          commit("APPEND_MEDIA", response.data.success)
          commit("SET_MEDIA_ID", response.data.success.id)
          dispatch("SET_SUCCESS_MESSAGE", 'Image has been uploaded')
        }
      });
    },


    LOAD_MEDIA_LIST({ commit, dispatch, state }) {
      server.get("media", (response) => {
          commit('CLEAR_MEDIA_LIST')
          if (Array.isArray(response.data.success)) {
            response.data.success.forEach(element => commit('APPEND_MEDIA', element))
          }
      });
    },

    SELECT_MEDIA({ commit }, payload) {
      commit('SET_MEDIA_ID', payload)
    },

    SET_PAGE({ commit }, payload) {
      commit('SET_CURRENT_PAGE', payload)
    },

    SET_FILTER({ commit }, payload) {
      commit('SET_FILTER', payload)
    },

    DELETE_MEDIA({ commit, dispatch }, payload) {
      server.delete("media/"+payload, (response) => {
          commit("DELETE_MEDIA_FROM_LIST", payload)
          dispatch("SET_SUCCESS_MESSAGE", 'Image has been deleted')
      })
    }

  },
  getters: {
    getSelectedMedia: (state) => {
      let result = state.media_list.filter(media => media.id == state.media_id)
      return result.length ? result[0] : null
    },

    getSelectedMediaID: state => state.media_id,

    getMediaList: (state) => {
      let result = state.media_list.filter((media) => {
        if (state.media_filter.category != 'all' && state.media_filter.category != media.category) {
          return false
        }
        if (state.media_filter.type != 'all' && state.media_filter.type != media.type) {
          return false
        }
        return true
      })
      
      let begin_media_element = (state.pagination.current_page - 1) * state.pagination.elements_on_page
        , end_media_element = begin_media_element + state.pagination.elements_on_page  
      return result.slice(begin_media_element, end_media_element)
    },

    getPageCount: (state) => {
      return Math.ceil(state.media_list.length / state.pagination.elements_on_page) || 1
    }
  }
};
