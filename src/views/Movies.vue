<template>
  <div>
    <br />
    <Button
      :to="{ name: 'movie', params: { movie: null, isEdit: false } }"
      type="primary"
      ghost
      id="movieEditForm"
      >+ Add Movie</Button
    >
    <AutoComplete
      v-model="searchInput"
      placeholder="Search Movies"
      @on-search="handleSearch"
      style="width:200px"
      icon="ios-search"
      @on-clear="clearSearch"
      clearable
    >
    </AutoComplete>
    <br /><br />
    <br />
    <Row type="flex">
      <card-details
        v-for="(movie, index) in searchMovies"
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
      searchInput: "",
      searchMovies: null,
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

    handleSearch(value) {
      if (value.length > 0) {
        this.searchMovies = [];
        this.movies.forEach((movie) => {
          if (movie.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            this.searchMovies.push(movie);
        });
      } else {
        this.searchMovies = this.movies;
      }
    },

    clearSearch() {
      this.searchMovies = this.movies;
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
          this.searchMovies = this.movies;
          this.$Modal.remove();
        },
      });
    },
    async init() {
      await this.getMovies();
      this.searchMovies = this.movies;
    },
  },

  components: {
    CardDetails,
    DetailsModal,
  },

  created() {
    this.init();
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

<style scoped>
#movieEditForm {
  margin: 10px;
}
</style>
