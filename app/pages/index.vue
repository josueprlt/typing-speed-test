<template>
    <div class="flex flex-col h-screen max-h-screen overflow-hidden px-4 md:px-8">

        <BaseHeader />

        <main class="flex flex-col flex-1 min-h-0">

            <section
                class="flex flex-col gap-[16px] md:gap-[20px] border-b-[1px] border-[#3A3A3A] pb-[16px] mt-[32px] md:mt-[42px] xl:mt-[64px] md:pb-[20px] xl:flex-row xl:items-end xl:justify-between flex-none">
                <BaseInformation />
                <BaseConfiguration />
            </section>

            <section class="relative flex-1 min-h-0 overflow-hidden mt-4">

                <div
                    class="flex flex-col items-center gap-[20px] absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <BaseButton name="Start Typing Test" color="secondary" />
                    <p class="text-[20px] text-nowrap font-semibold">Or click the text and start typing</p>
                </div>

                <div class="h-full overflow-y-hidden blur-md">
                    <BaseText />
                </div>

            </section>
        </main>
    </div>
</template>

<script setup>
</script>