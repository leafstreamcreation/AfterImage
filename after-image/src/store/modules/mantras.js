// import mantraService from "../../services/mantra";

const module = {
  state: () => ({
    mantras: [],
    currentMantra: "",
  }),
  getters: {},
  mutations: {
    save(state, newMantras) {
      state.mantras = [...newMantras];
    },
  },
};

export default module;
