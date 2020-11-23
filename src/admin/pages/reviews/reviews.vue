<template lang="pug">
  .about-page
    .page-content
      .admin-container.page-content-container
        .header
          .title Блок "Отзывы"
        card(title="Новый отзыв" v-if="addState === true").add-section
          template(slot="content")
            form(@submit.prevent="handleSubmit").form
              .fullfilled
                .left-side
                  div(:class="['avatar-wrapper', {active: form.preview}, {validate: validation.firstError('form.preview')}]",
                    :style="{backgroundImage: `url(${form.preview})`}"
                  )
                    .review-avatar
                      SvgIcon(name="user" className="avatar-icon" v-if="form.preview === ''")
                  app-button(
                    plain
                    title="Добавить фото"
                    typeAttr="file"
                    @change="handleChange"
                  ).button
                .right-side
                  .author-ooc
                    app-input(
                      title="Имя автора"
                      v-model="form.author"
                      :error-message="validation.firstError('form.author')"
                    ).item
                    app-input(
                      title="Титул автора"
                      v-model="form.occ"
                      :error-message="validation.firstError('form.occ')").item
                  .author-text
                    app-input(
                      title="Отзыв"
                      v-model="form.text"
                      field-type="textarea"
                      :error-message="validation.firstError('form.text')").item
              .submit
                .buttons-line
                  app-button(plain title="Отмена" @click="cancel" type=button).cancel-button
                  app-button(title="Отправить")
        ul.cards
          li.card
            card(simple="")
              square-btn(@click="addState = true")
          li(v-for="item in reviews" :key="item.id").card
            card()
              template(slot="title")
                .author-info
                  .card-img
                    avatar(size="5", :src="cover(item.photo)")
                  .card-about
                    .card-author {{item.author}}
                    .card-occ {{item.occ}}
              template(slot="content")
                .card-info
                  .card-text {{item.text}}
                  .card-buttons
                    icon(title="Править" symbol="pencil" @click="editForm(item)")
                    icon(title="Удалить" symbol="cross" @click="deleteWork(item.id)")

</template>

<script>
import appInput from "../../components/input/input";
import appButton from "../../components/button/button.vue";
import Card from "../../components/Card/card";
import SquareBtn from "../../components/button/types/squareBtn/squareBtn";
import Icon from "../../components/icon/icon";
import {mapActions, mapState} from "vuex";
import SvgIcon from "../../components/svgIcon/svgIcon";
import Avatar from "../../components/avatar/avatar";
import {mixin as ValidatorMixin, Validator} from "simple-vue-validator";

export default {
  components: {Avatar, Icon, SquareBtn, Card, appInput, appButton, SvgIcon},
  mixins: [
    ValidatorMixin
  ],
  validators: {
    "form.author": value => {
      return Validator.value(value).required("Введите имя автора")
    },
    "form.occ": value => {
      return Validator.value(value).required("Введите титул автора")
    },
    "form.text": value => {
      return Validator.value(value).required("Введите текст отзыва")
    },
    "form.preview": value => {
      return Validator.value(value).required("Добавьте фото")
    }
  },
  data() {
    return {
      form: {
        author: "",
        occ: "",
        text: "",
        photo: {},
        preview: "",
        isNew: true,
        id: ""
      },
      addState: false
    }
  },
  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    })
  },
  methods: {
    ...mapActions({
      createReviewAction: "reviews/create",
      getReviewsAction: "reviews/get",
      editReviewAction: "reviews/edit",
      removeReviewAction: "reviews/delete",
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
          await this.createReviewAction(this.form);
          this.showTooltip({
            text: "Отзыв добавлен",
            type: "success"
          })
        } else {
          await this.editReviewAction(this.form);
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
    },
    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.form.preview = reader.result;
      }
    },
    async deleteWork(id) {
      await this.removeReviewAction(id);
    },
    editForm(item) {
      this.addState = true;
      this.form.author = item.author;
      this.form.occ = item.occ;
      this.form.text = item.text;
      this.form.photo = "";
      this.form.preview = this.cover(item.photo);
      this.form.isNew = false;
      this.form.id = item.id;
    },
    cancel() {
      this.addState = false;
      this.form.author = "";
      this.form.occ = "";
      this.form.text = "";
      this.form.photo = "";
      this.form.preview = "";
    }
  },
  created() {
    this.getReviewsAction();
  },
}
</script>

<style scoped lang="postcss" src="./reviews.pcss">

</style>