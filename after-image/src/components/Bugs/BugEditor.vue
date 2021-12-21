<template>
  <div class="bug-editor">
    <form @submit.prevent="">
      <div>
        <label for="new-bug-title">Title: </label>
        <input type="text" id="new-bug-title" v-model="state.title" />
      </div>
      <div>
        <label for="new-bug-details">Details: </label>
        <input type="text" id="new-bug-details" v-model="state.details" />
      </div>
      <div>
        <label for="new-bug-condition">Condition: </label>
        <input type="text" id="new-bug-condition" v-model="newCondition" />
        <button @click="addCondition()">Add</button>
        <div v-for="condition in state.conditions" :key="condition">
          <p>{{ condition }}</p>
        </div>
      </div>
      <button @click="clear()">Clear</button>
      <button type="submit" @click="finishEdit()">Report</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "BugEditor",
  components: {},
  emits: ["finishEdit"],
  data() {
    return {
      state: {
        title: "",
        details: "",
        conditions: [],
      },
      newCondition: "",
    };
  },
  methods: {
    finishEdit() {
      if (this.state.title === "") {
        //set style for invalid empty string
      } else {
        this.$store.dispatch("newBug", { bug: this.state });
        this.$emit("finishEdit", this.state);
        this.clear();
        //set style for creation processing
      }
    },
    addCondition() {
      if (this.newCondition === "") {
        //set style for invalid empty string
      } else {
        this.state.conditions.push(this.newCondition);
        this.newCondition = "";
      }
    },
    clear() {
      this.state = {
        title: "",
        details: "",
        conditions: [],
      };
      this.newCondition = "";
    },
  },
};
</script>
