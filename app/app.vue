<template>
  <div
      class="bg-[#121212] flex flex-col text-[#FFFFFF] p-4 md:p-8 xl:px-16 font-sora" :class="route.path === '/' ? 'h-screen max-h-screen' : 'h-full'">
    <NuxtLayout>
      <NuxtRouteAnnouncer/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
</script>