<template>
  <v-app class="app">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style scoped>
.app{font-family: 'Rajdhani', sans-serif;}
</style>

