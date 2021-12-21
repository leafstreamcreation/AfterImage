<template>
  <div class="bugs">
    <h1>There are bugs here</h1>
    <div v-for="bug in bugs" :key="bug._id">
      <p>{{ bug.title }}</p>
    </div>
    <div><p>Report a bug</p></div>
    <div><p>Report a fix</p></div>
    <div><p>Metrics</p></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Bugs",
  components: {},
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
};
</script>
