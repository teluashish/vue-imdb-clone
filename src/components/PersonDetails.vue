<template>
  <div id="personCol">
    <Col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" offset="1">
      <Card id="personCard">
        <p slot="title">{{ person.name }}</p>
        <div align="left">
          <p><b>Date of Birth: </b> {{ formattedDOB }}</p>
          <p><b>Gender:</b> {{ person.gender }}</p>
          <br />
          <Row>
            <Col>
              <Button type="dashed" @click="displayModal"
                >Show more details</Button
              >
            </Col>
            <Col span="1"></Col>
            <Col>
              <Button type="error" ghost @click="deletePerson">Delete</Button>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["person", "title"],
  computed: {
    formattedDOB() {
      return new Date(this.person.dob).toLocaleDateString();
    },
  },
  methods: {
    ...mapMutations(["assignEntity"]),
    deletePerson() {
      this.$emit("deletePerson", {
        id: this.person.id,
        title: this.title,
        person: this.person,
      });
    },
    displayModal() {
      this.$emit("displayDetailsModal");
      this.assignEntity(this.person);
    },
  },
};
</script>

<style scoped>
#personCard {
  width: 347px;
}

#personCol {
  margin: 3px;
}
</style>
