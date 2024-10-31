import { shallowMount } from '@vue/test-utils';
import HorBar from '@/components/chart/HorBar.vue'

describe('HorBar.vue', () => {
  it('deve conter titulo igual a "Titulo Teste"', () => {
    const titulo = "Titulo Teste"
    const wrapper = shallowMount(HorBar, {
      props:{
        percentage: 15,
        color: "red",
        'extraclass': "Teste",
        absolute: ["Teste", 15],
        title: titulo
      }
    });
    const div = wrapper.find("div")
    expect(div.text()).toContain(titulo)
  });

});