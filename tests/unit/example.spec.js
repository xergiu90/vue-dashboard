import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import store from '@/store/store'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Home, {
      propsData: { msg },
      store
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
