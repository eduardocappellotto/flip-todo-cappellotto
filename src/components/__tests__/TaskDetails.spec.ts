// @ts-nocheck

import { mount } from '@vue/test-utils';
import TaskDetails from '@/components/TaskDetails.vue';
import { expect, vi, describe, it, beforeAll } from 'vitest';
import { useTodoStore } from '@/stores/todo';
import { useRouter } from 'vue-router';

vi.mock('@/stores/todo', () => ({
    useTodoStore: vi.fn(),
}));

vi.mock('vue-router', () => ({ useRoute: vi.fn(), useRouter: vi.fn(), }))


describe('TaskDetails.vue', () => {

    beforeAll(() => {
        // Reset mocks here
        useTodoStore.mockReturnValue({
            addTask: vi.fn(),
            editTask: vi.fn((val) => { console.log(`val`, val) })
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    })
    it('displays the completion alert when a task is completed', () => {

        useTodoStore.mockReturnValue({
            getCurrentTask: () => {
                return {
                    title: 'Existing Task',
                    description: 'Existing Descriptionn',
                    completed: false,
                    completedAt: 0,
                    createdAt: Date.now(),
                    id: 1
                }
            },

        });

        const wrapper = mount(TaskDetails);
        expect(wrapper.find('.flex.items-center').exists()).toBe(true);
    });

    it('redirects to the task list if no task is present', async () => {

        useRouter.mockReturnValue({
            push: vi.fn()
        })

        useTodoStore.mockReturnValue({
            getCurrentTask: () => null,

        });

        const wrapper = mount(TaskDetails);
        await wrapper.vm.$nextTick();

        expect(useRouter().push).toHaveBeenCalledWith({ name: 'TaskList' });
    });

    it('deletes a task and redirects to the task list', async () => {
        useRouter.mockReturnValue({
            push: vi.fn()
        })
        useTodoStore.mockReturnValue({
            getCurrentTask: () => {
                return {
                    title: 'Existing Task',
                    description: 'Existing Descriptionn',
                    completed: false,
                    completedAt: 0,
                    createdAt: Date.now(),
                    id: 1
                }
            },
            deleteTask: vi.fn(),
        });
        const wrapper = mount(TaskDetails);
        await wrapper.vm.deleteTask();

        expect(useTodoStore().deleteTask).toHaveBeenCalledOnce
        expect(useRouter().push).toHaveBeenCalledWith({ name: 'TaskList' });
    });

    it('goBack redirects to the /tasks path', async () => {
        useRouter.mockReturnValue({
            push: vi.fn()
        })

        useTodoStore.mockReturnValue({
            getCurrentTask: () => {
                return {
                    title: 'Existing Task',
                    description: 'Existing Descriptionn',
                    completed: false,
                    completedAt: 0,
                    createdAt: Date.now(),
                    id: 1
                }
            },
        });

        const wrapper = mount(TaskDetails);
        await wrapper.find('#button-back').trigger('click');

        expect(wrapper.vm.goBack).toHaveBeenCalled
        expect(useRouter().push).toHaveBeenCalledWith('/tasks');
    });

    it('formats the completion date correctly when a task is completed', () => {

        const taskCompletedAt = Date.now()

        useTodoStore.mockReturnValue({
            getCurrentTask: () => {
                return {
                    title: 'Existing Task',
                    description: 'Existing Descriptionn',
                    completed: true,
                    completedAt: taskCompletedAt,
                    createdAt: Date.now(),
                    id: 1
                }
            },
        });

        const wrapper = mount(TaskDetails);

        const formattedDate = wrapper.vm.formatDate(new Date(taskCompletedAt));
        expect(wrapper.find('.flex.items-center p').text()).toBe(`Tarefa concluída em ${formattedDate}`);
    });

});
