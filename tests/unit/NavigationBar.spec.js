import { shallowMount, createLocalVue,mount } from "@vue/test-utils";
import NavigationBar from "@/components/NavigationBar.vue";
import { BootstrapVue } from "bootstrap-vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

describe("NavigationBar.vue", () => {
  let state, store, getters, mutations,actions;

  beforeEach(() => {
    state = {
      token: "",
      username: "",
      public_id: "",
    };

    getters = {
      username: () => state.username,
      public_id: () => state.public_id,
      token: () => state.token,
    };

    mutations = {
      SET_USERNAME: jest.fn(),
      SET_TOKEN: jest.fn(),
      SET_PUBLIC_ID: jest.fn(),
    };

    actions = {
      signOut: jest.fn()
    };

    store = new Vuex.Store({
      state,
      mutations,
      getters,
      actions
    });
  });

  it("should render navigation items", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });
    expect(wrapper.find("b-nav-item-stub").exists()).toBe(true);
  });

  it("should render add task item while it has token", () => {
    store.state.token = "test";
    store.state.username = "test";
    store.state.public_id = "test";

    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });

    expect(wrapper.find("b-nav-item-stub[id='addTask']").exists()).toBe(true);
  });

  it("should render profile page item while it has token", () => {
    store.state.token = "test";
    store.state.username = "test";
    store.state.public_id = "test";

    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });

    expect(wrapper.find("b-nav-item-stub[id='username']").exists()).toBe(true);
  });

  it("should not render addtask item while it has no token", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });

    expect(wrapper.find("b-nav-item-stub[id='addTask']").exists()).toBe(false);
  });

  it("should not render profilepage item while it has no token", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });

    expect(wrapper.find("b-nav-item-stub[id='username']").exists()).toBe(false);
  });

  it("should render login item while it has no token", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });

    expect(wrapper.find("b-nav-item-stub[id='login']").exists()).toBe(true);
  });

  it("should not render login item while it has token", () => {
    store.state.token = "test";
    store.state.username = "test";
    store.state.public_id = "test";
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
      stubs: ["b-nav-item"],
    });

    expect(wrapper.find("b-nav-item-stub[id='login']").exists()).toBe(false);
  });

  it("should sign out when button is triggered", ()=>{
    store.state.token = "test";
    store.state.username = "test";
    store.state.public_id = "test";
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
    });

    const signout = wrapper.find("b-button-stub[id='signout']");
    signout.trigger("click");

    expect(wrapper.find("b-nav-item-stub[id='login']").exists()).toBe(true);
  });

  // it("should direct homepage when click home nav item", () => {
  //   const $route ={name:"index"};
  //   const wrapper = shallowMount(NavigationBar, {
  //     localVue,
  //     store,
  //     mocks:{
  //       $route
  //     }
  //   });

  //   // const home = wrapper.find("b-nav-item-stub[id='home']");
  //   // console.log(wrapper.vm.$route);
  //   // home.trigger("click");
  //   const  test = wrapper.find("b-nav-item-stub[id='test']");
  //   console.log(test);
  // });

  //following tests will be added
});
