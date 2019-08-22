export default {
    state: {
        language: 'en',
        processing: [],
        error: null,
        success_message: null
    },
    mutations: {
        SET_PROCESSING(state, payload) {
            if (state.processing.indexOf(payload) == -1) {
                state.processing.push(payload)
            }
        },
        UNSET_PROCESSING(state, payload) {
            let idx = state.processing.indexOf(payload)
            if (idx != -1) {
                state.processing.splice(idx, 1)
            }
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
        SET_SUCCESS_MESSAGE(state, payload) {
            state.success_message = payload;
        },
        CLEAR_SUCCESS_MESSAGE(state) {
            state.success_message = null;
        }
    },
    actions: {
        SET_PROCESSING({ commit }, payload) {
            commit("SET_PROCESSING", payload);
        },
        UNSET_PROCESSING({ commit }, payload) {
            commit("UNSET_PROCESSING", payload);
        },
        SET_ERROR({ commit }, payload) {
            commit("SET_ERROR", payload);
        },
        CLEAR_MESSAGES({ commit }) {
            commit("CLEAR_ERROR", null);
            commit("CLEAR_SUCCESS_MESSAGE", null);
        },
        SET_SUCCESS_MESSAGE({ commit }, payload) {
            commit("SET_SUCCESS_MESSAGE", payload);
        }
    },
    getters: {
        getProcessing: state => state.processing.length > 0,
        getItemProcessing: state => item => state.processing.indexOf(item) != -1,
        getLanguage: state => state.language,
        getError: state => state.error,
        getSuccessMessage: state => state.success_message
    }
};
