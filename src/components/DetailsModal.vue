<template>
  <span id="detailsModal">
    <Button type="dashed" @click="entityModal = true">Show more details</Button>
    <Modal v-model="entityModal" :title="entity.name">
      <p>{{ isMovieDetail ? entity.plot : entity.bio }}</p>
      <div slot="footer">
        <Button type="primary" @click="ok">Ok</Button>
      </div>
    </Modal>
  </span>
</template>

<script>
export default {
  props: ["entity", "isMovieDetail"],
  data() {
    return {
      entityModal: false,
    };
  },
  methods: {
    ok() {
      this.entityModal = false;
    },
  },
};
</script>

