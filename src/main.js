import { createApp } from 'vue';
import App from './App.vue';

import './assets/base.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faAngleUp);
library.add(faAngleDown);

createApp(App).component('fa', FontAwesomeIcon).mount('#app');
