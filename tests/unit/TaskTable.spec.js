import { shallowMount, createLocalVue } from "@vue/test-utils";
import TaskTable from "@/components/tasks/TaskTable.vue";
import { BootstrapVue } from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe("TaskTable.vue", () => {
  const taskList = [
    {
      id: 0,
      title: "test title",
      description: "test",
      status: false,
      dueDate: "08/27/2021T15:00",
    },
    {
      id: 1,
      title: "test title2",
      description: "test2",
      status: false,
      dueDate: "08/27/2021T15:00",
    },
    {
      id: 2,
      title: "test title3",
      description: "test3",
      status: true,
      dueDate: "08/27/2021T15:00",
    },
  ];
  const $route = { name: "index" };
  const $profileRoute = { name: "task" };
  it("renders task list items in index", () => {
    const wrapper = shallowMount(TaskTable, {
      localVue,
      mocks: {
        $route: $route,
      },
      propsData: {
        taskList,
      },
    });
    expect(wrapper.vm.taskList.length).toEqual(3);
  });

  it("renders task list items title correctly item by item in index", () => {
    const wrapper = shallowMount(TaskTable, {
      localVue,
      propsData: {
        taskList: taskList,
      },
      mocks: {
        $route: $route,
      },
    });
    expect(wrapper.vm.taskList[2].title).toEqual("test title3");
  });

  it("renders b-table element", () => {
    const wrapper = shallowMount(TaskTable, {
      localVue,
      mocks: {
        $route,
      },
      propsData: {
        taskList,
      },
    });
    expect(wrapper.contains("b-table-stub")).toBe(true);
  });

  it("renders changeStatus button in profile", () => {
    const wrapper = shallowMount(TaskTable, {
      localVue,
      propsData: {
        taskList: taskList,
      },
      mocks: {
        $route: $profileRoute,
      },
    });
    expect(wrapper.contains("changeStatus")).toBe(true);
  });

  //   it("does not render changeStatus button in index", () => {
  //     const wrapper = shallowMount(TaskTable, {
  //       propsData: {
  //         taskList: taskList,
  //       },
  //       mocks:{
  //         $route:$route
  //     }
  //     });
  //     expect(wrapper.vm.getElementById("changeStatusButton")).toBe(false);
  //   });
});
