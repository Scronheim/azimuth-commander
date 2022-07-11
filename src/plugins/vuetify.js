import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { VTextField, VBtn, VSelect } from 'vuetify/lib'

Vue.use(Vuetify)

// prefix "C" means custom
Vue.component('CSelect', {
  extends: VSelect,
  props: {
    itemValue: {
      type: String,
      default: 'value',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    items: {
      type: Array,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
  }
})
Vue.component('CTextField', {
  extends: VTextField,
  props: {
    type: {
      type: String,
      default: 'text',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
  }
})
Vue.component('CBtnPrimary', {
  extends: VBtn,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'primary',
    }
  }
})
Vue.component('CBtnSuccess', {
  extends: VBtn,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'success',
    }
  }
})
Vue.component('CBtnError', {
  extends: VBtn,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'error',
    }
  }
})

export default new Vuetify({
})
