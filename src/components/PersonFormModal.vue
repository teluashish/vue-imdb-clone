<template>
  <span id="formModal">
    <Button type="primary" ghost @click="personModal = true"
      >+Add {{ title }}</Button
    >
    <Modal v-model="personModal" width="600">
      <p slot="header" style="text-align: center">
        <span>Fill {{ title }} Details</span>
      </p>
      <div id="person-form">
        <Form
          :model="formItem"
          :label-width="120"
          ref="formItem"
          :rules="ruleValidate"
        >
          <FormItem label="Name" prop="name" ref="personFormDetails">
            <Input v-model="formItem.name" placeholder="Enter Name"></Input>
          </FormItem>

          <FormItem label="Date of birth" prop="dob">
            <Row>
              <Col span="11">
                <DatePicker
                  type="date"
                  placeholder="Select date"
                  v-model="formItem.dob"
                ></DatePicker>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formItem.gender">
              <Radio label="male">Male</Radio>
              <Radio label="female">Female</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="Bio" prop="bio">
            <Input
              v-model="formItem.bio"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 5 }"
              placeholder="Enter bio..."
            ></Input>
          </FormItem>
        </Form>
      </div>

      <div slot="footer">
        <Button type="primary" @click="submit()">Submit</Button>
      </div>
    </Modal>
  </span>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["isActor"],
  data() {
    return {
      personModal: false,
      personId: null,
      formItem: {
        name: "",
        bio: "",
        dob: null,
        gender: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            type: "string",
            pattern: new RegExp(/^[a-z ,.'-]+$/i),
            message: "Invalid full name",
          },
        ],

        bio: [
          { required: true, message: "Please enter a Personal Introduction" },
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

        gender: {
          type: "string",
          required: "true",
          message: "Please choose a gender",
        },

        dob: {
          required: true,
          type: "date",
          // eslint-disable-next-line no-unused-vars
          validator(rule, value, callback, source, options) {
            return (
              Math.floor(
                (new Date() - new Date(value).getTime()) / 3.15576e10
              ) > 18
            );
          },
          message: "Please choose a valid date of birth",
        },
      },
    };
  },

  computed: {
    title() {
      return this.isActor ? "Actor" : "Producer";
    },
  },

  methods: {
    ...mapActions(["postActor", "postProducer", "getActors", "getProducers"]),
    submit() {
      this.personModal = false;
      this.add();
    },
    getAge(dob) {
      return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e10);
    },

    async add() {
      if (this.isActor) {
        this.personId = await this.postActor(this.formItem);
        await this.getActors();
        this.$emit("actorAdded", this.personId);
      } else {
        this.personId = await this.postProducer(this.formItem);
        await this.getProducers();
        this.$emit("producerAdded", this.personId);
      }
      this.makeEmpty();
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },

    makeEmpty() {
      this.formItem.name = "";
      this.formItem.bio = "";
      this.formItem.dob = null;
      this.formItem.gender = "";
      this.personId = null;
      this.handleReset('personFormDetails')
    },
  },
};
</script>

<style scoped>
#person-form {
  text-align: left;
}
</style>