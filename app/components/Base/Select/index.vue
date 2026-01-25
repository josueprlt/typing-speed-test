<script setup>
const props = defineProps({
    modelValue: { type: Object, required: true },
    options: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const target = ref(null)

const selectOption = (option) => {
    emit('update:modelValue', option)
    isOpen.value = false
}
</script>

<template>
    <div ref="target" class="relative w-full">
        <button @click="isOpen = !isOpen" type="button"
            class="flex items-center justify-between gap-[10px] w-full h-[31px] px-6 py-5 border border-[#717178] bg-none rounded-[8px] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-offset-[#121212] focus:ring-[#717178]">
            <span class="text-[16px] font-medium w-full">{{ modelValue.label }}</span>
            <svg class="w-6 h-6 transition-transform duration-300 text-white" :class="{ 'rotate-180': isOpen }"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6" />
            </svg>
        </button>

        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen"
                class="absolute z-50 mt-3 overflow-hidden border bg-[#262626] border-zinc-800 rounded-[8px] shadow-2xl divide-y divide-[#3A3A3A]">

                <div v-for="option in options" :key="option.id" @click="selectOption(option)"
                    class="flex items-center gap-[12px] px-[20px] py-2 cursor-pointer hover:bg-white/5 transition-colors">

                    <div class="relative flex items-center justify-center w-[16px] h-[16px] rounded-full transition-colors"
                        :class="modelValue.id === option.id ? 'bg-[#4CA6FF]' : 'border border-white'">
                        <div v-if="modelValue.id === option.id" class="w-[6px] h-[6px] bg-[#121212] rounded-full"></div>
                    </div>

                    <span class="text-[16px] font-medium tracking-tight">
                        {{ option.label }}
                    </span>
                </div>
            </div>
        </Transition>
    </div>
</template>