<template>
<Loader v-if="loading"/>
   <div v-else class="row">
    <div class="col s2" v-for="apartament in apartaments" :key="apartament.id">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{apartament.name}}</span>
          <p>Квартплата: {{apartament.apprice}} рублей</p>
          <p>Адрес: {{apartament.adr}}</p>
        </div>
        <div class="card-action">
          <a href="#"><router-link 
                  :to="{ path: `/home/${apartament.id}` }"
                  >Открыть</router-link
                ></a>
          <a href="#" @click="deleteApartament(apartament.id)">Удалить</a>
        </div>
      </div>
    </div>
    <div class="fixed-action-btn">
        <a data-target="modal1" class="btn-floating btn-large blue btn modal-trigger"><i class="large material-icons">add</i></a>
    </div>

  <div id="modal1" class="modal">
    <div class="modal-content">
      <h5>Добавление недвижимости</h5>
      <div class="input-field">
        <input 
        type="text"
        id="ApName"
        v-model.trim="name"
        :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="ApName">Название</label>
        <small class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
        >Введите название</small>
      </div>


      <div class="input-field">
        <input 
        type="text"
        id="Apprice"
        v-model.trim="apprice"
        :class="{invalid: $v.apprice.$dirty && !$v.apprice.required  || ($v.apprice.$dirty && !$v.apprice.numeric)}"
        >
        <label for="Apprice">Квартплата</label>
        <small class="helper-text invalid"
        v-if="$v.apprice.$dirty && !$v.apprice.required"
        >Введите квартплату</small>
        <small class="helper-text invalid"
        v-if="$v.apprice.$dirty && !$v.apprice.numeric"
        >Квартплата должна состоять из цифр</small>
      </div>


      <div class="input-field">
        <input 
        type="text"
        id="Adr"
        v-model.trim="adr"
        :class="{invalid: $v.adr.$dirty && !$v.adr.required}"
        >
        <label for="Adr">Адрес</label>
        <small class="helper-text invalid"
        v-if="$v.adr.$dirty && !$v.adr.required"
        >Введите адрес</small>
      </div>
    </div>
      <a href="#!" @click.prevent="addAp()" class="waves-effect waves-light btn white-text green col s12" style="border-radius: 0px;">Добавить</a>
  </div>

  </div>
</template>

<script>
import M from 'materialize-css'
import { required, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'home',
  name: 'tenant',
  data: () => ({
       apartaments: [],
       name: '',
       adr: '',
       apprice: null,
       loading: true,
  }),
  validations: {
    name: {required},
    adr: {required},
    apprice: {required, numeric}
  },
  methods:{
    async deleteApartament(apartamentId) {
      console.log(apartamentId)
      await this.$store.dispatch('deleteApartament', apartamentId)
      this.$router.go();
    },
    async addAp() {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        adr: this.adr,
        name: this.name,  
        apprice: this.apprice  
      }
      await this.$store.dispatch('addApartament', formData)
      this.$router.go();
    }
  },
  async mounted(){
       this.modal = M.Modal.init(document.querySelectorAll('.modal'))
       this.apartaments = await this.$store.dispatch('fetchApartaments')
       console.log(this.apartaments)
       this.loading = false
   },
}
</script>
