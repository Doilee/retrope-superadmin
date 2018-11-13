<template>
  <section class="hero is-medium is-white is-bold">
    <div class="hero-body">
      <div class=" has-text-centered">
        <Subscription :client_id="$route.params.id" />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Subscription from "@/components/Subscription.vue";
import AddClient from "@/components/AddClient.vue";

export default {
  name: "subscription",
  components: {
    Subscription
  }
};
</script>
