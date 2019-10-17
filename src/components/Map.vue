<template>
  <div class="map">
    <div
      @mousedown="mapDown($event)"
      @wheel.prevent="onScroll"
      class="map--svg"
    >
      <svg
        :style="{
          'transform':`translate3d(${positionMap[0]}px, ${positionMap[1]}px, 0px)`,
          'width':'780px',
          'height':'555px',
          'zoom': stepZoom
        }"
        height="555px"
        width="780px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="transform-wrapper" transform="scale(1 1)">
          <g id="scheme-layer">
            <g id="scheme-layer-background">
              <rect fill="#fff" height="555" stroke="none" width="780" x="0" y="0"></rect>
            </g>
            <g fill="none" id="scheme-layer-links" stroke-width="8">
              <path d="M378,15L378,35" id="link-1002" stroke="#EF1E25"></path>
              <path d="M378,35L378,55" id="link-2003" stroke="#EF1E25"></path>
              <path d="M378,55L378,75" id="link-3004" stroke="#EF1E25"></path>
              <path d="M378,75L378,95" id="link-4005" stroke="#EF1E25"></path>
              <path d="M378,95L378,115" id="link-5006" stroke="#EF1E25"></path>
              <path d="M378,115L378,135" id="link-6007" stroke="#EF1E25"></path>
              <path d="M378,135L378,155" id="link-7008" stroke="#EF1E25"></path>
              <path d="M378,155L378,175" id="link-8009" stroke="#EF1E25"></path>
              <path d="M378,175L378,205" id="link-9010" stroke="#EF1E25"></path>
              <path d="M378,205L333,250" id="link-10011" stroke="#EF1E25"></path>
              <path d="M333,250L263,320" id="link-11012" stroke="#EF1E25"></path>
              <path d="M263,320L208,375" id="link-12013" stroke="#EF1E25"></path>
              <path d="M208,375L168,415L168,440" id="link-13014" stroke="#EF1E25"></path>
              <path d="M168,440L168,460" id="link-14015" stroke="#EF1E25"></path>
              <path d="M168,460L168,480" id="link-15016" stroke="#EF1E25"></path>
              <path d="M168,480L168,500" id="link-16017" stroke="#EF1E25"></path>
              <path d="M168,500L168,520" id="link-17018" stroke="#EF1E25"></path>
              <path d="M168,520L168,540" id="link-18019" stroke="#EF1E25"></path>
              <path d="M208,15L208,35" id="link-20021" stroke="#019EE0"></path>
              <path d="M208,35L208,55" id="link-21022" stroke="#019EE0"></path>
              <path d="M208,55L208,75" id="link-22023" stroke="#019EE0"></path>
              <path d="M208,75L208,95" id="link-23024" stroke="#019EE0"></path>
              <path d="M208,95L208,115" id="link-24025" stroke="#019EE0"></path>
              <path d="M208,115L208,135" id="link-25026" stroke="#019EE0"></path>
              <path d="M208,135L208,155" id="link-26027" stroke="#019EE0"></path>
              <path d="M208,155L208,205" id="link-27028" stroke="#019EE0"></path>
              <path d="M208,205L208,250" id="link-28029" stroke="#019EE0"></path>
              <path d="M208,250L208,390" id="link-29030" stroke="#019EE0"></path>
              <path d="M208,390L208,420" id="link-30031" stroke="#019EE0"></path>
              <path d="M208,420L208,440" id="link-31032" stroke="#019EE0"></path>
              <path d="M208,440L208,460" id="link-32033" stroke="#019EE0"></path>
              <path d="M208,460L208,480" id="link-33034" stroke="#019EE0"></path>
              <path d="M208,480L208,500" id="link-34035" stroke="#019EE0"></path>
              <path d="M208,500L208,520" id="link-35036" stroke="#019EE0"></path>
              <path d="M208,520L208,540" id="link-36037" stroke="#019EE0"></path>
              <path d="M126,135L126,155" id="link-71072" stroke="#029A55"></path>
              <path d="M126,155L126,175" id="link-72038" stroke="#029A55"></path>
              <path d="M126,175L126,195" id="link-38039" stroke="#029A55"></path>
              <path d="M126,195L126,200L146,220L208,220" id="link-39040" stroke="#029A55"></path>
              <path d="M208,220L378,220" id="link-40041" stroke="#029A55"></path>
              <path d="M378,220L543,220L558,235L558,275" id="link-41042" stroke="#029A55"></path>
              <path d="M558,275L558,325" id="link-42043" stroke="#029A55"></path>
              <path d="M558,325L558,345" id="link-43044" stroke="#029A55"></path>
              <path d="M558,345L558,365" id="link-44045" stroke="#029A55"></path>
              <path d="M558,365L558,385" id="link-45046" stroke="#029A55"></path>
              <path d="M558,385L558,405" id="link-46047" stroke="#029A55"></path>
              <path d="M208,265L333,265" id="link-48049" stroke="#FBAA33"></path>
              <path d="M333,265L438,265" id="link-49050" stroke="#FBAA33"></path>
              <path d="M438,265L533,265L558,290" id="link-50051" stroke="#FBAA33"></path>
              <path d="M558,290L598,330L598,345" id="link-51052" stroke="#FBAA33"></path>
              <path d="M598,345L598,365" id="link-52053" stroke="#FBAA33"></path>
              <path d="M598,365L598,385" id="link-53054" stroke="#FBAA33"></path>
              <path d="M598,385L598,405" id="link-54055" stroke="#FBAA33"></path>
              <path d="M168,15L168,35" id="link-56057" stroke="#B61D8E"></path>
              <path d="M168,35L168,55" id="link-57058" stroke="#B61D8E"></path>
              <path d="M168,55L168,75" id="link-58059" stroke="#B61D8E"></path>
              <path d="M168,75L168,95" id="link-59060" stroke="#B61D8E"></path>
              <path d="M168,95L168,240" id="link-60065" stroke="#B61D8E"></path>
              <path d="M168,240L208,280" id="link-65061" stroke="#B61D8E"></path>
              <path d="M208,280L263,335" id="link-61062" stroke="#B61D8E"></path>
              <path d="M263,335L293,365" id="link-62064" stroke="#B61D8E"></path>
              <path d="M293,365L313,385" id="link-64063" stroke="#B61D8E"></path>
              <path d="M313,385L333,405" id="link-63066" stroke="#B61D8E"></path>
              <path d="M333,405L353,425" id="link-66067" stroke="#B61D8E"></path>
            </g>
            <g fill="rgba(255,255,255,0.6)" id="scheme-layer-transfers" stroke="#000" stroke-width="2">
              <path d="M215,250L215,280A7 7 0 0 1 201 280L201,250A7 7 0 0 1 215 250" id="transfer-61048029"></path>
              <path d="M270,320L270,335A7 7 0 0 1 256 335L256,320A7 7 0 0 1 270 320" id="transfer-62012"></path>
              <path d="M565,275L565,290A7 7 0 0 1 551 290L551,275A7 7 0 0 1 565 275" id="transfer-51042"></path>
              <path d="M340,250L340,265A7 7 0 0 1 326 265L326,250A7 7 0 0 1 340 250" id="transfer-49011"></path>
              <path d="M215,205L215,220A7 7 0 0 1 201 220L201,205A7 7 0 0 1 215 205" id="transfer-40028"></path>
              <path d="M385,205L385,220A7 7 0 0 1 371 220L371,205A7 7 0 0 1 385 205" id="transfer-41010"></path>
              <path d="M215,375L215,390A7 7 0 0 1 201 390L201,375A7 7 0 0 1 215 375" id="transfer-30013"></path>
            </g>
            <g id="scheme-layer-stations" stroke="#000" stroke-opacity="0.5" stroke-width="1">
              <circle cx="378" cy="15" fill="#EF1E25" id="station-314" r="5"></circle>
              <circle cx="378" cy="35" fill="#EF1E25" id="station-315" r="5"></circle>
              <circle cx="378" cy="55" fill="#EF1E25" id="station-316" r="5"></circle>
              <circle cx="378" cy="75" fill="#EF1E25" id="station-317" r="5"></circle>
              <circle cx="378" cy="95" fill="#EF1E25" id="station-318" r="5"></circle>
              <circle cx="378" cy="115" fill="#EF1E25" id="station-319" r="5"></circle>
              <circle cx="378" cy="135" fill="#EF1E25" id="station-320" r="5"></circle>
              <circle cx="378" cy="155" fill="#EF1E25" id="station-321" r="5"></circle>
              <circle cx="378" cy="175" fill="#EF1E25" id="station-322" r="5"></circle>
              <circle cx="378" cy="205" fill="#EF1E25" id="station-323" r="5" stroke="#fff"></circle>
              <circle cx="333" cy="250" fill="#EF1E25" id="station-324" r="5" stroke="#fff"></circle>
              <circle cx="263" cy="320" fill="#EF1E25" id="station-325" r="5" stroke="#fff"></circle>
              <circle cx="208" cy="375" fill="#EF1E25" id="station-326" r="5" stroke="#fff"></circle>
              <circle cx="168" cy="440" fill="#EF1E25" id="station-327" r="5"></circle>
              <circle cx="168" cy="460" fill="#EF1E25" id="station-328" r="5"></circle>
              <circle cx="168" cy="480" fill="#EF1E25" id="station-329" r="5"></circle>
              <circle cx="168" cy="500" fill="#EF1E25" id="station-330" r="5"></circle>
              <circle cx="168" cy="520" fill="#EF1E25" id="station-331" r="5"></circle>
              <circle cx="168" cy="540" fill="#EF1E25" id="station-332" r="5"></circle>
              <circle cx="208" cy="15" fill="#019EE0" id="station-333" r="5"></circle>
              <circle cx="208" cy="35" fill="#019EE0" id="station-334" r="5"></circle>
              <circle cx="208" cy="55" fill="#019EE0" id="station-335" r="5"></circle>
              <circle cx="208" cy="75" fill="#019EE0" id="station-336" r="5"></circle>
              <circle cx="208" cy="95" fill="#019EE0" id="station-337" r="5"></circle>
              <circle cx="208" cy="115" fill="#019EE0" id="station-338" r="5"></circle>
              <circle cx="208" cy="135" fill="#019EE0" id="station-339" r="5"></circle>
              <circle cx="208" cy="155" fill="#019EE0" id="station-340" r="5"></circle>
              <circle cx="208" cy="205" fill="#019EE0" id="station-341" r="5" stroke="#fff"></circle>
              <circle cx="208" cy="250" fill="#019EE0" id="station-342" r="5" stroke="#fff"></circle>
              <circle cx="208" cy="390" fill="#019EE0" id="station-343" r="5" stroke="#fff"></circle>
              <circle cx="208" cy="420" fill="#019EE0" id="station-344" r="5"></circle>
              <circle cx="208" cy="440" fill="#019EE0" id="station-345" r="5"></circle>
              <circle cx="208" cy="460" fill="#019EE0" id="station-346" r="5"></circle>
              <circle cx="208" cy="480" fill="#019EE0" id="station-347" r="5"></circle>
              <circle cx="208" cy="500" fill="#019EE0" id="station-348" r="5"></circle>
              <circle cx="208" cy="520" fill="#019EE0" id="station-349" r="5"></circle>
              <circle cx="208" cy="540" fill="#019EE0" id="station-350" r="5"></circle>
              <circle cx="126" cy="135" fill="#029A55" id="station-449" r="5"></circle>
              <circle cx="126" cy="155" fill="#029A55" id="station-450" r="5"></circle>
              <circle cx="126" cy="175" fill="#029A55" id="station-351" r="5"></circle>
              <circle cx="126" cy="195" fill="#029A55" id="station-352" r="5"></circle>
              <circle cx="208" cy="220" fill="#029A55" id="station-353" r="5" stroke="#fff"></circle>
              <circle cx="378" cy="220" fill="#029A55" id="station-354" r="5" stroke="#fff"></circle>
              <circle cx="558" cy="275" fill="#029A55" id="station-355" r="5" stroke="#fff"></circle>
              <circle cx="558" cy="325" fill="#029A55" id="station-356" r="5"></circle>
              <circle cx="558" cy="345" fill="#029A55" id="station-357" r="5"></circle>
              <circle cx="558" cy="365" fill="#029A55" id="station-358" r="5"></circle>
              <circle cx="558" cy="385" fill="#029A55" id="station-359" r="5"></circle>
              <circle cx="558" cy="405" fill="#029A55" id="station-360" r="5"></circle>
              <circle cx="208" cy="265" fill="#FBAA33" id="station-361" r="5" stroke="#fff"></circle>
              <circle cx="333" cy="265" fill="#FBAA33" id="station-362" r="5" stroke="#fff"></circle>
              <circle cx="438" cy="265" fill="#FBAA33" id="station-363" r="5"></circle>
              <circle cx="558" cy="290" fill="#FBAA33" id="station-364" r="5" stroke="#fff"></circle>
              <circle cx="598" cy="345" fill="#FBAA33" id="station-365" r="5"></circle>
              <circle cx="598" cy="365" fill="#FBAA33" id="station-366" r="5"></circle>
              <circle cx="598" cy="385" fill="#FBAA33" id="station-367" r="5"></circle>
              <circle cx="598" cy="405" fill="#FBAA33" id="station-368" r="5"></circle>
              <circle cx="168" cy="15" fill="#B61D8E" id="station-369" r="5"></circle>
              <circle cx="168" cy="35" fill="#B61D8E" id="station-370" r="5"></circle>
              <circle cx="168" cy="55" fill="#B61D8E" id="station-371" r="5"></circle>
              <circle cx="168" cy="75" fill="#B61D8E" id="station-372" r="5"></circle>
              <circle cx="168" cy="95" fill="#B61D8E" id="station-373" r="5"></circle>
              <circle cx="168" cy="240" fill="#B61D8E" id="station-374" r="5"></circle>
              <circle cx="208" cy="280" fill="#B61D8E" id="station-375" r="5" stroke="#fff"></circle>
              <circle cx="263" cy="335" fill="#B61D8E" id="station-376" r="5" stroke="#fff"></circle>
              <circle cx="293" cy="365" fill="#B61D8E" id="station-377" r="5"></circle>
              <circle cx="313" cy="385" fill="#B61D8E" id="station-378" r="5"></circle>
              <circle cx="333" cy="405" fill="#B61D8E" id="station-379" r="5"></circle>
              <circle cx="353" cy="425" fill="#B61D8E" id="station-380" r="5"></circle>
            </g>
            <g fill="#000" font-family="arial,sans-serif" font-size="13" id="scheme-layer-labels">
              <g id="label-1">
                <text text-anchor="start" x="387" y="19">
                  Девяткино
                </text>
              </g>
              <g id="label-2">
                <text text-anchor="start" x="387" y="39">
                  Гражданский проспект
                </text>
              </g>
              <g id="label-3">
                <text fill="#999" text-anchor="start" x="387" y="59">
                  Академическая
                </text>
              </g>
              <g id="label-4">
                <text text-anchor="start" x="387" y="79">
                  Политехническая
                </text>
              </g>
              <g id="label-5">
                <text text-anchor="start" x="387" y="99">
                  Площадь Мужества
                </text>
              </g>
              <g id="label-6">
                <text text-anchor="start" x="387" y="119">
                  Лесная
                </text>
              </g>
              <g id="label-7">
                <text text-anchor="start" x="387" y="139">
                  Выборгская
                </text>
              </g>
              <g id="label-8">
                <text text-anchor="start" x="387" y="159">
                  Площадь Ленина
                </text>
              </g>
              <g id="label-9">
                <text text-anchor="start" x="387" y="179">
                  Чернышевская
                </text>
              </g>
              <g id="label-10">
                <text text-anchor="start" x="387" y="209">
                  Площадь Восстания
                </text>
              </g>
              <g id="label-11">
                <text text-anchor="start" x="342" y="254">
                  Владимирская
                </text>
              </g>
              <g id="label-12">
                <text text-anchor="start" x="272" y="324">
                  Пушкинская
                </text>
              </g>
              <g id="label-13">
                <text text-anchor="end" x="199" y="379">
                  Технологический институт - 1
                </text>
              </g>
              <g id="label-14">
                <text text-anchor="end" x="159" y="444">
                  Балтийская
                </text>
              </g>
              <g id="label-15">
                <text text-anchor="end" x="159" y="464">
                  Нарвская
                </text>
              </g>
              <g id="label-16">
                <text text-anchor="end" x="159" y="484">
                  Кировский завод
                </text>
              </g>
              <g id="label-17">
                <text text-anchor="end" x="159" y="504">
                  Автово
                </text>
              </g>
              <g id="label-18">
                <text text-anchor="end" x="159" y="524">
                  Ленинский проспект
                </text>
              </g>
              <g id="label-19">
                <text text-anchor="end" x="159" y="544">
                  Проспект Ветеранов
                </text>
              </g>
              <g id="label-20">
                <text text-anchor="start" x="217" y="19">
                  Парнас
                </text>
              </g>
              <g id="label-21">
                <text text-anchor="start" x="217" y="39">
                  Проспект Просвещения
                </text>
              </g>
              <g id="label-22">
                <text text-anchor="start" x="217" y="59">
                  Озерки
                </text>
              </g>
              <g id="label-23">
                <text text-anchor="start" x="217" y="79">
                  Удельная
                </text>
              </g>
              <g id="label-24">
                <text text-anchor="start" x="217" y="99">
                  Пионерская
                </text>
              </g>
              <g id="label-25">
                <text text-anchor="start" x="217" y="119">
                  Чёрная речка
                </text>
              </g>
              <g id="label-26">
                <text text-anchor="start" x="217" y="139">
                  Петроградская
                </text>
              </g>
              <g id="label-27">
                <text text-anchor="start" x="217" y="159">
                  Горьковская
                </text>
              </g>
              <g id="label-28">
                <text text-anchor="start" x="217" y="209">
                  Невский проспект
                </text>
              </g>
              <g id="label-29">
                <text text-anchor="start" x="218" y="241">
                  <tspan dy="0" x="218">
                    Сенная
                  </tspan>
                  <tspan dy="13" x="218">
                    площадь
                  </tspan>
                </text>
              </g>
              <g id="label-30">
                <text text-anchor="end" x="199" y="394">
                  Технологический институт - 2
                </text>
              </g>
              <g id="label-31">
                <text text-anchor="start" x="217" y="424">
                  Фрунзенская
                </text>
              </g>
              <g id="label-32">
                <text text-anchor="start" x="217" y="444">
                  Московские ворота
                </text>
              </g>
              <g id="label-33">
                <text text-anchor="start" x="217" y="464">
                  Электросила
                </text>
              </g>
              <g id="label-34">
                <text text-anchor="start" x="217" y="484">
                  Парк Победы
                </text>
              </g>
              <g id="label-35">
                <text text-anchor="start" x="217" y="504">
                  Московская
                </text>
              </g>
              <g id="label-36">
                <text text-anchor="start" x="217" y="524">
                  Звёздная
                </text>
              </g>
              <g id="label-37">
                <text text-anchor="start" x="217" y="544">
                  Купчино
                </text>
              </g>
              <g id="label-71">
                <text text-anchor="end" x="117" y="139">
                  Беговая
                </text>
              </g>
              <g id="label-72">
                <text text-anchor="end" x="117" y="159">
                  Новокрестовская
                </text>
              </g>
              <g id="label-38">
                <text text-anchor="end" x="117" y="179">
                  Приморская
                </text>
              </g>
              <g id="label-39">
                <text text-anchor="end" x="117" y="199">
                  Василеостровская
                </text>
              </g>
              <g id="label-40">
                <text text-anchor="start" x="217" y="224">
                  Гостиный двор
                </text>
              </g>
              <g id="label-41">
                <text text-anchor="start" x="387" y="224">
                  Маяковская
                </text>
              </g>
              <g id="label-42">
                <text text-anchor="start" x="567" y="279">
                  Площадь Александра Невского - 1
                </text>
              </g>
              <g id="label-43">
                <text text-anchor="end" x="549" y="329">
                  Елизаровская
                </text>
              </g>
              <g id="label-44">
                <text text-anchor="end" x="549" y="349">
                  Ломоносовская
                </text>
              </g>
              <g id="label-45">
                <text text-anchor="end" x="549" y="369">
                  Пролетарская
                </text>
              </g>
              <g id="label-46">
                <text text-anchor="end" x="549" y="389">
                  Обухово
                </text>
              </g>
              <g id="label-47">
                <text text-anchor="end" x="549" y="409">
                  Рыбацкое
                </text>
              </g>
              <g id="label-48">
                <text text-anchor="start" x="217" y="269">
                  Спасская
                </text>
              </g>
              <g id="label-49">
                <text text-anchor="start" x="342" y="269">
                  Достоевская
                </text>
              </g>
              <g id="label-50">
                <text text-anchor="start" x="447" y="269">
                  <tspan dy="0" x="447">
                    Лиговский
                  </tspan>
                  <tspan dy="13" x="447">
                    проспект
                  </tspan>
                </text>
              </g>
              <g id="label-51">
                <text text-anchor="start" x="567" y="294">
                  Площадь Александра Невского - 2
                </text>
              </g>
              <g id="label-52">
                <text text-anchor="start" x="607" y="349">
                  Новочеркасская
                </text>
              </g>
              <g id="label-53">
                <text text-anchor="start" x="607" y="369">
                  Ладожская
                </text>
              </g>
              <g id="label-54">
                <text text-anchor="start" x="607" y="389">
                  Проспект Большевиков
                </text>
              </g>
              <g id="label-55">
                <text text-anchor="start" x="607" y="409">
                  Улица Дыбенко
                </text>
              </g>
              <g id="label-56">
                <text text-anchor="end" x="159" y="19">
                  Комендантский проспект
                </text>
              </g>
              <g id="label-57">
                <text text-anchor="end" x="159" y="39">
                  Старая Деревня
                </text>
              </g>
              <g id="label-58">
                <text text-anchor="end" x="159" y="59">
                  Крестовский остров
                </text>
              </g>
              <g id="label-59">
                <text text-anchor="end" x="159" y="79">
                  Чкаловская
                </text>
              </g>
              <g id="label-60">
                <text text-anchor="end" x="159" y="99">
                  Спортивная
                </text>
              </g>
              <g id="label-65">
                <text text-anchor="end" x="159" y="244">
                  Адмиралтейская
                </text>
              </g>
              <g id="label-61">
                <text text-anchor="end" x="199" y="284">
                  Садовая
                </text>
              </g>
              <g id="label-62">
                <text text-anchor="start" x="272" y="339">
                  Звенигородская
                </text>
              </g>
              <g id="label-64">
                <text text-anchor="start" x="302" y="369">
                  Обводный канал
                </text>
              </g>
              <g id="label-63">
                <text text-anchor="start" x="322" y="389">
                  Волковская
                </text>
              </g>
              <g id="label-66">
                <text text-anchor="start" x="342" y="409">
                  Бухарестская
                </text>
              </g>
              <g id="label-67">
                <text text-anchor="start" x="362" y="429">
                  Международная
                </text>
              </g>
            </g>
          </g>
          <g id="highlight-layer">
            <g fill="none" id="highlight-layer-links" stroke-width="8"></g>
            <g fill="rgba(255,255,255,0.6)" id="highlight-layer-transfers" stroke="#000" stroke-width="2"></g>
            <g id="highlight-layer-stations" stroke="#000" stroke-opacity="0.5" stroke-width="1"></g>
            <g fill="#000" font-family="arial,sans-serif" font-size="13" id="highlight-layer-labels"></g>
          </g>
        </g></svg>
    </div>
    <div class="map--zoom">
      <button @click="mapZoom('in')" :disabled="stepZoom == 3">+</button>
      <button @click="mapZoom('out')" :disabled="stepZoom == 0">-</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  methods: {
    mapDown(event) {
      let posX =
        event.touches === undefined ? event.clientX : event.touches[0].clientX;
      let posY =
        event.touches === undefined ? event.clientY : event.touches[0].clientY;


      this.positionMap = [posX-400, posY-400];




      if (event.touches === undefined) {
        document.addEventListener("mousemove", this.mapMove);
        document.addEventListener("mouseup", this.mapUp);
      } else {
        document.addEventListener("touchmove", this.mapMove);
        document.addEventListener("touchend", this.mapUp);
      }
    },
    mapMove(event) {

      let posX =
        event.touches === undefined ? event.clientX : event.touches[0].clientX;
      let posY =
        event.touches === undefined ? event.clientY : event.touches[0].clientY;


      this.positionMap = [posX-400, posY-400];



      console.log(event, this.positionMap);


    },
    mapUp(event) {
      document.removeEventListener("mousemove", this.mapMove);
      setTimeout(() => {
        document.removeEventListener("mouseup", this.mapUp);
        document.removeEventListener("mousedown", this.mapDown);
      },500);
    },
    onScroll(event) {
      if (event.deltaY <= -1) {
        this.mapZoom("in");
      } else if (event.deltaY >= 1) {
        this.mapZoom("out");
      }
    },
    mapZoom(val) {
      if (val == "in" && this.stepZoom < 3) {
        this.stepZoom++;
      }
      if (val == "out" && this.stepZoom != 0) {
        this.stepZoom--;
      }
    }
  },
  data () {
    return {
      stepZoom: 0,
      positionMap: [0, 0],
      'links': {
        '1002': {
          'type': 'link',
          'fromStationId': '314',
          'toStationId': '315',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '2003': {
          'type': 'link',
          'fromStationId': '315',
          'toStationId': '316',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '3004': {
          'type': 'link',
          'fromStationId': '316',
          'toStationId': '317',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '4005': {
          'type': 'link',
          'fromStationId': '317',
          'toStationId': '318',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '5006': {
          'type': 'link',
          'fromStationId': '318',
          'toStationId': '319',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '6007': {
          'type': 'link',
          'fromStationId': '319',
          'toStationId': '320',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '7008': {
          'type': 'link',
          'fromStationId': '320',
          'toStationId': '321',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '8009': {
          'type': 'link',
          'fromStationId': '321',
          'toStationId': '322',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '9010': {
          'type': 'link',
          'fromStationId': '322',
          'toStationId': '323',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '10011': {
          'type': 'link',
          'fromStationId': '323',
          'toStationId': '324',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '10041': {
          'type': 'transfer',
          'fromStationId': '323',
          'toStationId': '354',
          'weightTime': 120,
          'weightTransfer': 1,
          'transferId': 41010
        },
        '11012': {
          'type': 'link',
          'fromStationId': '324',
          'toStationId': '325',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '11049': {
          'type': 'transfer',
          'fromStationId': '324',
          'toStationId': '362',
          'weightTime': 120,
          'weightTransfer': 1,
          'transferId': 49011
        },
        '12013': {
          'type': 'link',
          'fromStationId': '325',
          'toStationId': '326',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '12062': {
          'type': 'transfer',
          'fromStationId': '325',
          'toStationId': '376',
          'weightTime': 120,
          'weightTransfer': 1,
          'transferId': 62012
        },
        '13014': {
          'type': 'link',
          'fromStationId': '326',
          'toStationId': '327',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '13030': {
          'type': 'transfer',
          'fromStationId': '326',
          'toStationId': '343',
          'weightTime': 60,
          'weightTransfer': 1,
          'transferId': 30013
        },
        '14015': {
          'type': 'link',
          'fromStationId': '327',
          'toStationId': '328',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '15016': {
          'type': 'link',
          'fromStationId': '328',
          'toStationId': '329',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '16017': {
          'type': 'link',
          'fromStationId': '329',
          'toStationId': '330',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '17018': {
          'type': 'link',
          'fromStationId': '330',
          'toStationId': '331',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '18019': {
          'type': 'link',
          'fromStationId': '331',
          'toStationId': '332',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '20021': {
          'type': 'link',
          'fromStationId': '333',
          'toStationId': '334',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '21022': {
          'type': 'link',
          'fromStationId': '334',
          'toStationId': '335',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '22023': {
          'type': 'link',
          'fromStationId': '335',
          'toStationId': '336',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '23024': {
          'type': 'link',
          'fromStationId': '336',
          'toStationId': '337',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '24025': {
          'type': 'link',
          'fromStationId': '337',
          'toStationId': '338',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '25026': {
          'type': 'link',
          'fromStationId': '338',
          'toStationId': '339',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '26027': {
          'type': 'link',
          'fromStationId': '339',
          'toStationId': '340',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '27028': {
          'type': 'link',
          'fromStationId': '340',
          'toStationId': '341',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '28029': {
          'type': 'link',
          'fromStationId': '341',
          'toStationId': '342',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '28040': {
          'type': 'transfer',
          'fromStationId': '341',
          'toStationId': '353',
          'weightTime': 120,
          'weightTransfer': 1,
          'transferId': 40028
        },
        '29030': {
          'type': 'link',
          'fromStationId': '342',
          'toStationId': '343',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '29048': {
          'type': 'transfer',
          'fromStationId': '342',
          'toStationId': '361',
          'weightTime': 180,
          'weightTransfer': 1,
          'transferId': 61048029
        },
        '29061': {
          'type': 'transfer',
          'fromStationId': '342',
          'toStationId': '375',
          'weightTime': 180,
          'weightTransfer': 1,
          'transferId': 61048029
        },
        '30031': {
          'type': 'link',
          'fromStationId': '343',
          'toStationId': '344',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '31032': {
          'type': 'link',
          'fromStationId': '344',
          'toStationId': '345',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '32033': {
          'type': 'link',
          'fromStationId': '345',
          'toStationId': '346',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '33034': {
          'type': 'link',
          'fromStationId': '346',
          'toStationId': '347',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '34035': {
          'type': 'link',
          'fromStationId': '347',
          'toStationId': '348',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '35036': {
          'type': 'link',
          'fromStationId': '348',
          'toStationId': '349',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '36037': {
          'type': 'link',
          'fromStationId': '349',
          'toStationId': '350',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '38039': {
          'type': 'link',
          'fromStationId': '351',
          'toStationId': '352',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '39040': {
          'type': 'link',
          'fromStationId': '352',
          'toStationId': '353',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '40041': {
          'type': 'link',
          'fromStationId': '353',
          'toStationId': '354',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '41042': {
          'type': 'link',
          'fromStationId': '354',
          'toStationId': '355',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '42043': {
          'type': 'link',
          'fromStationId': '355',
          'toStationId': '356',
          'weightTime': 300,
          'weightTransfer': 0
        },
        '42051': {
          'type': 'transfer',
          'fromStationId': '355',
          'toStationId': '364',
          'weightTime': 120,
          'weightTransfer': 1,
          'transferId': 51042
        },
        '43044': {
          'type': 'link',
          'fromStationId': '356',
          'toStationId': '357',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '44045': {
          'type': 'link',
          'fromStationId': '357',
          'toStationId': '358',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '45046': {
          'type': 'link',
          'fromStationId': '358',
          'toStationId': '359',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '46047': {
          'type': 'link',
          'fromStationId': '359',
          'toStationId': '360',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '48049': {
          'type': 'link',
          'fromStationId': '361',
          'toStationId': '362',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '48061': {
          'type': 'transfer',
          'fromStationId': '361',
          'toStationId': '375',
          'weightTime': 180,
          'weightTransfer': 1,
          'transferId': 61048029
        },
        '49050': {
          'type': 'link',
          'fromStationId': '362',
          'toStationId': '363',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '50051': {
          'type': 'link',
          'fromStationId': '363',
          'toStationId': '364',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '51052': {
          'type': 'link',
          'fromStationId': '364',
          'toStationId': '365',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '52053': {
          'type': 'link',
          'fromStationId': '365',
          'toStationId': '366',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '53054': {
          'type': 'link',
          'fromStationId': '366',
          'toStationId': '367',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '54055': {
          'type': 'link',
          'fromStationId': '367',
          'toStationId': '368',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '56057': {
          'type': 'link',
          'fromStationId': '369',
          'toStationId': '370',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '57058': {
          'type': 'link',
          'fromStationId': '370',
          'toStationId': '371',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '58059': {
          'type': 'link',
          'fromStationId': '371',
          'toStationId': '372',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '59060': {
          'type': 'link',
          'fromStationId': '372',
          'toStationId': '373',
          'weightTime': 120,
          'weightTransfer': 0
        },
        '60065': {
          'type': 'link',
          'fromStationId': '373',
          'toStationId': '374',
          'weightTime': 200,
          'weightTransfer': 0
        },
        '61062': {
          'type': 'link',
          'fromStationId': '375',
          'toStationId': '376',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '62064': {
          'type': 'link',
          'fromStationId': '376',
          'toStationId': '377',
          'weightTime': 170,
          'weightTransfer': 0
        },
        '63066': {
          'type': 'link',
          'fromStationId': '378',
          'toStationId': '379',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '64063': {
          'type': 'link',
          'fromStationId': '377',
          'toStationId': '378',
          'weightTime': 150,
          'weightTransfer': 0
        },
        '65061': {
          'type': 'link',
          'fromStationId': '374',
          'toStationId': '375',
          'weightTime': 160,
          'weightTransfer': 0
        },
        '66067': {
          'type': 'link',
          'fromStationId': '379',
          'toStationId': '380',
          'weightTime': 180,
          'weightTransfer': 0
        },
        '71072': {
          'type': 'link',
          'fromStationId': '449',
          'toStationId': '450',
          'weightTime': 240,
          'weightTransfer': 0
        },
        '72038': {
          'type': 'link',
          'fromStationId': '450',
          'toStationId': '351',
          'weightTime': 240,
          'weightTransfer': 0
        }
      },
      'labels': {
        '1': {
          'stationIds': ['314']
        },
        '2': {
          'stationIds': ['315']
        },
        '3': {
          'stationIds': ['316']
        },
        '4': {
          'stationIds': ['317']
        },
        '5': {
          'stationIds': ['318']
        },
        '6': {
          'stationIds': ['319']
        },
        '7': {
          'stationIds': ['320']
        },
        '8': {
          'stationIds': ['321']
        },
        '9': {
          'stationIds': ['322']
        },
        '10': {
          'stationIds': ['323']
        },
        '11': {
          'stationIds': ['324']
        },
        '12': {
          'stationIds': ['325']
        },
        '13': {
          'stationIds': ['326']
        },
        '14': {
          'stationIds': ['327']
        },
        '15': {
          'stationIds': ['328']
        },
        '16': {
          'stationIds': ['329']
        },
        '17': {
          'stationIds': ['330']
        },
        '18': {
          'stationIds': ['331']
        },
        '19': {
          'stationIds': ['332']
        },
        '20': {
          'stationIds': ['333']
        },
        '21': {
          'stationIds': ['334']
        },
        '22': {
          'stationIds': ['335']
        },
        '23': {
          'stationIds': ['336']
        },
        '24': {
          'stationIds': ['337']
        },
        '25': {
          'stationIds': ['338']
        },
        '26': {
          'stationIds': ['339']
        },
        '27': {
          'stationIds': ['340']
        },
        '28': {
          'stationIds': ['341']
        },
        '29': {
          'stationIds': ['342']
        },
        '30': {
          'stationIds': ['343']
        },
        '31': {
          'stationIds': ['344']
        },
        '32': {
          'stationIds': ['345']
        },
        '33': {
          'stationIds': ['346']
        },
        '34': {
          'stationIds': ['347']
        },
        '35': {
          'stationIds': ['348']
        },
        '36': {
          'stationIds': ['349']
        },
        '37': {
          'stationIds': ['350']
        },
        '38': {
          'stationIds': ['351']
        },
        '39': {
          'stationIds': ['352']
        },
        '40': {
          'stationIds': ['353']
        },
        '41': {
          'stationIds': ['354']
        },
        '42': {
          'stationIds': ['355']
        },
        '43': {
          'stationIds': ['356']
        },
        '44': {
          'stationIds': ['357']
        },
        '45': {
          'stationIds': ['358']
        },
        '46': {
          'stationIds': ['359']
        },
        '47': {
          'stationIds': ['360']
        },
        '48': {
          'stationIds': ['361']
        },
        '49': {
          'stationIds': ['362']
        },
        '50': {
          'stationIds': ['363']
        },
        '51': {
          'stationIds': ['364']
        },
        '52': {
          'stationIds': ['365']
        },
        '53': {
          'stationIds': ['366']
        },
        '54': {
          'stationIds': ['367']
        },
        '55': {
          'stationIds': ['368']
        },
        '56': {
          'stationIds': ['369']
        },
        '57': {
          'stationIds': ['370']
        },
        '58': {
          'stationIds': ['371']
        },
        '59': {
          'stationIds': ['372']
        },
        '60': {
          'stationIds': ['373']
        },
        '61': {
          'stationIds': ['375']
        },
        '62': {
          'stationIds': ['376']
        },
        '63': {
          'stationIds': ['378']
        },
        '64': {
          'stationIds': ['377']
        },
        '65': {
          'stationIds': ['374']
        },
        '66': {
          'stationIds': ['379']
        },
        '67': {
          'stationIds': ['380']
        },
        '71': {
          'stationIds': ['449']
        },
        '72': {
          'stationIds': ['450']
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  flex: auto;
  overflow: hidden;
  &--svg {
    overflow: hidden;
    height: 100%;
    user-select: none;
  }
  &--zoom {
    position: absolute;
    left: 10px;
    bottom: 10px;
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 4px;
    overflow: hidden;
    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      outline-style: none;
      border: none;
      background: #fff;
      padding: 0;
      margin: 0;
      width: 30px;
      height: 30px;
      font-weight: bold;
      font-size: 20px;
      &:first-child {
        border-bottom: 1px solid #ccc;
      }
      &:hover {
        background: #f4f4f4;
      }
      &:disabled {
        background: #f4f4f4;
      }
    }
  }
}
</style>
