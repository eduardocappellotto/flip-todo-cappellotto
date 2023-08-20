// @ts-nocheck

import { mount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';
import { nextTick } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { useRouter } from 'vue-router';
import { vi, expect, describe, afterEach, beforeAll } from 'vitest';

vi.mock('@/stores/todo', () => ({
    useTodoStore: vi.fn(),
}));

vi.mock('vue-router', () => ({ useRoute: vi.fn(), useRouter: vi.fn(), }))


describe('TaskItem.vue', () => {

    let taskMock = {
        title: 'Existing Task',
        description: 'Existing Descriptionn',
        completed: false,
        completedAt: 0,
        createdAt: Date.now(),
        id: 1
    }

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

    it('renders the task title correctly', () => {
        const wrapper = mount(TaskItem, {
            props: {
                task: taskMock,
            },
        });

        expect(wrapper.text()).toContain(taskMock.title);
    });

    it('toggles task completion when Flip or Un-Flip button is clicked', async () => {
        const toggleMock = vi.fn();

        useTodoStore.mockReturnValue({
            toggleTaskCompletion: toggleMock,
        });

        const wrapper = mount(TaskItem, {
            props: {
                task: taskMock,
            },
        });

        await wrapper.find('#button-flip-unflip').trigger('click');
        expect(toggleMock).toHaveBeenCalledWith(taskMock.id);

        // Suppose the task was completed
        taskMock.completed = true;
        await wrapper.setProps({ task: taskMock });
        await nextTick();

        await wrapper.find('#button-flip-unflip').trigger('click');
        expect(toggleMock).toHaveBeenCalledTimes(2);
    });

    it('navigates to task details when Detalhes button is clicked', async () => {
        const pushMock = vi.fn();

        useRouter.mockReturnValue({
            push: pushMock,
        });

        const wrapper = mount(TaskItem, {
            props: {
                task: taskMock,
            },
        });

        await wrapper.find('#button-details').trigger('click');
        expect(pushMock).toHaveBeenCalledWith({ path: `/task/${taskMock.id}` });
    });
});
