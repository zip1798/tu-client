import Vue from "vue";
import Vuex from "vuex";
import generalModule from "./store/general";
import authModule from "./store/auth";
import profileModule from "./store/profile";
import eventModule from "./store/event";
import mediaModule from "./store/media";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    generalModule,
    authModule,
    profileModule,
    eventModule,
    mediaModule
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
      { title: "Login", to: "/login",icon: '', only_for_auth: false },
      { title: "Register", to: "/register", icon: '', only_for_auth: false },
      { title: "Profile Info", to: "/profile/info", icon: '', only_for_auth: true },
      { title: "My Events", to: "/myevents/:page", icon: '', only_for_auth: true },
      { title: 'Home', icon: 'mdi-home-city', to: ''},
      { title: 'My Account', icon: 'mdi-account', to: '' },
      { title: 'Users', icon: 'mdi-account-group-outline', to: '' },

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
    categories: state => {
      const categories = [];

      // for (const article of state.articles) {
      //   if (
      //     !article.category ||
      //     categories.find(category => category.text === article.category)
      //   )
      //     continue;

      //   const text = article.category;

      //   categories.push({
      //     text,
      //     to: `/category/${text}`
      //   });
      // }

      return categories.sort().slice(0, 4);
    },
    mainLinks: (state, getters) => {
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
