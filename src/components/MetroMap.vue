<template>
  <div class="metro-map">
    <h2>Отметьте станции</h2>
    <div class="metro-map--nav">
      <SearchStation />
      <SearchLine />
      <button class="apply">
        Выбрать
      </button>
    </div>
    <Map />
  </div>
</template>

<script>
import SearchStation from './SearchStation'
import SearchLine from './SearchLine'
import Map from './Map'

export default {
  name: "Metro map",
  components: {
    SearchStation,
    SearchLine,
    Map
  }
}
</script>

<style lang="scss" scoped>
.metro-map {
  width: 80vw;
  border: 1px solid #ccc;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  h2 {
    font-size: 17px;
    padding: 0;
    margin: 0;
    font-weight: normal;
  }
  &--nav {
    display: flex;
    .apply {
      margin-left: auto;
    }
  }
}
</style>
