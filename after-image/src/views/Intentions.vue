<template>
  <div class="intentions">
    <h1>Intents.</h1>
    <task-editor />
    <div><p>Reflection</p></div>
    <div><p>Metrics</p></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskEditor from "@/components/Tasks/TaskEditor";

export default {
  name: "Intentions",
  components: {
    TaskEditor,
  },
};
</script>
