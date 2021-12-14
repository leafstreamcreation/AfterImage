<template>
  <div class="mantra-editor">
    <h5>Mantra Editor</h5>
    <form @submit.prevent="finishEdit()">
        <label for="new-mantra-input">New</label>
        <input type="text" id="new-mantra-input" v-model="newMantra">
        <div>
          <p v-for="mantra in state" :key="mantra._id">{{ mantra.text }}</p>
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
