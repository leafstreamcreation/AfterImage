<template>
  <div class="login">
    <div class="logo">
      <h1>After.Image</h1>
    </div>
    <form @submit.prevent="login()">
      <label for="password">Authentication Required:</label>
      <div class="login-input-wrapper">
        <input type="password" id="password" v-model="password" />
        <button type="submit">Log In</button>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", { pass: this.password });
    },
  },
};
</script>
