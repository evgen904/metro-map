export default class MetroMap {
  constructor (options) {
    this.$el = options.selector
    this.stations = options.stations
    this.selectStations = []
    this.selectLinks = []
  }

  findLabel (id) {
    let keyStations = Object.keys(this.stations)
    let indexStation = Object.values(this.stations).findIndex(item => item.labelId == id)

    return keyStations[indexStation]
  }

  findlink (id) {
    let keyStations = Object.keys(this.stations)
    let indexLink = Object.values(this.stations).findIndex(
      item => item.linkIds.find(i => i === +id)
    )
    let selectLine = Object.values(this.stations).filter(item => item.lineId == this.stations[keyStations[indexLink]].lineId)

    // список названий станций (текст) #scheme-layer-labels
    // let selectLineIdStations = selectLine.map(item => item.labelId)

    // список станций #scheme-layer-stations
    let keysSations = []
    for (var prop in this.stations) {
      if (this.stations[prop]['lineId'] === this.stations[keyStations[indexLink]].lineId) {
        keysSations.push(prop)
      }
    }

    // список линий #scheme-layer-links
    let linksSelect = selectLine.map(item => item.linkIds)
    let linksSelectAll = [].concat(...linksSelect).filter((elem, index, self) => {
      return index === self.indexOf(elem)
    })

    // console.log(selectLineIdStations, '#scheme-layer-labels');
    // console.log(keysSations, '#scheme-layer-stations');
    // console.log(linksSelectAll, '#scheme-layer-links');

    return {
      links: linksSelectAll,
      stantions: keysSations
    }
  }

  selectLink (id) {
    let keysSations = []
    for (var prop in this.stations) {
      if (this.stations[prop]['lineId'] === id) {
        keysSations.push(prop)
      }
    }
    this.selectStations = keysSations
    this.opacitySvg()
  }

  opacitySvg () {
    if (this.selectStations.length) {
      this.$el.querySelector('svg #scheme-layer').style.opacity = '0.2'
    } else {
      this.$el.querySelector('svg #scheme-layer').style.opacity = '1'
    }
  }

  addSelectStations (id) {
    let isId = this.selectStations.findIndex(item => item == id)
    if (isId === -1) {
      this.selectStations.push(id)
    } else {
      this.selectStations.splice(isId, 1)
    }

    this.opacitySvg()
    this.cloneStation()
  }

  cloneStation () {
    if (this.selectStations.length) {
      for (let item of this.selectStations) {
        let station = this.$el.querySelector(`#scheme-layer-stations #station-${item}`).cloneNode(true)
        let label = this.$el.querySelector(`#scheme-layer-labels #label-${this.stations[item]['labelId']}`).cloneNode(true)
        if (!this.$el.querySelector(`#highlight-layer-stations #station-${item}`)) {
          this.$el.querySelector('#highlight-layer-stations').appendChild(station)
        }

        if (!this.$el.querySelector(`#highlight-layer-labels #label-${this.stations[item]['labelId']}`)) {
          this.$el.querySelector('#highlight-layer-labels').appendChild(label)
        }
      }
    }
  }
  removeStation (id) {
    let isId = this.selectStations.findIndex(item => item == id)
    this.selectStations.splice(isId, 1)
    this.$el.querySelector(`#highlight-layer-stations #station-${id}`).remove()
    this.$el.querySelector(`#highlight-layer-labels #label-${this.stations[id]['labelId']}`).remove()

    this.opacitySvg()
  }

  cloneLink (data) {
    if (data.links.length) {
      let links = []

      for (let item of data.links) {
        let link = (this.$el.querySelector(`#scheme-layer-links #link-${item}`)) ? this.$el.querySelector(`#scheme-layer-links #link-${item}`).cloneNode(true) : ''
        if (link !== '') {
          this.$el.querySelector('#highlight-layer-links').appendChild(link)
          links.push(item)
        }
      }

      // временной решение
      let a = this.selectStations
      let b = data.stantions
      let c = a.concat(b)

      this.selectStations = c
      this.selectLinks.push({
        links: links,
        stantions: data.stantions
      })
      this.cloneStation()
      this.opacitySvg()
    }
  }

  removeLink (id) {
    let indexLink = -1

    for (let i = 0; i < this.selectLinks.length; i++) {
      if (this.selectLinks[i].links.findIndex(item => item == +id) != -1) {
        indexLink = i
        break
      }
    }

    for (let item of this.selectLinks[indexLink].links) {
      if (this.$el.querySelector(`#highlight-layer-links #link-${item}`)) {
        this.$el.querySelector(`#highlight-layer-links #link-${item}`).remove()
      }
    }
    for (let item of this.selectLinks[indexLink].stantions) {
      this.removeStation(item)
    }

    // this.selectLinks.splice(indexLink, 1);
  }

  removeAll () {
    this.selectStations = []
    this.selectLinks = []

    for (let item of this.$el.querySelector(`#highlight-layer-links`).querySelectorAll('path')) {
      item.remove()
    }
    for (let item of this.$el.querySelector(`#highlight-layer-stations`).querySelectorAll('circle')) {
      item.remove()
    }
    for (let item of this.$el.querySelector(`#highlight-layer-labels`).querySelectorAll('g')) {
      item.remove()
    }

    this.opacitySvg()
  }
}
