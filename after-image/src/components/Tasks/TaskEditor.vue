<template>
  <div class="task-editor">
    <form @submit.prevent="finishEdit()">
        <label for="new-task-input">New</label>
        <input type="text" id="new-task-input" v-model="newTask">
        <div>
          <p v-for="task in state" :key="task._id">{{ task.text }}</p>
        </div>
        <button>Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "TaskEditor",
  components: {},
  emits: ["finishEdit"],
  data() {
    return {
        newTask: "",
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
        this.$store.dispatch("newTask", { task: this.newTask });
      this.$emit("finishEdit", this.state);
      this.newTask = "";
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