import { shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import Vue from 'vue';
import { mount } from '@vue/test-utils';



Vue.use(Vuex);

Vue.prototype.$t = (msg) => msg;
Vue.prototype.$tc = (msg) => msg;

describe('LoginForm.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let wrapper;

  beforeEach(() => {
    state = {
      auth: {
        pending: {},
        expResetCode: 3600,
        errorData: null
      }
    };

    actions = {
      loginUser: jest.fn(),
      registerUser: jest.fn()
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
    wrapper = mount(LoginForm, {
      store,
      data() {
        return {
          username: 'vitinho123',
          password: '12345',
          passwordConf: '12345',
          email: 'vitin@gmail.com',
        };
      }
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

    it('deve definir um erro se as senhas não coincidirem', async () => {
      await wrapper.setData({ passwordConf: 'differentPassword' });

      await wrapper.vm.sendRegister();

      
      expect(mutations.setAuthError).toHaveBeenCalledWith(
        expect.any(Object), 
        { message: 'Different passwords', fields: ['password', 'confirm-password'] }
      );
      
      expect(actions.registerUser).not.toHaveBeenCalled();
      
     
      expect(mutations.closeModal).not.toHaveBeenCalled();
    });

    it('deve registrar o usuário e fechar o modal com senhas coincidentes', async () => {
      await wrapper.vm.sendRegister();
  
     
      expect(actions.registerUser).toHaveBeenCalledWith(
        expect.any(Object), 
        {
          data: {
            username: wrapper.vm.username,
            password: wrapper.vm.password,
            email: wrapper.vm.email
          }
        }
      );
      
      
      expect(mutations.closeModal).toHaveBeenCalled();
    });

    it('não deve definir erro nem fechar modal se ocorrer um erro em registerUser', async () => {
      actions.registerUser.mockRejectedValueOnce(new Error('Erro de registro'));
  
      await wrapper.vm.sendRegister();
  
      
      expect(mutations.setAuthError).not.toHaveBeenCalled();
      expect(mutations.closeModal).not.toHaveBeenCalled();
    });
  });

    
    
    
    
    
    
    
    
    
    

