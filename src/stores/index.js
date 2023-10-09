/* eslint global-require: 0 */
import Vuex from 'vuex';
import auth from './module/auth';
import evaluateList from "./module/evaluate-list";
import general from "./module/general";

const store = new Vuex.Store({
  modules: {
    auth,
    evaluateList,
    general
  },
  state: {
    selectedDate: ''
  },
  // plugins: [createPersistedState()],

  mutations : {
    SET_LANG (state, payload) {
    },
    setSelectedDate(state, date) {
      state.selectedDate = date;
    }
  },

  actions : {
    setLang({commit}, payload) {
      commit('SET_LANG', payload)
    },
    updateSelectedDate({ commit }, date) {
      commit('setSelectedDate', date);
    }
  },
  getters: {
    getSelectedDate: state => {
      return state.selectedDate;
    }
  }
});

export default store;