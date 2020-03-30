const state = {
    title: "Selamat Datang"
};

const actions = {
    setPageTitle({ commit, state }, title) {
        commit("setTitle", title);
    }
};

const mutations = {
    setTitle(state, title) {
        state.title = title + " | Facebook";

        document.title = state.title;
    }
};

const getters = {
    pageTitle: state => {
        return state.title;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
