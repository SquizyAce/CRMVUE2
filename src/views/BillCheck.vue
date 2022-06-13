<template>
 <div class="card auth-card"> 
    <div class="card-content">
    <span class="card-title">Квартплата за {{this.today}}</span> 
    <p v-for="(elem, index) in bill.calculation" :key="elem.id">{{index}}: {{bill.calculation[index][month].total}} рублей.</p>
    <p>Квартплата: {{apprice}} рублей.</p>
    <p>Итоговая сумма: {{bill.payment[month]}} рублей.</p>
  </div>
         
  <div class="card-action">
    <div>
      <router-link to="/bill" class="btn waves-effect waves-light auth-submit">Назад<i class="material-icons right">reply_all</i></router-link>
    </div>
  </div>
</div>
</template>
<script>
import dateFilter from '@/filters/date.filter'
export default {
    data: () => ({
        today: dateFilter(new Date, 'today'),
        month: parseInt(dateFilter(new Date, 'fetchMonth')) - 1,
        bill: {
            calculation: {},
            payment: []    
        },
        apartamentId: null,
        apprice: null,
    }),
    created() {
        this.apartamentId = this.$route.params.apartamentId; 
    },
    async mounted() {
        this.bill = await this.$store.dispatch('fetchCalculation', this.apartamentId)
        this.apprice = await this.$store.dispatch('fetchApprice', this.apartamentId)
    }
}
</script>