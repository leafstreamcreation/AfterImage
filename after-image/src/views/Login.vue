<template>
  <div class="login">
    <form @submit.prevent="login()">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button>Log In</button>
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
