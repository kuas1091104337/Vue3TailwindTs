import { ref, readonly, onMounted, onUnmounted } from 'vue';
import { useDebounceFn } from '@vueuse/core'

export const GetWindowSize = () => {
  const windowW = ref<number>(0),
        windowH = ref<number>(0),
        setWindowSize = () => {
          windowW.value = window.innerWidth
          windowH.value = window.innerHeight
        },
        debounceWindowResize = useDebounceFn(setWindowSize,300);
  onMounted(() => {
    setWindowSize()
    window.addEventListener('resize',debounceWindowResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize',debounceWindowResize);
  });
  return {
    windowW:readonly(windowW),
    windowH:readonly(windowH)
  }
}