<template>
  <section class="hero is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">Login</h3>
          <p class="subtitle has-text-white">Please login to proceed.</p>
          <div class="box">
            <form class="w-full max-w-sm mx-auto">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    id="inline-full-name"
                    type="email"
                    placeholder="Your Email"
                    autofocus=""
                    v-model="credentials.email"
                  />
                  <p
                    class="text-red text-sm mt-1"
                    v-if="hasValidationError('email')"
                  >
                    {{ getValidationError("email") }}
                  </p>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    id="inline-username"
                    type="password"
                    placeholder="Your Password"
                    @keydown.enter.prevent="login"
                    v-model="credentials.password"
                  />
                  <p
                    class="text-red text-sm mt-1"
                    v-if="hasValidationError('email')"
                  >
                    {{ getValidationError("email") }}
                  </p>
                </div>
              </div>
              <button
                class="button is-primary"
                type="button"
                @click.prevent="login"
              >
                Login
              </button>
              <button
                class="button is-light"
                type="button"
                @click.prevent="forgot"
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    forgot() {
      this.$router.push({ name: "ForgotPassword" });
    },
    login() {
      this.clearFormErrors();
      this.$store.dispatch("login", this.credentials);
    },
    resetForm() {
      this.credentials = {
        email: "",
        password: ""
      };
      this.clearFormErrors();
    },
    ...mapMutations(["clearFormErrors"])
  },
  computed: {
    ...mapGetters(["hasValidationError", "getValidationError"])
  }
};
</script>
