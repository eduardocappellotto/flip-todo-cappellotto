// @ts-nocheck

import { mount } from '@vue/test-utils';
import TaskForm from '../TaskForm.vue';
import { vi, expect, describe, it, beforeAll } from 'vitest';
import { useTodoStore } from '@/stores/todo';
import { useRoute, useRouter } from 'vue-router';
import { afterEach } from 'node:test';

vi.mock('@/stores/todo', () => ({
    useTodoStore: vi.fn(),
}));


describe('TaskForm.vue', () => {

    beforeAll(() => {
        vi.mock('vue-router', () => ({
            useRoute: vi.fn(),
            useRouter: vi.fn()
        }));

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

    it('initializes with default values', () => {

        const wrapper = mount(TaskForm);
        const inputTitle = wrapper.find('input[placeholder="Criar um Todo list"]');
        const inputDescription = wrapper.find('input[placeholder="Construirei um todo list em vue 3 usando typescript"]');

        expect(inputTitle.element.value).toBe('');
        expect(inputDescription.element.value).toBe('');
    });

    it('renders only the "Adicionar" button without a task id', () => {

        const wrapper = mount(TaskForm);
        expect(wrapper.find('#button-add').text()).toBe('Adicionar');
        expect(wrapper.find('#button-save').exists()).toBe(false);
    });

    it('renders "Salvar", "Excluir Tarefa", and "Voltar" buttons with a task id', async () => {


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
            }
        });

        const wrapper = mount(TaskForm);

        expect(wrapper.find('#button-delete').exists()).toBe(true);
        expect(wrapper.find('#button-back').exists()).toBe(true);
        expect(wrapper.find('#button-save').text()).toBe('Salvar');

    });
    it('navigates to "/tasks" when "Voltar" button is clicked', async () => {
        useRoute.mockReturnValue({
            params: {
                id: 1
            }
        });

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
            }
        });

        useRouter.mockReturnValue({
            push: vi.fn(),
        })

        const wrapper = mount(TaskForm);

        await wrapper.find('#button-back').trigger('click');
        expect(useRouter().push).toHaveBeenCalledWith('/tasks');
    });
    it('does not submit with empty title or description', async () => {

        useRoute.mockReturnValue({
            params: {
                id: null
            }
        });
        const wrapper = mount(TaskForm);

        wrapper.vm.taskForm = {
            title: '',
            description: '',
            completed: false,
            completedAt: 0,
            createdAt: Date.now(),
            id: null
        }

        useTodoStore.mockReturnValue({
            addTask: vi.fn()
        })

        await wrapper.find('form').trigger('submit.prevent');
        expect(useTodoStore().addTask).not.toHaveBeenCalled();
    });
    it('adds a new task when title and description are filled and submit button is clicked', async () => {



        const wrapper = mount(TaskForm);

        wrapper.vm.taskForm = {
            ...wrapper.vm.taskForm,
            title: 'Test Title',
            description: 'Test Description',
        }

        await wrapper.find('form').trigger('submit.prevent');

        expect(useTodoStore().addTask).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Test Title',
            description: 'Test Description'
        }));
    });

    it('edits an existing task when title and description are modified and submit button is clicked', async () => {

        useRoute.mockReturnValue({
            params: {
                id: 1
            }
        });

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
            editTask: vi.fn()
        });

        const wrapper = mount(TaskForm);


        await wrapper.find('input[placeholder="Criar um Todo list"]').setValue('Updated Title');
        await wrapper.find('input[placeholder="Construirei um todo list em vue 3 usando typescript"]').setValue('Updated Description');

        // Trigger submit
        await wrapper.vm.submitForm();

        // Assert the store's editTask method was called with updated task data.
        expect(useTodoStore().editTask).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Updated Title',
            description: 'Updated Description'
        }));


    });

    it('deletes an existing task when the delete button is clicked', async () => {
        // Mock getCurrentTask to return a task, mimicking that a task is being edited.

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
            editTask: vi.fn(),
            deleteTask: vi.fn()
        });

        const wrapper = mount(TaskForm);

        // Click the delete button
        await wrapper.find('#button-delete').trigger('click');

        // Assert that the store's deleteTask method was called with the right id.
        expect(useTodoStore().deleteTask).toHaveBeenCalledWith(1);
    });


});

