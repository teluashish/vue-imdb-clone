<template>
  <div>
    <person-form-modal :title="'producer'" @addPerson="addPerson">
    </person-form-modal>
    <br /><br />
    <Row :gutter="20" :type="'flex'">
      <card-details
        v-for="(producer, index) in producers"
        :key="index"
        :producer="producer"
        :isMovieCard="false"
        :title="'producer'"
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
import CardDetails from "../components/CardDetails.vue";
import PersonFormModal from "../components/PersonFormModal.vue";
import { mapGetters, mapActions } from "vuex";
import DetailsModal from "../components/DetailsModal.vue";

export default {
  data() {
    return {
      personId: "",
      isDisplayDetailsModal: false,
    };
  },
  computed: {
    ...mapGetters(["producers", "entity"]),
  },
  components: {
    CardDetails,
    PersonFormModal,
    DetailsModal,
  },
  methods: {
    ...mapActions(["getProducers", "postProducer", "deleteProducer"]),
    async init() {
      await this.getProducers();
    },

    async addPerson(personDetails) {
      if (personDetails.title === "producer") {
        this.personId = await this.postProducer(personDetails.formItem);
        await this.getProducers();
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
          if (personDetails.title === "producer") {
            await this.deleteProducer(personDetails.id);
            await this.getProducers();
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
