<template>
  <div>
    <person-form-modal :title="'actor'" @addPerson="addPerson">
    </person-form-modal>
    <br /><br />

    <Row :gutter="20" :type="'flex'">
      <card-details
        v-for="(actor, index) in actors"
        :key="index"
        :actor="actor"
        :isMovieCard="false"
        :title="'actor'"
        @deletePerson="deletePerson"
        @displayDetailsModal="displayDetailsModal"
      ></card-details>
    </Row>
    <details-modal
      :entityModal="isDisplayDetailsModal"
      @closeDetailsModal="closeDetailsModal"
    >
      <template slot="header">
        <br />
        <h3>
          {{ this.entity !== null ? this.entity.name : "" }}
        </h3>

        <hr />
      </template>
      <template slot="main">
        <br />
        <p>
          {{ this.entity ? this.entity.bio : "" }}
        </p>
      </template>
    </details-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardDetails from "../components/CardDetails.vue";
import PersonFormModal from "../components/PersonFormModal.vue";
import DetailsModal from "../components/DetailsModal.vue";

export default {
  data() {
    return {
      personId: "",
      isDisplayDetailsModal: false,
    };
  },

  computed: {
    ...mapGetters(["actors", "entity"]),
  },
  components: {
    CardDetails,
    PersonFormModal,
    DetailsModal,
  },
  methods: {
    ...mapActions(["getActors", "postActor", "deleteActor"]),

    async init() {
      await this.getActors();
    },

    async addPerson(personDetails) {
      if (personDetails.title === "actor") {
        this.personId = await this.postActor(personDetails.formItem);
        await this.getActors();
      }
    },

    displayDetailsModal() {
      this.isDisplayDetailsModal = true;
    },

    closeDetailsModal() {
      this.isDisplayDetailsModal = false;
    },

    deletePerson(personDetails) {
      this.$Modal.confirm({
        title: "Confirm " + personDetails.person.name + " Delete",
        content: "<p>Are you sure, you want to delete this Item ?</p>",
        loading: true,
        okText: "OK",
        cancelText: "Cancel",
        onCancel: () => {
          this.$Message.info(personDetails.person.name + " delete cancelled");
        },

        onOk: async () => {
          if (personDetails.title === "actor") {
            await this.deleteActor(personDetails.id);
            await this.getActors();
          }
          this.$Modal.remove();
        },
      });
    },
  },

  created() {
    this.init();
  },
};
</script>
