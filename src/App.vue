<template>
  <div id="app">
    <component :is="layout">  <!-- передача названия слоя из свойста для отображения на необходимой странице необходимого слоя -->
       <router-view/> 
    </component>
   
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout' // импорт слоёв для свойства
import MainLayout from '@/layouts/MainLayout'
export default {
  metaInfo: {
    title: "Загрузка"
  },
  computed: { // объект
    layout() { // свойство 
      return (this.$route.meta.layout || 'empty') + '-layout' // возврат необходимого слоя для страницы из меты в роуте или при отсутсвие данных в мете возврат слоя empty 
    }                                                         // (-layout необходим для того, чтоб vue понял какое свойство в мете нам необходимо добавляя к мете слово Layout  )
  },
  components: { // регистрация слоёв
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css'; // подключение материалайза css необходимые скрипты для плагинов анимаций и т.д.
@import 'assets/index.css'; // подключение материалайза css
</style>
