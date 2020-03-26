import router from "../router"
import server from "../repository/server"
import { EventBus } from "../repository/eventBus"

const DEFAULT_EVENT = {
  id: 0,
  user_id: null,
  title: '',
  place: '',
  category: '',
  status: '',
  expire_from: new Date().toISOString().substr(0, 10),
  date: '',
  brief: '',
  description: '',
  is_allow_online: false,
  is_approved: false,
  is_private: false,
  is_open_registration: false,
  html_after_registration: '',
  media_id: '',
  media_url: '',
  is_interested: false,
  external_link: '',
} 

export default {
  state: {
    event: DEFAULT_EVENT, 
    user_relations: [],
    perms: []
  },
  mutations: {
    SET_EVENT(state, payload) {
      let fields = Object.keys(state.event)
      fields.forEach((field) => {
        if (typeof payload[field] == 'undefined') {
          state.event[field] = DEFAULT_EVENT[field]
        } else {
          state.event[field] = payload[field]
        }
      })
      state.event.media_url = payload.media.full_url
      if (typeof payload.user_relations != 'undefined') {
        state.user_relations = payload.user_relations
      }
      if (typeof payload.perms != 'undefined') {
        state.perms = payload.perms
      }

      EventBus.notify("loaded_event", state.event);
    },

    SET_EVENT_FIELD(state, payload) {
      state.event[payload.fld] = payload.val
    },

    SET_INTERESTED(state, payload) {
      if (state.event.id == payload.id) {
        state.event.is_interested = !!payload.value
      }
    },

  },

  actions: {
    CREATE_EVENT({ commit, dispatch, state, getters }) {
      let data = state.event
      data.media_id = getters.getSelectedMediaID
      server.post("events", data, {}, (response) => {
        if (response.data.success) {
          commit("SET_EVENT", response.data.success);
          EventBus.notify("loaded_event", state.event);
          dispatch("SET_SUCCESS_MESSAGE", 'Event has been created');
          router.push({path:"/event/"+response.data.success.id});
        }
      });
    },

    UPDATE_EVENT({ commit, dispatch, state }, payload) {
      if (payload) {
        server.patch("events/" + state.event.id, payload, {}, (response) => {
          if (response.data.success) {
            commit("SET_EVENT", response.data.success);
            EventBus.notify("loaded_event", state.event);
            dispatch("SET_SUCCESS_MESSAGE", 'Event has been updated');
          }
        });
      }
    },

    DELETE_EVENT({ commit, dispatch }, payload) {
      server.delete("events/"+payload, () => {
          commit("DELETE_EVENT_FROM_LIST", payload)
          dispatch("SET_SUCCESS_MESSAGE", 'Event has been deleted')
          // router.push({path:"/"});
      })
    },


    LOAD_EVENT_ITEM({ commit, state }, payload) {
      if (payload != state.event.id) {
        server.get('events/'+payload, (response) => {
          commit("SET_EVENT", response.data.success);
          
          if (response.data.success.media) {
            commit("SET_MEDIA", response.data.success.media)
          }
        }, {processing_value: 'LOAD_EVENT_ITEM'});
      }
    },

    TOOGLE_INTERESTED({commit, state}, payload) {
        let event_id = payload || state.event.id
        server.get('events/'+ event_id + '/interested', (response) => {
          commit("SET_INTERESTED", { id: event_id, value: response.data.success});
        });
    },

    REGISTER_EVENT({state}, payload) {
      if (payload) {
        server.post("events/" + state.event.id + '/register', payload, {}, (response) => {
          if (response.data.success) {
            EventBus.notify("event_registration_created");
            router.push({path:"/event/registered/"+response.data.success.id}); 
            // dispatch("SET_SUCCESS_MESSAGE", 'Event Registration has been created');
          }
        });
      }
    },


  },
  getters: {
    getEvent: state => state.event,
    getEventUserRelations: state => state.user_relations,
    getEventPerms: state => state.perms,
  }

};
