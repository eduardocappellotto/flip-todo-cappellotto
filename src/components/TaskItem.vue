<template>
    <div
        class="mb-4 hover:border-2   hover:border-primary-flip box-border border-2 rounded-lg overflow-hidden bg-white px-6 py-8 w-full">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <span class="text-xl"
                    :class="{ 'line-through': task.completed, 'transition': true, 'duration-500': true, 'ease-in-out': true }">{{
                        task.title }}</span>
                <span class=" text-xs">Criado em {{ formatDate(new Date(task.createdAt)) }}</span>
                <span class=" text-xs" v-if="task.completedAt">Concluído em {{ formatDate(new Date(task.completedAt))
                }}</span>
            </div>

            <div class="text-end">
                <button @click="goToTaskDetails()" id="button-details"
                    class="ml-auto rounded text-white font-bold px-4 py-2  m-2 bg-primary-flip">
                    Detalhes</button>
                <button @click="toggleTaskCompletion" id="button-flip-unflip"
                    class="	 ml-auto rounded text-white font-bold px-4 py-2 m-2 bg-primary-flip ">{{
                        task.completed
                        ?
                        'Un-Flip' : 'Flip' }}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { type Task } from '@/types/todo';
import { useRouter } from 'vue-router';
import formatDate from '@/functions/dateFormat'

export default {
    name: 'TaskItem',
    props: {
        task: {
            type: Object as () => Task,
            required: true
        }
    },
    setup(props) {
        const { task } = toRefs(props);

        const store = useTodoStore();
        const router = useRouter();

        const toggleTaskCompletion = (): void => {
            store.toggleTaskCompletion(task.value.id!);
        };

        async function goToTaskDetails() {
            router.push({ path: `/task/${task.value.id}` })
        }

        return {
            toggleTaskCompletion,
            formatDate,
            goToTaskDetails,
            task
        };
    }
};
</script>

<style lang="scss"></style>
