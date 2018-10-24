<template>
  <div id="app">
    <div id="nav">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <strong class="font-semibold text-xl tracking-tight">RETROPE</strong>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <div v-if="authenticated">
            <router-link :to="{ name: 'Dashboard' }" class="block mt-4 lg:inline-block lg:mt-0 text-purple-lightest no-underline hover:text-white mr-4">
              Dashboard
            </router-link>
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
        <div v-else>
          <button class="button is-ligh" @click="logout">Log Out</button>
        </div>
      </div>
    </div>
    <div class="p-8 flex-auto">
      <router-view/>
    </div>
    <div class="box">
    TOKEN
      <pre class="whitespace-pre-wrap break-words">{{ token }}</pre>
    </div>
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
