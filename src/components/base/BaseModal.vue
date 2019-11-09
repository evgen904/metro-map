<template>
  <transition name="base-modal--fade">
    <div v-if="visible" class="base-modal">
      <div class="base-modal-header">
        <div class="base-modal-close" @click="close()"></div>
        {{ title }}
      </div>
      <div
        v-if="!!this.$slots['head'] || !!this.$scopedSlots['head']"
        class="base-modal-head"
      >
        <slot name="head"></slot>
      </div>
      <div class="base-modal-body">
        <slot></slot>
      </div>
      <div
        v-if="!!this.$slots['footer'] || !!this.$scopedSlots['footer']"
        class="base-modal-footer"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      viewPort: state => state.application.viewPort
    })
  },
  data () {
    return {
      visible: false
    }
  },
  beforeDestroy () {
    // Возвращаем скрол в случае скрытия модалки путем выгрузки компонента
    document.body.style.overflow = ''
  },
  methods: {
    show () {
      this.visible = true
      document.body.style.overflow = 'hidden'
    },
    close () {
      this.visible = false
      document.body.style.overflow = ''
    },
    toggle () {
      this.visible = !this.visible
    }
  }
}
</script>
<style lang="scss" scoped>
  .base-modal--fade-enter-active,
  .base-modal--fade-leave-active {
    transform: translateX(0%);
    transition: transform 0.35s ease;
  }
  .base-modal--fade-enter,
  .base-modal--fade-leave-to {
    transform: translateX(100%);
  }
  .base-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    overflow: auto;

    -webkit-overflow-scrolling: touch;

    background-color: white;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    &-header {
      height: 50px;
      text-align: center;
      font-size: 17px;
      line-height: 50px;
      background-color: #444444;
      color: white;
      position: sticky;
      top: 0;
      z-index: 201;
    }
    &-top {
      border-bottom: 1px solid #dee2e6;
      position: sticky;
      top: 50px;
      left: 0;
      right: 0;
      background: #fff;
      padding: 10px;
      z-index: 150;
    }
    &-footer {
      border-top: 1px solid #dee2e6;
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      padding: 10px;
    }
    &-body {
      overflow: auto;
      overflow-x: hidden;
      color: #444444;
      min-height: 350px;
    }
    &-close {
      position: absolute;
      font-size: 64px;
      line-height: 40px;
      width: 40px;
      height: 50px;
      transform: scale(0.7);
      cursor: pointer;
      &::before,
      &::after {
        content: "";
        background-color: white;
        width: 4px;
        height: 20px;
        display: inline-block;
      }
      &::before {
        transform: rotate(45deg) translate(-6px, -10px);
        transform-origin: 100% 50%;
      }
      &::after {
        transform: rotate(-45deg);
        transform-origin: 0% 50%;
      }
    }
  }
  .desktop {
    .base-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow-x: hidden;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5), 0 0 0 1000px rgba(0, 0, 0, 0.25);
      min-width: 630px;
      width: 80vw;
      height: 90vh;
      &-header {
        color: #444444;
        background: #fff;
        text-align: left;
        text-indent: 10px;
      }

      &-close {
        right: 0;
        &::before,
        &::after {
          content: "";
          background-color: black;
          width: 1px;
          height: 30px;
          display: inline-block;
        }
        &::before {
          transform: rotate(45deg) translate(-2px, -2px);
          transform-origin: 100% 50%;
        }
        &::after {
          transform: rotate(-45deg) translate(0px, -3px);
          transform-origin: 0% 50%;
        }
      }
    }
    .base-modal--fade-enter-active,
    .base-modal--fade-leave-active {
      opacity: 1;
      transition: opacity 0.25s ease;
    }
    .base-modal--fade-enter,
    .base-modal--fade-leave-to {
      opacity: 0;
    }
  }
</style>
