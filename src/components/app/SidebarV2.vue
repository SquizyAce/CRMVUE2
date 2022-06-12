<template>
    <ul id="slide-out" class="sidenav">
    <li><div class="user-view" style="padding-top:0px;margin-bottom: 0px;">
      <div class="background blue">
      </div>
      <a href="#name"><span class="white-text name" style="margin-top:0px;padding-top: 8px;">{{name}}</span></a>
      <a href="#email"><span class="white-text email" style="padding-bottom: 8px;">Администратор</span></a>
    </div></li>
    <li><router-link  
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
      >     
        <a href="#" class="waves-effect waves-orange pointer"><i class="material-icons">{{link.icon}}</i>{{link.name}}</a>
      </router-link></li>
    <li><div class="divider"></div></li>
    <li><a @click.prevent="logout" class="waves-effect sidenav-close" href="#!"><i class="material-icons">assignment_return</i>Выйти</a></li>
  </ul>
</template>

<script>
import M from 'materialize-css'
export default {
   mounted(){
       this.sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'))
   },
   computed: {
    name() {
      return this.$store.getters.info.name
    },
  },
  methods: {
    async logout(){
    await this.$store.dispatch('logout')
    this.$router.push('/login?message=logout')
    }
  },
   props: ['value'], // props принимает значения v-model
   data: () => ({
    links: [
      {name: 'Квартиры', url: '/',icon: "home", exact: true},
      {name: 'Тарифы', url: '/rate', icon: "book"},
      {name: 'Квартиранты', url: '/tenant', icon: "people"},
    ]
  })
}
</script>