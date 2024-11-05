import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import YearSelect from '@/components/YearSelect.vue';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const StyledSelectMock = {
  props: ['options', 'value'],
  template: `
    <select class="year-selector" :value="value" @change="$emit('input', $event.target.value)">
      <option v-for="option in options" :key="option.key" :value="option.value">{{ option.value }}</option>
    </select>
  `,
};

describe('YearSelect.vue', () => {
  let store;
  let state;

  beforeEach(() => {
    state = {
      money: {
        years: [2023, 2022, 2021, 2020, 2019],
      },
      route: {
        params: {
          year: '2024'
        }
      }
    };

    store = new Vuex.Store({
      state,
      actions: {
        getYears: jest.fn(),
      },
    });
  });

  it('renderiza corretamente com 2024 e anos ordenados', () => {
    const wrapper = shallowMount(YearSelect, {
      store,
      localVue,
      components: {
        'styled-select': StyledSelectMock,
      },
    });

    expect(wrapper.exists()).toBe(true);

    const expectedYears = [2023, 2022, 2021, 2020, 2019];
    expect(wrapper.vm.options.map(option => option.key)).toEqual(expectedYears);
  });

  it('redireciona para a página inicial com o ano selecionado', async () => {
    const wrapper = shallowMount(YearSelect, {
      store,
      localVue,
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
      components: {
        'styled-select': StyledSelectMock,
      },
    });

    await wrapper.vm.selected(2024);

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home', params: { year: 2024 } });
  });
});