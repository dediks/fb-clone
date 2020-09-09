const state = {
    posts: null,
    newsPostsStatus: null,
    postMessage: ""
};

const getters = {
    posts: state => {
        return state.posts;
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
    fetchUserPosts({ commit, dispatch, getters }, userId) {
        commit("setPostsStatus", "loading");

        axios
            .get("/api/users/" + userId + "/posts")
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
    },
    commentPost({ commit, state }, data) {
        axios
            .post("/api/posts/" + data.postId + "/comment", { body: data.body })
            .then(res => {
                commit("pushComments", {
                    comments: res.data,
                    postKey: data.postKey
                });
            })
            .catch(err => {
                console.log("Error");
            });
    }
};

const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPostsStatus(state, status) {
        state.newsPostsStatus = status;
    },
    updateMessage(state, message) {
        state.postMessage = message;
    },
    pushPost(state, post) {
        state.posts.data.unshift(post);
    },
    pushLikes(state, data) {
        state.posts.data[data.postKey].data.attributes.likes = data.likes;
    },
    pushComments(state, data) {
        state.posts.data[data.postKey].data.attributes.comments = data.comments;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
