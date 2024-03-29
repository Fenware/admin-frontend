import { createStore } from "vuex";

// Modulos
import auth from './modules/auth';  
import usersPending from './modules/usersPending';
import subjects from './modules/subjects';
import orientations from './modules/orientations';
import groups from './modules/groups';
import users from './modules/users';
import consultations from './modules/consultations';

import env_vars from "@/static/env_vars.json";

export default createStore({
  // Declarando modulos para poder usarlos
  modules:{
    auth,
    usersPending,
    subjects,
    orientations,
    groups,
    users,
    consultations
  },
  state: {
    API_URL: env_vars.VUE_APP_ROOT_API || "http://localhost:8080",
    token: null,
    headers: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    lang: "en"
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setHeaderToken(state, payload) {
      state.headers.Authorization = payload;
    },
    setLang(state,lang){
      state.lang = lang;
    }
  },
  actions: {
    
  }
});
