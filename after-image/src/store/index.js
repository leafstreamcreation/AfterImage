import { createStore } from "vuex";

import authService from "../services/auth";
import mantraService from "../services/mantra";
import taskService from "../services/task";
import bugService from "../services/bug";
import regenTaskService from "../services/regenTask";
import commonService from "../services/common";

import localforage from "localforage";

export default createStore({
  state: {
    apiSession: null,
    mantras: [],
    currentMantra: "loading",
    tasks: [],
    bugs: [],
    regenTasks: [],
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
    saveBugs(state, newBugs) {
      state.bugs = newBugs;
    },
    saveRegenTasks(state, newRegenTasks) {
      state.regenTasks = newRegenTasks;
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
    pushRegenTask(state, task) {
      state.regenTasks.push(task);
    },
    pushBug(state, bug) {
      state.bugs.push(bug);
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
    deleteRegenTask(state, id) {
      for (let index = 0; index < state.regenTasks.length; index++) {
        if (state.regenTasks[index]._id === id) {
          state.regenTasks.splice(index, 1);
          break;
        }
      }
    },
  },
  actions: {
    async login({ commit, dispatch }, { pass }) {
      const { status, data } = await authService.login(pass);
      if (status === 200) {
        await localforage
          .setItem("deafFeedAIKey", data.session._id)
          .catch((err) => {
            console.log("Failed to stash session key", err);
          });
        commit("saveSession", data.session._id);
        dispatch("load");
      } else return Promise.reject("login error");
    },
    async load({ commit, state }) {
      if (state.apiSession != null) {
        const { status, data } = await commonService.index(state.apiSession);
        if (status === 200) {
          const { regenTasks, tasks, mantras, bugs } = data;
          commit("saveRegenTasks", regenTasks);
          commit("saveMantras", mantras);
          commit("saveTasks", tasks);
          commit("saveBugs", bugs);
        } else if (status === 403) {
          commit("saveSession", null);
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
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
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
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
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
        }
      }
    },
    async newRegenTask({ commit, state }, { regenTask }) {
      if (state.apiSession != null) {
        const { status, data } = await regenTaskService.create(
          state.apiSession,
          regenTask
        );
        if (status === 200) commit("pushRegenTask", data);
        else if (status === 403) {
          commit("saveSession", null);
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
        }
      }
    },
    async newBug({ commit, state }, { bug }) {
      if (state.apiSession != null) {
        const { status, data } = await bugService.create(state.apiSession, bug);
        if (status === 200) commit("pushBug", data);
        else if (status === 403) {
          commit("saveSession", null);
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
        }
      }
    },
    async deleteMantra({ commit, state }, { id }) {
      if (state.apiSession != null) {
        const { status } = await mantraService.delete(state.apiSession, id);
        if (status === 200) commit("deleteMantra", id);
        else if (status === 403) {
          commit("saveSession", null);
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
        }
      }
    },
    async deleteTask({ commit, state }, { id }) {
      if (state.apiSession != null) {
        const { status } = await taskService.delete(state.apiSession, id);
        if (status === 200) commit("deleteTask", id);
        else if (status === 403) {
          commit("saveSession", null);
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
        }
      }
    },
    async deleteRegenTask({ commit, state }, { id }) {
      if (state.apiSession != null) {
        const { status } = await regenTaskService.delete(state.apiSession, id);
        if (status === 200) commit("deleteRegenTask", id);
        else if (status === 403) {
          commit("saveSession", null);
          localforage.removeItem("deafFeedAIKey").catch((err) => {
            console.log("Failed to remove session key", err);
          });
        }
      }
    },
  },
  modules: {},
});
