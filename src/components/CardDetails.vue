<template>
  <Col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
    <div id="card" align="center">
      <movie-details v-if="isMovieCard" :movie="movie" />
      <person-details v-if="!isMovieCard" :person="person" :isActor="isActor" />
    </div>
  </Col>
</template>

<script>
import MovieDetails from "./MovieDetails.vue";
import PersonDetails from "./PersonDetails.vue";

export default {
  props: ["movie", "actor", "producer", "isMovieCard", "isActor"],
  components: {
    MovieDetails,
    PersonDetails,
  },
  computed: {
    person() {
      return this.isActor ? this.actor : this.producer;
    },
  },
};
</script>

<style scoped>
#card {
  height: 100%;
  width: 100%;
}
</style>