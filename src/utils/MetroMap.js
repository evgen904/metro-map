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

  addLinkNew2(data) {
    // добавление - удаление линий
    let indexLinks = this.stationsSelect.findIndex(item => item.linkId === data.val);

    if (indexLinks != -1) {
      let indexStation = this.stations.findIndex(item => item.linkId === this.stationsSelect[indexLinks]['linkId']);

      if (Object.keys(this.stations[indexStation]['stations']).length === Object.keys(this.stationsSelect[indexLinks]['stations']).length) {
        this.stationsSelect.splice(indexLinks, 1)
      } else {
        this.stationsSelect[indexLinks]['stations'] = this.stations[indexStation]['stations'];
      }
    } else {
      let indexLinks2 = this.stations.findIndex(item => item.linkId === data.val);
      let arrayCopy = JSON.parse(JSON.stringify(this.stations[indexLinks2]))
      this.stationsSelect.push(arrayCopy)
    }
    this.cloneStationsNew2(this.stationsSelect)
  }

  cloneStationsNew2(data) {
    if (data.length) {
      for (let item of data) {
        for (let i in item.stations) {
          this.cloneStationNew2(i, item.stations[i]['labelId'])
        }
      }
    }
  }

  cloneStationNew2 (station, label) {
    let stationId = this.$el.querySelector(`#scheme-layer-stations #station-${station}`).cloneNode(true)
    let labelId = this.$el.querySelector(`#scheme-layer-labels #label-${label}`).cloneNode(true)
    if (!this.$el.querySelector(`#highlight-layer-stations #station-${station}`)) {
      this.$el.querySelector('#highlight-layer-stations').appendChild(stationId)
    }
    if (!this.$el.querySelector(`#highlight-layer-labels #label-${label}`)) {
      this.$el.querySelector('#highlight-layer-labels').appendChild(labelId)
    }
  }

  addSelectStationsNew(data) {
    for (let item of this.stations) {
      // находим станцую из текущего списка
      for (let i in item.stations) {
        if (data === i) {
          // если метки уже выбраны
          if (this.stationsSelect.length) {
            // узнаем станцию добавить к текущей ветке или создать новую ветку
            let numberLine = item.stations[data]['lineId'];
            for (let y in this.stationsSelect) {
              let indexEl = this.stationsSelect.findIndex(item => item.linkId == numberLine)
              // к текущей
              if (indexEl !== -1) {
                this.stationsSelect[indexEl]['stations'][data] = item.stations[data]
                break;
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
          break;
        }
      }
    }
    this.cloneStationsNew2(this.stationsSelect)
  }

  findLabelNew(data) {
    for (let item in this.stations) {
      for (let i in this.stations[item]['stations']) {
        if (this.stations[item]['stations'][i]['labelId'] === +data) {
          return {
            stations: i,
            lineId: this.stations[item]['stations'][i]['lineId']
          }
          break;
        }
      }
    }
  }

  findLineLinksNew(data) {
    for (let item in this.stations) {
      for (let i in this.stations[item]['stations']) {
        for (let y in this.stations[item]['stations'][i]['linkIds']) {
          if (this.stations[item]['stations'][i]['linkIds'][y] === +data) {
            return this.stations[item]['stations'][i]['lineId']
            break;
          }
        }
      }
    }
  }

  findLineStationsNew(data) {
    for (let item in this.stations) {
      for (let i in this.stations[item]['stations']) {
        if (i === data) {
          return this.stations[item]['stations'][i]['lineId']
          break;
        }
      }
    }
  }


  selectLineNew(data, links) {
    let indexSelectStations = this.stationsSelect.findIndex(item => item.linkId === data)
    let indexStations = this.stations.findIndex(item => item.linkId === data)

    if (links === 'links') {
      console.log('выделяем всю линию');

      this.addLinkNew2({val:data})
      let arrayLinks = this.findLinksNew(data)
      this.cloneLinksNew(arrayLinks)

    } else {
      if (Object.keys(this.stationsSelect[indexSelectStations]['stations']).length === Object.keys(this.stations[indexStations]['stations']).length) {
        console.log('выделить линию');
        let arrayLinks = this.findLinksNew(data)
        this.cloneLinksNew(arrayLinks)
      } else if (Object.keys(this.stationsSelect[indexSelectStations]['stations']).length === Object.keys(this.stations[indexStations]['stations']).length-1) {
        console.log('убрать линию');
      }
    }
  }

  findLinksNew(data) {
    let indexStationsLinks = this.stations.findIndex(item => item.linkId === data)

    let linksSelect = []
    for (let item in this.stations[indexStationsLinks]['stations']) {
      linksSelect.push(this.stations[indexStationsLinks]['stations'][item]['linkIds'])
    }

    let linksSelectAll = [].concat(...linksSelect).filter((elem, index, self) => {
      return index === self.indexOf(elem)
    })

    return linksSelectAll;
  }

  cloneLinksNew(data) {
    for (let item of data) {
      let link = (this.$el.querySelector(`#scheme-layer-links #link-${item}`)) ? this.$el.querySelector(`#scheme-layer-links #link-${item}`).cloneNode(true) : ''
      if (link !== '') {
        this.$el.querySelector('#highlight-layer-links').appendChild(link)
      }
    }
  }

  removeStationNew(data, lineId) {

    let indexStation = this.stations.findIndex(item => item.linkId === lineId)
    let lengthStation = Object.keys(this.stations[indexStation]['stations']).length;

    for (let item in this.stationsSelect) {
      for (let i in this.stationsSelect[item]['stations']) {
        if (i === data) {
          this.$el.querySelector(`#highlight-layer-stations #station-${data}`).remove()
          this.$el.querySelector(`#highlight-layer-labels #label-${this.stationsSelect[item]['stations'][i]['labelId']}`).remove()

          delete this.stationsSelect[item]['stations'][i]
          if (Object.keys(this.stationsSelect[item]['stations']).length === 0) {
            this.stationsSelect.splice(item, 1)
          }

          if (this.stationsSelect.length) {
            if (Object.keys(this.stationsSelect[item]['stations']).length != lengthStation) {
              let arrayLinks = this.findLinksNew(lineId)
              for (let r of arrayLinks) {
                if (this.$el.querySelector(`#highlight-layer-links #link-${r}`)) {
                  this.$el.querySelector(`#highlight-layer-links #link-${r}`).remove()
                }
              }
            }
          }

          break;
        }
      }
    }
  }

  removeLinkNew(links, lineId) {
    let indexStationsLinks = this.stationsSelect.findIndex(item => item.linkId === lineId)

    for (let item of links) {
      if (this.$el.querySelector(`#highlight-layer-links #link-${item}`)) {
        this.$el.querySelector(`#highlight-layer-links #link-${item}`).remove()
      }
    }
    for (let item in this.stationsSelect[indexStationsLinks]['stations']) {
      this.$el.querySelector(`#highlight-layer-stations #station-${item}`).remove()
      this.$el.querySelector(`#highlight-layer-labels #label-${this.stationsSelect[indexStationsLinks]['stations'][item]['labelId']}`).remove()
    }
    this.stationsSelect.splice(indexStationsLinks, 1)

  }

  removeAll () {

  }

}
