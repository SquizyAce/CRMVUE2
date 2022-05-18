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
    <table class="billtable">
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
                  v-model.trim="service[0].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[0].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(1)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[1].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[1].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(2)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[2].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[2].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(3)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[3].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[3].total.toFixed(2)}}&#8381;</label>
         </td>
          <td><input
                  @blur="count(4)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[4].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[4].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(5)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[5].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[5].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(6)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[6].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[6].total.toFixed(2)}}&#8381;</label>
         </td>
          <td><input
                  @blur="count(7)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[7].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[7].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(8)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[8].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[8].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(9)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[9].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[9].total.toFixed(2)}}&#8381;</label>
          </td>
          <td><input
                  @blur="count(10)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[10].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[10].total.toFixed(2)}}&#8381;</label>
         </td>
          <td><input
                  @blur="count(11)"
                  id="price" type="text" class="black-text" autocomplete="off"
                  v-model.trim="service[11].value" style="margin-bottom: 0px;border-bottom-width: 0px;margin-top: 7.5px; "> <label>{{service[11].total.toFixed(2)}}&#8381;</label>
         </td>
        </tr>
        <tr style="font-weight: bold">
          <td>Итоговая сумма</td>
          <td v-for="(payment, index) in payments" :key="payment.id">{{payment.toFixed(2)}}&#8381; <br><a @click.prevent="report(index)" style="cursor: pointer; font-weight: normal">Отчёт</a></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>

<div class="center">
<router-link to="/" class=" waves-effect waves-light btn white-text green ">Обратно</router-link>
<a href="" @click.prevent="onSubmit()" class="waves-effect waves-light btn white-text green">Сохранить</a>
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
      lastYearBill: [],
      payments: [],
      loading: true,
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
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
          switch (ratesForCount[service].nstype) {
            case 'tariff':
              this.payments[serviceId] = parseFloat(this.payments[serviceId] + billForCount[service][serviceId].value * ratesForCount[service].price);  
              this.bill[billForCount[service].id][serviceId].total = parseFloat(billForCount[service][serviceId].value * ratesForCount[service].price);
              break;


            case 'consistent':
              if (serviceId == 0)
            {
              this.payments[serviceId] = parseFloat(this.payments[serviceId] + (billForCount[service][serviceId].value - this.lastYearBill[service]) * ratesForCount[service].price)
              this.bill[billForCount[service].id][serviceId].total = parseFloat((billForCount[service][serviceId].value - this.lastYearBill[service]) * ratesForCount[service].price)
            } else 
            {
              this.payments[serviceId] = parseFloat(this.payments[serviceId] + (billForCount[service][serviceId].value - billForCount[service][serviceId - 1].value) * ratesForCount[service].price)
              this.bill[billForCount[service].id][serviceId].total = parseFloat((billForCount[service][serviceId].value - billForCount[service][serviceId - 1].value) * ratesForCount[service].price)
            }
              break;


            case 'math':
              if (serviceId == 0)
            {
              this.bill[billForCount[service].id][serviceId].value = parseFloat((billForCount[2][serviceId].value - this.lastYearBill[2]) + (billForCount[6][serviceId].value - this.lastYearBill[6]))
              this.payments[serviceId] = parseFloat(this.payments[serviceId] + ((billForCount[2][serviceId].value - this.lastYearBill[2]) + (billForCount[6][serviceId].value - this.lastYearBill[6])) * ratesForCount[service].price)
              this.bill[billForCount[service].id][serviceId].total = parseFloat(((billForCount[2][serviceId].value - this.lastYearBill[2]) + (billForCount[6][serviceId].value - this.lastYearBill[6])) * ratesForCount[service].price)
            } else 
            {
              this.bill[billForCount[service].id][serviceId].value = parseFloat((billForCount[2][serviceId].value - billForCount[2][serviceId - 1].value) + (billForCount[6][serviceId].value - billForCount[6][serviceId - 1].value))
              this.payments[serviceId] = parseFloat(this.payments[serviceId] + ((billForCount[2][serviceId].value - billForCount[2][serviceId - 1].value) + (billForCount[6][serviceId].value - billForCount[6][serviceId - 1].value)) * ratesForCount[service].price)
              this.bill[billForCount[service].id][serviceId].total = parseFloat(((billForCount[2][serviceId].value - billForCount[2][serviceId - 1].value) + (billForCount[6][serviceId].value - billForCount[6][serviceId - 1].value)) * ratesForCount[service].price)
            }
              break;    
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
        console.log(formData)
        await this.$store.dispatch('updateBills', formData)
      },
      report(id){

        let billForCount = Object.keys(this.bill).map(key => ({...this.bill[key], id: key})) 
        let report = ''
        for (let bill in billForCount)
        {
          let a = billForCount[bill].id + ': ' + billForCount[bill][id].total + " руб.\n"
          report = report + a
        }
        report = report + "Итоговая сумма: " + this.payments[id] +" руб."
        console.log(report)

        navigator.clipboard.writeText(report)
          .then(() => {
          })
          .catch(err => {
            console.log('Something went wrong', err);
          });
      }
    }
}
</script>