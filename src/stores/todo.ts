import { defineStore } from 'pinia';
import type { Task } from '@/types/todo';
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue';


export const useTodoStore = defineStore('todo', () => {
    const tasks = ref<Task[]>([{
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
    }]);
    const route = useRoute();

    const completedTasks = computed(() => tasks.value.filter(task => task.completed));
    const pendingTasks = computed(() => tasks.value.filter(task => !task.completed));

    function getCurrentTask(): Task | null {
        if (route.params.id) {
            let taskFind = tasks.value.find(task => Number(route.params.id) === task.id);
            if (taskFind) return taskFind;
        }
        return null;
    }

    function addTask(task: Task): void {
        try {
            tasks.value.push(task);
            alert('Task criada com sucesso!')
        } catch (error) {
            alert('Erro ao criar a task!')
        }
    }

    function editTask(editedTask: Task): void {
        try {
            const taskIndex = tasks.value.findIndex(task => task.id === editedTask.id);
            if (taskIndex !== -1) {
                tasks.value[taskIndex] = editedTask;
            }

            alert('Task editada com sucesso!')
        } catch (error) {
            alert('Erro ao editar a task!')
        }

    }

    function deleteTask(taskId: number): void {

        try {
            const taskIndex = tasks.value.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks.value.splice(taskIndex, 1);
            }

            alert('Task excluída com sucesso!')
        } catch (error) {
            alert('Erro ao editar a task!')
        }

    }



    function toggleTaskCompletion(taskId: number): void {
        const task = tasks.value.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;

            if (task.completed) {
                task.completedAt = Number(Date.now())
            } else {
                task.completedAt = null
            }
        }
    }

    function saveTasks(): void {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks.value));
        } catch (error) {
            alert('Erro ao salvar tarefas no LocalStorage!');
        }
    }

    function getTasks(): void {

        try {
            tasks.value = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        } catch (error) {

            alert('Erro ao buscar tarefas no LocalStorage!');
        }

    }

    return {
        tasks,
        completedTasks,
        pendingTasks,
        getCurrentTask,
        addTask,
        editTask,
        deleteTask,
        toggleTaskCompletion,
        saveTasks,
        getTasks
    };
});
