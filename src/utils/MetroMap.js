// полифил remove для IE11
if (!('remove' in Element.prototype)) {
  Element.prototype['remove'] = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
  }
}

export default class MetroMap {
  constructor (options) {
    this.$el = options.selector
    this.stations = options.stations
    this.stationsSelect = []
  }

  opacitySvg () {
    if (this.stationsSelect.length) {
      this.$el.querySelector('svg #scheme-layer').style.opacity = '0.2'
    } else {
      this.$el.querySelector('svg #scheme-layer').style.opacity = '1'
    }
  }

  addLink (data) {
    // добавление - удаление линий
    let indexLinks = this.stationsSelect.findIndex(
      item => item.linkId === data.val
    )

    if (indexLinks != -1) {
      let indexStation = this.stations.findIndex(
        item => item.linkId === this.stationsSelect[indexLinks]['linkId']
      )

      if (
        Object.keys(this.stations[indexStation]['stations']).length ===
        Object.keys(this.stationsSelect[indexLinks]['stations']).length
      ) {
        this.stationsSelect.splice(indexLinks, 1)
      } else {
        this.stationsSelect[indexLinks]['stations'] = this.stations[
          indexStation
        ]['stations']
      }
    } else {
      let indexLinks2 = this.stations.findIndex(
        item => item.linkId === data.val
      )
      let arrayCopy = JSON.parse(JSON.stringify(this.stations[indexLinks2]))
      this.stationsSelect.push(arrayCopy)
    }
    this.cloneStations(this.stationsSelect)
  }

  cloneStations (data) {
    if (data.length) {
      for (let item of data) {
        for (let i in item.stations) {
          this.cloneStation(i, item.stations[i]['labelId'])
        }
      }
    }
  }

  cloneStation (station, label) {
    let stationId = this.$el
      .querySelector(`#scheme-layer-stations #station-${station}`)
      .cloneNode(true)
    let labelId = this.$el
      .querySelector(`#scheme-layer-labels #label-${label}`)
      .cloneNode(true)
    if (
      !this.$el.querySelector(`#highlight-layer-stations #station-${station}`)
    ) {
      this.$el
        .querySelector('#highlight-layer-stations')
        .appendChild(stationId)
    }
    if (!this.$el.querySelector(`#highlight-layer-labels #label-${label}`)) {
      this.$el.querySelector('#highlight-layer-labels').appendChild(labelId)
    }
  }

  addSelectStations (data) {
    for (let item of this.stations) {
      // находим станцую из текущего списка
      for (let i in item.stations) {
        if (data === i) {
          // если метки уже выбраны
          if (this.stationsSelect.length) {
            // узнаем станцию добавить к текущей ветке или создать новую ветку
            let numberLine = item.stations[data]['lineId']
            for (let y in this.stationsSelect) {
              let indexEl = this.stationsSelect.findIndex(
                item => item.linkId == numberLine
              )
              // к текущей
              if (indexEl !== -1) {
                this.stationsSelect[indexEl]['stations'][data] =
                  item.stations[data]
                break
              } else {
                // создаем новый список для станциы
                this.stationsSelect.push({
                  linkId: numberLine,
                  stations: {
                    [data]: item.stations[data]
                  }
                })
              }
            }
          } else {
            this.stationsSelect.push({
              linkId: item.stations[data]['lineId'],
              stations: {
                [data]: item.stations[data]
              }
            })
          }
          break
        }
      }
    }
    this.cloneStations(this.stationsSelect)
  }

  findLabel (data) {
    for (let item in this.stations) {
      for (let i in this.stations[item]['stations']) {
        if (data == i) {
          return this.stations[item]['stations'][i]['labelId']
        }
      }
    }
  }

  findLabels (data, array) {
    let labelArray = []
    for (let item in array) {
      for (let i in array[item]['stations']) {
        if (array[item]['stations'][i]['labelId'] === +data) {
          labelArray.push({
            stations: i,
            lineId: array[item]['stations'][i]['lineId']
          })
        }
      }
    }
    return labelArray
  }

  findLineLinks (data) {
    for (let item in this.stations) {
      for (let i in this.stations[item]['stations']) {
        for (let y in this.stations[item]['stations'][i]['linkIds']) {
          if (this.stations[item]['stations'][i]['linkIds'][y] === +data) {
            return this.stations[item]['stations'][i]['lineId']
          }
        }
      }
    }
  }

  findLineStations (data) {
    for (let item in this.stations) {
      for (let i in this.stations[item]['stations']) {
        if (i === data) {
          return this.stations[item]['stations'][i]['lineId']
        }
      }
    }
  }

  selectLine (data, links) {
    let indexSelectStations = this.stationsSelect.findIndex(
      item => item.linkId === data
    )
    let indexStations = this.stations.findIndex(item => item.linkId === data)

    if (links === 'links') {
      // console.log('выделяем всю линию')
      this.addLink({ val: data })
      let arrayLinks = this.findLinks(data)
      this.cloneLinks(arrayLinks)
    } else {
      if (
        Object.keys(this.stationsSelect[indexSelectStations]['stations'])
          .length ===
        Object.keys(this.stations[indexStations]['stations']).length
      ) {
        // console.log('выделить линию')
        let arrayLinks = this.findLinks(data)
        this.cloneLinks(arrayLinks)
      }
    }
  }

