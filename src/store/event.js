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
      media_id: '',
      media_url: '',
      is_interested: false,
    }, 
    list: [],
    filter: {},
    pagination: {current_page: 1, elements_on_page: 10}
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
      state.event.media_id = payload.media_id
      state.event.media_url = payload.media.full_url
      state.event.is_interested = payload.media.is_interested
      // EventBus.notify("loaded_event", state.event);
    },

    SET_INTERESTED(state, payload) {
      state.event.is_interested = !!payload
    }

  },

  actions: {

/*  CREATE_EVENT action */
    CREATE_EVENT({ commit, dispatch, state }, payload) {
      if (!!payload || state.profile.id == 0) {
        server.post("events", payload, {}, (response) => {
          if (response.data.success) {
            commit("SET_EVENT", response.data.success);
            dispatch("SET_SUCCESS_MESSAGE", 'Event has been created');
            router.push({path:"/event/"+response.data.success.id});
          }
        });
      }
    },

    LOAD_EVENT_ITEM({ commit, state }, payload) {
      if (payload != state.event.id) {
        server.get('events/'+payload, (response) => {
          commit("SET_EVENT", response.data.success);
        }, {processing_value: 'LOAD_EVENT_ITEM'});
      }
    },

    LOAD_EVENT_LIST({ commit }) {
      // todo
    },

    SET_EVENTS_FILTER({ commit }, payload) {
      // todo
    },

    SET_EVENTS_CURRENT_PAGE({ commit }, payload) {
      // todo
    },

    TOOGLE_INTERESTED({ commit, state}, payload) {
      console.log('TOOGLE_INTERESTED')
        server.get('events/'+state.event.id + '/interested', (response) => {
          console.log(response)
          commit("SET_INTERESTED", response.data.success);
        });
    }

  },
  getters: {
    getEvent: state => state.event,
    getEventList: (state) => {
      return state.list // todo depends on filter
    },
    getPageCountOfEvents: (state) => {
      return state.list.length // todo depends on filter
    }
  }
};
