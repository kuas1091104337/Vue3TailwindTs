<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from "vue";
type Tuser = {
  name:string;
  age:number;
  email:string;
}
const name = ref<string>('mike'),
      inputTxt = ref<string>(''),
      inputTxt2 = ref<string>(''),
      inputTxt3 = ref<string>(''),
      count1 = ref<number>(0),
      count2 = ref<number | string>('1'),
      emailInp = ref<HTMLInputElement | null>(null),
      user:Tuser = reactive({
        name:'mike',
        age:24,
        email:'dafa@gmail.com'
      }),
      title = computed<string>(() => `Hello, ${name.value}`),
      handleChange = (e:Event) => {
        const inputEvent = e as InputEvent;
        inputTxt.value = (inputEvent.target as HTMLInputElement).value;
        console.log(inputTxt.value);
      },
      // handleInput = (e:Event) => {
      //   const inputEvent = e as InputEvent;
      //   inputTxt3.value = (inputEvent.target as HTMLInputElement).value;
      // },
      handleInput = (e:Event) => {
        inputTxt3.value = (e.target as HTMLInputElement).value;
      };
watch(count1,(newVal,oldVal) => {
  console.log('newVal : '+newVal)
  console.log('oldVal : '+oldVal)
});
watch(() => user.email,(newVal,oldVal) => {
  console.log('newVal : '+newVal)
  console.log('oldVal : '+oldVal)
});
onMounted(() => {
  user.age = 55;
  emailInp.value?.focus();
  setTimeout(() => {
    count1.value = 1;
    user.email = '1234567@gmail.com';
  },1500);
});
</script>

<template>
  <div class="">
    <p>name : {{ name }}</p>
    <p>title : {{ title }}</p>
    <p>count1 : {{ count1 }}</p>
    <p>count2 : {{ count2 }}</p>
    <span class="block">{{ user }}</span>
    <p>{{ inputTxt }}</p>
    <input class="block border border-stone-500" type="text" @change="handleChange">
    <p>{{ inputTxt2 }}</p>
    <input class="block border border-stone-500" type="text" v-model="inputTxt2">
    <p>{{ inputTxt3 }}</p>
    <input class="block border border-stone-500" type="text" @input="handleInput">
    <input class="block border border-stone-500" type="email" placeholder="kuas@com" required ref="emailInp"/>
  </div>
</template>

<style lang="scss">
</style>
