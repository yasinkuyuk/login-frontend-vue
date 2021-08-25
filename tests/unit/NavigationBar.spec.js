import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavigationBar from "@/components/NavigationBar.vue";
import { BootstrapVue } from "bootstrap-vue";
import Vuex from "vuex"
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

describe("NavigationBar.vue", () => {
  let getters;
  let mutations;
  let store;
  const username = "test";
  const public_id = "test";
  const token = "test";

  beforeEach(() => {
    getters = {
      username: () => username,
      public_id: () => public_id,
      token: () => token,
    };

    mutations = {
        SET_TOKEN: jest.fn(),
        SET_USERNAME: jest.fn(),
        SET_PUBLIC_ID: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      mutations
    });
  });

  it("should render navigation items", () => {
    const wrapper = shallowMount(NavigationBar, { 
        localVue,
        store,
    });
    expect(wrapper.contains("b-nav-item-stub")).toBe(true);
  });

  //following tests will be added
});
