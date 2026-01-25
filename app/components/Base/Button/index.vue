<script setup>
const props = defineProps({
    name: { type: String, required: true },
    icon: {
        type: String, required: false, default: null, validator(value, props) {
            return ['dark_retry', 'light_retry'].includes(value)
        }
    },
    color: {
        type: String, required: false, default: 'primary', validator(value, props) {
            return ['primary', 'secondary'].includes(value)
        }
    },
    clickFunction: { type: Function, required: false, default: null },
})

const colors = {
    'primary': 'text-white bg-[#262626] hover:bg-[#363636] focus:ring-[#363636]',
    'secondary': 'text-white bg-[#177DFF] hover:bg-[#4CA6FF] focus:ring-[#4CA6FF]',
    'third': 'text-[#121212] bg-[#FFF] hover:bg-[#DBDBDB] focus:ring-[#DBDBDB]'
}

const icons = {
    'dark_retry': { source: '/icons/dark_retry.svg', label: 'Dark Retry Icon' },
    'light_retry': { source: '/icons/light_retry.svg', label: 'Light Retry Icon' },
}

</script>

<template>
    <button @click="clickFunction" type="button"
        class="flex gap-[10px] px-[16px] py-[10px] bg-none rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-offset-[#121212] text-[20px] font-semibold"
        :class="colors[color]">
        {{ name }}
        <img v-if="icon" :src="icons[icon].source" :alt="icons[icon].label">
    </button>
</template>