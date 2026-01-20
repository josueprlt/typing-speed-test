<template>
    <div class="container">
        <h1>Typing Speed Test</h1>
        <p class="text-red-500">{{ randomParagraph }}</p>
    </div>
</template>

<script setup>
const { data } = await useAsyncData('count', (_nuxtApp, { signal }) => $fetch('https://api.adviceslip.com/advice', { signal }))
const response = JSON.parse(data.value);
const randomParagraph = response.slip.advice;
console.log(randomParagraph);

</script>