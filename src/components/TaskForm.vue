<template>
    <form @submit.prevent="submitForm" v-if="taskForm">
        <div class="mb-3 flex flex-col m-auto">
            <label for="title" class="font-bold">Tarefa</label>
            <input required v-model="taskForm.title" placeholder="Criar um Todo list"
                class="flex-grow p-2 border rounded w-full my-2" />
            <label for="description" class="font-bold">Descrição</label>
            <input id="description" required v-model="taskForm.description"
                placeholder="Construirei um todo list em vue 3 usando typescript"
                class="flex-grow p-2 border rounded w-full my-2" />

            <div v-if="taskForm.id" class="flex flex-col items-center">
                <button type="submit" id="button-save"
                    class="my-2 p-2 bg-primary-flip hover:opacity-90 text-white rounded w-full">Salvar</button>
                <button @click.prevent="deleteTask" id="button-delete"
                    class="my-2 p-2 bg-red-600 hover:opacity-90 text-white rounded w-full">Excluir Tarefa</button>
                <button @click.prevent="backToListing" id="button-back"
                    class="my-2 p-2 bg-transparent font-bold underline hover:opacity-90 text-black rounded w-20">Voltar</button>
            </div>
            <button v-else type="submit" id="button-add"
                class="my-4 p-2 bg-primary-flip hover:opacity-90 text-white rounded">Adicionar</button>
        </div>
    </form>
</template>
  
<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { Task } from '@/types/todo';
import { useTodoStore } from '@/stores/todo';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'TaskForm',

    setup() {
        const taskForm = ref<Task>({
            title: '',
            description: '',
            completed: false,
            completedAt: 0,
            createdAt: 0,
            id: null,
        });

        const store = useTodoStore();
        const route = useRoute();
        const router = useRouter();

        const backToListing = () => {
            router.push('/tasks');
        };

        onBeforeMount(async () => {
            try {
                if (store.getCurrentTask() && store.getCurrentTask() !== null) {
                    taskForm.value = store.getCurrentTask()!;
                }
            } catch (error) {
                taskForm.value = {
                    title: '',
                    description: '',
                    completed: false,
                    completedAt: 0,
                    createdAt: 0,
                    id: null,
                }
            }


        });

        function generateId() {
            if (!store || !Array.isArray(store.tasks)) {
                return 1;
            }
            return store.tasks.length > 0 ? store.tasks.length + 1 : 1;
        }


        const deleteTask = () => {
            store.deleteTask(taskForm.value.id!);
            backToListing();
        };

        const submitForm = () => {

            if (route.params?.id) {
                submitEdit();
            } else {
                submitCreate();
            }
        };

        const submitCreate = () => {

            if (taskForm.value.title.trim() && taskForm.value.description.trim()) {
                store.addTask({
                    ...taskForm.value,
                    createdAt: Date.now(),
                    id: generateId(),
                });
                taskForm.value.title = '';
                taskForm.value.description = '';
            }
        };

        const submitEdit = () => {

            if (taskForm.value.title.trim() && taskForm.value.description.trim()) {
                store.editTask(
                    taskForm.value,
                );
            }
        };

        return {
            taskForm,
            submitForm,
            backToListing,
            deleteTask,
        };
    },
};
</script>
  
