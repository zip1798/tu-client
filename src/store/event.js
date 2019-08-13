import router from "../router";
import Vue from "vue"
import server from "../repository/server";
import { EventBus } from "../repository/eventBus";

export default {
  state: {
    event: {
      id: 0,
      name: '',
      email: '',
      city: '',
      phone: '',
      icon: '',
    }
  },
  mutations: {
    SET_EVENT(state, payload) {
      state.event.id = payload.id
      state.user_id = payload.user_id
      state.title = payload.title
      state.place = payload.place
      state.category = payload.category
      state.status = payload.status
      state.event_date = payload.event_date
      state.show_event_date = payload.show_event_date
      state.brief = payload. brief
      state.description = payload.description
      state.is_allow_online = payload.is_allow_online
      state.media_id = payload.media_id

      // EventBus.notify("loaded_event", state.event);
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


  },
  getters: {
    getEvent: state => state.event,
  }
};
