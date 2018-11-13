<template>
  <section class="hero is-medium is-white is-bold">
    <div class="hero-body">
      <div style="display: block;clear: both;text-align:right; width:25%">
        <AddClient />
      </div>
      <br>
      <div class=" has-text-centered"><Client /></div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Client from "@/components/Client.vue";
import AddClient from "@/components/AddClient.vue";

export default {
  name: "client",
  components: {
    Client,
    AddClient
  }
};
</script>
