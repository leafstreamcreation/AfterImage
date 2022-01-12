<template>
  <login v-if="loggedOut" />
  <div v-else>
    <div id="nav">
      <router-link to="/tasks">Tasks</router-link> |
      <router-link to="/">Mantras</router-link> |
      <router-link to="/bugs">Bugs</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import localforage from "localforage";
localforage.config({
  name: "afterimage",
  storeName: "locals",
});

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
      this.intervalId = setInterval(this.getNextMantra, 30000);
    },
  },
  async mounted() {
    const sessionKey = await localforage.getItem("deafFeedAIKey");
    if (sessionKey !== null) {
      this.$store.commit("saveSession", sessionKey);
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
