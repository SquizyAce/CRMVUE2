<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2>Редактирование информации</h2>
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label for="name">Имя</label>
              <input
                id="name"
                type="text"
                v-model.trim="userInfo.name"
                :class="{invalid: $v.userInfo.name.$dirty && !$v.userInfo.name.required}"
              >
              <small class="helper-text invalid" v-if="$v.userInfo.name.$dirty && !$v.userInfo.name.required"
              >Введите ваше имя</small>
            </div>
            <div class="form-group">
              <label for="pasno">Номер паспорта</label>
              <input
                id="pasno"
                type="text"
                v-model.trim="userInfo.pasno"
                :class="{invalid: ($v.userInfo.pasno.$dirty && !$v.userInfo.pasno.required) || ($v.userInfo.pasno.$dirty && !$v.userInfo.pasno.minLength) || ($v.userInfo.pasno.$dirty && !$v.userInfo.pasno.maxLength) || ($v.userInfo.pasno.$dirty && !$v.userInfo.pasno.numeric)} " 
                >
                <small class="helper-text invalid"
                v-if="$v.userInfo.pasno.$dirty && !$v.userInfo.pasno.required"
                >Введите номер паспорта</small>
                <small class="helper-text invalid"
                v-else-if="$v.userInfo.pasno.$dirty && !$v.userInfo.pasno.minLength"
                >Номер паспорта должен состоять из {{$v.userInfo.pasno.$params.minLength.min}} символов. Сейчас он {{userInfo.pasno.length}}</small>
                <small class="helper-text invalid"
                v-else-if="$v.userInfo.pasno.$dirty && !$v.userInfo.pasno.maxLength"
                >Номер паспорта должен состоять из {{$v.userInfo.pasno.$params.minLength.min}} символов. Сейчас он {{userInfo.pasno.length}}</small>
                <small class="helper-text invalid"
                v-else-if="$v.userInfo.pasno.$dirty && !$v.userInfo.pasno.numeric"
                >Номер паспорта должен состоять из цифр</small>
                
            </div>
            <label for="email">Email</label>
            <div class="form-group">
              <input
                id="email"
                type="text"
                v-model.trim="userInfo.email"
                :class="{invalid: ($v.userInfo.email.$dirty && !$v.userInfo.email.required) /* email пуст */ || ($v.userInfo.email.$dirty && !$v.userInfo.email.email) /* несоответсвует формату email */ }"
                 >
                 <small 
                 class="helper-text invalid"
                 v-if="$v.userInfo.email.$dirty && !$v.userInfo.email.required"
                 >Поле email не должно быть пустым
                 </small>
                 <small 
                 class="helper-text invalid"
                 v-else-if="$v.userInfo.email.$dirty && !$v.userInfo.email.email"
                 >Введите корректный Email
                 </small>
            </div>
            <router-link 
                  :to="'/tenant'"
                  class="btn waves-effect waves-light blue"
                  style="opacity:.8"
                  >Обратно</router-link
                >
            <button class="btn waves-effect waves-light blue right" type="submit" name="action" style="opacity:.8">Обновить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, maxLength, numeric } from 'vuelidate/lib/validators';
export default {
  data: () => ({
      userId: null,
      userInfo: [],
  }),
  validations: {
    userInfo: {
    email: {email,required},
    pasno: {minLength: minLength(10), maxLength: maxLength(10), required, numeric},
    name: {required},
    }
  },

  methods: {
    async updateUser() {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.userInfo.email,
        password: this.userInfo.pasno,
        name: this.userInfo.name,
        datereg: this.userInfo.datereg,
        userId: this.userId
      }
      try{
      await this.$store.dispatch('editTenant', formData)
      this.$router.push("/tenant");
      } catch(e){}
    },
  },
  created() {
    this.userId = this.$route.params.userId; 
  },
  async mounted() {
    const userId = this.userId
    this.userInfo = await this.$store.dispatch('fetchUser', userId)
  }
};
</script>
