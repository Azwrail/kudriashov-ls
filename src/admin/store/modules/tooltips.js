const tooltips = {
    namespaced: true,
    state: {
        isShown: false,
        text: "",
        type: "success"
    },
    mutations: {
        SET_TOOLTIPE: (state, tooltip) => {
            state.isShown = tooltip.isShown;
            state.text = tooltip.text;
            state.type = tooltip.type;
        }
    },
    actions: {
        show({commit, dispatch}, tooltip) {
            let timeout = null;

            commit("SET_TOOLTIPE", {
                isShown: true,
                text: tooltip.text,
                type: tooltip.type
            })

            if(timeout) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(() => {
                dispatch("hide");
            }, 2000)
        },
        hide({commit}, state) {
            commit("SET_TOOLTIPE", {
                ...state,
                isShown: false
            })
        }
    },
    getters: {
    }
}

export default tooltips;