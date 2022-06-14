<template>
 <form class="card auth-card" @submit.prevent="onSubmit"> 
    <div class="card-content">
    <span class="card-title">Просмотр кварплаты</span>
    <div class="input-field">
      <input
          id="pasno"
          type="text"
          v-model.trim="pasno"
          :class="{invalid: ($v.pasno.$dirty && !$v.pasno.required) /* email пуст */ || ($v.pasno.$dirty && !$v.pasno.minLength) /* несоответсвует формату email */ }"
      >
      <label for="pasno">Номер паспорта</label>
      <small 
      class="helper-text invalid"
      v-if="$v.pasno.$dirty && !$v.pasno.required"
      >Поле паспорта не должно быть пустым
      </small>
      <small 
      class="helper-text invalid"
      v-else-if="$v.pasno.$dirty && !$v.pasno.minLength"
      >Пароль должен быть длинее {{$v.pasno.$params.minLength.min}} символов. Сейчас он {{pasno.length}}
      </small>
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
    </div>
    <p class="center">
      Вы администратор? 
      <router-link to="/login">Войти!</router-link>
    </p>

  </div>
</form>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
import messages from "@/tools/messages"
export default {
  metaInfo: {
    title: "Просмотр счёта"
  },
  name: 'login',
  data: () => ({
    pasno: '',
    ApartamentId: ''
  }),
  validations: {
    pasno: {required, minLength: minLength(10)}
  },
  mounted() {},
  methods: {
    async onSubmit() {      // описание функции onSubmit $v системная пиременная получаемая из плагина vuelidate
    if (this.$v.$invalid){
      this.$v.$touch()      // активация валидации
      return
    }
    let pasno = this.pasno
    try{
    this.ApartamentId = await this.$store.dispatch('getBill', pasno)
    if (!this.ApartamentId){
    this.$message(messages['apdexist'])}
    else{
    this.$router.push(`/bill/${this.ApartamentId}`)}
    } catch (e) {}
    }
  }
}

</script>