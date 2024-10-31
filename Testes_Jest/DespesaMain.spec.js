import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DespesaMain from '../src/components/DespesaMain.vue';


// Criação do mock do store do Vuex
const store = new Vuex.Store({
  state: {
    pointInfo: {
      sld_orcado_ano: 1000,
      vl_orcado_ano: 500,
      vl_atualizado: 1200,
      vl_empenhadoliquido: 300,
      vl_liquidado: 400,
      dataextracao: '2024-01-01',
    },
  },
});

describe('DespesaMain.vue', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(DespesaMain, {
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
