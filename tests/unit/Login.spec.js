import { shallowMount,createLocalVue } from '@vue/test-utils'
import Login from '@/components/Login.vue'

import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('Login.vue', () => {
  it('renders sign up redirection when mounted', () => {
    const signUp = "sign up"
    const wrapper = shallowMount(Login, {localVue})
    expect(wrapper.html()).toContain(signUp)
  });

  it("renders input items correctly", ()=>{
    const wrapper = shallowMount(Login,{localVue});
    expect(wrapper.contains("input")).toBe(true);
  })
})
