<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="pt-px">
    <img class="block mx-auto my-1" src="@/assets/logo.svg" alt="Vue logo" width="38"/>
    <nav class="text-sm  leading-normal flex flex-wrap mx-3 mb-3">
      <RouterLink class="px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/">Vue Basics</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/gridTest">GridTest</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs1">JS & TS 前端入門班 第3 ~ 5章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs2">JS & TS 前端入門班 第6 ~ 8章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs3">JS & TS 前端入門班 第9 ~ 11章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs4">JS & TS 前端入門班 第12 ~ 13章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs5">JS & TS 前端入門班 第14 ~ 15章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs6">JS & TS 前端入門班 第17 ~ 18章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseJs7?country=TW&view=desc&rate=77">JS & TS 前端入門班 第19 ~ 20章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/varTs">JS & TS 前端入門班 第21章 - 1 ~ 13</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/varTs2">JS & TS 前端入門班 第21章 - 14 ~ 24</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseVue0">Vue3 高效入門與實踐 第2 ~ 4章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/BaseVue1">Vue3 高效入門與實踐 第3 ~ 5章</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/JSH">JS高级</RouterLink>
      <RouterLink class="border-l border-l-[#aaa] px-2 mb-6px hover:bg-[hsla(160,100%,37%,.2)] [transition:color_.4s,background-color_.4s]" to="/IntersectionObserver">IntersectionObserver</RouterLink>
    </nav>
  </header>
  <RouterView/>
</template>
<style lang="scss">
// scoped
.router-link-exact-active{
  color:hsl(160,100%,37%);
  background-color:hsla(160,100%,37%,.2);
}
// .wh100pPosaT0L0{@extend %wh100pPosaT0L0;}
// .wh100pPosfT0L0{@extend %wh100pPosfT0L0;}
// .posaT0L0{ top:0; left:0; }
// .maPosaT0L0R0B0{@extend %maPosaT0L0R0B0;}
</style>
