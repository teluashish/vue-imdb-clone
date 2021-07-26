<template>
  <span id="formModal">
    <Button type="primary" ghost @click="displayPersonModal"
      >+Add {{ title }}</Button
    >
    <Modal v-model="personModal" id="personModal">
      <p slot="header" id="header">
        <span>Fill {{ title }} Details</span>
      </p>
      <div id="personForm">
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
        <Button @click="handleReset('formItem')" id="resetButton">Reset</Button>
      </div>
    </Modal>
  </span>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      personModal: false,
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
          {
            required: true,
            message: "Please enter a Personal Introduction",
            trigger: "blur",
          },
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

  methods: {
    submit() {
      this.$refs["formItem"].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
          this.add();
          this.personModal = false;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    getAge(dob) {
      return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e10);
    },

    async add() {
      this.$emit("addPerson", { formItem: this.formItem, title: this.title });
      this.handleReset("formItem");
    },

    displayPersonModal() {
      this.personModal = true;
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>

<style scoped>
#personForm {
  text-align: left;
}
#resetButton {
  margin-left: 8px;
}
#header {
  text-align: center;
}
#personModal {
  width: 600px;
}
</style>
