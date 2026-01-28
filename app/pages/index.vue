<template>
    <div class="flex flex-col h-screen max-h-screen overflow-hidden px-4 md:px-8">

        <BaseHeader />

        <main class="flex flex-col flex-1 min-h-0">

            <section
                class="flex flex-col gap-4 md:gap-5 border-b border-[#3A3A3A] pb-4 mt-8 md:mt-10.5 xl:mt-16 md:pb-5 xl:flex-row xl:items-end xl:justify-between flex-none">
                <BaseInformation />
                <BaseConfiguration />
            </section>

            <section class="relative flex-1 min-h-0 overflow-hidden mt-4">

                <div
                    class="flex flex-col items-center gap-5 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
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