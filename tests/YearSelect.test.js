import { shallowMount } from '@vue/test-utils';
import YearSelect from '@/components/YearSelect.vue';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);


const StyledSelectMock = {
  props: ['options', 'value'],
  template: '<select><option v-for="option in options" :key="option.key">{{ option.value }}</option></select>',
};

describe('YearSelect.vue', () => {
  let store;
  let state;

  beforeEach(() => {
  
    state = {
      money: {
        years: [2021, 2020, 2019, 2018, 2023], 
      },
    };

    
    store = new Vuex.Store({
      state,
      actions: {
        getYears: jest.fn(), 
      },
    });
  });

  it('renderiza corretamente com o ano atual e anos ordenados', () => {
    const wrapper = shallowMount(YearSelect, {
      store, 
      components: {
        'styled-select': StyledSelectMock, 
      },
      mocks: {
        currentYear: 2024, 
      },
    });
  
    
    expect(wrapper.exists()).toBe(true);
  
   
    const expectedYears = [2024, 2023, 2021, 2020, 2019, 2018];
    expect(wrapper.vm.options.map(option => option.key)).toEqual(expectedYears);
  });
  
  it('redireciona para a página inicial com o ano selecionado', async () => {
    const wrapper = shallowMount(YearSelect, {
      store,
      mocks: {
        $router: {
          push: jest.fn(), 
        },
      },
      components: {
        'styled-select': StyledSelectMock, 
      },
    });

    
    await wrapper.vm.selected(2021);

    
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home', params: { year: 2021 } });
  });
});
