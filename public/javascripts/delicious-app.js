import '../sass/style.scss'

import { $, $$ } from './modules/bling'
import autocomplete from './modules/autocomplete'
import typeahead from './modules/typeahead'
import map from './modules/map'
import heart from './modules/heart'

autocomplete($('#address'), $('#lat'), $('#lng'))

typeahead($('.search'))

map($('#map'))

$$('form.heart').on('submit', heart)
