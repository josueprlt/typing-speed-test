<template>
  <div class="my-10 pb-10 border-b border-[#3A3A3A]">
    <h1 class="text-[24px] font-bold md:text-[40px]">About this project</h1>
    <p class="text-[#949497] text-[16px] md:text-[18px]">Information, mechanics, and development details.</p>
  </div>

  <section class="flex flex-col gap-2">
    <h2 class="text-[22px] font-bold md:text-[35px] flex gap-2 before:block before:content-['#'] before:text-green-500">
      Description</h2>
    <div class="rounded-md p-4 bg-[#242424]">
      <p>Developed with passion to help users improve their typing speed and accuracy, this project aimed to create a
        minimalist and distraction-free environment for accurately measuring typing speed. The project originated from a
        challenge proposed by the Frontend Mentor team called "typing speed test".</p>
    </div>
  </section>

  <section class="flex flex-col gap-2">
    <h2 class="text-[22px] font-bold md:text-[35px] mt-10 flex gap-2 before:block before:content-['#'] before:text-green-500">
      Creator</h2>
    <div class="rounded-md p-4 bg-[#242424]">
      <p>My name is Josué Perrault, I am 22 years old and I am currently a 4th year student in a Master's program in Web
        Engineering (IW) at ESGI in Rennes. Learn more through <a target="_blank" class="text-green-500 hover:underline"
                                                                  href="https://portfolio-josue.com">my online
          portfolio</a></p>
    </div>
  </section>

  <section class="flex flex-col gap-2">
    <h2 class="text-[22px] font-bold md:text-[35px] mt-10 flex gap-2 before:block before:content-['#'] before:text-green-500">
      Difficulty Mechanics</h2>
    <section class="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-4">
      <div class="rounded-md p-4 bg-[#242424] border-l-3 border-green-500">
        <h3 class="font-bold pb-2">Easy</h3>
        <p>Consists of the 500 most common English words. Ideal for beginners focusing purely on speed and muscle memory
          without the cognitive load of special characters.</p>
      </div>
      <div class="rounded-md p-4 bg-[#242424] border-l-3 border-orange-500">
        <h3 class="font-bold pb-2">Medium</h3>
        <p>Expanded vocabulary including moderate complexity words. Introduces basic punctuation (commas, periods) and
          standard sentence capitalization. Represents average everyday typing.</p>
      </div>
      <div class="rounded-md p-4 bg-[#242424] border-l-3 border-red-500">
        <h3 class="font-bold pb-2">Hard</h3>
        <p>Complex vocabulary, frequent use of advanced punctuation. Designed to challenge experienced typists and
          simulate real-world technical data entry.</p>
      </div>
    </section>
  </section>

  <section class="flex flex-col gap-2">
    <h2 class="text-[22px] font-bold md:text-[35px] mt-10 flex gap-2 before:block before:content-['#'] before:text-green-500">
      Technology Stack</h2>
    <div class="flex gap-2 flex-wrap rounded-md p-4 bg-[#242424]">
      <p class="px-2 py-1 rounded-sm bg-[#1A1A1A] border border-[#374151]">Nuxt</p>
      <p class="px-2 py-1 rounded-sm bg-[#1A1A1A] border border-[#374151]">Tailwind CSS</p>
      <p class="px-2 py-1 rounded-sm bg-[#1A1A1A] border border-[#374151]">Mistral IA</p>
      <p class="px-2 py-1 rounded-sm bg-[#1A1A1A] border border-[#374151]">TSParticles</p>
    </div>
  </section>

  <section class="flex flex-col gap-2">
    <h2 class="text-[22px] font-bold md:text-[35px] mt-10 flex gap-2 before:block before:content-['#'] before:text-green-500">
      Stats & Roadmap</h2>
    <table class="rounded-md p-4 bg-[#242424] overflow-hidden">
      <tbody>
      <tr>
        <th scope="row" class="p-2 md:py-2 md:px-4 bg-[#1F1F1F]">Current Version</th>
        <td class="p-2 md:py-2 md:px-4">v1.2.4</td>
      </tr>
      <tr class="border-t border-b border-[#374151]">
        <th scope="row" class="p-2 md:py-2 md:px-4 bg-[#1F1F1F]">Development Time</th>
        <td class="p-2 md:py-2 md:px-4">~40 hours</td>
      </tr>
      <tr>
        <th scope="row" class="p-2 md:py-2 md:px-4 bg-[#1F1F1F]">Upcoming Features</th>
        <td class="p-2 md:py-2 md:px-4">
          <ul class="list-disc ml-4">
            <li>Custom word lists (upload JSON)</li>
            <li>Multiplayer racing mode</li>
            <li>Detailed historical performance graphs</li>
            <li>Theme customization (Light/Dark variants)</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </section>

  <footer class="flex justify-center pt-10 mt-10 border-t border-[#3A3A3A]">
    <BaseButton name="Return to Test" color="primary" :clickFunction="() => resetGame('/')" icon="back"/>
  </footer>
</template>

<script setup>
import resetGame from "~/utils/resetGame.js";
</script>