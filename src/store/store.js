import Vuex from "vuex";
import axios from "axios";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    movies: null,
    entity: null,
    actors: null,
    producers: null,
    genres: null,
    actorId: null,
    producerId: null
  },

  getters: {
    entity: (state) => state.entity,
    movies: (state) => state.movies,
    actors: (state) => state.actors,
    producers: (state) => state.producers,
    genres: (state) => state.genres,
  },

  mutations: {
    assignEntity(state, entity) {
      state.entity = entity;
    },
    assignMovies(state, movies) {
      state.movies = movies;
    },
    assignActors(state, actors) {
      state.actors = actors;
    },
    assignProducers(state, producers) {
      state.producers = producers;
    },
    assignGenres(state, genres) {
      state.genres = genres;
    },
  },

  actions: {
    async getMovies(context) {
      await axios
        .get("/movies")
        .then((response) => context.commit("assignMovies", response["data"]))
        .catch((error) => window.alert("movies fetch: " + error));
    },

    async postMovie(context, movie) {
      if (movie.coverImage != "") {
        await axios
          .post("/movies/upload", movie.coverImage)
          .then((response) => {
            movie.coverImage = response.data;
          })
          .catch((error) => window.alert(error));
      }

      await axios
        .post("/movies/", movie)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {})
        .catch((error) => window.alert("add movie: " + error));
    },

    async putMovie(context, { movie, movieId }) {
      if (movie.coverImage != "") {
        await axios
          .post("/movies/upload", movie.coverImage)
          .then((response) => (movie.coverImage = response.data))
          .catch((error) => window.alert(error));
      }

      await axios
        .put("/movies/" + movieId, movie)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {})
        .catch((error) => window.alert("movie update " + error));
    },
    async deleteMovie(context, movieId) {
      await axios
        .delete("/movies/" + movieId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => console.log("deleted " + movieId))
        .catch((error) =>
          window.alert("movie delete with id: " + movieId + " " + error)
        );
    },

    async getActors(context) {
      await axios
        .get("/actors")
        .then((response) => context.commit("assignActors", response["data"]))
        .catch((error) => window.alert("actors fetch: " + error));
    },
    async postActor(context, actor) {
      await axios
        .post("/actors/", actor)
        .then((response) => {
          this.actorId = response.data;
        })
        .catch((error) => window.alert("add actor: " + error));
      return this.actorId;
    },
    async putActor(context, actor, actorId) {
      await axios
        .put("/actors/" + actorId, actor)
        // eslint-disable-next-line no-unused-vars
        .then((response) => console.log("updated actor id: " + actorId))
        .catch((error) => window.alert("actor update " + error));
    },
    async deleteActor(context, actorId) {
      axios
        .delete("/actors/" + actorId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => console.log("deleted" + actorId))
        .catch((error) =>
          window.alert("actor deletion " + actorId + " " + error)
        );
    },

    async getProducers(context) {
      await axios
        .get("/producers")
        .then((response) => context.commit("assignProducers", response["data"]))
        .catch((error) => window.alert("producers fetch: " + error));
    },
    async postProducer(context, producer) {
      await axios
        .post("/producers/", producer)
        .then((response) => {
          this.producerId = response.data;
        })
        .catch((error) => window.alert("add producer: " + error));
      return this.producerId;
    },
    async putProducer(context, producer, producerId) {
      await axios
        .put("/producers/" + producerId, producer)
        .then((producerId) => console.log("updated producer id: " + producerId))
        .catch((error) => window.alert("producer update " + error));
    },
    async deleteProducer(context, producerId) {
      await axios
        .delete("/producers/" + producerId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => console.log("deleted " + producerId))
        .catch((error) =>
          window.alert("producer deletion " + producerId + " " + error)
        );
    },

    async getGenres(context) {
      await axios
        .get("/genres")
        .then((response) => context.commit("assignGenres", response["data"]))
        .catch((error) => window.alert("genres fetch: " + error));
    },

    async postGenre(context, genre) {
      await axios
        .post("/genres/", genre)
        // eslint-disable-next-line no-unused-vars
        .then((response) => console.log("added genre"))
        .catch((error) => window.alert("add genre: " + error));
    },

    async deleteGenre(context, genreId) {
      await axios
        .delete("/genres/" + genreId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => console.log("deleted genre with id: " + genreId))
        .catch((error) =>
          window.alert("genre deletion " + genreId + " " + error)
        );
    },
  },
});
