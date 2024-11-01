import { shallowMount } from '@vue/test-utils';
import HorBar from '@/components/chart/HorBar.vue'

describe('HorBar.vue', () => {
  it('style deve devolver a cor e o numero correto"', () => {
    const wrapper = shallowMount(HorBar, {
      propsData:{
        percentage: 15,
        color: "purple"
      }
    });
    console.log(wrapper.props)
    expect(wrapper.vm.style.toString()).toBe(({"background-image": "url(purple)", "width": "15%"}).toString())
  });

});