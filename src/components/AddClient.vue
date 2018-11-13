<template>
  <section class="hero">
    <button
      class="button is-primary is-medium"
      @click="openAddForm(props.row);"
    >
      Add client
    </button>
    <modal v-if="showModal">
      <h3 slot="header">Add New Client</h3>
      <div slot="body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="modalData.name"
              placeholder="Name.."
            />
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="addRow();">Submit</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="showModal = false;">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </modal>
  </section>
</template>

<script lang="ts">
import axios from "@/axios";
import Modal from "@/components/Modal.vue";
import { apiHost } from "@/config";
import router from "@/router";

const path = apiHost;

export default {
  data() {
    return {
      data: [],
      props: ["name"],
      showModal: false,
      modalData: {
        id: Number,
        name: ""
      }
    };
  },
  methods: {
    addRow() {
      axios
        .post(path + "/client", this.modalData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token")
          }
        })
        .then(response => {
          this.showModal = false;
          this.$dialog.alert(response.data.message);
          router.push({ name: "Login" });
        })
        .catch(error => {
          this.showModal = false;
          this.$dialog.alert(error.response.data.message);
        });
    },
    openAddForm(row) {
      this.showModal = true;
    }
  },
  components: {
    Modal
  }
};
</script>
<style>
button.is-success {
  margin-right: 10px;
}
table.has-mobile-cards th:last-child div {
  float: right;
}
table.has-mobile-cards th:last-child div,
.right-column {
  text-align: right;
}
</style>
