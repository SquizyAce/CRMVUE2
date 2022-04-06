<template>
<Loader v-if="loading"/>
<div v-else class="container">
  <div class="row">
    <div>
   <ul class="pagination center">
    <li class="disabled"><a href="#!" @click.prevent="refresh()"><router-link :to="{ path: `/home/${apartamentId}/${year.prev}`}"><i class="material-icons">chevron_left</i></router-link></a></li>
    <li class="waves-effect"><a href="#!" @click.prevent="refresh()"><router-link :to="{ path: `/home/${apartamentId}/${year.prev}`}">{{year.prev}}</router-link></a></li>
    <li class="active blue"><a href="#!">{{year.today}}</a></li>
    <li class="waves-effect"><a href="#!" @click.prevent="refresh()"><router-link :to="{ path: `/home/${apartamentId}/${year.next}` }">{{year.next}}</router-link></a></li>
    <li class="waves-effect"><a href="#!" @click.prevent="refresh()"><router-link :to="{ path: `/home/${apartamentId}/${year.next}` }"><i class="material-icons">chevron_right</i></router-link></a></li>
  </ul>
    </div>
    <table>
      <thead>
        <tr>
          <th>Услуга</th>
          <th v-for="month in months" :key="month.id">{{month}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in bill" :key="service.id">
          <td>{{index}}</td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[0]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[1]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[2]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[3]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[4]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[5]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[6]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[7]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[8]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[9]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[10]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          <td><input
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[11]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          
          
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
    data: () => ({ 
      year: {
        next: null,
        today: null,
        prev: null,
      },
      apartamentId: null,
      rates: [],
      bill: [],
      loading: true,
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    }),
    created(){
      this.year.today = Number(this.$route.params.year);
      this.year.next =  (this.year.today+1);
      this.year.prev =  (this.year.today-1);
      this.apartamentId = this.$route.params.apartamentId;
      console.log(this.year.today)
    },
    async mounted(){
      const formData = {
        year: this.year.today,
        apartamentId: this.apartamentId
      }
      this.bill = await this.$store.dispatch('fetchBill', formData)
      this.rates = await this.$store.dispatch('fetchRates')
      console.log(this.bill)
      this.loading = false
    },
    methods: {
      refresh(){
        this.$router.go()
      }
    }
}
</script>