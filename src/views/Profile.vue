<template>
  <div class="container">
    <h1>My Profile</h1>
    <div class="field">
      <label class="label" for="inline-full-name"> Name </label>
      <div class="control">
        <input
          id="inline-full-name"
          class="input"
          type="text"
          v-model="profile.name"
        />
      </div>
      <div v-for="(error, index) in errors.name" :key="index">{{ error }}</div>
    </div>
    <div class="field">
      <label class="label" for="inline-full-email"> Email </label>
      <div class="control">
        <input
          id="inline-full-email"
          class="input"
          type="email"
          v-model="profile.email"
        />
      </div>
      <div v-for="(error, index) in errors.email" :key="index">{{ error }}</div>
    </div>
    <div>
      <div></div>
      <div>
        <button type="button" class="button " @click.prevent="update">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import { apiHost } from "@/config";
import bus from "@/bus";

export default {
  data() {
    return {
      profile: {
        name: "",
        email: ""
      },
      errors: {
        name: [],
        email: []
      }
    };
  },
  created() {
    axios
      .get(apiHost + "/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        this.profile = response.data;
      })
      .catch(error => {});
  },
  methods: {
    update() {
      axios
        .post(apiHost + "/profile", this.profile, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token")
          }
        })
        .then(response => {
          bus.$emit("flash", response.data.message, "success");
        })
        .catch(error => {
          console.log(error.response);
          bus.$emit("flash", error.response.data.message, "warning");
          this.errors = error.response.data.details;
        });
    }
  }
};
</script>
