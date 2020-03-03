import server from "../repository/server";

export default {
    //----------------------------------------------------------------------------------
    state: {
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

    //----------------------------------------------------------------------------------
    mutations: {
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
        },
    },

    //----------------------------------------------------------------------------------
    actions: {
        LOAD_MEDIA_LIST({ commit }) {
            server.get("media", (response) => {
                commit('CLEAR_MEDIA_LIST')
                if (Array.isArray(response.data.success)) {
                  response.data.success.forEach(element => commit('APPEND_MEDIA', element))
                }
            }, {processing_value: 'LOAD_MEDIA_LIST'});
        },

        SELECT_MEDIA_BY_ID({state, commit}, payload) {
            let selected_media = state.media_list.filter(media => media.id == payload)
            commit('SET_MEDIA', selected_media[0] || null)
        },
    },

    //----------------------------------------------------------------------------------
    getters: {
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

}    