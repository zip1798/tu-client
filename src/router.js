import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./components/pages/About.vue";
import Contacts from "./components/pages/Contacts.vue";
import Login from "./components/user/Login.vue";
import Register from "./components/user/Register.vue";
import ProfileInfo from "./components/user/ProfileInfo.vue";
import ProfileEdit from "./components/user/ProfileEdit.vue";
import PasswordChange from "./components/user/PasswordChange.vue";
import PasswordReset from "./components/user/PasswordReset.vue";
import Events from "./components/events/Events.vue";
import MyEvents from "./components/events/MyEvents.vue";
import EventCreate from "./components/events/EventCreate.vue";
import EventEdit from "./components/events/EventEdit.vue";
import EventInfo from "./components/events/EventInfo.vue";
import EventSendmail from "./components/events/EventSendmail.vue";
import EventFeedback from "./components/events/EventFeedback.vue";
import EventMembers from "./components/events/EventMembers.vue";

import Test from "./components/pages/Test.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/profile/info",
      name: "profile_info",
      component: ProfileInfo
    },
    {
      path: "/profile/edit",
      name: "profile_edit",
      component: ProfileEdit
    },
    {
      path: "/password/change",
      name: "password_change",
      component: PasswordChange
    },
    {
      path: "/password/reset",
      name: "password_reset",
      component: PasswordReset
    },
    {
      path: "/events/:page?",
      name: "events",
      component: Events
    },
    {
      path: "/myevents/:page?",
      name: "myevents",
      component: MyEvents
    },
    {
      path: "/event/create",
      name: "event_create",
      component: EventCreate
    },
    {
      path: "/event/edit/:id",
      name: "event_edit",
      component: EventEdit
    },
    {
      path: "/event/info/:id",
      name: "event_info",
      component: EventInfo
    },
    {
      path: "/event/sendmail/:id",
      name: "event_sendmail",
      component: EventSendmail
    },
    {
      path: "/event/feedback/:id",
      name: "event_feedback",
      component: EventFeedback
    },
    {
      path: "/event/members/:id",
      name: "event_members",
      component: EventMembers
    },
    {
      path: "/test",
      name: "test",
      component: Test
    }
  ]
});