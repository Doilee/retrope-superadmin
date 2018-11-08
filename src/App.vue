<template>
  <div id="app">
    <div id="nav">
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <div v-if="authenticated">
            <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="navbar-brand">
                <a class="navbar-item" href="#">
                  <img src="/img/logo.svg" />
                </a>
                <a
                  role="button"
                  class="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                  <router-link :to="{ name: 'Dashboard' }" class="navbar-item">
                    Dashboard
                  </router-link>

                  <router-link class="navbar-item" to="/clients"
                    >Clients</router-link
                  >

                  <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"> More </a>

                    <div class="navbar-dropdown">
                      <a class="navbar-item"> About </a>
                      <a class="navbar-item"> Subscriptions </a>
                      <a class="navbar-item"> Contact </a>
                      <hr class="navbar-divider" />
                      <a class="navbar-item"> Reports </a>
                    </div>
                  </div>
                </div>

                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <button class="button is-primary" @click="logout">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div v-if="!authenticated">
          <router-link
            :to="{ name: 'Register' }"
            class="inline-block text-sm px-4 py-2 leading-none rounded text-white hover:text-purple hover:bg-white mt-4 lg:mt-0 no-underline"
          >
            Register
          </router-link>
          <router-link
            :to="{ name: 'Login' }"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple hover:bg-white mt-4 ml-2 lg:mt-0 no-underline"
          >
            Log In
          </router-link>
        </div>
      </div>
    </div>
    <div class="p-8 flex-auto"><router-view /></div>
    <!-- <div class="box"> -->
    <!-- TOKEN -->
    <!-- <pre class="whitespace-pre-wrap break-words">{{ token }}</pre> -->
    <!-- </div> -->
    <flash-stack></flash-stack>
  </div>
</template>

<script>
import FlashStack from "@/components/FlashStack.vue";

export default {
  name: "app",
  components: {
    "flash-stack": FlashStack
  },
  computed: {
    token() {
      return this.$store.getters.jsonWebToken;
    },
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    }
  },
  data() {
    return {
      // auth: window.authority,
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
