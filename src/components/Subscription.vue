<template>
  <section class="hero">
    <div class="field">
      <button
        class="button is-primary is-medium"
        @click="
          openEditForm({
            type: 'trial',
            expires_at: ''
          });
        "
      >
        Add subscription
      </button>
    </div>
    <b-table :data="data">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" sortable numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="type" label="Client name" sortable>
          {{ props.row.type }}
        </b-table-column>

        <b-table-column field="expires_at" label="Created at" sortable>
          <span class="tag is-success">
            {{ new Date(props.row.expires_at).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="options" label="Options" class="right-column">
          <button
            class="button is-small is-success"
            @click="openEditForm(props.row);"
          >
            <b-icon icon="pencil" size="is-small"></b-icon>
          </button>
          <button
            class="button is-small is-danger"
            @click="deleteRow(props.row);"
          >
            <b-icon icon="delete" size="is-small"></b-icon>
          </button>
        </b-table-column>
      </template>
    </b-table>
    <modal v-if="showModal">
      <h3 slot="header">Edit Subscription</h3>
      <div slot="body">
        <div class="field">
          <label class="label">Subscription Type</label>
          <div class="select">
            <select v-model="modalData.type">
              <option>None</option>
              <option value="trial">Trial</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Expires At</label>
          <datepicker
            class="input"
            name="expires_at"
            v-model="modalData.expires_at"
            :typeable="true"
          ></datepicker>
        </div>
      </div>
      <div slot="footer">
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              @click="modalData.id ? updateRow() : addRow();"
            >
              Submit
            </button>
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
import Datepicker from "vuejs-datepicker";
import moment, { Moment } from "moment";
import { Vue, Component, Prop } from "vue-property-decorator";

const path = apiHost;

interface SubscriptionData {
  id?: number;
  type: string;
  expires_at: string;
}

@Component({
  components: {
    Modal,
    Datepicker
  }
})
export default class Subscription extends Vue {
  @Prop([Number, String]) client_id!: number | string;

  data: Array<SubscriptionData> = [];
  showModal: boolean = false;
  modalData = {} as SubscriptionData;

  created() {
    axios
      .get(path + "/client/" + this.client_id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        this.data = response.data.subscriptions;
      });
  }

  updateRow() {
    this.modalData.expires_at = moment(this.modalData.expires_at).format(
      "YYYY-MM-D h:mm:ss"
    );
    axios
      .put(path + "/subscription/" + this.modalData.id, this.modalData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        this.showModal = false;
        this.$swal(response.data.message);
      })
      .catch(error => {
        this.showModal = false;
        this.$swal(error.response.data.message);
      });
  }
  addRow() {
    this.modalData.expires_at = moment(this.modalData.expires_at).format(
      "YYYY-MM-D h:mm:ss"
    );

    axios
      .post(
        path + "/client/" + this.client_id + "/subscription",
        this.modalData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token")
          }
        }
      )
      .then(response => {
        this.showModal = false;
        this.$swal(response.data.message);
        this.data.push(response.data.subscription);
      })
      .catch(error => {
        this.showModal = false;
        this.$swal(error.response.data.message);
      });
  }
  openEditForm(row) {
    this.modalData = row;
    this.showModal = true;
  }
  deleteRow(row) {
    this.$swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .delete(path + "/subscription/" + row.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth_token")
            }
          })
          .then(response => {
            this.$swal(response.data.message);
            this.data.splice(
              this.data.findIndex(element => element.id === row.id),
              1
            );
          })
          .catch(error => {
            console.log(error);
            this.$swal(error.response.data.message);
          });
      }
    });
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
