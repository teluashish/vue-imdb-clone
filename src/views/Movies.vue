<template>
  <div>
    <br />
    <span id="movieEditForm">
      <Button
        :to="{ name: 'movie', params: { movie: null, isEdit: false } }"
        type="primary"
        ghost
        >+ Add Movie</Button
      >
    </span>
    <br /><br />
    <br />
    <Row :gutter="20" :type="'flex'">
      <card-details
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
        :isMovieCard="true"
        @deleteMovieById="deleteMovieById"
        @displayDetailsModal="displayDetailsModal"
      >
      </card-details>
    </Row>

    <details-modal
      :entityModal="isDisplayDetailsModal"
      @closeDetailsModal="closeDetailsModal"
    >
      <template slot="header">
        <br />
        <h3>
          {{ this.entity ? this.entity.name : "" }}
        </h3>

        <hr />
      </template>
      <template slot="main">
        <br />
        <p>
          {{ this.entity ? this.entity.plot : "" }}
        </p>
      </template>
    </details-modal>
  </div>
</template>

<script>
import DetailsModal from "../components/DetailsModal.vue";
import CardDetails from "../components/CardDetails.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isDisplayDetailsModal: false,
    };
  },
  computed: {
    ...mapGetters(["movies", "entity"]),
  },
  methods: {
    ...mapActions(["getMovies", "postMovie", "putMovie", "deleteMovie"]),

    displayDetailsModal() {
      this.isDisplayDetailsModal = true;
    },

    closeDetailsModal() {
      this.isDisplayDetailsModal = false;
    },

    deleteMovieById(movie) {
      this.$Modal.confirm({
        title: 'Confirm "' + movie.name + '" Delete ',
        content: "<p>Are you sure, you want to delete this Movie ?</p>",
        loading: true,
        okText: "OK",
        cancelText: "Cancel",
        onCancel: () => {
          this.$Message.info("Movie delete cancelled");
        },
        onOk: async () => {
          await this.deleteMovie(movie.id);
          await this.getMovies();
          this.$Modal.remove();
        },
      });
    },
  },

  components: {
    CardDetails,
    DetailsModal,
  },

  created() {
    this.getMovies();
    this.$router.app.$on("addMovie", async (movie) => {
      await this.postMovie(movie);
      window.location.href = "http://localhost:8080/movies";
    }),
      this.$router.app.$on("editMovie", async (movie) => {
        await this.putMovie(movie);
        window.location.href = "http://localhost:8080/movies";
      });
  },
};
</script>
