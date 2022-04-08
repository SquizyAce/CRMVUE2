<template>
 <div>
   <Loader v-if="loading"/>
    <div v-else class="container">
      <div class="row">
        <div class="col s8 offset-s2">
         <form>
          <div class="card blue darken-1">
           <div class="card-content white-text">
          <table>
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Тариф</th>
                <th>Система счисления</th> 
                <th>Тип системы счисления</th> 
              </tr>  
            </thead>
            <tbody>
              <tr v-for="rate in rates" :key="rate.id">
                <td>{{rate.name}}</td>
                <input
                  id="price" type="text" class="white-text" autocomplete="off"
                  v-model.trim="rate.price" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
                <td>{{rate.ns}}</td>
                <td><input type="checkbox" v-model.trim="rate.nstype"/><span>Человек - место</span></td>  
              </tr>               
            </tbody>
          </table>
           </div>
          </div><a href="" @click.prevent="onSubmit()" class="waves-effect waves-light btn white-text green col s4 offset-s4">Изменить</a>
         </form>
        </div>
      </div>
    </div>
     <!-- <form @submit.prevent="UpdateUser()">
       <input type="text"
       v-model.trim="name"
       >
       <input type="text"
       v-model.trim="ns"
       >
       <input type="text"
       v-model.trim="price"
       >
       <button class="btn waves-effect waves-light blue right" type="submit" name="action" style="opacity:.8">sohr</button>
     </form> -->
 </div>
</template>

<script>
export default {
  name: 'rate',
data: () => ({
       rates: [],
       name: '',
       price: '',
       ns: '',
       loading: true,
  }),
  methods:{
    async onSubmit() {
      await this.$store.dispatch('updateRates', this.rates)
    },
    // async UpdateUser() {
    //   const formData = {
    //     name: this.name,
    //     price: this.price,
    //     ns: this.ns
    //   }
    //   await this.$store.dispatch('addRate', formData)
    // },
  },
  async mounted() {
    this.rates = await this.$store.dispatch('fetchRates')
    console.log(this.rates)
    this.loading = false
  },
};
</script>
