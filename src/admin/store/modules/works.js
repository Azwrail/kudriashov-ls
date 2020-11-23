const works = {
    namespaced: true,
    state: {
        works: []
    },
    mutations: {
        SET_WORKS: (state, works) => state.works = works,
        ADD_WORK: (state, work) => state.works.unshift(work),
        EDIT_WORK: (state, workToEdit) => state.works = state.works.filter(
            work =>  {
                if(work.id === workToEdit.id) {
                    return workToEdit
                } else {
                    return work
                }
            }
        ) ,
        REMOVE_WORK: (state, workId) =>
            state.works = state.works.filter(work => work.id !== workId)
    },
    actions: {
        async create({commit}, work) {
            const formData = new FormData();

            Object.keys(work).forEach(item => {
                if (item === "preview") return;
                if (item === "isNew") return;
                if (item === "id") return;
                formData.append(item, work[item]);
            })

            try {
                const {data} = await this.$axios.post("works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                throw new Error('Ошибка создания работы')
            }
        },
        async get({commit}) {
            try {
                const userId = window.localStorage.getItem("userId")
                const {data} = await this.$axios.get("works/" + userId);
                commit("SET_WORKS", data);
            } catch (error) {
                throw new Error(error.response.data.error)
            }
        },
        async edit({commit}, work) {
            const formData = new FormData();

            Object.keys(work).forEach(item => {
                if (item === "preview") return;
                if (item === "isNew") return;
                if (item === "id") return;
                formData.append(item, work[item]);
            });

            try {
                const {data} = await this.$axios.post("works/" + work.id, formData);
                commit("EDIT_WORK", data.work);
            } catch (error) {
                throw new Error(error.response.data.error)
            }
        },
        async delete({commit}, id) {
            try {
                await this.$axios.delete("works/" + id);
                commit("REMOVE_WORK", id);
            } catch (error) {
                throw new Error('Ошибка удаления работы')
            }
        }
    },
    getters: {
    }
}

export default works;