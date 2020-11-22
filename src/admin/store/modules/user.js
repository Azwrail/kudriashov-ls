const user = {
    namespaced: true,
    state: {
        user: []
    },
    mutations: {
        SET_USER: (state, user) => state.user = user,
        CLEAR_USER: state => (state.user = {})
    },
    actions: {
        logout({commit}) {
            localStorage.removeItem("token");
            location.reload();
        },
        login({commit}, user) {
            commit("SET_USER", user);
        }
    },
    getters: {
        userIsLoggedIn: state => {
            const userObj = state.user;
            const userObjIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor;

            return userObjIsEmpty === false;
        }
    }
}

export default user;