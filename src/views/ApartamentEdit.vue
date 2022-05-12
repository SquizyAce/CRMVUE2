<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2>Редактирование информации</h2>
          <form @submit.prevent="updateApartament">
            <div class="form-group">
              <label for="name">Название</label>
              <input
                id="name"
                type="text"
                v-model.trim="apartamentInfo.name"
                :class="{invalid: $v.apartamentInfo.name.$dirty && !$v.apartamentInfo.name.required}"
              >
              <small class="helper-text invalid" v-if="$v.apartamentInfo.name.$dirty && !$v.apartamentInfo.name.required"
              >Введите название</small>
            </div>
            <label for="apprice">Квартплата</label>
            <div class="form-group">
              <input
                id="apprice"
                type="text"
                v-model.trim="apartamentInfo.apprice"
                :class="{invalid: ($v.apartamentInfo.apprice.$dirty && !$v.apartamentInfo.apprice.required) || ($v.apartamentInfo.adr.$dirty && !$v.apartamentInfo.adr.numeric)}"
                 >
                 <small 
                 class="helper-text invalid"
                 v-if="$v.apartamentInfo.apprice.$dirty && !$v.apartamentInfo.apprice.required"
                 >Поле кварплаты не должно быть пустым
                 </small>
                 <small class="helper-text invalid"
                 v-else-if="$v.apartamentInfo.adr.$dirty && !$v.apartamentInfo.adr.numeric"
                 >Номер Квартплата должен состоять из цифр</small>
            </div>
            <div class="form-group">
              <label for="adr">Адрес</label>
              <input
                id="adr"
                type="text"
                v-model.trim="apartamentInfo.adr"
                :class="{invalid: ($v.apartamentInfo.adr.$dirty && !$v.apartamentInfo.adr.required)} " 
                >
                <small class="helper-text invalid"
                v-if="$v.apartamentInfo.adr.$dirty && !$v.apartamentInfo.adr.required"
                >Введите адрес</small>
                
            </div>
            <router-link 
                  :to="'/'"
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
import { required, numeric } from 'vuelidate/lib/validators';
export default {
  data: () => ({
      apartamentId: null,
      apartamentInfo: [],
  }),
  validations: {
    apartamentInfo: {
    adr: {required},
    apprice: {required, numeric},
    name: {required},
    }
  },

  methods: {
    async updateApartament() {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.apartamentInfo.name,
        adr: this.apartamentInfo.adr,
        apprice: this.apartamentInfo.apprice,
        apartamentId: this.apartamentId
      }
      try{
      await this.$store.dispatch('editApartament', formData)
      this.$router.push("/");
      } catch(e){}
    },
  },
  created() {
    this.apartamentId = this.$route.params.apartamentId; 
  },
  async mounted() {
    const apartamentId = this.apartamentId
    this.apartamentInfo = await this.$store.dispatch('fetchApartament', apartamentId)
  }
};
</script>
