import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavigationBar from "@/components/NavigationBar.vue";
import { BootstrapVue } from "bootstrap-vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { nextTick } from "vue";
import { i18n } from "../../src/i18n";
import { router } from "../../src/router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

describe("NavigationBar.vue", () => {
  let state, store, getters, mutations, actions;
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
      signOut: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      mutations,
      getters,
      actions,
    });
  });

  it("should render navigation items", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
      i18n
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
      i18n
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
      i18n
    });

    expect(wrapper.find("b-nav-item-stub[id='username']").exists()).toBe(true);
  });

  it("should not render addtask item while it has no token", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
      i18n
    });

    expect(wrapper.find("b-nav-item-stub[id='addTask']").exists()).toBe(false);
  });

  it("should not render profilepage item while it has no token", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
      i18n
    });

    expect(wrapper.find("b-nav-item-stub[id='username']").exists()).toBe(false);
  });

  it("should render login item while it has no token", () => {
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      store,
      i18n
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
      i18n
    });

    expect(wrapper.find("b-nav-item-stub[id='login']").exists()).toBe(false);
  });

  // it("should sign out when button is triggered", async () => {
  //   store.state.token = "test";
  //   const wrapper = shallowMount(NavigationBar, {
  //     localVue,
  //     store,
  //     i18n,
  //     router
  //   });

  //   const signout = wrapper.find("b-button-stub[id='signout']");
  //   await signout.trigger("click");

  //   await nextTick();
  //   console.log(wrapper.html());
  //   expect(wrapper.find("b-nav-item-stub[id='login']").exists()).toBe(true);
  // });

  it("should render english when locale selecteed en", async ()=>{
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      i18n,
      router,
      store
    });

    wrapper.vm.$i18n.locale = "en";
    await nextTick();
    expect(wrapper.html()).toContain("Home");
  });

  it("should render turkish when locale selecteed tr", async ()=>{
    const wrapper = shallowMount(NavigationBar, {
      localVue,
      i18n,
      router,
      store
    });

    wrapper.vm.$i18n.locale = "tr";
    await nextTick();

    console.log(wrapper.html());
    expect(wrapper.html()).toContain("Anasayfa");
  });

  // it("should switch language to turkish when it is selected", async ()=>{
  //   const wrapper = shallowMount(NavigationBar, {
  //     localVue,
  //     i18n,
  //     router,
  //     store
  //   });

  //   wrapper.vm.$i18n.locale = "tr";
  //   await nextTick();
  //   await wrapper.find("b-dropdown-item-stub[id='en']").trigger("click");
  //   await nextTick()
  //   console.log(wrapper.html());
  //   // expect(wrapper.html()).toContain("Home");
  // });

  // it("should direct homepage when click home nav item", async () => {
  //   const wrapper = shallowMount(NavigationBar, {
  //     localVue,
  //     store,
  //     i18n,
  //     router,
  //   });

  //   //directing to test page
  //   wrapper.vm.$router.push({ name: "test" });

  //   await wrapper.find("router-link-stub[id='router']").trigger("click");
  //   await nextTick();

  //   expect(wrapper.vm.$router.history.current.name).toEqual("index");
  // });

  //following tests will be added
});
