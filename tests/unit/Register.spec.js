import { mount,shallowMount, createLocalVue } from "@vue/test-utils";
import Register from "@/components/Register.vue";
import { BootstrapVue } from "bootstrap-vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueRouter);

describe("Register.vue", () => {
  it("should render input items", () => {
    const wrapper = shallowMount(Register, { localVue });
    expect(wrapper.contains("input")).toBe(true);
  });

  it("should bind username data and text input", () => {
    const inputtedText = "username";
    const wrapper = shallowMount(Register, { localVue });
    const textInput = wrapper.find("input[type='text']");
    textInput.setValue(inputtedText);

    expect(wrapper.vm.username).toEqual(inputtedText);
  });

  it("should bind password and html input", () => {
    const inputtedText = "password";
    const wrapper = shallowMount(Register, { localVue });
    const textInput = wrapper.find("input[id='password']");
    textInput.setValue(inputtedText);

    expect(wrapper.vm.password).toEqual(inputtedText);
  });

  const inputs = [
    {
      username: "",
      password: "test",
      confirmed: "test",
    },
    {
      username: "test",
      password: "test",
      confirmed: "different",
    },
    {
      username: "test",
      password: "test",
      confirmed: "",
    },
    {
      username: "test",
      password: "",
      confirmed: "test",
    },
    {
      username: "test",
      password: "test",
      confirmed: "test",
    },
  ];

  //iterating test cases array
  for (let i = 0; i < 5; i++) {
    it(`should ${
      i == 4 ? "enable" : "disable"
    } button when conditions required -> test_case_${i + 1}`, () => {
      const wrapper = shallowMount(Register, { localVue });
      const username = wrapper.find("input[type='text']");
      username.setValue(inputs[i].username);
      const password = wrapper.find("input[id='password']");
      password.setValue(inputs[i].password);
      const confirmed = wrapper.find("input[id='confirm']");
      confirmed.setValue(inputs[i].confirmed);
      if (i == 4) {
        expect(wrapper.vm.buttonCheck).toBe(true);
      } else {
        expect(wrapper.vm.buttonCheck).toBe(false);
      }
    });
  }

  it("should disable the button when buttonCheck returns false", () => {
    const wrapper = shallowMount(Register, {localVue});

    //assigning the values which will disable button
    const username = wrapper.find("input[type='text']");
    username.setValue(inputs[0].username);
    const password = wrapper.find("input[id='password']");
    password.setValue(inputs[0].password);
    const confirmed = wrapper.find("input[id='confirm']");
    confirmed.setValue(inputs[0].confirmed);

    const buttonWrapper = wrapper.find("b-button-stub");
    const isDisabled = buttonWrapper.attributes().disabled;
    console.log(wrapper.vm.buttonCheck)

    expect(isDisabled).toBe("true");
  });

  it("should enable the button when buttonCheck returns true", () => {
    const wrapper = shallowMount(Register,{localVue});

    //assigning the values which will enable button
    const username = wrapper.find("input[type='text']");
    username.setValue(inputs[4].username);
    const password = wrapper.find("input[id='password']");
    password.setValue(inputs[4].password);
    const confirmed = wrapper.find("input[id='confirm']");
    confirmed.setValue(inputs[4].confirmed);

    const buttonWrapper = wrapper.find("b-button");
    const isDisabled = buttonWrapper.attributes().disabled;
    console.log(buttonWrapper.attributes());
    expect(isDisabled).toBe("false");
  });
});
