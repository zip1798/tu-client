import server from "../repository/server";

export default {
  state: {
    list: [],
    filter: {category: 'all'},
    pagination: {current_page: 1, elements_on_page: 10},
  },

  mutations: {
    APPEND_EVENT_TO_LIST(state, payload) {
      payload.full_url = payload.media.full_url || ''
      state.list.push(payload)
    },

    DELETE_EVENT_FROM_LIST(state, payload) {
      state.list = state.list.filter(event => event.id != payload)
    },

    CLEAR_EVENT_LIST(state) {
      state.list = []
      state.filter = {category: 'all'}
      state.pagination = {current_page: 1, elements_on_page: 10}
    },

    SET_CURRENT_PAGE_LIST(state, payload) {
      state.pagination.current_page = payload
    },

    SET_FILTER_LIST(state, payload) {
      if (payload.category) {
        state.filter.category = payload.category
      }
      if (payload.type) {
        state.filter.type = payload.type
      }
      if (payload.text) {
        state.filter.text = payload.text
      }
    },

  },

  actions: {
    LOAD_EVENT_LIST({ commit }) {
      server.get("events", (response) => {
          commit('CLEAR_EVENT_LIST')
          if (Array.isArray(response.data.success)) {
            response.data.success.forEach(element => commit('APPEND_EVENT_TO_LIST', element))
          }
      });
    },
  },

  getters: {
    getEventList: (state) => {
      return state.list.filter((event) => {
        return state.filter.category == 'all' || state.filter.category == event.category
      })
    },
    getPageOfEventList: (state, getters) => {
      let list = getters.getEventList
      let begin_element = (state.pagination.current_page - 1) * state.pagination.elements_on_page
        , end_element = begin_element + state.pagination.elements_on_page
      return list.slice(begin_element, end_element)
    },
    getPageCountOfEvents: (state, getters) => {
      let count = getters.getEventList.length
      return Math.ceil(count / state.pagination.elements_on_page) || 1
    },
  }
};
