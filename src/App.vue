<template>
  <div id="app" :class="screenSize">
    <h2>Выберете город</h2>
    <div>
      <span @click="showModal('moscow')">Москва</span>
      <span @click="showModal('spb')">Санкт-петербург</span>
    </div>
    <BaseModal
      ref="modalRef"
      class="custom-modal modal-metro"
      :class="{
        'view-mobile': screenSize == 'mobile'
      }"
      title="Отметьте станции"
    >
      <div class="modal-wrapper">
        <MetroMap
          v-model="selectStations"
          :aria-selected="[]"
          :data-svg="svgMetro"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script>
import { Map } from './api'

import { mapState } from 'vuex'
import { isMobile } from 'mobile-device-detect'
import MetroMap from './components/MetroMap'
import BaseModal from './components/base/BaseModal'

export default {
  name: 'app',
  components: {
    MetroMap,
    BaseModal
  },
  mounted () {
    if (!window.__PRERENDER_DATA) {
      this.$nextTick(function () {
        window.addEventListener('resize', this.handleWindowResize)
        this.handleWindowResize()
      })
    }
    if (window.__PRERENDER_DATA) {
      this.$store.commit(
        'application/viewPort',
        window.__PRERENDER_DATA.layout
      )
      setTimeout(function () {
        document.dispatchEvent(new Event('app.rendered'))
      }, 3000)
    }
  },
  destroyed () {
    if (!window.__PRERENDER_DATA) {
      window.removeEventListener('resize', this.handleWindowResize)
    }
  },
  methods: {
    showModal (region) {
      let cacheSvg = JSON.parse(
        localStorage.getItem('metro_svg_' + region)
      )

      if (cacheSvg && Date.now() - cacheSvg.timestamp < 84600) {
        this.svgMetro = cacheSvg.metro
        this.$refs.modalRef.show()
      } else {
        Map.getMetroMap(region)
          .then(response => {
            this.svgMetro = response.data
            localStorage.setItem(
              'metro_svg_' + region,
              JSON.stringify({
                metro: this.svgMetro,
                timestamp: Date.now()
              })
            )
            this.$refs.modalRef.show()
          })
          .catch(error => {
            console.log(
              'Ajax error:',
              error
            )
          })
      }
    },
    handleWindowResize () {
      let screenSize = null
      if (window.innerWidth < 768) {
        screenSize = 'mobile'
      } else if (window.innerWidth >= 768) {
        screenSize = isMobile ? 'mobile' : 'desktop'
      }
      this.$store.commit('application/viewPort', screenSize)
    }
  },
  computed: {
    ...mapState({
      screenSize: state => state.application.viewPort
    })
  },
  data () {
    return {
      selectStations: [],
      svgMetro: {}
    }
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
.custom-modal {
  z-index: 210;
  &.modal-metro {
    width: 80vw;
    height: 100vh;
    max-height: calc(100vh - 150px);
    left: 10vw;
    top: 74px;
    transform: none;
    .custom-modal-top {
      padding: 0;
      border-bottom: none;
    }
    .modal-wrapper {
      padding-top: 14px;
      height: calc(100vh - 210px);
    }
    /deep/ .base-modal-body {
      height: calc(100vh - 210px);
      /deep/ .modal-wrapper {
        height: calc(100vh - 210px);
      }
    }
    &.view-mobile {
      left: 0;
      top: 0;
      transform: none;
      /deep/ .base-modal-footer {
        display: none !important;
      }
      /deep/ .base-modal-body {
        height: 100%;
        position: relative;
        z-index: 100;
      }
      /deep/ .modal-wrapper {
        padding: 0;
        height: 100%;
      }
      .metro-map {
        flex-direction: column-reverse;
        /deep/ .metro-map--nav {
          margin-bottom: 0;
          border-top: 1px solid #dee2e6;
          padding: 10px;
          background: #fff;
          position: relative;
          z-index: 10;
          > div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              margin-left: 0;
            }
            &:nth-child(1) {
              display: none;
            }
          }
        }
      }
      /deep/ .map--zoom {
        display: none;
      }
      .select-view-map {
        padding-bottom: 10px;
        margin-bottom: 0;
      }
    }
  }
  &.view-mobile {
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: fixed;
    margin: 0;
    /deep/ .base-modal-header {
      z-index: 300 !important;
    }
    /deep/ .base-modal-footer {
      display: block !important;
      position: fixed;
    }
    /deep/ .modal-wrapper {
      padding-bottom: 64px;
    }
    .custom-modal-top {
      padding-top: 14px;
    }
    .base-modal-footer {
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        .btn {
          margin-left: auto;
          position: relative;
          z-index: 1000;
        }
      }
    }
  }
  .select-view-map {
    display: flex;
    justify-content: center;
    padding-top: 0;
    margin-bottom: 18px;
    button {
      outline-style: none;
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: #444;
      background-color: #fff;
      border: 1px solid #d1d1d1;
      padding: 6px 20px;
      &.active {
        color: #fff;
        background-color: #498bc3;
        border-color: #3671a3;
      }
    }
  }
  .custom-modal-top {
    border-bottom: 1px solid #dee2e6;
    position: sticky;
    top: 50px;
    left: 0;
    right: 0;
    background: #fff;
    padding: 10px;
    z-index: 150;
  }
  .custom-modal-footer {
    border-top: 1px solid #dee2e6;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 10px;
  }
  .modal-wrapper {
    padding: 15px;
  }
  & /deep/ {
    .btn {
      padding: 8px 20px;
    }
  }
}
</style>
