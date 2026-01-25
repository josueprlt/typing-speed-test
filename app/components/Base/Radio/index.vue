<script setup>
const props = defineProps({
    modelValue: { type: Object, required: true },
    options: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue'])

const selectOption = (option) => {
    emit('update:modelValue', option)
}
</script>

<template>
    <button v-for="option in options" :key="option.id" @click="selectOption(option)"
        class="px-[10px] py-[6px] cursor-pointer border rounded-[8px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-offset-[#121212] focus:ring-[#4CA6FF]"
        :class="modelValue.id === option.id ? 'border-[#4CA6FF]' : 'border-[#717178]'">
        {{ option.label }}
    </button>
</template>