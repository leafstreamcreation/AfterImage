<template>
  <login v-if="loggedOut" />
  <div v-else>
    <div id="nav">
      <router-link to="/intentions">Intentions</router-link> |
      <router-link to="/">Mantras</router-link> |
      <router-link to="/bugs">Bugs</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Login from "./views/Login.vue";

export default {
  computed: {
    loggedOut() {
      return this.$store.state.apiSession === null;
    },
  },
  components: {
    Login,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
