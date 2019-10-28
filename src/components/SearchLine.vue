<template>
  <div class="select-line" v-click-outside="clickOutside">
    <div class="select-line--btn" @click="modal = !modal">
      выберите линию
    </div>
    <div class="select-line--list" v-if="modal">
      <ul>
        <li
          v-for="(item, key) in lines"
          :key="key"
          @click="selectLine(key)"
          :class="{'selected': item.selected}"
        >
          <div class="metro-lines" :style="{'background-color': item.color}"></div>
          <div class="metro-lines-name">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchLine',
  props: {
    select: {
      type: Object
    },
    lines: {
      type: Object
    }
  },
  methods: {
    clickOutside () {
      this.modal = false
    },
    selectLine (val) {
      this.lines[val]['selected'] = (!this.lines[val]['selected'])
      this.modal = false
      this.$emit('input', { val, selected: this.lines[val]['selected'] })
    }
  },
  watch: {
    modal (val) {
      if (val) {
        for (let item in this.lines) {
          this.lines[item]['selected'] = false
        }
      }
      if (this.select !== null && this.select.link.length && val) {
        for (let item of this.select.link) {
          this.lines[item]['selected'] = true
        }
      }
    }
  },
  data () {
    return {
      modal: false
    }
  }
}
</script>

<style lang="scss" scoped>
.select-line {
  position: relative;
  width: 50%;
  padding-left: 10px;
  &--btn {
    cursor: pointer;
    border: 1px solid #d8d8d8;
    border-radius: 3px;
    background-color: #fff;
    font-size: 13px;
    color: #999999;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    position: relative;
    &:after, &:before {
      content: '';
      display: block;
      width: 8px;
      height: 1px;
      background: #000;
      position: absolute;
      top: 0;
      right: 0;
      margin: 14px 10px 0 0;
    }
    &:after {
      transform: rotate(-45deg);
    }
    &:before {
      transform: rotate(45deg);
      right: 6px;
    }
  }
  &--list {
    position: absolute;
    top: 100%;
    left: 10px;
    right: 0;
    z-index: 100;
    background-color: #fff;
    border: 1px solid #d8d8d8;
    border-radius: 3px;
    overflow: hidden;
    margin: 2px 0 0;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 12px;
        padding: 6px 10px 6px 25px;
        position: relative;
        &.selected {
          &:before {
            content: '\2713';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 26px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            z-index: 1;
          }
        }
        &:hover {
          background-color: #edeceb;
        }
        .metro-lines {
          width: 14px;
          height: 6px;
          margin: 0 10px 0 0;
        }
      }
    }
  }
}
</style>
