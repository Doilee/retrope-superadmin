<template>
  <section class="hero is-medium is-white is-bold">
    <div class="hero-body">
      <div class=" has-text-centered">
        <Client/>
      </div>
    </div>
    </section>
</template>

<script>
// @ is an alias to /src
import Client from "@/components/Client.vue";

export default {
  name: "client",
  components: {
    Client
  }
};
</script>
