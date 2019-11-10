<template>
  <div class="map">
    <div
      ref="metroMapWr"
      class="map--svg"
      :class="{ 'view-mobile': viewPort == 'mobile' }"
    >
      <panZoom
        :options="{ minZoom: 1, maxZoom: 3, bounds: true, zoomSpeed: 0.3 }"
        selector="#transform-wrapper"
        @init="onInit"
      >
        <div ref="metroMap" class="map--svg-metro" v-html="svg"></div>
      </panZoom>
    </div>
    <div class="map--zoom">
      <button @click="mapZoom('in')">+</button>
      <button @click="mapZoom('out')">-</button>
    </div>
    <div class="map--select" :class="viewPort" v-if="idStations.stations.length">
      <h2>Выбранные станции</h2>
      <ul>
        <li v-for="(item, index) in idStations.stations" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// полифил для ie11 - Array.from
// Production steps of ECMA-262, Edition 6, 22.1.2.1
import Vue from 'vue'
import panZoom from 'vue-panzoom'
import MetroMap from './../../utils/MetroMap'
import { mapState } from 'vuex'

if (!Array.from) {
  Array.from = (function () {
    let toStr = Object.prototype.toString
    let isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
    }
    let toInteger = function (value) {
      let number = Number(value)
      if (isNaN(number)) {
        return 0
      }
      if (number === 0 || !isFinite(number)) {
        return number
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }
    let maxSafeInteger = Math.pow(2, 53) - 1
    let toLength = function (value) {
      let len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    // The length property of the from method is 1.
    return function from (arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      let C = this

      // 2. Let items be ToObject(arrayLike).
      let items = Object(arrayLike)

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        )
      }

      // 4. If mapfn is undefined, then let mapping be false.
      let mapFn = arguments.length > 1 ? arguments[1] : void undefined
      let T
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            'Array.from: when provided, the second argument must be a function'
          )
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      let len = toLength(items.length)

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      let A = isCallable(C) ? Object(new C(len)) : new Array(len)

      // 16. Let k be 0.
      let k = 0
      // 17. Repeat, while k < len… (also steps a - h)
      let kValue
      while (k < len) {
        kValue = items[k]
        if (mapFn) {
          A[k] =
              typeof T === 'undefined'
                ? mapFn(kValue, k)
                : mapFn.call(T, kValue, k)
        } else {
          A[k] = kValue
        }
        k += 1
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len
      // 20. Return A.
      return A
    }
  })()
}
Vue.use(panZoom)

