<template>
 <form class="card auth-card" @submit.prevent="onSubmit"> <!-- приминение функции onSubmit на закрытие формы -->
    <div class="card-content">
    <span class="card-title">Бухгалтерерия учёта</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) /* email пуст */ || ($v.email.$dirty && !$v.email.email) /* несоответсвует формату email */ }"
      >
      <label for="email">Email</label>
      <small 
      class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >Поле email не должно быть пустым
      </small>
      <small 
      class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Введите корректный Email
      </small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) /* пароль пуст */ || ($v.password.$dirty && !$v.password.minLength)} /* пароль меньше мин.символов */" 
      >
      <label for="password">Пароль</label>
      <small class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Введите пароль</small>
      <small class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Пароль должен быть длинее {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
    </div>
  </div>
  <div class="card-action">
    <div>     <!-- кнопка вызывающие закрытие формы типа sumbit -->
      <button                             
          class="btn waves-effect waves-light auth-submit"
          type="submit"    
      >
        Войти
        <i class="material-icons right">send</i>
      </button>
      <p class="center">
      Вы квартирант? 
      <router-link to="/bill">Войти!</router-link>
    </p>
    </div>
  </div>
</form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import messages from "@/tools/messages"

export default {
  metaInfo: {
    title: "Авторизация"
  },
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if (messages[this.$route.query.message]){ // проверка есть ли в пути ключ для вывода сообщения
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit() {      // описание функции onSubmit $v системная пиременная получаемая из плагина vuelidate
    if (this.$v.$invalid){
      this.$v.$touch()      // активация валидации
      return
    }
    const formData = { // дата для бэкэнда
      email: this.email,
      password: this.password
    }
    try{
      await this.$store.dispatch('login', formData)
    this.$router.push('/')
    } catch (e) {}
       
    }
  }
}

</script>