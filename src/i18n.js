import VueI18n from "vue-i18n"
import Vue from "vue"
import en from "./locales/en"
import tr from "./locales/tr"

Vue.use(VueI18n);

const messages = {
    en,
    tr
  }



export const i18n = new VueI18n({
    locale:"tr",
    messages
})
