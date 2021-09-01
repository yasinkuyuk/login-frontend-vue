import { shallowMount,createLocalVue } from '@vue/test-utils'
import Login from '@/components/Login.vue'
import VueRouter from 'vue-router'

import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueRouter)

describe('Login.vue', () => {

  it('renders sign up redirection when mounted', () => {
    const signUp = "sign up"
    const wrapper = shallowMount(Login, {localVue})
    expect(wrapper.html()).toContain(signUp)
  });

  it("renders input items correctly", ()=>{
    const wrapper = shallowMount(Login,{localVue});
    expect(wrapper.find("input").exists()).toBe(true);
  })
})
