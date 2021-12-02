<template>
  <div class="mantra-editor">
    <h5>Mantra Editor</h5>
    <p>Top section is a canvas for making a mantra. Blank by default</p>
    <p>
      Below is a search bar and a list with buttons to select and delete mantras
    </p>
    <div v-if="visible">
      <p v-for="mantra in state" :key="mantra">{{ mantra }}</p>
    </div>
    <button @click="toggleList()">UPDATE MY MANTRAS</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "MantraEditor",
  components: {},
  emits: ["finishEdit"],
  props: {
      mantras: Array
  },
  data() {
      return {
          state: this.mantras,
          visible: false,
      };
  },
  methods: {
      toggleList() {
          this.visible = !this.visible;
          this.$emit('finishEdit', this.state);
      },
  }
};
</script>