const state = {
    user: null,
    userStatus: null,
    posts: null,
    postsStatus: null
};

const getters = {
    user: state => {
        return state.user;
    },
    posts: state => {
        return state.posts;
    },
    status: state => {
        return {
            user: state.userStatus,
            posts: state.postsStatus
        };
    },
    friendship: state => {
        return state.user.data.attributes.friendship;
    },
    friendButtonText: (state, getters, rootState) => {
        if (rootState.User.user.data.user_id === getters.user.data.user_id) {
            return "";
        } else if (getters.friendship === null) {
            return "Add Friend";
        } else if (
            getters.friendship.data.attributes.confirmed_at === null &&
            getters.friendship.data.attributes.friend_id !==
                rootState.User.user.data.user_id
        ) {
            return "Pending Friend Request";
        } else if (getters.friendship.data.attributes.confirmed_at !== null) {
            return "";
        }

        return "Accept";
    }
};

const actions = {
    fetchUser({ commit, dispatch, getters }, userId) {
        commit("setUserStatus", "success");

        axios
            .get("/api/users/" + userId)
            .then(res => {
                // console.log(res.data);
                commit("setUser", res.data);
                commit("setUserStatus", "success");
            })
            .catch(err => {
                commit("setUserStatus", "error");
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
    sendFriendRequest({ commit, getters }, friendId) {
        if (getters.friendButtonText !== "Add Friend") {
            return;
        }

        axios
            .post("/api/friend-request", { friend_id: friendId })
            .then(res => {
                commit("setUserFriendship", res.data);
            })
            .catch(err => {
                console.log("Fetching data error");
            });
    },
    acceptFriendRequest({ commit, state }, user_id) {
        axios
            .post("/api/friend-request-response", {
                user_id: user_id,
                status: 1
            })
            .then(res => {
                commit("setUserFriendship", res.data);
            })
            .catch(err => {
                console.log("Fetching data error");
            });
    },
    ignoreFriendRequest({ commit, state }, userId) {
        axios
            .delete("/api/friend-request-response/delete", {
                data: { user_id: userId }
            })
            .then(res => {
                commit("setUserFriendship", null);
            })
            .catch(err => {
                console.log("Fetching data error");
            });
    }
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setPosts(state, posts) {
        state.posts = posts;
    },
    setUserFriendship(state, friendship) {
        state.user.data.attributes.friendship = friendship;
    },
    setUserStatus(state, status) {
        state.userStatus = status;
    },
    setPostsStatus(state, status) {
        state.postsStatus = status;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
