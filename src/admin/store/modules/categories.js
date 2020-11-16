const categories = {
    namespaced: true,
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => state.categories = categories,
        ADD_CATEGORY: (state, category) => state.categories.unshift(category),
        REMOVE_CATEGORY: (state, categoryId) =>
            state.categories = state.categories.filter(category => category.id !== categoryId),
        ADD_SKILL: (state, skill) => {
            state.categories = state.categories.map(category => {
                if(category.id === skill.category) {
                    if (typeof category.skills == 'undefined') {
                        category.skills = [];
                    }
                    category.skills.push(skill)
                }
                return category;
            })
        },
        REMOVE_SKILL: (state, skillToRemove) => {
            state.categories = state.categories.map(category => {
                if (category.id === skillToRemove.category) {
                    category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id);
                }
                return category;
            });
        },
        EDIT_SKILL: (state, skillToEdit) => {
            state.categories = state.categories.map(category => {
                if (category.id === skillToEdit.category) {
                    category.skills = category.skills.map(skill => {
                        return skill.id === skillToEdit.id ? skillToEdit: skill
                    });
                }
                return category;
            });
        }
    },
    actions: {
        async create({commit}, title) {
            try {
                const {data} = await this.$axios.post("categories", { title });
                commit("ADD_CATEGORY", data);
            } catch (error) {
                throw new Error('Ошибка создания категории')
            }
        },
        async get({commit}) {
            try {
                const userId = window.localStorage.getItem("userId")
                console.log(userId);
                const {data} = await this.$axios.get("categories/" + userId);
                commit("SET_CATEGORIES", data);
            } catch (error) {
                console.log(error.response.data)
            }
        },
        async edit({commit}, category) {
            try {
                const {data} = await this.$axios.post("categories/" + category.id, {title: category.title});
            } catch (error) {

            }
        },
        async delete({commit}, id) {
            try {
                await this.$axios.delete("categories/" + id);
                commit("REMOVE_CATEGORY", id);
            } catch (error) {

            }
        }
    },
    getters: {
    }
}

export default categories;