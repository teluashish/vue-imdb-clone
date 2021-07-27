<template>
  <div id="movieDetailsCard">
    <Card :bordered="false">
      <p slot="title">{{ movie.name }}</p>
      <img :src="movie.coverImage" /> <br /><br />
      <div id="movieDetails">
        <p><b>Year of release: </b> {{ movie.year }}</p>
        <p>
          <b>Actors: </b>
          <span v-for="(actor, index) in movie.actors" :key="index">
            {{ actor.name
            }}<span v-if="index + 1 < movie.actors.length">, </span></span
          >
        </p>
        <p>
          <b>Genres: </b>
          <span v-for="(genre, index) in movie.genres" :key="index">
            {{ genre.name
            }}<span v-if="index + 1 < movie.genres.length">, </span>
          </span>
        </p>
        <p><b>Producer: </b> {{ getProducerName(movie.producerId) }}</p>
        <br />
        <Row>
          <Col>
            <Button type="dashed" @click="displayModal"
              >Show more details</Button
            >
          </Col>
          <Col span="1"> </Col>
          <Col>
            <Button
              :to="{ name: 'movie', params: { movie: movie, isEdit: true } }"
              type="primary"
              ghost
              >Edit Movie</Button
            >
          </Col>
          <Col span="1"> </Col>
          <Col>
            <Button type="error" ghost @click="deleteMovieById">Delete</Button>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["producers"]),
  },

  props: ["movie"],

  methods: {
    ...mapMutations(["assignEntity"]),
    displayModal() {
      this.assignEntity(this.movie);
      this.$emit("displayDetailsModal");
    },

    deleteMovieById() {
      this.$emit("deleteMovieById", this.movie);
    },

    getProducerName() {
      if (this.producers !== null) {
        for (var i = 0; i < this.producers.length; i++) {
          if (this.movie.producerId === this.producers[i]["id"])
            return this.producers[i]["name"];
        }
      }
    },
  },
};
</script>

<style scoped>
img {
  height: 10%;
  width: 60%;
  border-radius: 2%;
}
#movieDetails {
  text-align: left;
}
</style>
