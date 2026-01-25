<template>
    <BaseHeader />

    <section class="relative flex flex-col items-center gap-[24px] mt-[70px] md:mt-[80px] md:gap-[32px] xl:mt-[64px]">
        <img class="absolute top-7 left-2 size-[21px] md:size-[32px]" src="/icons/asterix.svg" alt="Asterix Icon">
        <img class="absolute -bottom-14 right-6 size-[39px] md:size-[74px]" src="/icons/star.svg" alt="Star Icon">
        <div class="size-[48px] rounded-full 
                    ring-[10px] ring-[#18281C]
                    ring-offset-[10px] ring-offset-[#23492F] 
                    flex items-center justify-center">
            <img src="/icons/check_circle.svg" alt="Check Circle" />
        </div>

        <div class="flex flex-col items-center gap-[10px] mt-[16px]">
            <h1 class="text-[24px] font-bold md:text-[40px]">Test Complete!</h1>
            <p class="text-[#949497] text-[16px] text-center md:text-[18px] mt-[8px]">Solid run. Keep pushing to beat
                your high score.</p>
        </div>

        <div class="flex flex-col justify-center items-center w-full gap-[16px] md:flex-row md:gap-[20px] md:mb-[32px] md:mt-[20px]">
            <div class="flex flex-col w-full gap-[12px] px-[24px] py-[16px] rounded-[8px] border border-[#3A3A3A] max-w-[350px]">
                <p class="text-[20px] text-[#949497]">WPM:</p>
                <p class="text-[24px] font-bold">85</p>
            </div>
            <div class="flex flex-col w-full gap-[12px] px-[24px] py-[16px] rounded-[8px] border border-[#3A3A3A] max-w-[350px]">
                <p class="text-[20px] text-[#949497]">Accuracy:</p>
                <p class="text-[24px] font-bold text-[#D64D5B]">90%</p>
            </div>
            <div class="flex flex-col w-full gap-[12px] px-[24px] py-[16px] rounded-[8px] border border-[#3A3A3A] max-w-[350px]">
                <p class="text-[20px] text-[#949497]">Characters:</p>
                <p class="text-[24px] font-bold text-[#717178]"><span class="text-[#4DD67B]">120</span>/<span class="text-[#D64D5B]">5</span></p>
            </div>
        </div>

        <BaseButton name="Go Again" icon="dark_retry" color="third" />
    </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { confetti } from "@tsparticles/confetti";

let interval = null;

onMounted(() => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 15 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
});

onUnmounted(() => {
    if (interval) clearInterval(interval);
});
</script>