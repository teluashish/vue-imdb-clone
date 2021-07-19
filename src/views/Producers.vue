<template>
  <div>
    <person-form-modal :isActor="false"> </person-form-modal>
    <br /><br />
    <Row :gutter="20" :type="'flex'">
      <card-details
        v-for="(producer, index) in producers"
        :key="index"
        :producer="producer"
        :isMovieCard="false"
        :isActor="false"
      ></card-details>
    </Row>
  </div>
</template>

<script>
import CardDetails from "../components/CardDetails.vue";
import PersonFormModal from "../components/PersonFormModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["producers"]),
  },
  components: {
    CardDetails,
    PersonFormModal,
  },
  methods: {
    ...mapActions(["getProducers"]),
  },
  created() {
    this.getProducers();
  },
};
</script>