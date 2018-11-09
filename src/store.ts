import Vue from "vue";
import bus from "@/bus";
import Vuex from "vuex";
import axios from "@/axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jsonWebToken: null,
    userEmail: null,
    formErrors: {}
  },
  mutations: {
    setAuthCredentials(state, authData) {
      state.jsonWebToken = authData.token;
      state.userEmail = authData.userEmail;
    },
    clearAuthCredentials(state) {
      state.jsonWebToken = null;
    },
    setFormErrors(state, errors) {
      state.formErrors = errors;
    },
    clearFormErrors(state) {
      state.formErrors = {};
    }
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {}, expirationTime * 1000);
    },
    login({ commit, dispatch }, credentials) {
      axios
        .post("auth/login", {
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const now = new Date();
          localStorage.setItem("auth_token", response.data.access_token);

          commit("setAuthCredentials", {
            token: response.data.access_token
          });
          dispatch("setLogoutTimer", response.data.expires_in);

          router.push({ name: "Dashboard" });
        })
        .catch(() => {}); // See axios config for basic error handling
    },
    tryAutoLogin({ commit }) {
      const jwt = localStorage.getItem("auth_token");
      if (!jwt) {
        return;
      }
      const now = new Date();
      commit("setAuthCredentials", {
        token: jwt
      });
    },
    logout({ commit }) {
      commit("clearAuthCredentials");
      bus.$emit("flash", "Goodbye! Your session has ended.", "success");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("expires_at");
      router.push({ name: "Login" });
    },
    register({ commit, dispatch }, registration) {
      axios
        .post("api/register", {
          name: registration.name,
          email: registration.email,
          password: registration.password,
          password_confirmation: registration.password_confirmation
        })
        .then(response => {
          const now = new Date();
          localStorage.setItem("auth_token", response.data.access_token);
          commit("setAuthCredentials", {
            token: response.data.access_token
          });
          dispatch("setLogoutTimer", response.data.expires_in);
          bus.$emit(
            "flash",
            "Registration complete; you have been signed in.",
            "success"
          );

          router.push({ name: "Dashboard" });
        })
        .catch(() => {}); // See axios config for basic error handling
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.jsonWebToken !== null;
    },
    jsonWebToken(state) {
      return state.jsonWebToken;
    },
    userEmail(state) {
      return state.userEmail;
    },
    hasValidationError: state => input => {
      return Object.prototype.hasOwnProperty.call(state.formErrors, input);
    },
    getValidationError: state => input => {
      if (Object.prototype.hasOwnProperty.call(state.formErrors, input)) {
        const error = state.formErrors[input];

        return Array.isArray(error) ? error[0] : error;
      }

      return null;
    }
  }
});
