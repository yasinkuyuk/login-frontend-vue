import { mount,createLocalVue, shallowMount } from "@vue/test-utils";
import AddTask from "@/components/tasks/AddTask.vue";
import VueRouter from 'vue-router'
import { BootstrapVue } from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueRouter)

describe("AddTask.vue",()=>{
    it("should render 4 input elements",()=>{
        let checkValue = false
        const wrapper = mount(AddTask,{
            localVue
        });
        if(wrapper.find("input[id='title']")){
            if(wrapper.find("input[id='description']")){
                if(wrapper.find("input[id='date']")){
                    if(wrapper.find("input[id='time']")){
                        checkValue = true;
                    }
                }
            }
        }
        expect(checkValue).toBe(true);
    });
    const test = "test";

    it("should bind title with input", ()=>{
        const wrapper = shallowMount(AddTask, {localVue});
        const title = wrapper.find("input[id='title']");
        title.setValue(test);
        expect(wrapper.vm.title).toEqual(test);
    });

    it("should bind description with inputs", ()=>{
        const wrapper = shallowMount(AddTask, {localVue});
        const description = wrapper.find("input[id='description']");
        description.setValue(test);
        expect(wrapper.vm.description).toEqual(test);
    });
})