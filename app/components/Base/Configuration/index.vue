<template>
    <div class="flex flex-nowrap justify-between gap-[10px] md:hidden">
        <BaseSelect v-model="selectedDifficult" :options="difficultOptions" />
        <BaseSelect v-model="selectedMode" :options="modeOptions" />
    </div>
    <div class="hidden md:flex md:gap-[16px]">
        <div class="flex items-center gap-[12px]">
            <p class="text-[16px] text-[#949497]">Difficulty:</p>
            <div class="flex items-center gap-[6px]">
                <BaseRadio v-model="selectedDifficultRadio" :options="difficultOptions" />
            </div>
        </div>
        <span class="border border-l-[1px] border-[#3A3A3A] inline-block height-full"></span>
        <div class="flex items-center gap-[12px]">
            <p class="text-[16px] text-[#949497]">Mode:</p>
            <div class="flex items-center gap-[6px]">
                <BaseRadio v-model="selectedModeRadio" :options="modeOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
const difficultOptions = [
    { id: 1, label: 'Easy' },
    { id: 2, label: 'Medium' },
    { id: 3, label: 'Hard' }
]
const modeOptions = [
    { id: 1, label: 'Timed (60s)' },
    { id: 2, label: 'Passage' }
]

const selectedDifficult = ref(difficultOptions[0])
const selectedMode = ref(modeOptions[0])
const selectedDifficultRadio = ref(difficultOptions[0])
const selectedModeRadio = ref(modeOptions[0])
</script>