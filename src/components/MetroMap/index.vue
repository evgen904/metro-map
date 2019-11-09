<template>
  <div class="metro-map">
    <div class="metro-map--nav">
      <div>
        <SearchStation v-model="idSearch" :stations="dataSvg.data.stations" />
        <SearchLine
          v-model="idLine"
          :select="idStations"
          :lines="dataSvg.data.lines"
        />
      </div>
      <div>
        <span
          v-if="idStations.stations.length"
          @click="resetStations = !resetStations"
        >
          очистить все
        </span>
        <button @click="apply" class="apply">
          Выбрать
        </button>
      </div>
    </div>
    <Map
      v-model="idStations"
      :id-search="idSearch"
      :reset-stations="resetStations"
      :id-line="idLine"
      :svg="dataSvg.svg"
      :stations="dataSvg.data.stations"
      :select-stations="selectStations"
    />
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
  props: {
    ariaSelected: {
      type: Array
    },
    dataSvg: {
      type: Object
    }
  },
  data () {
    return {
      metroDistance: 4000,
      idSearch: '',
      idLine: null,
      resetStations: false,
      idStations: {
        link: [],
        stations: []
      },
      selectStations: []
    }
  },
  created () {
    if (this.ariaSelected.length) {
      this.selectStations = this.ariaSelected
    }
  },
  methods: {
    apply () {
      if (this.idStations.stations.length) {
        this.idStations.stations.push(this.metroDistance)
        this.$emit('input', this.idStations.stations)
      } else {
        this.$emit('input', [])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .metro-map {
    display: flex;
    flex-direction: column;
    height: 100%;
    &--nav {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 10px;
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
          padding: 5px 20px;
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
