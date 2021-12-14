<template>
  <div class="intentions">
    <h1>Intents.</h1>
    <form @submit.prevent="finishEdit()">
        <label for="new-task-input">New</label>
        <input type="text" id="new-task-input">
        <div>
          <p v-for="task in state" :key="task._id">{{ task.text }}</p>
        </div>
        <button>Submit</button>
    </form>
    <div><p>Reflection</p></div>
    <div><p>Metrics</p></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Intentions",
  components: {},
  data() {
    return {
      state: [],
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    finishEdit() {
        console.log("boop!");
      this.$emit("finishEdit", this.state);
    },
  },
  mounted() {
    this.state = this.tasks;
  },
  watch: {
    tasks: function (newTasks) {
      this.state = newTasks;
    },
  },
};
</script>
