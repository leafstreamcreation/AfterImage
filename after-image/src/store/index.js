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
    pushMantra(state, mantra) {
      state.mantras.push(mantra);
    },
    pushTask(state, task) {
      state.tasks.push(task);
    },
  },
  actions: {
    async login({ commit, dispatch }, { pass }) {
      const { status, data } = await authService.login(pass);
      if (status === 200) {
        commit("saveSession", data.session._id);
        localStorage.deafFeedAIKey = data.session._id;
        dispatch("load");
      }
    },
    async load({ commit, state }) {
      if (state.apiSession != null) {
        const { status: mantraStatus, data: mantraData } =
          await mantraService.index(state.apiSession);
        if (mantraStatus === 200) commit("saveMantras", mantraData.mantras);
        const { status: taskStatus, data: taskData } = await taskService.index(
          state.apiSession
        );
        if (taskStatus === 200) commit("saveTasks", taskData.tasks);
        else if (mantraStatus === 403 || taskStatus === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
    async newMantra({ commit, state }, { mantra }) {
      if (state.apiSession != null) {
        const { status, data } = await mantraService.create(state.apiSession, mantra);
        console.log(data);
        if (status === 200) commit("pushMantra", data);
        else if (status === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
    async newTask({ commit, state }, { task }) {
      if (state.apiSession != null) {
        const { status, data } = await taskService.create(state.apiSession, task);
        if (status === 200) commit("pushTask", data);
        else if (status === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
  },
  modules: {},
});
