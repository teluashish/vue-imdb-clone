<template>
  <div id="details">
    <movie-details
      v-if="isMovieCard"
      :movie="movie"
      @deleteMovieById="deleteMovieById"
      @displayDetailsModal="displayDetailsModal"
    />
    <person-details
      v-if="!isMovieCard"
      :person="person"
      :title="title"
      @deletePerson="deletePerson"
      @displayDetailsModal="displayDetailsModal"
    />
  </div>
</template>

<script>
import MovieDetails from "./MovieDetails.vue";
import PersonDetails from "./PersonDetails.vue";

export default {
  props: ["movie", "actor", "producer", "isMovieCard", "title"],
  components: {
    MovieDetails,
    PersonDetails,
  },
  computed: {
    person() {
      return this.actor || this.producer;
    },
  },
  methods: {
    deletePerson(personDetails) {
      this.$emit("deletePerson", personDetails);
    },
    deleteMovieById(movie) {
      this.$emit("deleteMovieById", movie);
    },
    displayDetailsModal() {
      this.$emit("displayDetailsModal");
    },
  },
};
</script>

<style scoped>
#details {
  text-align: center;
}
</style>
