<script lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue';
import { useTodoStore } from '@/stores/todo';

export default {

  setup() {
    const store = useTodoStore();

    const saveItems = () => {
      store.saveTasks()
    }

    onMounted(() => {
      window.addEventListener('beforeunload', saveItems)
      store.getTasks();
    });



    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', saveItems)
      saveItems()
    });

    return {};
  }
}


</script>

<template>
  <body class="min-h-screen">
    <header class="flex justify-center items-center p-4 md:p-8">
      <img @click="$router.push('/tasks')" class="w-32 h-16 md:w-48 md:h-24 hover:cursor-pointer"
        src="https://static.wixstatic.com/media/a4e47e_d69261d12cd24a3e9c80153d5106f83c~mv2.png/v1/crop/x_88,y_18,w_1313,h_662/fill/w_224,h_113,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo_Flip_Horizontal_Color.png"
        alt="Logo" srcset="">
      <h1 class="text-xl md:text-2xl font-bold">those <small class="text-xs"> tasks</small></h1>
    </header>

    <main class="container mx-auto px-4 md:px-8 max-w-[648px]">
      <RouterView />
    </main>

    <footer class="w-full h-16 bg-primary-flip border-t-2 border-white
            fixed left-0 bottom-0
            flex justify-center items-center
            text-white  
            ">
      Created by Eduardo Cappellotto 🚀
    </footer>
  </body>
</template>
