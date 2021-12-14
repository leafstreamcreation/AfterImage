<template>
  <div class="task-editor">
    <form @submit.prevent="finishEdit()">
      <label for="new-task-input">New</label>
      <input type="text" id="new-task-input" v-model="newTask" />
      <div>
        <div v-for="task in state" :key="task._id">
          <span>{{ task.text }}</span>
          <button @click.prevent="deleteTask(task._id)">Delete</button>
        </div>
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
    deleteTask(id) {
      this.$store.dispatch("deleteTask", { id });
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
