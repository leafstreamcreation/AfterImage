<template>
  <div class="bugs">
    <h1>Report</h1>
    <bug-editor />
    <h2>History</h2>
    <div v-for="bug in bugs" :key="bug._id">
      <span>{{ bug.title }} - </span>
      <span>{{ new Date(bug.occurred).toLocaleDateString() }}</span>
    </div>
    <!-- <div><p>Report a bug</p></div>
    <div><p>Report a fix</p></div>
    <div><p>Metrics</p></div> -->
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
