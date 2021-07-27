<template>
  <div id="movieForm">
    <Form
      :model="formItemToCopy"
      :label-width="300"
      ref="formItemToCopy"
      :rules="ruleValidate"
    >
      <br />

      <FormItem>
        <h2 align="left">Fill Movie Details</h2>
      </FormItem>

      <FormItem label="Title" prop="name">
        <Row>
          <Col span="16">
            <Input
              v-model="formItemToCopy.name"
              type="text"
              placeholder="Enter title for the movie"
            ></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="Year" prop="year">
        <Row>
          <Col span="16">
            <Input
              v-model="formItemToCopy.year"
              placeholder="Enter movie release year"
              number
            ></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="Select Actors" prop="actorIds">
        <Row>
          <Col span="12">
            <Select
              v-model="formItemToCopy.actorIds"
              multiple
              placeholder="Select Actors "
            >
              <Option
                v-for="actor in actors"
                :value="actor.id"
                :key="actor.id"
                >{{ actor.name }}</Option
              >
            </Select>
          </Col>
          <Col span="1"></Col>
          <Col span="4">
            <person-form-modal
              :title="'actor'"
              @addPerson="addPersonInMovieForm"
            >
            </person-form-modal>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="Select Genres" prop="genreIds">
        <Row>
          <Col span="16">
            <Select
              v-model="formItemToCopy.genreIds"
              multiple
              placeholder="Select Genres "
            >
              <Option
                v-for="(genre, index) in genres"
                :value="genre.id"
                :key="index"
                >{{ genre.name }}</Option
              >
            </Select>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="Select Producer" prop="producerId">
        <Row>
          <Col span="12">
            <Select
              v-model="formItemToCopy.producerId"
              placeholder="Select Producer "
              ref="producerSelect"
            >
              <Option
                v-for="producer in formItemToCopy.producerIds"
                :value="producer.value"
                :key="producer.value"
                >{{ producer.label }}</Option
              >
            </Select>
          </Col>
          <Col span="1"></Col>
          <Col span="4">
            <person-form-modal
              :title="'producer'"
              @addPerson="addPersonInMovieForm"
            >
            </person-form-modal>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="Choose a Cover Image " prop="coverImage">
        <Row>
          <Upload
            v-model="formItemToCopy.coverImage"
            :before-upload="handleUpload"
            action=" "
          >
            <Col span="12">
              <Button>Select the file to upload</Button>
            </Col>
          </Upload>

          <Col span="4">
            <div v-if="formItemToCopy.coverImage !== null">
              Upload file: {{ formItemToCopy.coverImage.name }}
            </div>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="Plot" prop="plot">
        <Row>
          <Col span="16">
            <Input
              v-model="formItemToCopy.plot"
              type="textarea"
              maxlength="500"
              :autosize="{ minRows: 2, maxRows: 10 }"
              show-word-limit
              clearable
              placeholder="Enter plot of the movie..."
            ></Input>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <Row>
      <Col span="3"></Col>
      <Col>
        <Button type="primary" ghost @click="handleSubmit('formItemToCopy')">{{
          submitStatus
        }}</Button>
      </Col>
      <Col span="1"></Col>
      <Col>
        <Button type="warning" ghost @click="handleReset('formItemToCopy')"
          >Reset</Button
        >
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PersonFormModal from "../components/PersonFormModal.vue";

