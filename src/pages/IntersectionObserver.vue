<script setup lang="ts">
import { Ref, ref, computed, onMounted, nextTick } from 'vue';
interface MenuItem {
  name:string;
  element:Ref<HTMLElement | null>;
}
const currentSection = ref<string>(''),
      unitArr = ref<Array<MenuItem>>([
        { name:'Base', element:ref<HTMLElement | null>(null) },
        { name:'Home', element:ref<HTMLElement | null>(null) },
        { name:'Work', element:ref<HTMLElement | null>(null) },
        { name:'About', element:ref<HTMLElement | null>(null) },
        { name:'Contact', element:ref<HTMLElement | null>(null) }
      ]),
      observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          console.log(e);
          if(e.isIntersecting){
            console.log(e.target.id);
            currentSection.value = e.target.id;
          }
        });
      },{threshold:0.5});//50% of the section should visible
      // filterArr = computed<Array<MenuItem>>(() => unitArr.value.filter(item => item.name !== 'Base') as MenuItem[]);
onMounted(() => {
  // const observer = new IntersectionObserver(entries => {
  //   entries.forEach(e => {
  //     console.log(e);
  //     if(e.isIntersecting){
  //       console.log(e.target.id);
  //       currentSection.value = e.target.id;
  //     }
  //   });
  // },{ threshold:0.5 });//50% of the section should visible
  // const sections = document.querySelectorAll('section');
  // sections.forEach(section => {
  //   observer.observe(section);
  // });
  nextTick(() => { });
  unitArr.value.forEach(item => {
    if(item.element) observer.observe(item.element as HTMLElement);
    // console.log(item.element.value);
  });
});
</script>

<template>
<div class="IntersectionObserver grow overflow-auto relative scroll-smooth">
  <nav :class="['w-full sticky top-0 left-0',currentSection === 'Base' ? 'bg-[#263238]' : 'bg-white']">
    <ul class="w-4/5 flex justify-around pb-2 mx-auto">
      <li
        v-for="item in unitArr.filter(item => item.name !== 'Base')" :key="item.name"
        :class="[
          'px-3 relative',
          'before:w-full before:h-5px before:rounded-full before:bg-blue-500 before:absolute before:left-0 before:bottom-0 before:[transform:scale3d(0,1,1)] before:[transition:transform_.3s] hover:before:[transform:scale3d(1,1,1)]',
          {'before:[transform:scale3d(1,1,1)]':currentSection === item.name}
        ]" 
      >
        <a
          :href="`#${item.name}`"
          :class="['text-2xl font-thin leading-1.7 block relative',currentSection === 'Base' ? 'text-white' : ' text-[#222]']"
        >{{ item.name }}</a>
        <!-- <a :href="'#'+item" class="text-2xl">{{ item }}</a> -->
      </li>
    </ul>
  </nav>
  <!-- <section id="Base" class="h-full bg-[#263238] bg-cover bg-center"></section> -->
  <!-- :ref="item.element" :ref="el => item.element = el" -->
  <section 
    v-for="item in unitArr" 
    :key="item.name" 
    :ref="el => item.element = el"
    :id="item.name" 
    :class="[
      'font-thin text-white text-6xl flex justify-center items-center h-full',
      {'bg-[#263238] bg-cover bg-center':item.name === 'Base'},
      {'bg-teal-500':item.name === 'Home'},
      {'bg-sky-500':item.name === 'Work'},
      {'bg-amber-500':item.name === 'About'},
      {'bg-indigo-500':item.name === 'Contact'}
    ]"
  >
    {{ item.name }}
  </section>
</div>
</template>

<style lang="scss">
#app:has(.IntersectionObserver){
  display:flex;
  flex-direction:column;
}
#Base{background-image:url("https://kuas1091104337.github.io/old/UA/images/collaborate/collaborate_witelabel.png");}
</style>