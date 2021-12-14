<template>
  <div class="mantra-editor">
    <h5>Mantra Editor</h5>
    <form @submit.prevent="finishEdit()">
      <label for="new-mantra-input">New</label>
      <input type="text" id="new-mantra-input" v-model="newMantra" />
      <div>
        <div v-for="mantra in state" :key="mantra._id">
          <span>{{ mantra.text }}</span>
          <button @click.prevent="deleteMantra(mantra._id)">Delete</button>
        </div>
      </div>
      <button>Submit</button>
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
      this.$store.dispatch("newMantra", { mantra: this.newMantra });
      this.$emit("finishEdit", this.state);
      this.newMantra = "";
    },
    deleteMantra(id) {
      this.$store.dispatch("deleteMantra", { id });
    },
  },
  mounted() {
    this.state = this.mantras;
  },
  watch: {
    mantras: function (newMantras) {
      this.state = newMantras;
    },
  },
};
</script>
