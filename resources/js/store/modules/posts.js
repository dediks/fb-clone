const state = {
    newsPosts: null,
    newsPostsStatus: null,
    postMessage: ""
};

const getters = {
    newsPosts: state => {
        return state.newsPosts;
    },
    postMessage: state => {
        return state.postMessage;
    },
    newsStatus: state => {
        return {
            newsPostsStatus: state.newsPostsStatus
        };
    }
};

const actions = {
    fetchNewsPosts({ commit, state }) {
        commit("setPostsStatus", "loading");

        axios
            .get("/api/posts")
            .then(res => {
                commit("setPosts", res.data);
                commit("setPostsStatus", "success");
            })
            .catch(err => {
                commit("setPostsStatus", "error");
            });
    },
    postMessage({ commit, state }) {
        commit("setPostsStatus", "loading");

        // console.log("HAIII ");

        axios
            .post("/api/posts", { body: state.postMessage })
            .then(res => {
                commit("pushPost", res.data);
                commit("updateMessage", "");
                commit("setPostsStatus", "success");
                // console.log(res.data);
            })
            .catch(err => {
                console.log("Error");
            });
    },
    likePost({ commit, state }, data) {
        axios
            .post("/api/posts/" + data.postId + "/like")
            .then(res => {
                commit("pushLikes", { likes: res.data, postKey: data.postKey });
            })
            .catch(err => {
                console.log("Error");
            });
    }
};

const mutations = {
    setPosts(state, posts) {
        state.newsPosts = posts;
    },
    setPostsStatus(state, status) {
        state.newsPostsStatus = status;
    },
    updateMessage(state, message) {
        state.postMessage = message;
    },
    pushPost(state, post) {
        state.newsPosts.data.unshift(post);
    },
    pushLikes(state, data) {
        state.newsPosts.data[data.postKey].data.attributes.likes = data.likes;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
