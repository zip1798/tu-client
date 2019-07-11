import Vue from "vue";
import Vuex from "vuex";
import generalModule from "./store/general";
import authModule from "./store/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    generalModule,
    authModule
  },
  state: {
    articles: [], // require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: "Home",
        to: "/"
      },
      {
        text: "About",
        to: "/about"
        // href: "#about"
      },
      {
        to: "/contacts",
        text: "Contacts"
      },
      {
        to: "/login",
        text: "Login"
      },
      {
        to: "/register",
        text: "Register"
      },
      {
        to: "/profile/info",
        text: "Profile Info"
      },
      {
        to: "/events/:page?",
        text: "Events"
      },
      {
        to: "/myevents/:page",
        text: "My Events"
      },
      {
        to: "/event/create",
        text: "Create Event"
      },
      {
        to: "/event/edit/:id",
        text: "Edit Event"
      },
      {
        to: "/event/info/:id",
        text: "Event Info"
      },
      {
        to: "/event/sendmail/:id",
        text: "Event Sendmail"
      },
      {
        to: "/event/feedback/:id",
        text: "Event Feedback"
      },
      {
        to: "/event/members/:id",
        text: "Event Partisipants"
      },
      {
        to: "/test",
        text: "Test"
      }
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
    links: (state, getters) => {
      return state.items.concat(getters.categories);
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {}
});
