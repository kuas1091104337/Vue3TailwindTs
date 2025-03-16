<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCounterStore } from '../stores/counterPinia';
import { useLoginStore } from '../stores/loginPinia';
const storeCounter = useCounterStore()
const storeLogin = useLoginStore()
console.log(storeCounter);
console.log(storeCounter.count);
console.log(storeCounter.doubleCount);
onMounted(() => {
  storeCounter.increment()
  storeLogin.getDataList()
});
</script>

<template>
<div class="relative">
  <img src="../assets/img/bg/9.jpg">
  <div class="PosAbsTR50Translate-50">
    <h3 class="text-red-900">storeCounter = useCounterStore()</h3>
    <p class="">storeCounter.count : {{storeCounter.count}}</p>
    <p class="">storeCounter.doubleCount : {{storeCounter.doubleCount}}</p>
    <h3 class="text-red-900">storeLogin = useLoginStore()</h3>
    <p class="">storeLogin.userName : {{storeLogin.userName}}</p>
    <p class="">storeLogin.usetTitle : {{storeLogin.usetTitle}}</p>
    <p class=""></p>
    <p class=""></p>
    <p class=""></p>
    
  </div>
</div>
</template>

<style lang="scss">

</style>