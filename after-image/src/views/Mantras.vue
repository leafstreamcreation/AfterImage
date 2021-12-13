<template>
  <div class="home">
    <h1>{{ currentMantra }}</h1>
    <mantra-editor :mantras="mantras" />
    <div><p>Intentions quick feature</p></div>
    <div><p>Bugs quick feature</p></div>
  </div>
</template>

<script>
// @ is an alias to /src
import MantraEditor from "@/components/Mantras/MantraEditor";

export default {
  name: "Mantras",
  components: {
    MantraEditor,
  },
  computed: {
    currentMantra() {
      return this.$store.state.currentMantra;
    },
    mantras() {
      return this.$store.state.mantras;
    },
  },
  mounted() {
    console.log(this.mantras);
  },
};
</script>
