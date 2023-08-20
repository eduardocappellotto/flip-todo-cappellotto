// @ts-nocheck

import { vi, beforeEach, expect, describe, it } from 'vitest';
import { useTodoStore } from '@/stores/todo';
import { setActivePinia, createPinia } from 'pinia'
import { useRoute } from 'vue-router';

vi.mock('vue-router', () => ({
    useRoute: vi.fn(),
}));

window.alert = vi.fn();


localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
};

describe('Todo Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks();
    });

    it('adds a new task', () => {
        const store = useTodoStore();
        const newTask = {
            id: 4,
            title: "New Task",
            description: "This is a new task.",
            createdAt: Date.now(),
            completedAt: null,
            completed: false,
        };

        store.addTask(newTask);
        expect(store.tasks).toContain(newTask);
    });

    it('handles errors when adding a task', () => {
        const store = useTodoStore();
        const newTask = {
            id: 4,
            title: "New Task",
            description: "This is a new task.",
            createdAt: Date.now(),
            completedAt: null,
            completed: false,
        };

        store.tasks.push = vi.fn(() => {
            throw new Error('Add Task Error');
        });

        const spy = vi.spyOn(window, 'alert').mockImplementation(vi.fn());
        store.addTask(newTask);
        expect(spy).toHaveBeenCalledWith('Erro ao criar a task!');
    });


    it('edits an existing task', () => {
        const store = useTodoStore();
        const editedTask = {
            ...store.tasks[0],
            title: "Edited Task",
        };

        store.editTask(editedTask);
        expect(store.tasks[0].title).toBe("Edited Task");
    });

    it('handles errors when editing a task', () => {
        const store = useTodoStore();
        const editedTask = {
            ...store.tasks[0],
            title: "Edited Task",
        };

        Object.defineProperty(store.tasks, 0, {
            set: () => {
                throw new Error('Edit Task Error');
            }
        });

        const spy = vi.spyOn(window, 'alert').mockImplementation(vi.fn());
        store.editTask(editedTask);
        expect(spy).toHaveBeenCalledWith('Erro ao editar a task!');
    });

    it('deletes a task', () => {
        const store = useTodoStore();
        const taskId = 1;
        store.deleteTask(taskId);
        expect(store.tasks).not.toContain(store.tasks.find(t => t.id === taskId));
    });


    it('handles errors when deleting a task', () => {
        const store = useTodoStore();

        // Mock splice method to throw an error
        store.tasks.splice = vi.fn(() => {
            throw new Error('Delete Task Error');
        });

        const spy = vi.spyOn(window, 'alert').mockImplementation(vi.fn());
        store.deleteTask(1); // you can use any valid task id here
        expect(spy).toHaveBeenCalledWith('Erro ao editar a task!');
    });


    it('toggles task completion', () => {
        const store = useTodoStore();
        const taskId = 2;
        const initialCompletion = store.tasks.find(t => t.id === taskId)?.completed;

        store.toggleTaskCompletion(taskId);
        expect(store.tasks.find(t => t.id === taskId)?.completed).not.toBe(initialCompletion);
    });

    it('sets completedAt when task is marked as completed', () => {
        const store = useTodoStore();
        const taskId = 3;
        const task = store.tasks.find(t => t.id === taskId);

        expect(task?.completed).toBe(false);

        store.toggleTaskCompletion(taskId);

        expect(task?.completed).toBe(true);
        expect(task?.completedAt).not.toBeNull();
    });

    it('resets completedAt when task is marked as not completed', () => {
        const store = useTodoStore();
        const taskId = 2;
        const task = store.tasks.find(t => t.id === taskId);

        expect(task?.completed).toBe(true);
        store.toggleTaskCompletion(taskId);

        expect(task?.completed).toBe(false);
        expect(task?.completedAt).toBeNull();
    });



    it('saves tasks to localStorage', () => {
        const store = useTodoStore();
        store.saveTasks();
        expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(store.tasks));
    });

    it('gets tasks from localStorage', () => {
        const tasks = [{
            id: 5,
            title: "Stored Task",
            description: "This is a stored task.",
            createdAt: Date.now(),
            completedAt: null,
            completed: false,
        }];
        localStorage.getItem.mockReturnValueOnce(JSON.stringify(tasks));

        const store = useTodoStore();
        store.getTasks();
        expect(store.tasks).toEqual(tasks);
    });

    it('handles errors when getting tasks from localStorage', () => {
        localStorage.getItem.mockReturnValueOnce('invalid json');
        const store = useTodoStore();

        const spy = vi.spyOn(window, 'alert').mockImplementation(vi.fn());
        store.getTasks();
        expect(spy).toHaveBeenCalledWith('Erro ao buscar tarefas no LocalStorage!');
    });

    it('retrieves the current task', () => {
        const taskId = 2;
        useRoute.mockReturnValueOnce({ params: { id: taskId } });
        const store = useTodoStore();
        const task = store.getCurrentTask();
        expect(task).toEqual(store.tasks.find(t => t.id === taskId));
    });

    it('retrieves the current when theres none', () => {
        useRoute.mockReturnValueOnce({ params: { id: null } });
        const store = useTodoStore();
        const task = store.getCurrentTask();
        expect(task).toEqual(null);
    });

    it('fetches completed tasks correctly', () => {
        const store = useTodoStore();
        const completed = store.tasks.filter(t => t.completed);
        expect(store.completedTasks).toEqual(completed);
    });

    it('fetches pending tasks correctly', () => {
        const store = useTodoStore();
        const pending = store.tasks.filter(t => !t.completed);
        expect(store.pendingTasks).toEqual(pending);
    });

    it('handles errors when saving tasks to localStorage', () => {
        localStorage.setItem.mockImplementationOnce(() => {
            throw new Error('Local Storage Error');
        });
        const store = useTodoStore();

        // Note: In a real-world scenario, you'd replace the alerts with a more test-friendly error handling mechanism
        const spy = vi.spyOn(window, 'alert').mockImplementation(vi.fn());
        store.saveTasks();
        expect(spy).toHaveBeenCalledWith('Erro ao salvar tarefas no LocalStorage!');
    });



});
