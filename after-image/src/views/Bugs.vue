<template>
  <div class="bugs">
    <h1>There are bugs here</h1>
    <div v-for="bug in bugs" :key="bug._id">
      <span>{{ bug.title }} - </span>
      <span>{{ new Date(bug.occurred).toLocaleDateString() }}</span>
    </div>
    <bug-editor />
    <div><p>Report a bug</p></div>
    <div><p>Report a fix</p></div>
    <div><p>Metrics</p></div>
  </div>
</template>

<script>
// @ is an alias to /src
import BugEditor from "../components/Bugs/BugEditor";

export default {
  name: "Bugs",
  components: {
    BugEditor,
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
};
</script>
