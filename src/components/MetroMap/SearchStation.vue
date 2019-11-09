<template>
  <div class="select-station">
    <div class="select-station--input">
      <input
        v-model="searchText"
        type="text"
        placeholder="название станции"
        @keyup="autoComplete(searchText)"
        @keyup.down="onKeyDown"
        @keyup.up="onKeyUp"
        @keyup.enter="onKeyEnter"
      />
    </div>
    <div v-if="resultAutoComplete.length" class="select-station--list">
      <ul v-if="resultAutoComplete.length">
        <li
          v-for="(item, index) in resultAutoComplete"
          :key="index"
          :class="{ active: index == selected }"
          @click="selectStation(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchStation',
  props: {
    stations: {
      type: Object
    }
  },
  data () {
    return {
      selected: null,
      searchText: '',
      resultAutoComplete: []
    }
  },
  methods: {
    onKeyDown () {
      if (this.selected === null) {
        this.selected = 0
        return
      }
      const max = this.resultAutoComplete.length
      this.selected = max <= this.selected + 1 ? 0 : this.selected + 1
    },
    onKeyUp () {
      if (this.selected === null) {
        this.selected = 0
        return
      }
      const max = this.resultAutoComplete.length
      this.selected = this.selected == 0 ? max - 1 : this.selected - 1
    },
    onKeyEnter () {
      if (this.selected === null) return
      if (this.resultAutoComplete.length > 0) {
        this.selectStation(this.resultAutoComplete[this.selected])
      }
    },
    autoComplete (val) {
      this.resultAutoComplete = []
      if (val.length >= 2) {
        for (let prop in this.stations) {
          if (
            this.stations[prop]['name']
              .toLowerCase()
              .indexOf(val.toLowerCase()) > -1
          ) {
            this.resultAutoComplete.push(this.stations[prop])
          }
        }
      }
    },
    selectStation (val) {
      this.searchText = ''
      this.resultAutoComplete = []

      for (let item in this.stations) {
        if (this.stations[item]['labelId'] === val.labelId) {
          this.$emit('input', item)
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-station {
    width: 50%;
    padding-right: 10px;
    position: relative;
    &--input {
      input[type="text"] {
        display: block;
        width: 100%;
        height: 30px;
        padding: 0 10px;
        margin: 0;
        outline-style: none;
        font-size: 13px;
        border: 1px solid #d8d8d8;
        border-radius: 3px;
        background: #fff;
        &::-webkit-input-placeholder {
          color: #a2a2a2;
        }
        &:-ms-input-placeholder {
          color: #a2a2a2;
        }
        &::-ms-input-placeholder {
          color: #a2a2a2;
        }
        &::placeholder {
          color: #a2a2a2;
        }
      }
    }
    &--list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 10px;
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
          font-size: 13px;
          padding: 6px 10px;
          &:hover,
          &.active {
            background-color: #edeceb;
          }
        }
      }
    }
  }
</style>
