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
  data () {
    return {
      modal: false,
      'lines': {
        '23': {
          'name': '\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u043e-\u0412\u044b\u0431\u043e\u0440\u0433\u0441\u043a\u0430\u044f',
          'color': '#EF1E25'
        },
        '24': {
          'name': '\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u043e-\u041f\u0435\u0442\u0440\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f',
          'color': '#019EE0'
        },
        '25': {
          'name': '\u041d\u0435\u0432\u0441\u043a\u043e-\u0412\u0430\u0441\u0438\u043b\u0435\u043e\u0441\u0442\u0440\u043e\u0432\u0441\u043a\u0430\u044f',
          'color': '#029A55'
        },
        '26': {
          'name': '\u041f\u0440\u0430\u0432\u043e\u0431\u0435\u0440\u0435\u0436\u043d\u0430\u044f',
          'color': '#FBAA33'
        },
        '27': {
          'name': '\u0424\u0440\u0443\u043d\u0437\u0435\u043d\u0441\u043a\u043e-\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0430\u044f',
          'color': '#B61D8E'
        }
      }
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
