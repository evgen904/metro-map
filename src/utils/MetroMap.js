export default class MetroMap {
  constructor (options) {
    this.$el = options.selector
    this.stations = options.stations
    this.selectStations = []
    this.selectLinks = []
    this.selectLinksNew = []
    this.stationsNew = []
    this.stationsSelect = []
  }


  /* new */

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
      for (let i in this.stationsSelect) {
        let indexS = this.stations.findIndex(item => item.linkId === this.stationsSelect[i]['linkId']);
        if (Object.keys(this.stations[indexS]['stations']).length === Object.keys(this.stationsSelect[i]['stations']).length) {
          this.stationsSelect.splice(indexLinks, 1)
        } else {
          this.stationsSelect[i]['stations'] = this.stations[indexS]['stations'];
        }
      }
    } else {
      let indexLinks2 = this.stations.findIndex(item => item.linkId === data.val);
      this.stationsSelect.push(this.stations[indexLinks2])
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



  /* new */








  /* old */

  addLinkNew (idLine) {
    let indexLinks = this.selectLinksNew.findIndex(item => item.linkId === idLine.val);

    if (indexLinks != -1) {
      this.selectLinksNew.splice(indexLinks, 1)
    } else {
      let linksNew = {}
      for (let prop in this.stations) {
        if (this.stations[prop]['lineId'] === idLine.val) {
          linksNew[prop] = this.stations[prop];
        }
      }
      this.selectLinksNew.push({
        linkId: idLine.val,
        stations: linksNew
      });
    }

    for (let item in this.selectLinksNew) {
      console.log(Object.keys(this.selectLinksNew[item]['stations']).length, this.selectLinksNew[item]['linkId']);
    }

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

  /* old */








}
