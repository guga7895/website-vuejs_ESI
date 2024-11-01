import { shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import Vue from 'vue';

Vue.use(Vuex);

Vue.prototype.$t = (msg) => msg;
Vue.prototype.$tc = (msg) => msg;

describe('LoginForm.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;

  beforeEach(() => {
    state = {
      auth: {
        pending: {},
        expResetCode: 3600,
        errorData: null
      }
    };

    actions = {
      loginUser: jest.fn()
    };

    mutations = {
      setAuthError: jest.fn(),
      closeModal: jest.fn()
    };

    store = new Vuex.Store({
      state,
      actions,
      mutations
    });
  });

  it('despacha a ação "loginUser" ao enviar o formulário', async () => {
    const obj = shallowMount(LoginForm, {
      store,
      Vue,
      mocks: {
        $refs: {
          username: {
            focus: jest.fn()
          }
        }
      },
      stubs: {
        'button-spinner': {
          template: '<button type="submit"></button>'
        }
      }
    });

    await obj.find('#login-form-username').setValue('guga123');
    await obj.find('#login-form-password').setValue('guguinha123');

    await obj.find('button[type="submit"]').trigger('click');

    expect(actions.loginUser).toHaveBeenCalled();
    expect(actions.loginUser.mock.calls[0][1]).toEqual({
      //mockando user para testas  
      data: {
        username: 'guga123',
        password: 'guguinha123'
      }
    });
  });
});