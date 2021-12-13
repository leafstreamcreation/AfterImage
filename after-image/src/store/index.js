import { createStore } from "vuex";

const authService = require("../services/auth");
const mantraService = require("../services/mantra");
const taskService = require("../services/task");

export default createStore({
  state: {
    apiSession: null,
    mantras: [],
    currentMantra: "",
    tasks: [],
  },
  mutations: {
    saveSession(state, newSession) {
      state.apiSession = newSession;
    },
    saveMantras(state, newMantras) {
      state.mantras = [...newMantras];
    },
    saveTasks(state, newTasks) {
      state.tasks = [...newTasks];
    },
  },
  actions: {
    async login({ commit }, { pass }) {
      const { status, data } = await authService.default.login(pass);
      if (status) commit("saveSession", data._id);
    },
    async loadMantras({ commit, state }) {
      if (state.apiSession != null) {
        const { status, data } = await mantraService.default.index(state.apiSession);
        if (status) commit("saveMantras", data);
      }
    },
    async loadTasks({ commit, state }) {
      if (state.apiSession != null) {
        const { status, data } = await taskService.default.index(state.apiSession);
        if (status) commit("saveTasks", data);
      }
    },
  },
  modules: {},
});
