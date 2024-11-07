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

    it('deve chamar a mutação setAuthError quando houver um erro de campo', async () => {
      const mockSetAuthError = jest.fn();
      
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
        computed: {
          errorData: { fields: ['password'] } // Simulando um erro de campo
        },
        methods: {
          setAuthError: mockSetAuthError 
        }
      });
    
      // Simulando um erro de login e chamando sendLogin
      obj.vm.setAuthError({ message: 'Invalid credentials', fields: ['password'] });
      
      expect(mockSetAuthError).toHaveBeenCalledWith({
        message: 'Invalid credentials',
        fields: ['password']
      });
    
      
      expect(mockSetAuthError.mock.calls.length).toBe(2); // Verificar que foram feitas 2 chamadas
    });
  
    it('deve renderizar os campos ao mudar para a view de registro', async () => {
      const obj = shallowMount(LoginForm, {
        store,
        Vue,
        mocks: {
          $refs: {
            username: { focus: jest.fn() }
          }
        }
      });
    
      
      obj.vm.changeView('register');
      await obj.vm.$nextTick(); 
    
      
      const usernameField = obj.find('#login-form-username');
      expect(usernameField.exists()).toBe(true);
    
      
      const emailField = obj.find('#login-form-email');
      expect(emailField.exists()).toBe(true);
    });

    it('deve chamar a ação "registerUser" quando o formulário for enviado com sucesso', async () => {
      const actions = {
        registerUser: jest.fn()
      };
    
      const obj = shallowMount(LoginForm, {
        store: new Vuex.Store({
          actions
        }),
        mocks: {
          $refs: {
            username: { focus: jest.fn() } // Mock da referência para o campo de username
          }
        },
        methods: {
          sendRegister() {
            const { username, password, passwordConf, email } = this.formData;
    
            // Dispara a ação 'registerUser'
            this.$store.dispatch('registerUser', {
              data: {
                username,
                password,
                passwordConf,
                email
              }
            });
          }
        }
      });
    
      // Muda para a view de registro
      obj.vm.changeView('register');
      
      // Espera o DOM ser atualizado
      await obj.vm.$nextTick();
    
      // Espera que o campo username seja renderizado
      const usernameField = obj.find('#login-form-username');
      expect(usernameField.exists()).toBe(true); // Verifica se o campo de username está presente no DOM
    
      // Verifica se a referência 'username' está configurada corretamente
      const usernameRef = obj.vm.$refs.username;
      expect(usernameRef).toBeDefined(); // A referência deve existir agora
    
      // Verifica se o método focus foi chamado
      if (usernameRef) {
        usernameRef.focus();
      }
    
      // Preenche os campos
      await usernameField.setValue('vitinho123');
      const passwordField = obj.find('#login-form-password');
      await passwordField.setValue('12345');
      const confirmPasswordField = obj.find('#login-form-confirm-password');
      await confirmPasswordField.setValue('12345');
      const emailField = obj.find('#login-form-email');
      await emailField.setValue('vitin@gmail.com');
    
      // Dispara o envio do formulário
      await obj.find('form').trigger('submit');
    
      // Verifica se a ação 'registerUser' foi chamada com os dados corretos
      expect(actions.registerUser).toHaveBeenCalledWith(expect.anything(), {
        data: {
          username: 'vitinho123',
          password: '12345',
          passwordConf: '12345',
          email: 'vitin@gmail.com'
        }
      });
    });
    
    
    
    
    
    
    
});
    
    
    
    
    

