import {shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import Vue from 'vue';

Vue.use(Vuex);

Vue.prototype.$t = (msg) => msg;
Vue.prototype.$tc = (msg) => msg;

describe('LoginForm.vue', () => {
  let store;
  let state;
  let mutations;

  beforeEach(() => {
    state = {
      auth: {
        pending: {},
        expResetCode: 3600,
        errorData: null
      }
    };

    mutations = {
      setAuthError: jest.fn(),
      closeModal: jest.fn()
    };

    store = new Vuex.Store({
      state,
      mutations
    });
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(LoginForm, {
      store,
      Vue,
      mocks: {
        $refs: {
          username: {
            focus: jest.fn()
          }
        }
      },
      stubs: ['button-spinner'] 
    });
    expect(wrapper.find('h3').text()).toBe('Acesse nossa plataforma');
    expect(wrapper.find('#login-form-username').exists()).toBe(true);
    expect(wrapper.find('#login-form-password').exists()).toBe(true);
  });
});