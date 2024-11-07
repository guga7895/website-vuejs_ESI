import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'
import DynamicTable from '@/components/DynamicTable.vue'
import { formatCur } from '@/utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
Vue.prototype.$t = (key) => key

const router = new VueRouter()

describe('DynamicTable.vue', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      money: {
        page: {
          data: [
            {
              code: '001',
              ds_projeto_atividade: 'Projeto teste do gustavo!',
              sld_orcado_ano: 1000,
              vl_orcado_ano: 2000,
              vl_atualizado: 1500,
              vl_empenhadoliquido: 500,
              vl_liquidado: 300,
              ds_orgao: 'Organização do gustavo'
            }
          ],
          totalRows: 1
        }
      },
      route: {
        params: {
          page: 0
        }
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('renderiza os cabeçalhos da tabela corretamente', () => {
    const wrapper = shallowMount(DynamicTable, { store, localVue, router })
    const headers = wrapper.findAll('th')
    expect(headers.at(0).text()).toBe('description')
    expect(headers.at(1).text()).toBe('planned')
    expect(headers.at(2).text()).toBe('committed')
    expect(headers.at(3).text()).toBe('finished')
    expect(headers.at(4).text()).toBe('body')
  })

  it('renderiza as linhas da tabela corretamente', () => {
    const wrapper = shallowMount(DynamicTable, { store, localVue, router })
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    const columns = rows.at(0).findAll('td')
    expect(columns.at(0).text()).toBe('Projeto teste do gustavo!')
    expect(columns.at(1).text()).toBe(formatCur(1500))
    expect(columns.at(2).text()).toBe(formatCur(500))
    expect(columns.at(3).text()).toBe(formatCur(300))
    expect(columns.at(4).text()).toBe('Organização do gustavo')
  })

  it('calcula a última página corretamente', () => {
    const wrapper = shallowMount(DynamicTable, { store, localVue, router })
    expect(wrapper.vm.lastPage).toBe(0)
  })

  it('calcula a página atual corretamente', () => {
    const wrapper = shallowMount(DynamicTable, { store, localVue, router })
    expect(wrapper.vm.currPage).toBe(0)
  })
})