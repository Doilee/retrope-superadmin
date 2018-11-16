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
import Vue from "vue";
import axios from "@/axios";
import Modal from "@/components/Modal.vue";
import { apiHost } from "@/config";
import router from "@/router";
import Component from "vue-class-component";

const path = apiHost;

@Component({
  components: {
    Modal
  }
})
export default class AddClient extends Vue {
  data: Array = [];
  props: Array = ["name"];
  showModal: boolean = false;
  modalData: Object = {
    id: Number,
    name: ""
  };

  addRow(): void {
    axios
      .post(path + "/client", this.modalData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        this.showModal = false;
        let message = response.data.message;
        this.$swal(response.data.message);
      })
      .catch(error => {
        this.showModal = false;
        this.$swal(error.response.data.message);
      });
  }

  openAddForm(row): void {
    this.showModal = true;
  }
}
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
