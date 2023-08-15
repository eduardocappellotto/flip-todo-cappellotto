import { defineStore } from 'pinia';
import { type Task } from '@/types/todo';


export const useTodoStore = defineStore('todo', {

    state: () => ({
        tasks: [
            {
                id: 1,
                title: "Study Vue.js 3",
                description: "Learn the basics of Vue.js 3 with the Composition API.",
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 1 week ago
                completedAt: null,
                completed: false,
            },
            {
                id: 2,
                title: "Create To-Do List App",
                description: "Build a To-Do List application using Vue.js 3, Vite and TypeScript.",
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
                completedAt: Date.now() - 1000 * 60 * 60 * 24,   // 1 day ago
                completed: true,
            },
            {
                id: 3,
                title: "Integrate with backend",
                description: "Integrate the app with a backend to persist tasks.",
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
                completedAt: null,
                completed: false,
            }
        ] as Task[]
    }),

    getters: {
        completedTasks(): Task[] {
            return this.tasks.filter((task: Task) => task.completed);
        },

        pendingTasks(): Task[] {
            return this.tasks.filter((task: Task) => !task.completed);
        }
    },

    actions: {
        addTask(task: Task): void {
            this.tasks.push(task);
        },

        editTask(editedTask: Task): void {
            const taskIndex = this.tasks.findIndex((task: Task) => task.id === editedTask.id);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = editedTask;
            }
        },

        deleteTask(taskId: number): void {
            const taskIndex = this.tasks.findIndex((task: Task) => task.id === taskId);
            if (taskIndex !== -1) {
                this.tasks.splice(taskIndex, 1);
            }
        },

        toggleTaskCompletion(taskId: number): void {
            const task = this.tasks.find((task: Task) => task.id === taskId);
            if (task) {
                task.completed = !task.completed;
            }
        },

        loadTasks(): void {
            const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
            this.tasks = tasks;
        },

        saveTasks(): void {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
});