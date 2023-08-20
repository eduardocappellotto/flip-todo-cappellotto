// @ts-nocheck

import { mount } from '@vue/test-utils';
import TaskList from './TaskList.vue';
import TaskItem from '@/components/TaskItem.vue';
import TaskForm from '@/components/TaskForm.vue';
import { describe, expect, test } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import type { Task } from '@/types/todo';
import router from '@/router';
import { nextTick } from 'vue';

const tasksMock: Task[] = [{
    id: 1,
    title: "Study Vue.js 3",
    description: "Learn the basics of Vue.js 3 with the Composition API.",
    createdAt: 1691591475855,
    completedAt: null,
    completed: false,
},
{
    id: 2,
    title: "Create To-Do List App",
    description: "Build a To-Do List application using Vue.js 3, Vite and TypeScript.",
    createdAt: 1691591475857,
    completedAt: 1691599475859,
    completed: true,
},
{
    id: 3,
    title: "Integrate with backend",
    description: "Integrate the app with a backend to persist tasks.",
    createdAt: 1691591475856,
    completedAt: null,
    completed: false,
}]


describe('TaskList', () => {
    test('renders TaskList component', async () => {

        const wrapper = mount(TaskList, {
            global: {
                plugins: [createTestingPinia(), router]
            },
        });

        expect(wrapper.findComponent(TaskForm).exists()).toBe(true);

        wrapper.vm.tasks = tasksMock
        await nextTick()

        const taskItems = wrapper.findAllComponents(TaskItem);
        expect(taskItems.length).toBe(tasksMock.length);

        taskItems.forEach((taskItem: Task, index: number) => {
            expect(taskItem.props('task')).toStrictEqual(tasksMock[index]);
        });
    });

    test('renders no TaskItem components when no tasks are available', () => {
        const wrapper = mount(TaskList, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        todo: {
                            tasks: []
                        }
                    }
                }), router],
            },
        });

        expect(wrapper.findAllComponents(TaskItem).length).toBe(0);
    });

    test('renders static texts', () => {
        const wrapper = mount(TaskList, {
            global: {
                plugins: [createTestingPinia(), router],
            },
        });
        expect(wrapper.text()).toContain("Clique em 'Details' para ver detalhes");
    });
});