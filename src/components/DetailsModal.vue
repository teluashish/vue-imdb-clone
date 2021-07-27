<template>
  <span id="detailsModal">
    <Modal v-model="displayModal">
      <slot name="header"></slot>

      <slot name="main"></slot>

      <div slot="footer">
        <Button type="primary" @click="ok">Ok</Button>
      </div>
    </Modal>
  </span>
</template>

<script>
export default {
  props: ["entityModal"],
  data() {
    return {
      displayModal: false,
    };
  },
  watch: {
    entityModal() {
      this.displayModal = this.entityModal;
    },
  },

  methods: {
    ok() {
      this.displayModal = false;
      this.$emit("closeDetailsModal");
    },
  },
};
</script>
