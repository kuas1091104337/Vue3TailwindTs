<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { throttleDebounce } from '../../lib/throttleDebounce'

const Ele:HTMLElement = document.documentElement,
      props = defineProps({
        listIdx:{ type:Number, default:0 },
      }),
      className = ref<string>(''),
      slotList = ref<HTMLLIElement | null>(null),
      windowScroll = () => {
        const isListShow:boolean = (slotList.value.getBoundingClientRect().top <= window.innerHeight - 150) || (Ele.scrollHeight - window.innerHeight - window.scrollY <= 0)
        if(isListShow){
          className.value = 'opacity-1'
        }else if(props.listIdx%2){
          className.value = 'opacity-0 [transform:translate3d(-20%,0,0)]'
        }else{
          className.value = 'opacity-0 [transform:translate3d(20%,0,0)]'
        }
      },
      throttleDebounceFn = throttleDebounce(windowScroll);

onMounted(() => {
  className.value = props.listIdx%2 ? 'opacity-0 [transform:translate3d(-20%,0,0)]' : 'opacity-0 [transform:translate3d(20%,0,0)]'
  window.addEventListener('scroll',throttleDebounceFn);
});
onUnmounted(() => {
  window.removeEventListener('scroll',throttleDebounceFn);
});
</script>

<template>
  <li ref="slotList" :class="['max-w-500px bg-white [box-shadow:0_3px_5px_rgba(71,71,71,.1)] p-5 mx-auto mb-5 [transition:opacity_.4s,transform_.4s]',className]">
    <slot></slot>
  </li>
</template>

<style lang="scss">

</style>