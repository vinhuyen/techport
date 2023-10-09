import EvaluateAdminApi from "@/api/EvaluateAdminApi";

const state = {
    listEvaluateAdmin: {},
    paramsForAdmin: {
        "size": 5,
        "sort": "",
        "quarter": "",
        "page": 0,
        "direction": "",
        "year": "",
        "userName": '',
        "status": "",
        "isAdmin": true
    },
    resultDataDisplay: [],
    adminDetailId: ""
}

const mutations = {
    SET_RESULT_DISPLAY(state, list) {
        state.resultDataDisplay = list.content
    },
    SET_LIST_ADMIN(state, list) {
        state.listEvaluateAdmin = list
    }
}

const actions = {
    setParamsForAdmin: ({ state }, params) => {
        state.paramsForAdmin = params
    },
    async fetchListEvaluateAdmin({ commit, state, dispatch }) {
        try {
            const res = await EvaluateAdminApi.getListEvaluate(state.paramsForAdmin)
            commit("SET_LIST_ADMIN", res.data)
            dispatch("setResultDisplay");
        } catch (e) {
            console.warn(e);
        }
    },
    setResultDisplay({ commit, state }) {
        commit("SET_RESULT_DISPLAY", state.listEvaluateAdmin)
    },
    setAdminDetailId({state}, params) {
        state.adminDetailId = params
    }
}

const getters = {
    getResultsDisplay: (state) => state.resultDataDisplay,
    getListEvaluateAdmin: (state) => state.listEvaluateAdmin,
    getAdminDetailId: (state) => state.adminDetailId
}

const evaluateList = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default evaluateList