export default {
  name: 'Map',
  props: {
    svg: {
      type: String
    },
    stations: {
      type: Object,
      default: {}
    },
    idSearch: {
      type: String
    },
    idLine: {
      type: Object
    },
    resetStations: {
      type: Boolean
    },
    selectStations: {
      type: Array
    }
  },
  data () {
    return {
      moveMap: false,
      panZoomElem: null,
      idStations: {
        link: [],
        stations: []
      }
    }
  },
  computed: {
    ...mapState('application', ['viewPort']),
    metroMap () {
      let lineIdArray = []
      for (let item in this.stations) {
        lineIdArray.push(this.stations[item]['lineId'])
      }
      let lineIdArraySort = lineIdArray.filter((elem, index, self) => {
        return index === self.indexOf(elem)
      })

      let stationsArray = []
      for (let item of lineIdArraySort) {
        let stations = {}
        for (let i in this.stations) {
          if (this.stations[i]['lineId'] === item) {
            stations[i] = this.stations[i]
          }
        }
        stationsArray.push({
          linkId: item,
          stations: stations
        })
      }

      const metroMap = new MetroMap({
        selector: this.$refs.metroMap.querySelector('svg'),
        stations: stationsArray
      })
      return metroMap
    }
  },
  watch: {
    // поиск по input
    idSearch (val) {
      let lineId = this.metroMap.findLineStations(val)
      this.metroMap.addSelectStations(val)
      this.metroMap.selectLine(lineId)
      this.metroMap.opacitySvg()
      this.idStations = this.metroMap.findSelectStation()
    },
    // поиск по выпадающему списку линий
    idLine (val) {
      if (val.selected) {
        this.metroMap.addLink(val)
        let arrayLinks = this.metroMap.findLinks(val.val)
        this.metroMap.cloneLinks(arrayLinks)
      } else {
        let arrayLinks = this.metroMap.findLinks(val.val)
        this.metroMap.removeLink(arrayLinks, val.val)
      }

      this.metroMap.opacitySvg()
      this.idStations = this.metroMap.findSelectStation()
    },
    // удалить все выбранные станции
    resetStations () {
      this.metroMap.removeAll()
      this.idStations = this.metroMap.findSelectStation()
    },
    // $emit выбранные станции
    idStations (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    onInit (panzoomInstance) {
      this.panZoomElem = panzoomInstance

      // выбор элемента
      if (this.metroMap.$el.querySelector('#scheme-layer-stations')) {
        let eventListener = this.viewPort === 'mobile' ? 'touchstart' : 'click'
        let timeoutClick = this.viewPort === 'mobile' ? 150 : 10

        this.metroMap.$el
          .querySelector('#scheme-layer-stations')
          .addEventListener(eventListener, event => {
            setTimeout(() => {
              if (!this.moveMap) {
                let idStation = event.target.getAttribute('id').split('-')[1]
                let lineId = this.metroMap.findLineStations(idStation)
                this.metroMap.addSelectStations(idStation)
                this.metroMap.selectLine(lineId)
                this.metroMap.opacitySvg()

                this.idStations = this.metroMap.findSelectStation()
              }
            }, timeoutClick)
          })

        this.metroMap.$el
          .querySelector('#scheme-layer-labels')
          .addEventListener(eventListener, event => {
            setTimeout(() => {
              if (!this.moveMap) {
                let el = event.target.parentNode
                if (el.getAttribute('id') === null) {
                  el = event.target.parentNode.parentNode
                }
                let idLabel = el.getAttribute('id').split('-')[1]
                let idStationArray = this.metroMap.findLabels(idLabel, this.metroMap.stations)
                if (idStationArray) {
                  for (let item of idStationArray) {
                    this.metroMap.addSelectStations(item.stations)
                    this.metroMap.selectLine(item.lineId)
                  }
                  this.metroMap.opacitySvg()
                  this.idStations = this.metroMap.findSelectStation()
                }
              }
            }, timeoutClick)
          })

        this.metroMap.$el
          .querySelector('#scheme-layer-links')
          .addEventListener(eventListener, event => {
            setTimeout(() => {
              if (!this.moveMap) {
                let idLink = event.target.getAttribute('id').split('-')[1]
                let selectLink = this.metroMap.findLineLinks(idLink)

                this.metroMap.selectLine(selectLink, 'links')
                this.metroMap.opacitySvg()

                this.idStations = this.metroMap.findSelectStation()
              }
            }, timeoutClick)
          })

        // удаление элемента
        this.metroMap.$el
          .querySelector('#highlight-layer-stations')
          .addEventListener(eventListener, event => {
            setTimeout(() => {
              if (!this.moveMap) {
                let idStation = event.target.getAttribute('id').split('-')[1]
                let lineId = this.metroMap.findLineStations(idStation)
                let lebelId = this.metroMap.findLabel(idStation)
                let idStationArray = this.metroMap.findLabels(lebelId, this.metroMap.stationsSelect)
                this.metroMap.removeStation(idStation, lineId, idStationArray.length)
                this.metroMap.opacitySvg()

                this.idStations = this.metroMap.findSelectStation()
              }
            }, timeoutClick)
          })

        this.metroMap.$el
          .querySelector('#highlight-layer-labels')
          .addEventListener(eventListener, event => {
            setTimeout(() => {
              if (!this.moveMap) {
                let el = event.target.parentNode
                if (el.getAttribute('id') === null) {
                  el = event.target.parentNode.parentNode
                }
                let idLabel = el.getAttribute('id').split('-')[1]
                let idStationArray = this.metroMap.findLabels(idLabel, this.metroMap.stations)

                if (idStationArray) {
                  for (let item of idStationArray) {
                    this.metroMap.removeStation(
                      item.stations,
                      item.lineId
                    )
                  }
                  this.metroMap.opacitySvg()

                  this.idStations = this.metroMap.findSelectStation()
                }
              }
            }, timeoutClick)
          })

        this.metroMap.$el
          .querySelector('#highlight-layer-links')
          .addEventListener(eventListener, event => {
            setTimeout(() => {
              if (!this.moveMap) {
                let idLink = event.target.getAttribute('id').split('-')[1]
                let selectLink = this.metroMap.findLineLinks(idLink)

                let arrayLinks = this.metroMap.findLinks(selectLink)
                this.metroMap.removeLink(arrayLinks, selectLink)
                this.metroMap.opacitySvg()

                this.idStations = this.metroMap.findSelectStation()
              }
            }, timeoutClick)
          })

        if (this.selectStations.length) {
          for (let item of this.selectStations) {
            this.metroMap.addSelectStations(String(item))
            let lineId = this.metroMap.findLineStations(String(item))
            this.metroMap.selectLine(lineId)
            this.metroMap.opacitySvg()
          }
          this.idStations = this.metroMap.findSelectStation()
        }

        // изначально карту делаем по центру
        let posSvgX =
            (this.metroMap.$el.getBoundingClientRect().width -
              this.metroMap.$el
                .querySelector('#transform-wrapper')
                .getBoundingClientRect().width) /
            2 -
            this.$refs.metroMap.getBoundingClientRect().left
        let posSvgY =
            (this.metroMap.$el.getBoundingClientRect().height -
              this.metroMap.$el
                .querySelector('#transform-wrapper')
                .getBoundingClientRect().height) /
            2 +
            this.$refs.metroMap.getBoundingClientRect().top / 2
        this.panZoomElem.moveTo(posSvgX, posSvgY)
      }

      // не выделяем станции при перемещении карты
      panzoomInstance.on('panstart', () => {
        this.moveMap = true
      })
      panzoomInstance.on('panend', () => {
        setTimeout(() => {
          this.moveMap = false
        }, 150)
      })
    },
    mapZoom (val) {
      let posSvgX =
          (this.metroMap.$el.getBoundingClientRect().width -
            this.metroMap.$el
              .querySelector('#transform-wrapper')
              .getBoundingClientRect().width) /
          2 +
          170
      let posSvgY =
          (this.metroMap.$el.getBoundingClientRect().height -
            this.metroMap.$el
              .querySelector('#transform-wrapper')
              .getBoundingClientRect().height) /
          2 +
          170

      if (val === 'in') {
        this.panZoomElem.smoothZoom(posSvgX, posSvgY, 1.25)
      } else if (val === 'out') {
        this.panZoomElem.smoothZoom(posSvgX, posSvgY, 0.8)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .map {
    position: relative;
    flex: auto;
    overflow: hidden;
    &--svg {
      cursor: pointer;
      overflow: hidden;
      height: 100%;
      user-select: none;
      position: relative;
      /deep/ svg {
        position: absolute;
        top: -168px;
        height: calc(100vh - 100px);
        left: calc(-10vw - 15px);
        right: calc(-10vw - 15px);
        width: 120vw;
        &:focus {
          outline-style: none;
        }
        #scheme-layer {
          transition: all 0.3s ease;
        }
      }
      &.view-mobile {
        /deep/ svg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
        }
      }
      &-metro {
        height: 100%;
      }
    }
    &--zoom {
      position: absolute;
      left: 10px;
      bottom: 10px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      overflow: hidden;
      z-index: 100;
      button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        outline-style: none;
        border: none;
        background: #fff;
        padding: 0;
        margin: 0;
        width: 30px;
        height: 30px;
        font-weight: bold;
        font-size: 20px;
        &:first-child {
          border-bottom: 1px solid #ccc;
        }
        &:hover {
          background: #f4f4f4;
        }
        &:disabled {
          background: #f4f4f4;
        }
      }
    }
    &--select {
      width: 200px;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 10;
      overflow: auto;
      max-height: 300px;
      background: rgba(35, 145, 187, 0.7);
      color: #ffffff;
      h2 {
        padding: 10px;
        margin: 0;
        font-size: 14px;
        position: sticky;
        top: 0;
        width: 100%;
        background: #2391bb;
      }
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        font-size: 12px;
        font-weight: bold;
        li {
          padding: 4px 10px;
        }
      }
      &.mobile {
        width: 90px;
        max-height: 150px;
        h2 {
          font-size: 11px;
        }
        ul {
          li {
            font-weight: normal;
            font-size: 11px;
            padding: 2px 10px;
          }
        }
      }
    }
  }
</style>
