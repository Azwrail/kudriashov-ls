const reviews = {
    namespaced: true,
    state: {
        reviews: []
    },
    mutations: {
        SET_REVIEWS: (state, reviews) => state.reviews = reviews,
        ADD_REVIEW: (state, review) => state.reviews.unshift(review),
        EDIT_REVIEW: (state, reviewToEdit) => state.reviews = state.reviews.filter(
            review =>  {
                if(review.id === reviewToEdit.id) {
                    return reviewToEdit
                } else {
                    return review
                }
            }
        ) ,
        REMOVE_REVIEW: (state, reviewId) =>
            state.reviews = state.reviews.filter(review => review.id !== reviewId)
    },
    actions: {
        async create({commit}, review) {
            const formData = new FormData();

            Object.keys(review).forEach(item => {
                if (item === "preview") return;
                if (item === "isNew") return;
                if (item === "id") return;
                formData.append(item, review[item]);
            })

            try {
                const {data} = await this.$axios.post("reviews", formData);
                console.log(data)
                commit("ADD_REVIEW", data);
            } catch (error) {
                throw new Error('Ошибка создания отзыва')
            }
        },
        async get({commit}) {
            try {
                const userId = window.localStorage.getItem("userId")
                console.log(userId)
                const {data} = await this.$axios.get("reviews/" + userId);
                console.log(data);
                commit("SET_REVIEWS", data);
            } catch (error) {
                throw new Error(error.response.data.error)
            }
        },
        async edit({commit}, review) {
            const formData = new FormData();

            Object.keys(review).forEach(item => {
                if (item === "preview") return;
                if (item === "isNew") return;
                if (item === "id") return;
                formData.append(item, review[item]);
            });

            try {
                const {data} = await this.$axios.post("reviews/" + review.id, formData);
                commit("EDIT_WORK", data.review);
            } catch (error) {
                throw new Error('Ошибка редактирования отзыва')
            }
        },
        async delete({commit}, id) {
            try {
                await this.$axios.delete("reviews/" + id);
                commit("REMOVE_REVIEW", id);
            } catch (error) {
                throw new Error('Ошибка удаления отзыва')
            }
        }
    },
    getters: {
    }
}

export default reviews;