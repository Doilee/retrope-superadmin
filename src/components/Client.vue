<template>
  <section class="hero">
    <b-field grouped group-multiline>
      <b-select v-model="defaultSortDirection">
        <option value="asc">Default sort direction: ASC</option>
        <option value="desc">Default sort direction: DESC</option>
      </b-select>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
      <div class="control">
        <button
          class="button"
          @click="currentPage = 2;"
          :disabled="!isPaginated"
        >
          Set page to 2
        </button>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginated">Paginated</b-switch>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationSimple" :disabled="!isPaginated"
          >Simple pagination</b-switch
        >
      </div>
    </b-field>

    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :default-sort-direction="defaultSortDirection"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" sortable numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Client name" sortable>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="created_at" label="Created at" sortable>
          <span class="tag is-success">
            {{ new Date(props.row.created_at).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="updated_at" label="Updated at" sortable centered>
          <span class="tag is-success">
            {{ new Date(props.row.updated_at).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column field="options" label="Options" class="right-column">
          <button class="button is-small is-success" @click="showModal = true;">
            <b-icon icon="pencil" size="is-small"></b-icon>
          </button>
          <button
            class="button is-small is-danger"
            @click.native="delete props.row;"
          >
            <b-icon icon="delete" size="is-small"></b-icon>
          </button>
        </b-table-column>

        <!-- <b-table-column label="Gender"> -->
        <!-- <b-icon pack="fas" -->
        <!-- :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"> -->
        <!-- </b-icon> -->
        <!-- {{ props.row.gender }} -->
        <!-- </b-table-column> -->
      </template>
    </b-table>
    <modal v-if="showModal" @close="showModal = false;">
      <h3 slot="header">Edit Client</h3>
      <div slot="body">TODO: ADD HTML FORM HERE</div>
    </modal>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import Modal from "@/components/Modal.vue";
export default {
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 5,
      showModal: false
    };
  },
  created() {
    const path = "http://localhost:8000/client";
    axios
      .get(path, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      })
      .then(response => {
        this.data = response.data.data;
      })
      .catch(error => {});
  },
  methods: {
    edit() {
      console.log("wolla");
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
