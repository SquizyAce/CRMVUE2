<template>
 <div class="app-main-layout"> 

   <Navbar/> <!-- @ прослушка события из Навбара -> Navbar.vue -->

   <Sidebar/>

    <main class="app-content full">
    <div class="app-page">
        <router-view />
    </div>
</main>
 </div>
</template>

<script>
import Navbar from '@/components/app/NavbarV2'  // регистрируем в лайауте нав и бок панель, которые вынесенны отдельно
import Sidebar from '@/components/app/SidebarV2'
import messages from "@/tools/messages"
export default {
  name: 'main-layout',
  async mounted(){
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar, Sidebar
  },
  computed: {
        error(){
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            this.$error(messages[fbError.code]) // проверка на регистрации 
        }
    }
}
</script>