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
                    :class="['img-area', {active: form.preview}, {hovered: hovered},  {validate: validation.firstError('form.preview')}]"
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
                  app-input(
                    title="Название"
                    v-model="form.title"
                    :error-message="validation.firstError('form.title')"
                  ).item
                  app-input(
                    title="Ссылка"
                    v-model="form.link"
                    :error-message="validation.firstError('form.link')").item
                  app-input(
                    title="Описание"
                    v-model="form.description"
                    field-type="textarea"
                    :error-message="validation.firstError('form.description')").item
                  add-tag(
                    v-model="form.techs"
                    with-add=true
                    :error="validation.firstError('form.techs')").item
              .submit
                .buttons-line
                  app-button(plain title="Отмена" @click="cancel" type=button).cancel-button
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
import { Validator, mixin as ValidatorMixin} from "simple-vue-validator"

export default {
  components: {Tag, Icon, SquareBtn, Card, AddTag, EditLine, appInput, appButton},
  mixins: [
    ValidatorMixin
  ],
  validators: {
    "form.title": value => {
      return Validator.value(value).required("Введите заголовок")
    },
    "form.link": value => {
      return Validator.value(value).required("Укажите ссылку")
    },
    "form.description": value => {
      return Validator.value(value).required("Введите описание")
    },
    "form.techs": value => {
      return Validator.value(value).required("Добавьте тэг (и)")
    },
    "form.preview": value => {
      return Validator.value(value).required("Добавьте фото")
    }
  },
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
      if (await this.$validate() === false) {
        if (this.validation.firstError('form.preview')) {
          this.showTooltip({
            text: this.validation.firstError('form.preview'),
            type: "error"
          })
        }
        return;
      }
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

        this.cancel();
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

    },
    cancel() {
      this.addState = false;
      this.form.title = "";
      this.form.description = "";
      this.form.link = "";
      this.form.photo = "";
      this.form.preview = "";
      this.form.techs = ""
    }
  },
  created() {
    this.getWorksAction();
  },
}
</script>

<style scoped lang="postcss" src="./works.pcss">

</style>