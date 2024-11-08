<template>
  <div id="app" class="w-full">
    <Home/>
  </div>
</template>

<script>
import Home from './components/views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  @apply relative;
}
dialog::backdrop {
    background-color: #82828280;
}
</style>
                                                                                                                                                                                                                                                                                                                                                           