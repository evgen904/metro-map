<template>
  <div id="app">
    <MetroMap />
  </div>
</template>

<script>
import MetroMap from './components/MetroMap'

export default {
  name: 'app',
  components: {
    MetroMap
  }
}
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
}
body {
  background: #f0f0f0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
