'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from "bootstrap-vue";
Vue.use(Vuex);
Vue.use(BootstrapVue);

import axios from 'axios';
import config from './config.js';
Vue.prototype.$http = axios;
Vue.prototype.$config = config;

import "./scss/theme.scss";

import User from './components/basic/user.vue';
import modal from './components/basic/modal.vue';
import loginForm from './components/basic/login-form.vue';
import phone from './components/basic/phone.vue';
import geoLocation from './components/basic/geo-location.vue';

import productOptions from './components/product/options.vue'

const store = new Vuex.Store({
    state: {
        modalCmp: null
    },
    mutations: {
        toggleModal (state, options) {
            this.state.modalCmp = options;
        }
    }
});

Vue.component('rt-user', User);
Vue.component('rt-modal', modal);
Vue.component('rt-login-form', loginForm);
Vue.component('rt-phone', phone);
Vue.component('rt-geo-location', geoLocation);

Vue.component('rt-product-options', productOptions);

new Vue({
  el: '#rt-app',
  store
});

