<template>
  <div class="login">
    <div class="logo">
      <h1>After.Image</h1>
    </div>
    <form @submit.prevent="login()">
      <label for="password">Authentication Required:</label>
      <div class="login-input-wrapper">
        <input
          :class="{ error: validationError }"
          type="password"
          id="password"
          v-model="password"
        />
        <button :disabled="awaitingResponse" type="submit">Log In</button>
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
      validationError: false,
      awaitingResponse: false,
    };
  },
  methods: {
    login() {
      if (this.password === "") {
        this.validationError = true;
      } else {
        this.validationError = false;
        this.awaitingResponse = true;
        this.$store
          .dispatch("login", { pass: this.password })
          .catch(() => {
            this.validationError = true;
          })
          .finally(() => {
            this.awaitingResponse = false;
          });
      }
    },
  },
};
</script>
