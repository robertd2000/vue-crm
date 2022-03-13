<template>
  <div>
    <div class="grey darken-1 empty-layout">
      <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
          <span class="card-title">Домашняя бухгалтерия</span>
          <div class="input-field">
            <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{
                invalid:
                  (v$.email.$dirty && v$.email.required.$invalid) ||
                  (v$.email.$dirty && v$.email.email.$invalid),
              }"
            />
            <label for="email">Email</label>
            <small
              class="helper-text invalid"
              v-if="v$.email.$dirty && v$.email.required.$invalid"
              >Поле Email не должно быть пустым</small
            >
            <small
              class="helper-text invalid"
              v-if="v$.email.$dirty && v$.email.email.$invalid"
              >Введите корректный Email
            </small>
          </div>
          <div class="input-field">
            <input
              id="password"
              type="password"
              v-model.trim="password"
              :class="{
                invalid:
                  (v$.password.$dirty && v$.password.required.$invalid) ||
                  (v$.password.$dirty && v$.password.minLength.$invalid),
              }"
            />
            <label for="password">Пароль</label>

            <small
              v-if="v$.password.$dirty && v$.password.required.$invalid"
              class="helper-text invalid"
              >Введите пароль</small
            >
            <small
              v-if="v$.password.$dirty && v$.password.minLength.$invalid"
              class="helper-text invalid"
              >Длина пароля должна быть не менее
              {{ v$.password.minLength.$params.min }} символов</small
            >
          </div>
        </div>
        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              Войти
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '../utils/messages'

export default {
  name: 'login',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate()
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
