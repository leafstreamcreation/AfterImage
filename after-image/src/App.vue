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
  components: {
    Login,
  },
  data() {
    return {
      mantraShuffler: new Shuffler(),
      intervalId: null,
    };
  },
  computed: {
    loggedOut() {
      return this.$store.state.apiSession === null;
    },
    mantras() {
      return this.$store.state.mantras.map((mantra) => mantra.text);
    },
    currentMantra() {
      return this.$store.state.currentMantra;
    },
  },
  methods: {
    getNextMantra() {
      if (this.mantraShuffler.elements.length === 0)
        this.mantraShuffler = new Shuffler(this.mantras);
      this.$store.commit("newCurrentMantra", this.mantraShuffler.drawNext());
    },
  },
  watch: {
    mantras: function () {
      clearInterval(this.intervalId);
      this.getNextMantra();
      this.intervalId = setInterval(this.getNextMantra, 2000);
    },
  },
  mounted() {
    if (localStorage.deafFeedAIKey) {
      this.$store.commit("saveSession", localStorage.deafFeedAIKey);
      this.$store.dispatch("load");
    }
  },
};

class Shuffler {
  constructor(array) {
    this.elements = array ? [...array] : [];
    let remainingElements = this.elements.length,
      elementToSwap,
      nextElementIndex;

    while (remainingElements > 0) {
      nextElementIndex = Math.floor(Math.random() * remainingElements--);
      elementToSwap = this.elements[remainingElements];
      this.elements[remainingElements] = this.elements[nextElementIndex];
      this.elements[nextElementIndex] = elementToSwap;
    }
  }

  drawNext() {
    return this.elements.pop();
  }
}
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
