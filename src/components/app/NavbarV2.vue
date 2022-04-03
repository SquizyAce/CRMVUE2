<template>
  <nav>
    <div class="nav-wrapper blue">
      <a @click.prevent="$emit('click')"><i class="material-icons sidenav-trigger" data-target="slide-out">menu</i></a><a class="date right">{{date | date('datetime')}}</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>

        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data: () => ({ 
    date: new Date(),  // создание переменной времени
    interval: null,
    dropdown: null
  }),
  mounted() { // момент сразу после загрузки всего дерева html
    this.interval = setInterval(() => {      // обновление переменной каждую секунду
      this.date = new Date
    }, 1000)  // создание dropdown списка с помощью плагина метериалайз
  },
  beforeDestroy() {
    clearInterval(this.interval)                  // очистка памяти от даты и списка дропдауна при закрытии страницы
  }
}
</script>

