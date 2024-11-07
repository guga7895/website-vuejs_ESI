import { shallowMount } from '@vue/test-utils';
import HorBar from '@/components/chart/HorBar.vue';

describe('HorBar.vue', () => {
  it('style deve devolver a cor e o numero correto"', () => {
    const wrapper = shallowMount(HorBar, {
      propsData: {
        percentage: 15,
        color: "purple"
      }
    });
    expect(wrapper.vm.style).toEqual({ width: '15%', 'background-image': 'url(purple)' });
  });

  it('a tooltip nao deve ser mostrada ao carregar"', () => {
    const wrapper = shallowMount(HorBar, {
      propsData: {
        percentage: 15,
        color: "red",
        extraclass: "map",
        absolute: "R$ 500", 
        title: "Teste"
      }
    });
    const classDivDesejada = "div.inline-block.absolute.z-10.py-2.px-3.text-sm.font-medium.text-white.bg-gray-900.rounded-lg.shadow-sm.opacity-0.transition-opacity.duration-300.tooltip";
    const  divToolTip = wrapper.find(`.${classDivDesejada}`);
    expect(divToolTip.exists()).toBe(false);
  });
});