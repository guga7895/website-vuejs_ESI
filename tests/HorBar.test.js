import { shallowMount } from '@vue/test-utils';
import HorBar from '@/components/chart/HorBar.vue'

describe('HorBar.vue', () => {
  it('style deve devolver a cor e o numero correto"', () => {
    const colorTest = "purple"
    const numberTest = 6
    const wrapper = shallowMount(HorBar, {
      propsData:{
        percentage: numberTest,
        color: colorTest
      }
    });
    console.log(wrapper.props)
    const resultadoEsperado = '{background-image: url('+colorTest+'), '+numberTest+'%"}';
    //expect(wrapper.vm.style).toBe(resultadoEsperado)
  });

});