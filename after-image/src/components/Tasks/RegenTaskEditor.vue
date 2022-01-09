<template>
  <div class="regen-task-editor">
    <form @submit.prevent="finishEdit()">
      <div>
        <label for="textInput">Task </label>
        <input id="textInput" type="text" v-model="newRegenTask.text" />
      </div>
      <div>
        <label for="timeInput">Repeat every </label>
        <input id="timeInput" type="number" v-model="newRegenTask.number" />
        <span> {{ newRegenTask.unit }} </span>
        <input type="radio" value="days" v-model="newRegenTask.unit" />
        <input type="radio" value="weeks" v-model="newRegenTask.unit" />
        <input type="radio" value="months" v-model="newRegenTask.unit" />
      </div>
      <div>
        <label for="dateInput">At </label>
        <input
          id="dateInput"
          type="datetime-local"
          v-model="newRegenTask.scheduleDate"
        />
      </div>
      <button>Schedule</button>
      <div v-if="list">
        <div
          v-for="task in state"
          :key="task._id"
          @click="modifySelection(task._id)"
        >
          <span
            >{{ task.text }} - {{ msToTime(task.regenInterval) }} -
            {{ new Date(task.scheduleDate).toLocaleString() }}</span
          >

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

export default {
  name: "RegenTaskEditor",
  components: {},
  emits: ["finishEdit"],
  data() {
    return {
      newRegenTask: {
        text: "",
        number: 1,
        unit: "days",
        scheduleDate: "2022-01-01T00:00",
      },
      state: [],
      selected: null,
    };
  },
  props: { list: Boolean },
  computed: {
    regenTasks() {
      return this.$store.state.regenTasks;
    },
    regenInterval() {
      const CONVERSION = {
        days: 1000 * 60 * 60 * 24,
        weeks: 1000 * 60 * 60 * 24 * 7,
        months: 1000 * 60 * 60 * 24 * 30,
      };
      return this.newRegenTask.number * CONVERSION[this.newRegenTask.unit];
    },
  },
  methods: {
    finishEdit() {
      if (this.newRegenTask.text === "") {
        //set style for invalid empty string
      } else {
        this.$store.dispatch("newRegenTask", {
          regenTask: {
            text: this.newRegenTask.text,
            regenInterval: this.regenInterval,
            scheduleDate: this.newRegenTask.scheduleDate,
          },
        });
        this.$emit("finishEdit", this.state);
        this.newRegenTask = {
          text: "",
          number: 1,
          unit: "days",
          scheduleDate: "2022-01-01T00:00",
        };
        //set style for creation processing
      }
    },
    deleteTask(id) {
      this.$store.dispatch("deleteRegenTask", { id });
      //set style for deletion processing
    },
    modifySelection(id) {
      this.selected = this.selected === id ? null : id;
    },
    msToTime(time) {
      const CONVERSION = {
        days: 1000 * 60 * 60 * 24,
        weeks: 1000 * 60 * 60 * 24 * 7,
        months: 1000 * 60 * 60 * 24 * 30,
      };
      if (time < CONVERSION.weeks) return `${time / CONVERSION.days} days`;
      else if (time < CONVERSION.months)
        return `${time / CONVERSION.weeks} weeks`;
      else return `${time / CONVERSION.months} months`;
    },
  },
  mounted() {
    this.state = this.regenTasks;
  },
  watch: {
    regenTasks: function (newRegenTasks) {
      this.state = newRegenTasks;
      //clear style for creation/deletion processing
    },
  },
};
</script>
