import router from "../router";
import Vue from "vue"
import server from "../repository/server";
import { EventBus } from "../repository/eventBus";

export default {
  state: {
    event: {
      id: 0,
      user_id: null,
      title: '',
      place: '',
      category: '',
      status: '',
      event_date: '',
      show_date: '',
      brief: '',
      description: '',
      is_allow_online: '',
      is_open_registration: false,
      html_after_registration: '',
      media_id: '',
      media_url: '',
      is_interested: false,
    }, 
    general_list: [],
    general_filter: {category: 'all'},
    general_pagination: {current_page: 1, elements_on_page: 10},

    user_list: [],
    user_filter: {category: 'all', status: 'all', text: ''},
    user_pagination: {current_page: 1, elements_on_page: 10},
  },
  mutations: {
    SET_EVENT(state, payload) {
      state.event.id = payload.id
      state.event.user_id = payload.user_id
      state.event.title = payload.title
      state.event.place = payload.place
      state.event.category = payload.category
      state.event.status = payload.status
      state.event.event_date = payload.event_date
      state.event.show_date = payload.show_date
      state.event.brief = payload. brief
      state.event.description = payload.description
      state.event.is_allow_online = payload.is_allow_online
      state.event.is_open_registration = payload.is_open_registration
      state.event.html_after_registration = payload.html_after_registration
      state.event.media_id = payload.media_id
      state.event.media_url = payload.media.full_url
      state.event.is_interested = payload.is_interested
      // EventBus.notify("loaded_event", state.event);
    },

    SET_INTERESTED(state, payload) {
      if (state.event.id == payload.id) {
        state.event.is_interested = !!payload.value
      }
      state.general_list = state.general_list.map( event => {
        if (event.id == payload.id) {
          event.is_interested = !!payload.value 
        }
        return event
      })
      state.user_list = state.user_list.map( event => {
        if (event.id == payload.id) {
          event.is_interested = !!payload.value 
        }
        return event
      })
    },


    APPEND_GENERAL_EVENT_TO_LIST(state, payload) {
      payload.full_url = payload.media.full_url || ''
      state.general_list.push(payload)
    },

    DELETE_GENERAL_EVENT_FROM_LIST(state, payload) {
      state.general_list = state.general_list.filter(event => event.id != payload)
    },

    CLEAR_GENERAL_EVENT_LIST(state) {
      state.general_list = []
      state.general_filter = {category: 'all'}
      state.general_pagination = {current_page: 1, elements_on_page: 10}
    },

    SET_CURRENT_PAGE_GENERAL_LIST(state, payload) {
      state.general_pagination.current_page = payload
    },

    SET_FILTER_GENERAL_LIST(state, payload) {
      if (payload.category) {
        state.general_filter.category = payload.category
      }
    },



    APPEND_USER_EVENT_TO_LIST(state, payload) {
      state.user_list.push(payload)
    },

    DELETE_USER_EVENT_FROM_LIST(state, payload) {
      state.user_list = state.user_list.filter(event => event.id != payload)
    },

    CLEAR_USER_EVENT_LIST(state) {
      state.user_list = []
      state.user_filter = {category: 'all', status: 'all', text: ''}
      state.user_pagination = {current_page: 1, elements_on_page: 10}
    },

    SET_CURRENT_PAGE_USER_LIST(state, payload) {
      state.user_pagination.current_page = payload
    },

    SET_FILTER_USER_LIST(state, payload) {
      if (payload.category) {
        state.user_filter.category = payload.category
      }
      if (payload.type) {
        state.user_filter.type = payload.type
      }
      if (payload.text) {
        state.user_filter.text = payload.text
      }
    },


  },

  actions: {

/*  CREATE_EVENT action */
    CREATE_EVENT({ commit, dispatch, state }, payload) {
      if (!!payload || state.event.id == 0) {
        server.post("events", payload, {}, (response) => {
          if (response.data.success) {
            commit("SET_EVENT", response.data.success);
            EventBus.notify("loaded_event", state.event);
            dispatch("SET_SUCCESS_MESSAGE", 'Event has been created');
            router.push({path:"/event/"+response.data.success.id});
          }
        });
      }
    },

/*  UPDATE_EVENT action */
    UPDATE_EVENT({ commit, dispatch, state }, payload) {
      if (!!payload) {
        server.patch("events/" + state.event.id, payload, {}, (response) => {
          if (response.data.success) {
            commit("SET_EVENT", response.data.success);
            EventBus.notify("loaded_event", state.event);
            dispatch("SET_SUCCESS_MESSAGE", 'Event has been updated');
          }
        });
      }
    },

/*  DELETE_EVENT action */
    DELETE_EVENT({ commit, dispatch }, payload) {
      server.delete("events/"+payload, (response) => {
          commit("DELETE_EVENT_FROM_LIST", payload)
          dispatch("SET_SUCCESS_MESSAGE", 'Event has been deleted')
          // router.push({path:"/"});
      })
    },


/*  LOAD_EVENT_ITEM action */
    LOAD_EVENT_ITEM({ commit, state }, payload) {
      if (payload != state.event.id) {
        server.get('events/'+payload, (response) => {
          commit("SET_EVENT", response.data.success);
          EventBus.notify("loaded_event", state.event);
        }, {processing_value: 'LOAD_EVENT_ITEM'});
      }
    },

    // ----------------------------------------------------------------------

    LOAD_GENERAL_EVENT_LIST({ commit }) {
      server.get("events", (response) => {
          commit('CLEAR_GENERAL_EVENT_LIST')
          if (Array.isArray(response.data.success)) {
            response.data.success.forEach(element => commit('APPEND_GENERAL_EVENT_TO_LIST', element))
          }
      });
    },

    SET_GENERAL_EVENTS_FILTER({ commit }, payload) {
      commit('SET_FILTER_GENERAL_LIST', payload)
    },

    SET_GENERAL_EVENTS_CURRENT_PAGE({ commit }, payload) {
      commit('SET_CURRENT_PAGE_GENERAL_LIST', payload)
    },

    // ----------------------------------------------------------------------

    LOAD_USER_EVENT_LIST({ commit }) {
      server.get("user_events", (response) => {
          commit('CLEAR_USER_EVENT_LIST')
          if (Array.isArray(response.data.success)) {
            response.data.success.forEach(element => commit('APPEND_USER_EVENT_TO_LIST', element))
          }
      });
    },

    SET_USER_EVENTS_FILTER({ commit }, payload) {
      commit('SET_FILTER_USER_LIST', payload)
    },

    SET_USER_EVENTS_CURRENT_PAGE({ commit }, payload) {
      commit('SET_CURRENT_PAGE_USER_LIST', payload)
    },

    // ----------------------------------------------------------------------

    TOOGLE_INTERESTED({ commit, state}, payload) {
        let event_id = payload || state.event.id
        server.get('events/'+ event_id + '/interested', (response) => {
          commit("SET_INTERESTED", { id: event_id, value: response.data.success});
        });
    },

/*  REGISTER_EVENT action */
    REGISTER_EVENT({ commit, dispatch, state}, payload) {
      if (!!payload) {
        server.post("events/" + state.event.id + '/register', payload, {}, (response) => {
          if (response.data.success) {
            EventBus.notify("event_registration_created");
            dispatch("SET_SUCCESS_MESSAGE", 'Event Registration has been created');
          }
        });
      }
    },


  },
  getters: {
    getEvent: state => state.event,
    getGeneralEventList: (state) => {
      return state.general_list.filter((event) => {
        return state.general_filter.category == 'all' || state.general_filter.category == event.category
      })
    },
    getPageOfGeneralEventList: (state, getters) => {
      let list = getters.getGeneralEventList
      let begin_element = (state.general_pagination.current_page - 1) * state.general_pagination.elements_on_page
        , end_element = begin_element + state.general_pagination.elements_on_page
      return list.slice(begin_element, end_element)
    },
    getPageCountOfGeneralEvents: (state, getters) => {
      let count = getters.getGeneralEventList.length
      return Math.ceil(count / state.general_pagination.elements_on_page) || 1
    },

    getUserEventList: (state) => {
      return state.user_list.filter((event) => {
        let result =  state.user_filter.category == 'all' || state.user_filter.category == event.category
        result = result && state.user_filter.status == 'all' || state.user_filter.status == event.status
        result = result &&
          (
          state.user_filter.text == ''
          || state.user_filter.title.indexOf(state.user_filter.text) != -1
          || state.user_filter.brief.indexOf(state.user_filter.text) != -1
          || state.user_filter.description.indexOf(state.user_filter.text) != -1
          )
        return result
      })

    },
    getPageOfUserEventList: (state, getters) => {
      let list = getters.getUserEventList
      let begin_element = (state.user_pagination.current_page - 1) * state.user_pagination.elements_on_page
        , end_element = begin_element + state.user_pagination.elements_on_page
      return list.slice(begin_element, end_element)
    },
    getPageCountOfUserEvents: (state, getters) => {
      let count = getters.getUserEventList.length
      return Math.ceil(count / state.user_pagination.elements_on_page) || 1
    },

  }
};
