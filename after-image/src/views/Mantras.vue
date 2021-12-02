<template>
  <div class="home">
    <mantra-viewer :mantras="mantras" />
    <mantra-editor :mantras="mantras" />
    <div><p>Intentions quick feature</p></div>
    <div><p>Bugs quick feature</p></div>
  </div>
</template>

<script>
// @ is an alias to /src
import MantraViewer from "@/components/Mantras/MantraViewer";
import MantraEditor from "@/components/Mantras/MantraEditor";

export default {
  name: "Mantras",
  components: {
    MantraViewer,
    MantraEditor,
  },
  data() {
    return {
      mantras: [
        "I will be a real mantra someday",
        "I dream of being more than a string",
        "I'm happy just the way I am!",
      ],
    };
  },
};
</script>
