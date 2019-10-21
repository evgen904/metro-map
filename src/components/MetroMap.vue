<template>
  <div class="metro-map">
    <h2>Отметьте станции</h2>
    <div class="metro-map--nav">
      <div>
        <SearchStation v-model="idSearch" />
        <SearchLine v-model="idLine" />
      </div>
      <div>
        <span @click="resetStations = !resetStations" v-if="idStations.length">
          очистить все
        </span>
        <button class="apply">
          Выбрать
        </button>
      </div>
    </div>
    <Map :idSearch="idSearch" :resetStations="resetStations" v-model="idStations" :idLine="idLine" />
  </div>
</template>

<script>
import SearchStation from './SearchStation'
import SearchLine from './SearchLine'
import Map from './Map'

export default {
  name: 'MetroMap',
  components: {
    SearchStation,
    SearchLine,
    Map
  },
  data () {
    return {
      idSearch: '',
      idLine: '',
      resetStations: false,
      idStations: []
    }
  }
}
</script>

<style lang="scss" scoped>
.metro-map {
  width: 80vw;
  height: 100vh;
  border: 1px solid #ccc;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 17px;
    padding: 0;
    margin: 0 0 15px;
    font-weight: normal;
  }
  &--nav {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
    > div {
      width: 50%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      &:nth-child(2) {
        align-items: center;
      }
      span {
        cursor: pointer;
        color: #2d6cb4;
        font-size: 13px;
        margin-left: 20px;
        &:hover {
          color: #f51449;
        }
      }
      .apply {
        cursor: pointer;
        padding: 8px 20px;
        margin: 0 0 0 auto;
        color: #fff;
        background-color: #498bc3;
        border: 1px solid #3671a3;
        font-size: 13px;
        border-radius: 3px;
        outline-style: none;
        &:hover {
          color: #fff;
          background-color: #5c97c9;
          border-color: #498bc3;
        }
      }
    }
  }
}
</style>
