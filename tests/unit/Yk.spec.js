import { shallowMount } from "@vue/test-utils";
import YK from "@/components/Yk.vue";
import {nextTick} from "vue"

describe("YK.vue", ()=>{
    it("should render button",()=>{
        const wrapper = shallowMount(YK, {});
        expect(wrapper.find("button").exists()).toBe(true);
    });

    it("increment count when button triggered.", async ()=>{
        const wrapper = shallowMount(YK, {});
        const button = wrapper.find("button");
        console.log(wrapper.vm.$data.count);
        button.trigger("click");
        await nextTick();
        expect(wrapper.html()).toContain("0");
    });
});