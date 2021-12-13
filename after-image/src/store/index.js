import { createStore } from "vuex";

import authService from "../services/auth";
import mantraService from "../services/mantra";
import taskService from "../services/task";

export default createStore({
  state: {
    apiSession: null,
    mantras: [],
    currentMantra: "loading",
    tasks: [],
  },
  mutations: {
    saveSession(state, newSession) {
      state.apiSession = newSession;
    },
    saveMantras(state, newMantras) {
      state.mantras = newMantras;
    },
    saveTasks(state, newTasks) {
      state.tasks = newTasks;
    },
    newCurrentMantra(state, newMantra) {
      state.currentMantra = newMantra;
    },
  },
  actions: {
    async login({ commit, dispatch }, { pass }) {
      const { status, data } = await authService.login(pass);
      if (status) commit("saveSession", data.session._id);
      dispatch("load");
    },
    async load({ commit, state }) {
      if (state.apiSession != null) {
        const { status: mantraStatus, data: mantraData } =
          await mantraService.index(state.apiSession);
        if (mantraStatus) commit("saveMantras", mantraData.mantras);
        const { status: taskStatus, data: taskData } = await taskService.index(
          state.apiSession
        );
        if (taskStatus) commit("saveTasks", taskData.tasks);
      }
    },
  },
  modules: {},
});
