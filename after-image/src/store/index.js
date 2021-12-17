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
    deleteMantra(state, id) {
      for (let index = 0; index < state.mantras.length; index++) {
        if (state.mantras[index]._id === id) {
          state.mantras.splice(index, 1);
          break;
        }
      }
    },
    deleteTask(state, id) {
      for (let index = 0; index < state.tasks.length; index++) {
        if (state.tasks[index]._id === id) {
          state.tasks.splice(index, 1);
          break;
        }
      }
    },
  },
  actions: {
    login({ commit, dispatch }, { pass }) {
      const { status, data } = authService.login(pass);
      if (status === 200) {
        commit("saveSession", data.session._id);
        localStorage.deafFeedAIKey = data.session._id;
        dispatch("load");
      } else return Promise.reject("login error");
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
        const { status, data } = await mantraService.create(
          state.apiSession,
          mantra
        );
        if (status === 200) commit("pushMantra", data);
        else if (status === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
    async newTask({ commit, state }, { task }) {
      if (state.apiSession != null) {
        const { status, data } = await taskService.create(
          state.apiSession,
          task
        );
        if (status === 200) commit("pushTask", data);
        else if (status === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
    async deleteMantra({ commit, state }, { id }) {
      if (state.apiSession != null) {
        const { status } = await mantraService.delete(state.apiSession, id);
        if (status === 200) commit("deleteMantra", id);
        else if (status === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
    async deleteTask({ commit, state }, { id }) {
      if (state.apiSession != null) {
        const { status } = await taskService.delete(state.apiSession, id);
        if (status === 200) commit("deleteTask", id);
        else if (status === 403) {
          commit("saveSession", null);
          delete localStorage.deafFeedAIKey;
        }
      }
    },
  },
  modules: {},
});
