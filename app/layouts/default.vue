<template>
  <div class="flex flex-col px-4 md:px-8" :class="route.path === '/' ? 'h-screen max-h-screen overflow-y-hidden' : 'min-h-screen'">
    <BaseHeader/>

    <main class="flex flex-col flex-1 min-h-0">
      <slot/>
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
</script>