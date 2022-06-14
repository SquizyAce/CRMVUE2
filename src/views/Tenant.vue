<template>
<div class="container">
  <Loader v-if="loading"/>
 <div v-else>
  <div class="page-title">
    <h6><b>Cписок квартирантов</b></h6>  
      <a href="#page-2" class="waves-effect waves-light btn white-text blue"><i class="material-icons right" id="page-1" >add_box</i>К Добавлению</a>
  </div>
  <table>
        <thead>
          <tr>
              <th>Имя</th>
              <th>Номер паспорта</th>
              <th>Email</th>
              <th>Дата регистрации</th>
              <th>Квартира</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.pasno}}</td>
            <td>{{user.email}}</td>
            <td>{{user.datereg}}</td>
            <td>{{user.apartament}}</td>
            <td><span class="badge badge-primary badge-pill">
                <router-link 
                  :to="{ path: `/tenant/${user.id}` }"
                  class="waves-effect waves-light btn white-text green"
                  style="opacity:.8"
                  >Изменить</router-link
                >
                <a href="#" data-target="modal1" class="waves-effect waves-light btn white-text red modal-trigger" style="opacity:.8" 
                @click="selectedUser = {name: user.name, pasno: user.pasno, email: user.email, userId: user.id}"
                  >Удалить</a
                >
              </span></td>
          </tr>
        </tbody>
  </table>
  <div class="page-title" style="padding-top: 15px;margin-top: 30px;">
    <h6><b>Добавление квартирантов</b></h6>  
      <a href="#page-1" class="waves-effect waves-light btn white-text blue"><i class="material-icons right" id="page-2">people</i>К Списку</a>
  </div>
  <form @submit.prevent="onSubmit"> 
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name" 
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="name">Имя</label>
      <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required"
      >Введите ваше имя</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="text"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) || ($v.password.$dirty && !$v.password.maxLength || ($v.password.$dirty && !$v.password.numeric))} " 
      >
      <label for="password">Номер паспорта</label>
      <small class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Введите номер паспорта</small>
      <small class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Номер паспорта должен состоять из {{$v.password.$params.minLength.min}} цифр. Сейчас он {{password.length}}</small>
      <small class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.maxLength"
      >Номер паспорта должен состоять из {{$v.password.$params.minLength.min}} цифр. Сейчас он {{password.length}}</small>
      <small class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.numeric"
      >Номер паспорта должен состоять из цифр</small>
    </div>
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

      <label>Квартира</label>
      <select class="browser-default" v-model="currentApartamentId">
        <option value="" disabled selected>Выбирите квартиру (необязательно)</option>
        <option v-for="apartament in apartaments" :key="apartament.id" :value="apartament.id">{{apartament.info.name}}</option>
        <option value="">Отсутсвует</option>
      </select>

  <button class="btn waves-effect waves-light blue right" type="submit" name="action" style="opacity:.8">
    Добавить<i class="material-icons right">add</i>
  </button>
  </form>
  </div>
  <div class="row">
  <div id="modal1" class="modal">
    <div class="modal-content">
      Вы точно хотите удалить следующего пользователя:<br>
      Имя: {{selectedUser.name}}<br>
      Номер паспорта: {{selectedUser.pasno}}<br>
      Email: {{selectedUser.email}}

    </div>
      <a href="#!" @click="deleteUser(selectedUser.userId)" class="waves-effect waves-light btn white-text red col s12" style="border-radius: 0px;">Удалить</a>
  </div>
  </div>
</div>
</template>

<script>
import M from 'materialize-css'
import { required, email, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import dateFilter from '@/filters/date.filter'
export default {
  metaInfo: {
    title: "Квартиранты"
  },
  name: 'tenant',
  data: () => ({
    selectedUser: {},
    users: [],
    apartaments: [],
    loading: true,
    email: '',
    password: '',
    name: '',
    currentApartamentId: "",
    modal: null,
  }),
  validations: {
    email: {email,required},
    password: {minLength: minLength(10), maxLength: maxLength(10), required, numeric},
    name: {required},
  },
  async mounted() {
    this.modal = M.Modal.init(document.querySelectorAll('.modal'))
    this.users = await this.$store.dispatch('fetchUsers')
    this.apartaments = await this.$store.dispatch('fetchApartaments')
    this.loading = false
  },
  methods:{
    async onSubmit() { // добавление в бд
    if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        datereg: dateFilter(new Date, 'datetime'),
        apartament: this.currentApartamentId
      }
      try{
      console.log(formData)
      await this.$store.dispatch('addTenant', formData)
      this.$router.go();
      } catch(e){}
    },
    async deleteUser(userId) {
      console.log(userId)
      await this.$store.dispatch('deleteTenant', userId)
      this.$router.go();
    },
  },
  beforeDestroy(){
     if (this.modal && this.modal.destroy) {
       this.modal.destroy()
     }
   }
};
</script>
