<template>
  <div class="bug-editor">
    <form @submit.prevent="">
      <div>
        <button
          v-for="title in titleMatches"
          :key="title"
          @click="setTitle(title)"
        >
          {{ title }}
        </button>
      </div>
      <div>
        <label for="new-bug-title">Title: </label>
        <input type="text" id="new-bug-title" v-model="state.title" />
      </div>
      <div>
        <label for="new-bug-details">Details: </label>
        <input type="text" id="new-bug-details" v-model="state.details" />
      </div>
      <div>
        <button
          v-for="condition in conditionMatches"
          :key="condition"
          @click="setCondition(condition)"
        >
          {{ condition }}
        </button>
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
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    titleMatches() {
      const title = this.state.title.toLowerCase();
      const matches =
        title === ""
          ? []
          : this.bugs
              .map((bug) => bug.title)
              .filter((bugTitle) => bugTitle.includes(title));
      return matches[0] === title ? [] : [...new Set(matches)];
    },
    conditionsByTitle() {
      const title = this.state.title.toLowerCase();
      return [
        ...new Set(
          this.bugs
            .filter((bug) => bug.title === title)
            .reduce(
              (allConditions, bug) => [...allConditions, ...bug.conditions],
              []
            )
        ),
      ];
    },
    conditionMatches() {
      const condition = this.newCondition.toLowerCase();
      const matches = this.conditionsByTitle.filter((titleCondition) =>
        titleCondition.includes(condition)
      );
      return matches[0] === condition ? [] : matches;
    },
  },
  methods: {
    finishEdit() {
      if (this.state.title === "") {
        //set style for invalid empty string
      } else {
        this.state.title = this.state.title.toLowerCase();
        this.state.conditions = [...new Set(this.state.conditions)];
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
        this.state.conditions.push(this.newCondition.toLowerCase());
        this.newCondition = "";
      }
    },
    setCondition(condition) {
      this.newCondition = condition;
      this.addCondition();
    },
    setTitle(title) {
      this.state.title = title;
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
