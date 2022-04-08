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
                  @blur="count(0)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[0]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(1)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[1]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(2)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[2]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(3)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[3]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          <td><input
                  @blur="count(4)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[4]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(5)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[5]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(6)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[6]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          <td><input
                  @blur="count(7)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[7]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(8)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[8]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(9)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[9]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
          </td>
          <td><input
                  @blur="count(10)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[10]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
          <td><input
                  @blur="count(11)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[11]" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; ">
         </td>
        </tr>
        <tr style="font-weight: bold">
          <td>Итоговая сумма</td>
          <td v-for="payment in payments" :key="payment.id">{{payment}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <a href="" @click.prevent="onSubmit()" class="waves-effect waves-light btn white-text green right">Сохранить</a>
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
      lastYearBill: [],
      payments: [],
      loading: true,
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    }),
    created(){
      this.year.today = Number(this.$route.params.year);
      this.year.next =  (this.year.today+1);
      this.year.prev =  (this.year.today-1);
      this.apartamentId = this.$route.params.apartamentId;
    },
    async mounted(){
      const formData = {
        year: this.year.today,
        apartamentId: this.apartamentId
      }
      this.bill = await this.$store.dispatch('fetchBill', formData)
      this.lastYearBill = await this.$store.dispatch('lastBill', formData)
      this.payments = await this.$store.dispatch('fetchPayment', formData)
      this.rates = await this.$store.dispatch('fetchRates')
      this.loading = false
      console.log(this.lastYearBill)
    },
    methods: {
      refresh(){
        this.$router.go()
      },
      count(serviceId){
        this.payments[serviceId] = 0
        let ratesForCount = Object.keys(this.rates).map(key => ({...this.rates[key], id: key})) // общий вид
        let billForCount = Object.keys(this.bill).map(key => ({...this.bill[key], id: key})) 
        for (let service in billForCount)
        {
          if (ratesForCount[service].nstype == true)
          {
            this.payments[serviceId] = Number(this.payments[serviceId] + billForCount[service][serviceId] * ratesForCount[service].price)  
          } else
          {
            if (serviceId == 0)
            {
              this.payments[serviceId] = Number(this.payments[serviceId] + (billForCount[service][serviceId] - this.lastYearBill[service]) * ratesForCount[service].price)
            } else 
            {
              this.payments[serviceId] = Number(this.payments[serviceId] + (billForCount[service][serviceId] - billForCount[service][serviceId - 1]) * ratesForCount[service].price)
            }
          }
        }
      },
      async onSubmit() {
        const formData = {
          year: this.year.today,
          apartamentId: this.apartamentId,
          billsCol: this.bill,
          paymentsCol: this.payments
        }
        await this.$store.dispatch('updateBills', formData)
      },
    }
}
</script>