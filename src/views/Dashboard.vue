<template>
  <section class="hero is-medium is-white is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <p class="w-full text-center my-8">
              <button
                class="button is-primary"
                @click.prevent="alert('This is a test message.', 'success');"
              >
                Test Alert
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import bus from "@/bus";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userEmail"])
  },
  methods: {
    alert(message, level) {
      bus.$emit("flash", message, level);
    }
  }
};
</script>
