<template>
  <div class="about-page">
    <div class="page-content">
      <div class="admin-container page-content-container">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-btn
              type="iconed"
              @click="emptyBlank = true"
              title="Добавить группу"
              v-if="emptyBlank === false">
          </iconed-btn>
        </div>
        <ul class="blanks">
          <li class="item" v-if="emptyBlank">
            <blank
                empty
                @cancel="emptyBlank = false"
                @createCategory="createCategory">
            </blank>
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <blank
                :empty="empty"
                :title="category.category"
                :skills="category.skills"
                @createSkill="createNewSkill($event, category.id)"
                @removeSkill="deleteSkill"
                @editSkill="editSkill($event, category.id)"
                @editCategory="editCategory($event, category.id)"
                @removeCategory="removeCategory(category.id)"/>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import Blank from "../../components/blank/blank";
import IconedBtn from "../../components/button/types/iconedBtn/iconedBtn";
import {mapActions, mapState} from "vuex";

export default {
  components: {Blank, IconedBtn},
  data() {
    return {
      emptyBlank: false,
      empty: false
    }
  },
  computed: {
    ...mapState("categories", {
        categories: state => state.categories
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      getCategoriesAction: "categories/get",
      editCategoryAction: "categories/edit",
      removeCategoryAction: "categories/delete",
      createSkillAction: "skills/create",
      deleteSkillAction: "skills/delete",
      editSkillAction: "skills/edit",
      showTooltip: "tooltips/show"
    }),
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyBlank = false;
        this.showTooltip({
          text: "Категория создана",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async createNewSkill(newSkill, category) {
      try {
        await this.createSkillAction({
          ...newSkill,
          category
        })
        this.showTooltip({
          text: "Скилл добавлен",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async deleteSkill(skill) {
      try {
        await this.deleteSkillAction(skill);
        this.showTooltip({
          text: "Скилл удален",
          type: "success"
        })
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    async editSkill(skill, category) {
      try {
        await this.editSkillAction(
            {
              title: skill.title,
              percent: skill.percent,
              category,
              id: skill.id
            }
        );
        this.showTooltip({
          text: "Скилл изменен",
          type: "success"
        });
        skill.editmode = false;
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }

    },
    async editCategory(title, categoryId) {
      try {
        await this.editCategoryAction({
          id: categoryId,
          title
        });
        this.showTooltip({
          text: "Категория изменена",
          type: "success"
        });
        this.$router.go()
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }
    },
    async removeCategory(categoryId) {
      try {
        await this.removeCategoryAction(categoryId)
        this.emptyBlank = false;
        this.showTooltip({
          text: "Категория удалена",
          type: "success"
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        });
      }

    }
  },
  created() {
    this.getCategoriesAction();
  },
  beforeCreate() {
    if (window.localStorage.getItem("token") === null) {
      this.$router.replace("/login");
    }
  }
}
</script>

<style scoped lang="postcss" src="./about.pcss">

</style>