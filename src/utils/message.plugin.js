import M from 'materialize-css'

export default {
  install(Vue, option) {
    console.log(option)
    Vue.config.globalProperties.$message = (html) => {
      M.toast({ html })
    }

    Vue.config.globalProperties.$error = (html) => {
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  },
}
