<template>
  <div class="select-station">
    <div class="select-station--input">
      <input @keyup="autoComplete(searchText)" v-model="searchText" type="text" placeholder="название станции">
    </div>
    <div class="select-station--list" v-if="resultAutoComplete.length">
      <ul v-if="resultAutoComplete.length">
        <li v-for="(item, index) in resultAutoComplete" :key="index" @click="selectStation(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchStation',
  methods: {
    autoComplete (val) {
      this.resultAutoComplete = []
      if (val.length > 2) {
        for (var prop in this.stations) {
          if (this.stations[prop]['name'].toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.resultAutoComplete.push(this.stations[prop])
          }
        }
      }
    },
    selectStation (val) {
      console.log(val)
      this.searchText = ''
      this.resultAutoComplete = []
    }
  },
  data () {
    return {
      searchText: '',
      resultAutoComplete: [],
      'stations': {
        '314': {
          'name': '\u0414\u0435\u0432\u044f\u0442\u043a\u0438\u043d\u043e',
          'lineId': '23',
          'labelId': 1,
          'boardInfo': {
            'exit': [{
              'pos': [1, 3, 5]
            }]
          },
          'linkIds': [1002],
          'lng': 0,
          'lat': 0
        },
        '315': {
          'name': '\u0413\u0440\u0430\u0436\u0434\u0430\u043d\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442',
          'lineId': '23',
          'labelId': 2,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [1002, 2003],
          'lng': 0,
          'lat': 0
        },
        '316': {
          'name': '\u0410\u043a\u0430\u0434\u0435\u043c\u0438\u0447\u0435\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 3,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'changes': {
            'closed': {
              'type': 'no-boarding',
              'visible': true
            },
            'hint': '\u0421\u0442\u0430\u043d\u0446\u0438\u044f \u0437\u0430\u043a\u0440\u044b\u0442\u0430 \u043d\u0430 \u043a\u0430\u043f\u0438\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0435\u043c\u043e\u043d\u0442'
          },
          'linkIds': [2003, 3004],
          'lng': 0,
          'lat': 0
        },
        '317': {
          'name': '\u041f\u043e\u043b\u0438\u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 4,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [3004, 4005],
          'lng': 0,
          'lat': 0
        },
        '318': {
          'name': '\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u041c\u0443\u0436\u0435\u0441\u0442\u0432\u0430',
          'lineId': '23',
          'labelId': 5,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [4005, 5006],
          'lng': 0,
          'lat': 0
        },
        '319': {
          'name': '\u041b\u0435\u0441\u043d\u0430\u044f',
          'lineId': '23',
          'labelId': 6,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [5006, 6007],
          'lng': 0,
          'lat': 0
        },
        '320': {
          'name': '\u0412\u044b\u0431\u043e\u0440\u0433\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 7,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [6007, 7008],
          'lng': 0,
          'lat': 0
        },
        '321': {
          'name': '\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u041b\u0435\u043d\u0438\u043d\u0430',
          'lineId': '23',
          'labelId': 8,
          'boardInfo': {
            'exit': [{
              'pos': [2, 4]
            }]
          },
          'linkIds': [7008, 8009],
          'lng': 0,
          'lat': 0
        },
        '322': {
          'name': '\u0427\u0435\u0440\u043d\u044b\u0448\u0435\u0432\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 9,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [8009, 9010],
          'lng': 0,
          'lat': 0
        },
        '323': {
          'name': '\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u0412\u043e\u0441\u0441\u0442\u0430\u043d\u0438\u044f',
          'lineId': '23',
          'labelId': 10,
          'boardInfo': {
            'exit': [{
              'pos': [2, 4]
            }],
            'transfer': [{
              'toSt': 41,
              'pos': [3]
            }]
          },
          'linkIds': [9010, 10011, 10041],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '324': {
          'name': '\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 11,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }],
            'transfer': [{
              'toSt': 49,
              'pos': [4]
            }]
          },
          'linkIds': [10011, 11012, 11049],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '325': {
          'name': '\u041f\u0443\u0448\u043a\u0438\u043d\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 12,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }],
            'transfer': [{
              'toSt': 62,
              'pos': [3]
            }]
          },
          'linkIds': [11012, 12013, 12062],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '326': {
          'name': '\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438\u043d\u0441\u0442\u0438\u0442\u0443\u0442-1',
          'lineId': '23',
          'labelId': 13,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }],
            'transfer': [{
              'prevSt': 12,
              'toSt': 30,
              'nextSt': 31,
              'pos': [1, 2, 3, 4, 5]
            }, {
              'prevSt': 12,
              'toSt': 30,
              'nextSt': 29,
              'pos': [3]
            }, {
              'prevSt': 14,
              'toSt': 30,
              'nextSt': 31,
              'pos': [3]
            }, {
              'prevSt': 14,
              'toSt': 30,
              'nextSt': 29,
              'pos': [2, 3]
            }]
          },
          'linkIds': [12013, 13014, 13030],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '327': {
          'name': '\u0411\u0430\u043b\u0442\u0438\u0439\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 14,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [13014, 14015],
          'lng': 0,
          'lat': 0
        },
        '328': {
          'name': '\u041d\u0430\u0440\u0432\u0441\u043a\u0430\u044f',
          'lineId': '23',
          'labelId': 15,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [14015, 15016],
          'lng': 0,
          'lat': 0
        },
        '329': {
          'name': '\u041a\u0438\u0440\u043e\u0432\u0441\u043a\u0438\u0439 \u0437\u0430\u0432\u043e\u0434',
          'lineId': '23',
          'labelId': 16,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [15016, 16017],
          'lng': 0,
          'lat': 0
        },
        '330': {
          'name': '\u0410\u0432\u0442\u043e\u0432\u043e',
          'lineId': '23',
          'labelId': 17,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [16017, 17018],
          'lng': 0,
          'lat': 0
        },
        '331': {
          'name': '\u041b\u0435\u043d\u0438\u043d\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442',
          'lineId': '23',
          'labelId': 18,
          'boardInfo': {
            'exit': [{
              'pos': [1, 5]
            }]
          },
          'linkIds': [17018, 18019],
          'lng': 0,
          'lat': 0
        },
        '332': {
          'name': '\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u0412\u0435\u0442\u0435\u0440\u0430\u043d\u043e\u0432',
          'lineId': '23',
          'labelId': 19,
          'boardInfo': {
            'exit': [{
              'pos': [1, 5]
            }]
          },
          'linkIds': [18019],
          'lng': 0,
          'lat': 0
        },
        '333': {
          'name': '\u041f\u0430\u0440\u043d\u0430\u0441',
          'lineId': '24',
          'labelId': 20,
          'boardInfo': {
            'exit': [{
              'pos': [3]
            }]
          },
          'linkIds': [20021],
          'lng': 0,
          'lat': 0
        },
        '334': {
          'name': '\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041f\u0440\u043e\u0441\u0432\u0435\u0449\u0435\u043d\u0438\u044f',
          'lineId': '24',
          'labelId': 21,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [20021, 21022],
          'lng': 0,
          'lat': 0
        },
        '335': {
          'name': '\u041e\u0437\u0435\u0440\u043a\u0438',
          'lineId': '24',
          'labelId': 22,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [21022, 22023],
          'lng': 0,
          'lat': 0
        },
        '336': {
          'name': '\u0423\u0434\u0435\u043b\u044c\u043d\u0430\u044f',
          'lineId': '24',
          'labelId': 23,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [22023, 23024],
          'lng': 0,
          'lat': 0
        },
        '337': {
          'name': '\u041f\u0438\u043e\u043d\u0435\u0440\u0441\u043a\u0430\u044f',
          'lineId': '24',
          'labelId': 24,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [23024, 24025],
          'lng': 0,
          'lat': 0
        },
        '338': {
          'name': '\u0427\u0451\u0440\u043d\u0430\u044f \u0440\u0435\u0447\u043a\u0430',
          'lineId': '24',
          'labelId': 25,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [24025, 25026],
          'lng': 0,
          'lat': 0
        },
        '339': {
          'name': '\u041f\u0435\u0442\u0440\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0430\u044f',
          'lineId': '24',
          'labelId': 26,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [25026, 26027],
          'lng': 0,
          'lat': 0
        },
        '340': {
          'name': '\u0413\u043e\u0440\u044c\u043a\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '24',
          'labelId': 27,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [26027, 27028],
          'lng': 0,
          'lat': 0
        },
        '341': {
          'name': '\u041d\u0435\u0432\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442',
          'lineId': '24',
          'labelId': 28,
          'boardInfo': {
            'exit': [{
              'pos': [2, 4]
            }],
            'transfer': [{
              'toSt': 40,
              'pos': [4, 5]
            }]
          },
          'linkIds': [27028, 28029, 28040],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '342': {
          'name': '\u0421\u0435\u043d\u043d\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c',
          'lineId': '24',
          'labelId': 29,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }],
            'transfer': [{
              'toSt': 48,
              'pos': [1]
            }, {
              'toSt': 61,
              'pos': [3]
            }]
          },
          'linkIds': [28029, 29030, 29048, 29061],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '343': {
          'name': '\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438\u043d\u0441\u0442\u0438\u0442\u0443\u0442-2',
          'lineId': '24',
          'labelId': 30,
          'boardInfo': {
            'exit': [{
              'prevSt': 29,
              'pos': [5]
            }, {
              'prevSt': 31,
              'pos': [2]
            }],
            'transfer': [{
              'prevSt': 29,
              'toSt': 13,
              'nextSt': 14,
              'pos': [1, 2, 3, 4, 5]
            }, {
              'prevSt': 29,
              'toSt': 13,
              'nextSt': 12,
              'pos': [2, 4]
            }, {
              'prevSt': 31,
              'toSt': 13,
              'nextSt': 14,
              'pos': [3]
            }, {
              'prevSt': 31,
              'toSt': 13,
              'nextSt': 12,
              'pos': [2, 3, 5]
            }]
          },
          'linkIds': [13030, 29030, 30031],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '344': {
          'name': '\u0424\u0440\u0443\u043d\u0437\u0435\u043d\u0441\u043a\u0430\u044f',
          'lineId': '24',
          'labelId': 31,
          'boardInfo': {
            'exit': [{
              'pos': [3]
            }]
          },
          'linkIds': [30031, 31032],
          'lng': 0,
          'lat': 0
        },
        '345': {
          'name': '\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0438\u0435 \u0432\u043e\u0440\u043e\u0442\u0430',
          'lineId': '24',
          'labelId': 32,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }]
          },
          'linkIds': [31032, 32033],
          'lng': 0,
          'lat': 0
        },
        '346': {
          'name': '\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u0441\u0438\u043b\u0430',
          'lineId': '24',
          'labelId': 33,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }]
          },
          'linkIds': [32033, 33034],
          'lng': 0,
          'lat': 0
        },
        '347': {
          'name': '\u041f\u0430\u0440\u043a \u041f\u043e\u0431\u0435\u0434\u044b',
          'lineId': '24',
          'labelId': 34,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [33034, 34035],
          'lng': 0,
          'lat': 0
        },
        '348': {
          'name': '\u041c\u043e\u0441\u043a\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '24',
          'labelId': 35,
          'boardInfo': {
            'exit': [{
              'pos': [1, 5]
            }]
          },
          'linkIds': [34035, 35036],
          'lng': 0,
          'lat': 0
        },
        '349': {
          'name': '\u0417\u0432\u0451\u0437\u0434\u043d\u0430\u044f',
          'lineId': '24',
          'labelId': 36,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [35036, 36037],
          'lng': 0,
          'lat': 0
        },
        '350': {
          'name': '\u041a\u0443\u043f\u0447\u0438\u043d\u043e',
          'lineId': '24',
          'labelId': 37,
          'boardInfo': {
            'exit': [{
              'pos': [1, 2, 4, 5]
            }]
          },
          'linkIds': [36037],
          'lng': 0,
          'lat': 0
        },
        '351': {
          'name': '\u041f\u0440\u0438\u043c\u043e\u0440\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 38,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [38039, 72038],
          'lng': 0,
          'lat': 0
        },
        '352': {
          'name': '\u0412\u0430\u0441\u0438\u043b\u0435\u043e\u0441\u0442\u0440\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 39,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [38039, 39040],
          'lng': 0,
          'lat': 0
        },
        '353': {
          'name': '\u0413\u043e\u0441\u0442\u0438\u043d\u044b\u0439 \u0434\u0432\u043e\u0440',
          'lineId': '25',
          'labelId': 40,
          'boardInfo': {
            'exit': [{
              'pos': [1, 5]
            }],
            'transfer': [{
              'toSt': 28,
              'pos': [2, 4]
            }]
          },
          'linkIds': [28040, 39040, 40041],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '354': {
          'name': '\u041c\u0430\u044f\u043a\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 41,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }],
            'transfer': [{
              'toSt': 10,
              'pos': [1, 2, 4]
            }]
          },
          'linkIds': [10041, 40041, 41042],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '355': {
          'name': '\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u0430 \u041d\u0435\u0432\u0441\u043a\u043e\u0433\u043e - 1',
          'lineId': '25',
          'labelId': 42,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }],
            'transfer': [{
              'toSt': 51,
              'pos': [1]
            }]
          },
          'linkIds': [41042, 42043, 42051],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '356': {
          'name': '\u0415\u043b\u0438\u0437\u0430\u0440\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 43,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [42043, 43044],
          'lng': 0,
          'lat': 0
        },
        '357': {
          'name': '\u041b\u043e\u043c\u043e\u043d\u043e\u0441\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 44,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [43044, 44045],
          'lng': 0,
          'lat': 0
        },
        '358': {
          'name': '\u041f\u0440\u043e\u043b\u0435\u0442\u0430\u0440\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 45,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }]
          },
          'linkIds': [44045, 45046],
          'lng': 0,
          'lat': 0
        },
        '359': {
          'name': '\u041e\u0431\u0443\u0445\u043e\u0432\u043e',
          'lineId': '25',
          'labelId': 46,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [45046, 46047],
          'lng': 0,
          'lat': 0
        },
        '360': {
          'name': '\u0420\u044b\u0431\u0430\u0446\u043a\u043e\u0435',
          'lineId': '25',
          'labelId': 47,
          'boardInfo': {
            'exit': [{
              'pos': [1, 3, 4]
            }]
          },
          'linkIds': [46047],
          'lng': 0,
          'lat': 0
        },
        '361': {
          'name': '\u0421\u043f\u0430\u0441\u0441\u043a\u0430\u044f',
          'lineId': '26',
          'labelId': 48,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }],
            'transfer': [{
              'toSt': 29,
              'pos': [1]
            }, {
              'toSt': 61,
              'pos': [4]
            }]
          },
          'linkIds': [29048, 48049, 48061],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '362': {
          'name': '\u0414\u043e\u0441\u0442\u043e\u0435\u0432\u0441\u043a\u0430\u044f',
          'lineId': '26',
          'labelId': 49,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }],
            'transfer': [{
              'toSt': 11,
              'pos': [1]
            }]
          },
          'linkIds': [11049, 48049, 49050],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '363': {
          'name': '\u041b\u0438\u0433\u043e\u0432\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442',
          'lineId': '26',
          'labelId': 50,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [49050, 50051],
          'lng': 0,
          'lat': 0
        },
        '364': {
          'name': '\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u0430 \u041d\u0435\u0432\u0441\u043a\u043e\u0433\u043e - 2',
          'lineId': '26',
          'labelId': 51,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }],
            'transfer': [{
              'toSt': 42,
              'pos': [1]
            }]
          },
          'linkIds': [42051, 50051, 51052],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '365': {
          'name': '\u041d\u043e\u0432\u043e\u0447\u0435\u0440\u043a\u0430\u0441\u0441\u043a\u0430\u044f',
          'lineId': '26',
          'labelId': 52,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [51052, 52053],
          'lng': 0,
          'lat': 0
        },
        '366': {
          'name': '\u041b\u0430\u0434\u043e\u0436\u0441\u043a\u0430\u044f',
          'lineId': '26',
          'labelId': 53,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [52053, 53054],
          'lng': 0,
          'lat': 0
        },
        '367': {
          'name': '\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u0411\u043e\u043b\u044c\u0448\u0435\u0432\u0438\u043a\u043e\u0432',
          'lineId': '26',
          'labelId': 54,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [53054, 54055],
          'lng': 0,
          'lat': 0
        },
        '368': {
          'name': '\u0423\u043b\u0438\u0446\u0430 \u0414\u044b\u0431\u0435\u043d\u043a\u043e',
          'lineId': '26',
          'labelId': 55,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [54055],
          'lng': 0,
          'lat': 0
        },
        '369': {
          'name': '\u041a\u043e\u043c\u0435\u043d\u0434\u0430\u043d\u0442\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442',
          'lineId': '27',
          'labelId': 56,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [56057],
          'lng': 0,
          'lat': 0
        },
        '370': {
          'name': '\u0421\u0442\u0430\u0440\u0430\u044f \u0414\u0435\u0440\u0435\u0432\u043d\u044f',
          'lineId': '27',
          'labelId': 57,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [56057, 57058],
          'lng': 0,
          'lat': 0
        },
        '371': {
          'name': '\u041a\u0440\u0435\u0441\u0442\u043e\u0432\u0441\u043a\u0438\u0439 \u043e\u0441\u0442\u0440\u043e\u0432',
          'lineId': '27',
          'labelId': 58,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [57058, 58059],
          'lng': 0,
          'lat': 0
        },
        '372': {
          'name': '\u0427\u043a\u0430\u043b\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '27',
          'labelId': 59,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }]
          },
          'linkIds': [58059, 59060],
          'lng': 0,
          'lat': 0
        },
        '373': {
          'name': '\u0421\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u0430\u044f',
          'lineId': '27',
          'labelId': 60,
          'boardInfo': {
            'exit': [{
              'prevSt': 59,
              'pos': [1, 4]
            }, {
              'prevSt': 65,
              'pos': [1]
            }]
          },
          'linkIds': [59060, 60065],
          'lng': 0,
          'lat': 0
        },
        '375': {
          'name': '\u0421\u0430\u0434\u043e\u0432\u0430\u044f',
          'lineId': '27',
          'labelId': 61,
          'boardInfo': {
            'exit': [{
              'pos': [5]
            }],
            'transfer': [{
              'toSt': 29,
              'pos': [1]
            }, {
              'toSt': 48,
              'pos': [2, 4]
            }]
          },
          'linkIds': [29061, 48061, 61062, 65061],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '376': {
          'name': '\u0417\u0432\u0435\u043d\u0438\u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0430\u044f',
          'lineId': '27',
          'labelId': 62,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }],
            'transfer': [{
              'toSt': 12,
              'pos': [3, 4]
            }]
          },
          'linkIds': [12062, 61062, 62064],
          'isTransferStation': true,
          'lng': 0,
          'lat': 0
        },
        '378': {
          'name': '\u0412\u043e\u043b\u043a\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '27',
          'labelId': 63,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }]
          },
          'linkIds': [63066, 64063],
          'lng': 0,
          'lat': 0
        },
        '377': {
          'name': '\u041e\u0431\u0432\u043e\u0434\u043d\u044b\u0439 \u043a\u0430\u043d\u0430\u043b',
          'lineId': '27',
          'labelId': 64,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [62064, 64063],
          'lng': 0,
          'lat': 0
        },
        '374': {
          'name': '\u0410\u0434\u043c\u0438\u0440\u0430\u043b\u0442\u0435\u0439\u0441\u043a\u0430\u044f',
          'lineId': '27',
          'labelId': 65,
          'boardInfo': {
            'exit': [{
              'pos': [1]
            }]
          },
          'linkIds': [60065, 65061],
          'lng': 0,
          'lat': 0
        },
        '379': {
          'name': '\u0411\u0443\u0445\u0430\u0440\u0435\u0441\u0442\u0441\u043a\u0430\u044f',
          'lineId': '27',
          'labelId': 66,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [63066, 66067],
          'lng': 0,
          'lat': 0
        },
        '380': {
          'name': '\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u0430\u044f',
          'lineId': '27',
          'labelId': 67,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [66067],
          'lng': 0,
          'lat': 0
        },
        '449': {
          'name': '\u0411\u0435\u0433\u043e\u0432\u0430\u044f',
          'lineId': '25',
          'labelId': 71,
          'boardInfo': {
            'exit': [{
              'pos': [4]
            }]
          },
          'linkIds': [71072],
          'lng': 0,
          'lat': 0
        },
        '450': {
          'name': '\u041d\u043e\u0432\u043e\u043a\u0440\u0435\u0441\u0442\u043e\u0432\u0441\u043a\u0430\u044f',
          'lineId': '25',
          'labelId': 72,
          'boardInfo': {
            'exit': [{
              'pos': [2]
            }]
          },
          'linkIds': [71072, 72038],
          'lng': 0,
          'lat': 0
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
      &::-webkit-input-placeholder { color: #a2a2a2; }
      &:-ms-input-placeholder { color: #a2a2a2; }
      &::-ms-input-placeholder { color: #a2a2a2; }
      &::placeholder { color: #a2a2a2; }
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
        font-size: 12px;
        padding: 6px 10px;
        &:hover {
          background-color: #edeceb;
        }
      }
    }
  }
}
</style>
