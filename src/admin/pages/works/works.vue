<template lang="pug">
  .about-page
    .page-content
      .admin-container.page-content-container
        .header
          .title Блок "Работы"
        card(title="Редактирование работы" v-if="addState === true").add-section
          template(slot="content")
            form(@submit.prevent="handleSubmit").form
              .fullfilled
                .left-side
                  label(
                    :class="['img-area', {active: form.preview}, {hovered: hovered}]"
                    :style="{backgroundImage: `url(${form.preview})`}"
                    @dragover="handleDragover"
                    @dragleave="hovered = false"
                    @drop="handleChange")
                    .info-box
                      div(:class="['text-hint', {active: form.preview}]") Перетащите или загрузите для загрузки изображения
                      app-button(
                        title="Загрузить"
                        typeAttr="file"
                        @change="handleChange"
                        ).button
                .right-side
                  app-input(title="Название" v-model="form.title").item
                  app-input(title="Ссылка" v-model="form.link").item
                  app-input(title="Описание" v-model="form.description" field-type="textarea").item
                  add-tag(v-model="form.techs" with-add=true).item
              .submit
                .buttons-line
                  app-button(plain title="Отмена" @click="addState = false" type=button).cancel-button
                  app-button(title="Отправить")
        ul.cards
          li.card
            card(simple="")
              square-btn(@click="addState = true")
          li(v-for="item in works" :key="item.id").card
            card(simple="")
              .card-img
                img(:src="cover(item.photo)")
                add-tag(v-model="item.techs", with-add=false).card-tags
              .card-info
                .card-title {{item.title}}
                .card-desc {{item.description}}
                .card-link {{item.link}}
                .card-buttons
                  icon(title="Править" symbol="pencil" @click="editForm(item)")
                  icon(title="Удалить" symbol="cross" @click="deleteWork(item.id)")
</template>

<script>
import appInput from "../../components/input/input";
import EditLine from "../../components/editLine/editLine";
import AddTag from "../../components/addTag/addTag";
import appButton from "../../components/button/button.vue";
import Card from "../../components/Card/card";
import SquareBtn from "../../components/button/types/squareBtn/squareBtn";
import Icon from "../../components/icon/icon";
import {mapActions, mapState} from "vuex";
import Tag from "../../components/tag/tag";

export default {
  components: {Tag, Icon, SquareBtn, Card, AddTag, EditLine, appInput, appButton},
  data() {
    return {
      hovered: false,
      form: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
        isNew: true,
        id: ""
      },
      card: {
        id: 1,
        title: "Сайт школы образования",
        description: "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!",
        link: "http://loftschool.ru",
        photo: "./slider-1.jpg",
        techs: ""
      },
      addState: false
    }
  },
  computed: {
    ...mapState("works", {
      works: state => state.works
    })
  },
  methods: {
    ...mapActions({
      createWorkAction: "works/create",
      getWorksAction: "works/get",
      editWorkAction: "works/edit",
      removeWorkAction: "works/delete",
      showTooltip: "tooltips/show"
    }),
    cover(photo) {
      return `https://webdev-api.loftschool.com/${photo}`
    },
    async handleSubmit() {
      try {
        if (this.form.isNew) {
          await this.createWorkAction(this.form);
          this.showTooltip({
            text: "Работа создана",
            type: "success"
          })
        } else {
          await this.editWorkAction(this.form);
          this.showTooltip({
            text: "Работа изменена",
            type: "success"
          })
          this.$router.go();
        }

        this.addState = false;
        this.form.title = "";
        this.form.description = "";
        this.form.link = "";
        this.form.photo = "";
        this.form.preview = "";
        this.form.techs = ""
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error"
        })
      }
    },
    handleChange(event) {
      event.preventDefault();
      const file = event.dataTransfer ? event.dataTransfer.files[0]: event.target.files[0];
      this.form.photo = file;

      this.renderPhoto(file);
      this.hovered = false;
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.form.preview = reader.result;
      }
    },
    handleDragover(e) {
      e.preventDefault();
      this.hovered = true;
    },
    async deleteWork(id) {
      await this.removeWorkAction(id);
    },
    editForm(item) {
      this.addState = true;
      this.form.title = item.title;
      this.form.description = item.description;
      this.form.link = item.link;
      this.form.photo = "";
      this.form.preview = this.cover(item.photo);
      this.form.techs = item.techs;
      this.form.isNew = false;
      this.form.id = item.id;

    }


  },
  created() {
    this.getWorksAction();
  },
}
</script>

<style scoped lang="postcss" src="./works.pcss">

</style>