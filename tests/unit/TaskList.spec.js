import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex'
import TaskList from "@/components/tasks/TaskList.vue";
import TaskTable from "@/components/tasks/TaskTable.vue";
import { BootstrapVue } from 'bootstrap-vue'


const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("TaskList.vue", () => {
  let getters;
  let store;
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
    {
      id: 3,
      title: "test title4",
      description: "test4",
      status: true,
      dueDate: "08/27/2021T15:00",
    },
    {
      id: 4,
      title: "test title4",
      description: "test4",
      status: true,
      dueDate: "08/27/2021T15:00",
    },
  ];

  beforeEach(() => {
    getters = {
      taskList: () => taskList,
      taskListSize: () => taskList.length,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  const $route = {name:"index"}

  it("renders all task list items", () => {
      const wrapper = shallowMount(TaskList, {
          store,
          localVue,
          mocks:{
              $route
            }
        });
      expect(wrapper.vm.taskListSize).toEqual(5);
  });

  it("renders TaskTable component", () => {
      const wrapper = shallowMount(TaskList,{
          store,
          localVue,
          mocks:{
            $route
          }
        });
        expect(wrapper.contains(TaskTable));
  });

  it("distributes completed tasks correctly", ()=>{
      const wrapper = shallowMount(TaskList, {
          store,
          localVue,
          mocks: {
              $route
          }
      });

      expect(wrapper.vm.completedTasks.length).toEqual(3);
  });

  it("distributes uncompleted tasks correctly", ()=>{
    const wrapper = shallowMount(TaskList, {
        store,
        localVue,
        mocks: {
            $route
        }
    });

    expect(wrapper.vm.unCompletedTasks.length).toEqual(2);
})
});
