const skills = {
    namespaced: true,
    state: {
        skills: []
    },
    mutations: {

    },
    actions: {
        async create({commit}, skill) {
            try {
                const {data} = await this.$axios.post("skills", skill);
                commit("categories/ADD_SKILL", data, {root: true});
            } catch (error) {
                throw new Error('Ошибка создания скила')
            }
        },
        async get({commit}) {
            try {
                const {data} = await this.$axios.get("categories");
                commit("SET_CATEGORIES", data);
            } catch (error) {
                console.log(error.response.data)
            }
        },
        async delete({commit}, skill) {
            try {
                await this.$axios.delete("skills/" + skill.id)
                commit("categories/REMOVE_SKILL", skill, {root: true});
            } catch (error) {
                throw new Error('Ошибка удаления скила')
            }
        },
        async edit({commit}, skill) {
            try {
                await this.$axios.post("skills/" + skill.id, skill);
                commit("categories/EDIT_SKILL", skill, {root: true});
            } catch (error) {
                throw new Error('Ошибка редактирования скила')
            }
        }
    },
    getters: {
    }
}

export default skills;