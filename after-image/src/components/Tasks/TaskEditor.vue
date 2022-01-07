<template>
  <div class="task-editor">
    <form @submit.prevent="finishEdit()">
      <input type="text" v-model="newTask" />
      <button>Add</button>
      <div>
        <div
          v-for="task in state"
          :key="task._id"
          @click="modifySelection(task._id)"
        >
          <span>{{ task.text }}</span>
          <button
            v-if="selected === task._id"
            @click.prevent="deleteTask(task._id)"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

// import RegenTaskEditor from "@/components/Tasks/RegenTaskEditor";

export default {
  name: "TaskEditor",
  components: {
    // RegenTaskEditor,
  },
  emits: ["finishEdit"],
  data() {
    return {
      newTask: "",
      state: [],
      selected: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    finishEdit() {
      if (this.newTask === "") {
        //set style for invalid empty string
      } else {
        this.$store.dispatch("newTask", { task: this.newTask });
        this.$emit("finishEdit", this.state);
        this.newTask = "";
        //set style for creation processing
      }
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", { id });
      //set style for deletion processing
    },
    modifySelection(id) {
      this.selected = this.selected === id ? null : id;
    },
  },
  mounted() {
    this.state = this.tasks;
  },
  watch: {
    tasks: function (newTasks) {
      this.state = newTasks;
      //clear style for creation/deletion processing
    },
  },
};
</script>
