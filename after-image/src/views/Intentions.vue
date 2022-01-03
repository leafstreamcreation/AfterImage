<template>
  <div class="intentions">
    <h1>Intents.</h1>
    <task-editor />
    <h2>Schedule a Task</h2>
    <regen-task-editor />
    <div><p>Reflection</p></div>
    <div><p>Metrics</p></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskEditor from "@/components/Tasks/TaskEditor";
import RegenTaskEditor from "@/components/Tasks/RegenTaskEditor";

export default {
  name: "Intentions",
  components: {
    TaskEditor,
    RegenTaskEditor,
  },
};
</script>
