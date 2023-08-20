<template>
    <TaskForm />
    <div class="flex flex-col items-center m-auto mb-20">
        <small class="mb-6">Clique em 'Details' para ver detalhes</small>
        <TaskItem v-for="task in tasks" :key="task.id!" :task="task" />
    </div>
</template>
  
<script lang="ts">

import { useTodoStore } from '@/stores/todo';
import TaskItem from '@/components/TaskItem.vue'
import TaskForm from '@/components/TaskForm.vue';

export default {
    name: 'TaskList',
    components: {
        TaskItem,
        TaskForm
    },

    setup() {
        const store = useTodoStore();
        return {
            tasks: store.tasks
        };
    }
};
</script>
  
<style lang="scss"></style>
  