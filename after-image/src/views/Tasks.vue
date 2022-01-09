<template>
  <div class="tasks">
    <h1>Tasks</h1>
    <task-editor />
    <h2 @click="scheduleTask = !scheduleTask">Schedule</h2>
    <regen-task-editor v-if="scheduleTask" list />
    <!-- <div><p>Reflection</p></div>
    <div><p>Metrics</p></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import TaskEditor from "@/components/Tasks/TaskEditor";
import RegenTaskEditor from "@/components/Tasks/RegenTaskEditor";

export default {
  name: "Tasks",
  components: {
    TaskEditor,
    RegenTaskEditor,
  },
  data() {
    return {
      scheduleTask: false,
    };
  },
};
</script>
