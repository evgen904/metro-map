<template>
  <div class="map">
    <div class="map--svg" ref="metroMapWr">
      <div
        class="map--svg-metro"
        ref="metroMap"
        v-html="svg"
      ></div>
    </div>
    <div class="map--zoom">
      <button @click="mapZoom('in')" :disabled="stepZoom == 4">+</button>
      <button @click="mapZoom('out')" :disabled="stepZoom == 0">-</button>
    </div>
    <div class="map--id-stations" v-if="idStations.stations.length">
      <h2>Выбрано станций: {{ idStations.stations.length }}</h2>
      <ul>
        <li v-for="item in idStations.stations" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MetroMap from './../utils/MetroMap'

export default {
  name: 'Map',
  props: {
    svg: {
      type: String
    },
    stations: {
      type: Object
    },
    idSearch: {
      type: String
    },
    idLine: {
      type: Object
    },
    resetStations: {
      type: Boolean
    }
  },
  mounted () {
    // выбор элемента

    if (this.metroMap.$el.querySelector('#scheme-layer-stations')) {
      this.metroMap.$el.querySelector('#scheme-layer-stations').addEventListener('click', (event) => {
        let idStation = event.target.getAttribute('id').split('-')[1]
        let lineId = this.metroMap.findLineStations(idStation)
        this.metroMap.addSelectStations(idStation)
        this.metroMap.selectLine(lineId)
        this.metroMap.opacitySvg()

        this.idStations = this.metroMap.findSelectStation()
      })

      this.metroMap.$el.querySelector('#scheme-layer-labels').addEventListener('click', (event) => {
        let idLabel = event.target.parentElement.getAttribute('id').split('-')[1]
        let idStation = this.metroMap.findLabel(idLabel)
        this.metroMap.addSelectStations(idStation.stations)
        this.metroMap.selectLine(idStation.lineId)
        this.metroMap.opacitySvg()

        this.idStations = this.metroMap.findSelectStation()
      })

      this.metroMap.$el.querySelector('#scheme-layer-links').addEventListener('click', (event) => {
        let idLink = event.target.getAttribute('id').split('-')[1]
        let selectLink = this.metroMap.findLineLinks(idLink)

        this.metroMap.selectLine(selectLink, 'links')
        this.metroMap.opacitySvg()

        this.idStations = this.metroMap.findSelectStation()
      })

      // удаление элемента
      this.metroMap.$el.querySelector('#highlight-layer-stations').addEventListener('click', (event) => {
        let idStation = event.target.getAttribute('id').split('-')[1]
        let lineId = this.metroMap.findLineStations(idStation)
        this.metroMap.removeStation(idStation, lineId)
        this.metroMap.opacitySvg()

        this.idStations = this.metroMap.findSelectStation()
      })

      this.metroMap.$el.querySelector('#highlight-layer-labels').addEventListener('click', (event) => {
        let idLabel = event.target.parentElement.getAttribute('id').split('-')[1]
        let idStation = this.metroMap.findLabel(idLabel)

        this.metroMap.removeStation(idStation.stations, idStation.lineId)
        this.metroMap.opacitySvg()

        this.idStations = this.metroMap.findSelectStation()
      })

      this.metroMap.$el.querySelector('#highlight-layer-links').addEventListener('click', (event) => {
        let idLink = event.target.getAttribute('id').split('-')[1]
        let selectLink = this.metroMap.findLineLinks(idLink)

        let arrayLinks = this.metroMap.findLinks(selectLink)
        this.metroMap.removeLink(arrayLinks, selectLink)
        this.metroMap.opacitySvg()

        this.idStations = this.metroMap.findSelectStation()
      })

      this.setupHandlers(this.metroMap.$el)
    }
  },
  methods: {
    mapDown (event) {
      this.positionMap = [
        event.pageX - this.$refs.metroMap.getBoundingClientRect().left,
        event.pageY - this.$refs.metroMap.getBoundingClientRect().top
      ]
      if (event.touches === undefined) {
        document.addEventListener('mousemove', this.mapMove)
        document.addEventListener('mouseup', this.mapUp)
      } else {
        document.addEventListener('touchmove', this.mapMove)
        document.addEventListener('touchend', this.mapUp)
      }
    },
    mapMove (event) {
      let thisPosX = (event.pageX - this.positionMap[0]) - this.$refs.metroMapWr.getBoundingClientRect().left
      let thisPosY = (event.pageY - this.positionMap[1]) - this.$refs.metroMapWr.getBoundingClientRect().top
      this.$refs.metroMap.style.transform = `translate3d(${thisPosX}px, ${thisPosY}px, 0px)`
    },
    mapUp (event) {
      document.removeEventListener('mousemove', this.mapMove)
      setTimeout(() => {
        document.removeEventListener('mouseup', this.mapUp)
        document.removeEventListener('mousedown', this.mapDown)
      })
    },
    onScroll (event) {
      if (event.deltaY <= -1) {
        this.mapZoom('in')
      } else if (event.deltaY >= 1) {
        this.mapZoom('out')
      }
    },
    mapZoom (val) {
      if (val === 'in' && this.stepZoom < 4) {
        this.stepZoom++
      }
      if (val === 'out' && this.stepZoom !== 0) {
        this.stepZoom--
      }
    },

    // SVGPan library 1.2.1 --- start
    setupHandlers (root) {
      root.addEventListener('mousedown', this.handleMouseDown)
      root.addEventListener('mouseup', this.handleMouseUp)
      root.addEventListener('mousemove', this.handleMouseMove)

      if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0) { root.addEventListener('mousewheel', this.handleMouseWheel, false) } // Chrome/Safari
      else { root.addEventListener('DOMMouseScroll', this.handleMouseWheel, false) } // Others
    },

    getEventPoint (evt) {
      let p = this.metroMap.$el.createSVGPoint()
      p.x = evt.clientX - this.metroMap.$el.getBoundingClientRect().left
      p.y = evt.clientY - this.metroMap.$el.getBoundingClientRect().top
      return p
    },
    setCTM (element, matrix) {
      let s = 'matrix(' + matrix.a + ',' + matrix.b + ',' + matrix.c + ',' + matrix.d + ',' + matrix.e + ',' + matrix.f + ')'
      element.setAttribute('transform', s)
    },
    handleMouseWheel (evt) {
      if (!this.optionsSvg.enableZoom) { return }
/*
      if (evt.deltaY <= -1 && this.optionsSvg.zoom < 5) {
        this.optionsSvg.zoom++
      }
      if (event.deltaY >= 1 && this.optionsSvg.zoom !== 1) {
        this.optionsSvg.zoom--
      }

      if (this.optionsSvg.zoom == 5 || this.optionsSvg.zoom == 0) {
        return false;
      }

      console.log(this.optionsSvg.zoom);*/

      if (evt.preventDefault) { evt.preventDefault() }

      evt.returnValue = false

      // evt.wheelDelta / 3600; --- Chrome/Safari
      // evt.detail / -90; --- Mozilla
      let delta = (evt.wheelDelta) ? evt.wheelDelta / 3600 : evt.detail / -90

      let z = 1 + delta * 12 // Zoom factor: 0.9/1.1

      let g = this.metroMap.$el.querySelector('#transform-wrapper')
      let p = this.getEventPoint(evt)
      p = p.matrixTransform(g.getCTM().inverse())
      // Compute new scale matrix in current mouse position
      let k = this.metroMap.$el.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y)
      this.setCTM(g, g.getCTM().multiply(k))
      if (typeof (this.optionsSvg.stateTf) === 'undefined') { this.optionsSvg.stateTf = g.getCTM().inverse() }
      this.optionsSvg.stateTf = this.optionsSvg.stateTf.multiply(k.inverse())
    },

    handleMouseMove (evt) {
      if (evt.preventDefault) { evt.preventDefault() }

      evt.returnValue = false
      let g = this.metroMap.$el.querySelector('#transform-wrapper')

      if (this.optionsSvg.state == 'pan' && this.optionsSvg.enablePan) {
        // Pan mode
        let p = this.getEventPoint(evt).matrixTransform(this.optionsSvg.stateTf)

        this.setCTM(g, this.optionsSvg.stateTf.inverse().translate(p.x - this.optionsSvg.stateOrigin.x, p.y - this.optionsSvg.stateOrigin.y))
      } else if (this.optionsSvg.state == 'drag' && this.optionsSvg.enableDrag) {
        // Drag mode
        let p = this.getEventPoint(evt).matrixTransform(g.getCTM().inverse())

        this.setCTM(this.optionsSvg.stateTarget, this.metroMap.$el.createSVGMatrix().translate(p.x - this.optionsSvg.stateOrigin.x, p.y - this.optionsSvg.stateOrigin.y).multiply(g.getCTM().inverse()).multiply(this.optionsSvg.stateTarget.getCTM()))

        this.optionsSvg.stateOrigin = p
      }
    },
    handleMouseDown (evt) {
      if (evt.preventDefault) { evt.preventDefault() }

      evt.returnValue = false
      let g = this.metroMap.$el.querySelector('#transform-wrapper')

      if (
        evt.target.tagName == 'svg' ||
        !this.optionsSvg.enableDrag // Pan anyway when drag is disabled and the user clicked on an element
      ) {
        // Pan mode
        this.optionsSvg.state = 'pan'
        this.optionsSvg.stateTf = g.getCTM().inverse()
        this.optionsSvg.stateOrigin = this.getEventPoint(evt).matrixTransform(this.optionsSvg.stateTf)
      } else {
        // Drag mode
        this.optionsSvg.state = 'drag'
        this.optionsSvg.stateTarget = evt.target
        this.optionsSvg.stateTf = g.getCTM().inverse()
        this.optionsSvg.stateOrigin = this.getEventPoint(evt).matrixTransform(this.optionsSvg.stateTf)
      }
    },
    handleMouseUp (evt) {
      if (evt.preventDefault) { evt.preventDefault() }

      evt.returnValue = false
      if (this.optionsSvg.state == 'pan' || this.optionsSvg.state == 'drag') {
        // Quit pan mode
        this.optionsSvg.state = ''
      }
    }

    // SVGPan library 1.2.1 --- end
  },
  watch: {
    idSearch (val) {
      let lineId = this.metroMap.findLineStations(val)
      this.metroMap.addSelectStations(val)
      this.metroMap.selectLine(lineId)
      this.metroMap.opacitySvg()
      this.idStations = this.metroMap.findSelectStation()
    },
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
    resetStations () {
      this.metroMap.removeAll()
      this.idStations = this.metroMap.findSelectStation()
    },
    idStations (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    metroMap () {
      let lineIdArray = []
      for (let prop in this.stations) {
        lineIdArray.push(this.stations[prop]['lineId'])
      }
      let lineIdArraySort = lineIdArray.filter((elem, index, self) => {
        return index === self.indexOf(elem)
      })

      let linksNewWr = []
      for (let item of lineIdArraySort) {
        let linksNew = {}
        for (let prop in this.stations) {
          if (this.stations[prop]['lineId'] === item) {
            linksNew[prop] = this.stations[prop]
          }
        }
        linksNewWr.push({
          linkId: item,
          stations: linksNew
        })
      }

      const metroMap = new MetroMap({
        selector: this.$refs.metroMap.querySelector('svg'),
        stations: linksNewWr
      })
      return metroMap
    }
  },
  data () {
    return {
      optionsSvg: {
        enablePan: 1,
        enableZoom: 1,
        zoom: 0,
        enableDrag: 0,
        state: 'none',
        stateTarget: undefined,
        stateOrigin: undefined,
        stateTf: undefined
      },
      idStations: {
        link: [],
        stations: []
      },
      stepZoom: 0,
      positionMap: [0, 0]
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
    overflow: hidden;
    height: 100%;
    user-select: none;
    position: relative;
    /deep/ svg {
      width: 100%;
      height: 100%;
    }
    &-metro {
      height: 100%;
      /*position: absolute;
      top: 0;
      left: 0;
      z-index: 10;*/
    }
  }
  &--zoom {
    position: absolute;
    left: 10px;
    bottom: 10px;
    border: 2px solid rgba(0,0,0,0.2);
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
  &--id-stations {
    width: 190px;
    max-height: 200px;
    overflow: auto;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    color: #ffffff;
    font-size: 12px;
    background-color: rgba(73,139,195,0.5);
    h2 {
      padding: 10px 15px;
      font-size: 14px;
      font-weight: normal;
      margin: 0;
      position: sticky;
      top: 0;
      background: rgba(73,139,195,0.8);
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        padding: 4px 15px;
      }
    }
  }
}
</style>
