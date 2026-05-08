<template>
  <section
      class="flex flex-col gap-4 md:gap-5 border-b border-[#3A3A3A] pb-4 mt-8 md:mt-10.5 xl:mt-16 md:pb-5 xl:flex-row xl:items-end xl:justify-between flex-none">
    <BaseInformation :wpm="wpm" :accuracy="accuracy" :timer="timer"/>
    <BaseConfiguration/>
  </section>

  <section class="relative flex-1 min-h-0 mt-4">

    <div
        v-show="!isStarted"
        class="flex flex-col items-center gap-5 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
      <BaseButton name="Start Typing Test" color="secondary" :clickFunction="() => isStarted = true"
                  :isLoading="isLoading"/>
      <p class="text-[20px] text-nowrap font-semibold">Or click the text and start typing</p>
    </div>

    <div id="containerId" class="h-full overflow-y-hidden"
         :class="isStarted ? '' : 'blur-md'">
      <BaseText/>
    </div>
  </section>
  <BaseFooter/>
</template>

<script setup>
import {useWpm, useAccuracy, useIsStarted, useIsLoading} from "~/composables/useGameData.js";

const wpm = useWpm();
const accuracy = useAccuracy();
const isStarted = useIsStarted();
const isLoading = useIsLoading()
const timer = useState('timer', () => 0);
</script>