  findLinks (data) {
    let indexStationsLinks = this.stations.findIndex(
      item => item.linkId === data
    )

    let linksSelect = []
    for (let item in this.stations[indexStationsLinks]['stations']) {
      linksSelect.push(
        this.stations[indexStationsLinks]['stations'][item]['linkIds']
      )
    }

    let linksSelectAll = []
      .concat(...linksSelect)
      .filter((elem, index, self) => {
        return index === self.indexOf(elem)
      })

    return linksSelectAll
  }

  cloneLinks (data) {
    for (let item of data) {
      let link = this.$el.querySelector(`#scheme-layer-links #link-${item}`)
        ? this.$el
          .querySelector(`#scheme-layer-links #link-${item}`)
          .cloneNode(true)
        : ''
      if (link !== '') {
        this.$el.querySelector('#highlight-layer-links').appendChild(link)
      }
    }
  }

  removeStation (data, lineId, transfer = 1) {
    let indexStation = this.stations.findIndex(item => item.linkId === lineId)
    let lengthStation = Object.keys(this.stations[indexStation]['stations'])
      .length

    for (let item in this.stationsSelect) {
      for (let i in this.stationsSelect[item]['stations']) {
        if (i === data) {
          if (
            this.$el.querySelector(`#highlight-layer-stations #station-${data}`)
          ) {
            this.$el
              .querySelector(`#highlight-layer-stations #station-${data}`)
              .remove()
          }
          if (transfer == 1) {
            if (
              this.$el.querySelector(
                `#highlight-layer-labels #label-${
                  this.stationsSelect[item]['stations'][i]['labelId']
                }`
              )
            ) {
              this.$el
                .querySelector(
                  `#highlight-layer-labels #label-${
                    this.stationsSelect[item]['stations'][i]['labelId']
                  }`
                )
                .remove()
            }
          }

          delete this.stationsSelect[item]['stations'][i]

          if (this.stationsSelect.length) {
            if (
              Object.keys(this.stationsSelect[item]['stations']).length !=
              lengthStation
            ) {
              let arrayLinks = this.findLinks(lineId)
              for (let r of arrayLinks) {
                if (
                  this.$el.querySelector(`#highlight-layer-links #link-${r}`)
                ) {
                  this.$el
                    .querySelector(`#highlight-layer-links #link-${r}`)
                    .remove()
                }
              }
            }
          }

          if (Object.keys(this.stationsSelect[item]['stations']).length === 0) {
            this.stationsSelect.splice(item, 1)
          }

          break
        }
      }
    }
  }

  removeLink (links, lineId) {
    let indexStationsLinks = this.stationsSelect.findIndex(
      item => item.linkId === lineId
    )

    for (let item of links) {
      if (this.$el.querySelector(`#highlight-layer-links #link-${item}`)) {
        this.$el.querySelector(`#highlight-layer-links #link-${item}`).remove()
      }
    }
    for (let item in this.stationsSelect[indexStationsLinks]['stations']) {
      if (
        this.$el.querySelector(`#highlight-layer-stations #station-${item}`)
      ) {
        this.$el
          .querySelector(`#highlight-layer-stations #station-${item}`)
          .remove()
      }
      if (
        this.$el.querySelector(
          `#highlight-layer-labels #label-${
            this.stationsSelect[indexStationsLinks]['stations'][item]['labelId']
          }`
        )
      ) {
        this.$el
          .querySelector(
            `#highlight-layer-labels #label-${
              this.stationsSelect[indexStationsLinks]['stations'][item][
                'labelId'
              ]
            }`
          )
          .remove()
      }
    }
    this.stationsSelect.splice(indexStationsLinks, 1)
  }

  findSelectStation () {
    let arrayStations = []
    let arrayLine = []
    for (let item in this.stationsSelect) {
      let idLine = this.stationsSelect[item]['linkId']
      let indexStation = this.stations.findIndex(i => i.linkId === idLine)

      if (
        Object.keys(this.stations[indexStation]['stations']).length ===
        Object.keys(this.stationsSelect[item]['stations']).length
      ) {
        arrayLine.push(idLine)
      }
      for (let y in this.stationsSelect[item]['stations']) {
        arrayStations.push(y)
      }
    }
    return {
      link: arrayLine.length ? arrayLine : [],
      stations: arrayStations
    }
  }

  removeAll () {
    this.stationsSelect = []

    for (let item of this.$el
      .querySelector(`#highlight-layer-links`)
      .querySelectorAll('path')) {
      item.remove()
    }
    for (let item of this.$el
      .querySelector(`#highlight-layer-stations`)
      .querySelectorAll('circle')) {
      item.remove()
    }
    for (let item of this.$el
      .querySelector(`#highlight-layer-labels`)
      .querySelectorAll('g')) {
      item.remove()
    }

    this.opacitySvg()
  }
}
