<template>
  <div class="mantra-viewer">
    <h1>{{ currentMantra }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "MantraViewer",
  components: {},
  props: {
    mantras: Array,
  },
  data() {
    return {
      currentMantra: this.mantras[0],
      shuffler: null,
      intervalId: null,
    };
  },
  mounted() {
    this.shuffler = new Shuffler(this.mantras);
    this.currentMantra = this.shuffler.drawNext();
    this.intervalId = setInterval(this.getNextMantra, 1000 * 60 * 15);
  },
  unmounted() {
    clearInterval(this.intervalId);
  },
  methods: {
    getNextMantra() {
      if (this.shuffler.elements.length === 0)
        this.shuffler = new Shuffler(this.mantras);
      this.currentMantra = this.shuffler.drawNext();
    },
  },
};

class Shuffler {
  constructor(array) {
    this.elements = [...array];
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
