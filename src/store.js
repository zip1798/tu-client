import Vue from "vue"
import Vuex from "vuex"
import generalModule from "./store/general"
import authModule from "./store/auth"
import profileModule from "./store/profile"
import eventItemModule from "./store/event_item"
import eventListModule from "./store/event_list"
import mediaItemModule from "./store/media_item"
import mediaListModule from "./store/media_list"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    generalModule,
    authModule,
    profileModule,
    eventItemModule,
    eventListModule,
    mediaItemModule,
    mediaListModule
  },
  state: {
    articles: [], // require('@/data/articles.json'),
    drawer: false,
    
    main_links: [
      { title: "Home", to: "/" },
      { title: "About", to: "/about" },
      { title: "Contacts", to: "/contacts" }
    ],
    
    nav_items: [
      { title: "Login", to: "/login",icon: 'mdi-login-variant', only_for_auth: false },
      { title: "Register", to: "/register", icon: '', only_for_auth: false },
      { title: "Profile Info", to: "/profile/info", icon: 'mdi-account',  only_for_auth: true },
      { title: "My Events", to: "/myevents/:page", icon: '', only_for_auth: true },
    ], 
    test_items: [
      { to: "/event/create", text: "Create Event" },
      { to: "/event/edit/:id", text: "Edit Event" },
      { to: "/event/info/:id", text: "Event Info" },
      { to: "/event/sendmail/:id", text: "Event Sendmail" },
      { to: "/event/feedback/:id", text: "Event Feedback" },
      { to: "/event/members/:id", text: "Event Partisipants" },
      { to: "/test", text: "Test" }
    ]
  },
  getters: {
    categories: () => {
      const categories = [];
      return categories.sort().slice(0, 4);
    },
    mainLinks: (state) => {
      return state.main_links;
    },
    navLinks: (state, getters) => {
      return state.nav_items.filter( item => getters.isAuth || !item.only_for_auth );
    },
    testLinks: state => state.test_items
},
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {}
});
