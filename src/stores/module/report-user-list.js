import ReportUserApi from '@/api/ReportUserApi';

const state = {
  reportUserList: [],
};

const mutations = {
  SET_LIST(state, list) {
    state.reportUserList = list;
  },
};

const actions = {
  async fetchReportUserList({ commit, state }) {
    try {
      const response = await ReportUserApi.getReportUserList(state.params);
      commit('SET_LIST', response.data.content);
    } catch (error) {
      throw error;
    }
  },
};

const getters = {
  getReportUserList: (state) => state.reportUserList,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