export default {
  components: {
    PersonFormModal,
  },
  computed: {
    ...mapGetters(["genres", "actors", "producers"]),
  },
  data() {
    return {
      movie: null,
      isEdit: false,
      movieModal: false,
      submitStatus: "Submit",
      personId: "",

      formItem: {
        name: "",
        movieActorMappingString: "",
        producerId: null,
        movieGenreMappingString: "",
        year: "",
        plot: "",
        coverImage: "",
      },

      formItemToCopy: {
        name: "",
        actorIds: [],
        genreIds: [],
        producerIds: [],
        producerId: null,
        producerDefaultLabel: "",
        year: "",
        plot: "",
        coverImage: null,
      },
      ruleValidate: {
        name: {
          required: true,
          type: "string",
          pattern: new RegExp(/^[a-z ,.'-]+$/i),
          message: "Invalid full name",
        },

        actorIds: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one actor",
          },
          { type: "array", max: 10, message: "Choose ten actors at best" },
        ],

        genreIds: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one genre",
          },
          { type: "array", max: 10, message: "Choose ten genres at best" },
        ],

        producerId: {
          required: true,
          type: "number",
          message: "Please select a producer",
        },

        year: {
          required: true,
          type: "number",
          min: 1888,
          max: 2021,
          message: "Enter valid Year of release ",
        },

        coverImage: { required: true, message: "Cover Image required" },

        plot: [
          { required: true, message: "Please summarize the movie" },
          {
            type: "string",
            min: 10,
            message: "Number of characters cannot be less than 10",
          },
          {
            type: "string",
            max: 500,
            message: "Limit the number of characters to 500",
          },
        ],
      },
    };
  },

  methods: {
    ...mapActions([
      "getGenres",
      "getProducers",
      "getActors",
      "postActor",
      "postProducer",
    ]),
    submit() {
      this.movieModal = false;
      this.modify();
      if (!this.isEdit) this.add();
      else this.edit(this.movie.id);
    },

    edit(id) {
      this.$router.app.$emit("editMovie", {
        movie: this.formItem,
        movieId: id,
      });
    },
    add() {
      this.$router.app.$emit("addMovie", this.formItem);
    },

    modify() {
      this.formItem.name = this.formItemToCopy.name;
      this.formItem.producerId = parseInt(this.formItemToCopy.producerId);
      this.formItem.movieActorMappingString = this.formItemToCopy.actorIds.join(
        ","
      );
      this.formItem.movieGenreMappingString = this.formItemToCopy.genreIds.join(
        ","
      );
      this.formItem.plot = this.formItemToCopy.plot;
      this.formItem.year = parseInt(this.formItemToCopy.year);
      this.formItem.coverImage = this.getImage(this.formItemToCopy.coverImage);
    },

    getImage(file) {
      if (!file) return "";
      let formData = new FormData();
      let image = file;
      formData.append("file", image, image.name);
      return formData;
    },

    handleUpload(file) {
      this.formItemToCopy.coverImage = file;
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitStatus = "Submitting...Please wait !!";
          this.submit();
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    async init() {
      await this.getActors();
      await this.getProducers();
      await this.getGenres();
    },

    getProducerLabel(id) {
      var producer = this.producers.find((producer) => producer.id === id);
      if (producer !== null) return producer.name;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    producerAdded(id) {
      var newLabel = this.getProducerLabel(id);
      this.formItemToCopy.producerIds.push({ value: id, label: newLabel });
      this.formItemToCopy.producerId = id;
      this.formItemToCopy.producerDefaultLabel = newLabel;
    },

    actorAdded(id) {
      this.formItemToCopy.actorIds.push(id);
    },

    async addPersonInMovieForm(personDetails) {
      if (personDetails.title === "producer") {
        this.personId = await this.postProducer(personDetails.formItem);
        await this.getProducers();
        this.producerAdded(this.personId);
      } else if (personDetails.title === "actor") {
        this.personId = await this.postActor(personDetails.formItem);
        await this.getActors();
        this.actorAdded(this.personId);
      }
    },
  },

  async created() {
    await this.init();
    this.movie = this.$route.params.movie;
    this.isEdit = this.$route.params.isEdit;
    this.producers.map((producer) =>
      this.formItemToCopy.producerIds.push({
        value: producer.id,
        label: producer.name,
      })
    );

    if (this.isEdit) {
      this.formItemToCopy.name = this.movie.name;
      this.formItemToCopy.genreIds = this.movie.genres.map((x) => x.id);
      this.formItemToCopy.actorIds = this.movie.actors.map((x) => x.id);
      this.formItemToCopy.plot = this.movie.plot;
      this.formItemToCopy.year = this.movie.year;
      this.formItemToCopy.producerId = this.movie.producerId;
      this.formItemToCopy.producerDefaultLabel = this.getProducerLabel(
        this.movie.producerId
      );
    }
  },
};
</script>

<style scoped>
#movieForm {
  text-align: left;
}
</style>
