<template>
  <div class="mantra-editor">
    <form @submit.prevent="finishEdit()">
      <input type="text" id="new-mantra-input" v-model="newMantra" />
      <button>Add</button>
      <div>
        <div v-for="mantra in state" :key="mantra._id">
          <span>{{ mantra.text }}</span>
          <button @click.prevent="deleteMantra(mantra._id)">Delete</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "MantraEditor",
  components: {},
  emits: ["finishEdit"],
  data() {
    return {
      newMantra: "",
      state: [],
    };
  },
  computed: {
    mantras() {
      return this.$store.state.mantras;
    },
  },
  methods: {
    finishEdit() {
      if (this.mantra === "") {
        //set style for invalid empty string
      } else {
        this.$store.dispatch("newMantra", { mantra: this.newMantra });
        this.$emit("finishEdit", this.state);
        this.newMantra = "";
        //set style for creation processing
      }
    },
    deleteMantra(id) {
      this.$store.dispatch("deleteMantra", { id });
      //set style for deletion processing
    },
  },
  mounted() {
    this.state = this.mantras;
  },
  watch: {
    mantras: function (newMantras) {
      this.state = newMantras;
      //clear style for creation/deletion processing
    },
  },
};
</script>
