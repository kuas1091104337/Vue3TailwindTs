<script setup lang="ts">
import { debounce } from '../lib/debounce'
import { throttle } from '../lib/throttle'
import { throttleDebounce } from '../lib/throttleDebounce'
import { ref, onMounted, onUnmounted } from 'vue';
let a:number = 2;
if(a === 1){
  console.log('a is number 1');
  var text:number = 1;
}
if(a === 2) console.log('a is number 2');
// console.log(text); // undefined
let b1:string = 1 + '2',
    b2:string = '2' + 5,
    b3:number = 1 - Number('3'),
    b4:number = Number('7') - 3;

console.log(b1, b2, b3, b4);

const name:string = 'Mike',
      age:number = 18,
      title1:string = 'My name is ' + name + ', I am ' + age + ' years old.',
      title2:string = `My name is ${name}, I am ${age} years old.`;
console.log(title1, title2);

const time:string = '下午',
      weater:string = '下雨';
if(time === '上午' && weater === '下雨'){
  console.log('帶傘-1')
}else{
  console.log('不要帶傘-1')
}
if(time === '下午' || weater === '晴天'){
  console.log('不要帶傘-2')
}else{
  console.log('帶傘-2')
}

const breakfast:string = '玉米濃湯';
switch (breakfast) {
  case '麥香雞肉堡':
    console.log('收你30元');
    break;
  case '厚切豬排堡':
    console.log('收你85元');
    break;
  case '總匯蛋餅':
    console.log('收你50元');
    break;
  case '玉米濃湯':
    console.log('收你35元');
    break;
  case '捷克厚牛芝加哥堡':
    console.log('收你75元');
    break;
  default:
    console.log('其它一律收你55元');
    break;
}
const link = ref<HTMLAnchorElement | null>(null),
      linkHand2 = () => { if(link.value) link.value.href = 'https://google.com'; },
      linkHand = () => { (link.value as HTMLAnchorElement).href = 'https://google.com'; };

const fontSizeStyle = ref<number>(20),
      fontSizeHand2 = (size:number = 0) => {
        if(size === 2 && fontSizeStyle.value === 50) return;
        if(size === -2 && fontSizeStyle.value === 12) return;
        size === 20 ? fontSizeStyle.value = size : fontSizeStyle.value += size;
      },
      fontSize = ref<string>('20px'),
      fontSizeHand = (size:number = 0) => {
        if(size === 20){
          fontSize.value = '20px'
        }else{
          let fz = Number(fontSize.value.slice(0,fontSize.value.indexOf('px')))
          fz += size
          switch(true) {
            case fz > 50:
              fontSize.value = '50px'
              break;
            case fz < 12:
              fontSize.value = '12px'
              break;
            default :
              fontSize.value = fz+'px'
          }
        }
      };

const inputTxt = ref<string>(''),
      inputTxtHand = () => {
        if(inputTxt.value !== ''){
          inputTxt.value = '';
        }else{
          inputTxt.value = `TheCodingPro 是 Mike 所創立的<a class="text-[#f66] underline p-[2px_4px]" href='https://thecodingpro.com/' target='_blcnk'>線上課程學院</a>，主要以網頁前端為主軸，開設 JavaScript、HTML、CSS、Vue 等業界常見的技能，幫助初學者在學習的過程中找到自信心，也對學習寫程式感到有興趣，更重要的是可以真正學會如何解決問題，而不是只會照範例寫 code 而已。`;
        }
      },
      windowHand = () => {
        window.scrollTo({top:0,behavior:'smooth'})
        window.prompt();
      };

      // console.log((document.scrollingElement as Element).scrollTop);
      // console.log(window.scrollY);
const windowScrollTop = ref<number>(0),
      Ele:HTMLElement = document.documentElement,
      // windowScrollFn = () => windowScrollTop.value = Ele.scrollTop,
      // throttleWindowScrollFn = throttle(windowScrollFn,100),
      throttleWindowScrollFn = throttle(() => {
        windowScrollTop.value = Ele.scrollTop;
      },100),
      debounceScroll = useDebounceFn(() => {
        console.log(123);
        windowScrollTop.value = Ele.scrollTop;
      },50),
      throttleDebounceScroll = throttleDebounce(() => {
        console.log(456);
        windowScrollTop.value = Ele.scrollTop;
      });

import { useThrottleFn } from '@vueuse/core'
const canMove = ref<boolean>(false),
      canMoveDU = ref<boolean>(false),
      fly = ref<HTMLImageElement | null>(null),
      flyDU = ref<HTMLImageElement | null>(null),
      mouseEnterHand = (e:MouseEvent) => {
        if(e.type === 'mouseenter'){
          canMove.value = true;
          (fly.value as HTMLImageElement).style.cssText = `top:${e.offsetY}px;left:${e.offsetX}px;`;
        }
        if(e.type === 'mousedown'){
          canMoveDU.value = true;
          (flyDU.value as HTMLImageElement).style.cssText = `top:${e.offsetY}px;left:${e.offsetX}px;`;
        }
        // (fly.value as HTMLImageElement).style.top = `${e.offsetY}px`;
        // (fly.value as HTMLImageElement).style.left = `${e.offsetX}px`;
        // console.log((fly.value as HTMLImageElement).getBoundingClientRect());
      },
      throttledFn = useThrottleFn((Y:number = 0,X:number = 0) => { //vueuse節流
        // console.log('vueuse節流',Y,X);
        (fly.value as HTMLImageElement).style.cssText = `top:${Y}px;left:${X}px;`;
      },100),
      throttleFn = throttle((Y:number = 0,X:number = 0) => {
        if(windowWidth.value/2 > X){
          console.log('沒超過一半');
          (fly.value as HTMLImageElement).style.cssText = `top:${Y}px;left:${X}px;transform:translate3d(-50%,-50%,0) scaleX(-1);`;
        }else{
          console.log('超過一半');
          (fly.value as HTMLImageElement).style.cssText = `top:${Y}px;left:${X}px;`;
        }
        // console.log('自寫的節流',Y,X);
      },100),
      throttleFn2 = throttle((Y:number = 0,X:number = 0) => {
        (flyDU.value as HTMLImageElement).style.cssText = `top:${Y}px;left:${X}px;`;
      },100),
      mouseMove = (e:MouseEvent) => {
        // vueuse節流
        // console.log(e.type);
        // if(canMove.value) throttledFn(e.offsetY,e.offsetX); 
        if(canMove.value && e.type === 'mousemove') throttleFn(e.offsetY,e.offsetX);
        if(canMoveDU.value && e.type === 'mousemove') throttleFn2(e.offsetY,e.offsetX);
        // console.log('沒有節流',e.offsetY,e.offsetX);
        // 沒有節流
        // if(canMove.value) (fly.value as HTMLImageElement).style.cssText = `top:${e.offsetY}px;left:${e.offsetX}px;`;
      },
      mouseLeave = (e:MouseEvent) => {
        // (fly.value as HTMLImageElement).setAttribute('style','');
        if(e.type === 'mouseleave'){
          canMove.value = false;
          (fly.value as HTMLImageElement).style.cssText = '';
        }
        if(e.type === 'mouseup'){
          canMoveDU.value = false;
          (flyDU.value as HTMLImageElement).removeAttribute('style');
        }
      };
// import { useMouse } from '@vueuse/core'
// const { x, y, sourceType } = useMouse()

import { useDebounceFn, useEventListener } from '@vueuse/core'
const windowWidth = ref<number>(0),
      windowHeight = ref<number>(0),
      debouncedFn = useDebounceFn(() => {
        windowWidth.value = window.innerWidth;
        windowHeight.value = window.innerHeight;
      },300),
      debounceResize = useDebounceFn(() => {
        windowWidth.value = window.innerWidth;
        windowHeight.value = window.innerHeight;
      },300);
      
onMounted(() => {
  console.log(link.value);
  console.log(document.querySelector('.link'));
  console.log(document.querySelectorAll('.link'));//NodeList
  console.log(document.getElementById('link'));
  console.log(document.getElementsByClassName('link'));//回傳陣列 HTMLCollection
  console.log(document.getElementsByTagName('a'));//回傳陣列 HTMLCollection
  // useEventListener(window,'resize',debouncedFn);
  // debouncedFn()
  debounceResize()
  throttleDebounceScroll()
  // debounceScroll()
  window.addEventListener('resize',debounceResize);
  window.addEventListener('scroll',throttleDebounceScroll);
  // window.addEventListener('scroll',debounceScroll);
  // window.addEventListener('scroll',throttleWindowScrollFn);
  (document.querySelector('.thisWho') as HTMLAnchorElement).addEventListener('click',(e) =>  {
    console.log(this)
    console.log(e.target)
  });
});
onUnmounted(() => {
  window.removeEventListener('resize',debounceResize);
});
</script>

<template>
<div>
  <p class="text-white flex bg-[rgba(0,0,0,.5)] px-2 py-1 fixed top-0 left-0 z-10">
    window寬 : {{ windowWidth }} , window高 : {{ windowHeight }}
  </p>
  <p class="text-white bg-[rgba(0,0,0,.5)] px-2 py-1 fixed top-0 right-0 z-10">{{ windowScrollTop }}</p>
  <div class="relative">
    <img class="block" src="@/assets/img/bg/9.jpg" alt="">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img class="w-full max-w-3xl" src="@/assets/img/logo1.png" alt="">
      <a
        @click="linkHand"
        ref="link"
        id="link"
        class="link text-white text-xl text-center leading-2.5 shadow-2xl block w-76 bg-teal-600 hover:bg-blue-600 rounded-full mx-auto mb-4 [transition:background-color_.3s]" 
        href="https://thecodingpro.com/" 
        target="_blank"
      >馬上去官網看一下</a>
      <a
        @click="linkHand2"
        ref="link"
        class="link text-white text-xl text-center leading-2.5 shadow-2xl block w-76 bg-teal-600 hover:bg-blue-600 rounded-full mx-auto [transition:background-color_.3s]" 
        href="https://thecodingpro.com/" 
        target="_blank"
      >馬上去官網看一下</a>
    </div>
  </div>
  <div class="relative">
    <img class="block" src="@/assets/img/bg/9.jpg" alt="">
    <div class="w-80 h-[200px] m-auto absolute top-0 left-0 right-0 bottom-0">
      <p 
        class="text-white text-center leading-80px [text-shadow:_1px_1px_2px_#000,_0_1px_6px_rgb(0_0_0_/_.5)] [transition:font-size_.3s]"
        :style="{fontSize:fontSizeStyle + 'px'}"
      >TheCodingPro</p>
      <p 
        class="textSize text-white text-center leading-80px [text-shadow:_1px_1px_2px_#000,_0_1px_6px_rgb(0_0_0_/_.5)] [transition:font-size_.3s]"
      >TheCodingPro</p>
      <ul class="text-white flex justify-center">
        <li
          @click="fontSizeHand(2);fontSizeHand2(2)"
          class="text-lg text-center leading-loose [box-shadow:_0_2px_10px_#333] w-24 rounded-full bg-[#00BCD4] hover:bg-[#1c6577] [transition:background-color_.3s]"
        >放大
        </li>
        <li 
          @click="fontSizeHand(-2);fontSizeHand2(-2)"
          class="text-lg text-center leading-loose [box-shadow:_0_2px_10px_#333] w-24 rounded-full bg-[#00BCD4] hover:bg-[#1c6577] mx-6 [transition:background-color_.3s]"
        >縮小
        </li>
        <li
          @click="fontSizeHand(20);fontSizeHand2(20)"
          class="text-lg text-center leading-loose [box-shadow:_0_2px_10px_#333] w-24 rounded-full bg-[#00BCD4] hover:bg-[#1c6577] [transition:background-color_.3s]"
        >正常
        </li>
      </ul>
    </div>
  </div>
  <div class="relative">
    <img class="block" src="@/assets/img/bg/5.jpg" alt="">
    <div class="font-mono absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <a 
        @click="inputTxtHand"
        class="thisWho text-white text-center leading-[2.5] w-[220px] block bg-[#178fac] hover:bg-[#1c6577] rounded-full mx-auto mb-4 [box-shadow:0_2px_16px_rgba(0,0,0,.5)] [transition:background-color_.3s]" 
        href="javascript:;"
      >關於TheCodingPro</a>
      <p class="content text-[#178fac] text-[21px] leading-[1.6] p-px" v-html="inputTxt"></p>
    </div>
  </div>
  <div class="relative">
    <img class="block" src="@/assets/img/bg/3.jpg" alt="">
    <div class="font-mono absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <a
        @click="windowHand"
        class="text-white text-center leading-[2.5] w-[220px] block bg-[#178fac] hover:bg-[#1c6577] rounded-full mx-auto mb-4 [box-shadow:0_2px_16px_rgba(0,0,0,.5)] [transition:background-color_.3s]" 
        href="javascript:;"
      >常用的 window方法 ?</a>
      <div class="text-[#178fac] text-[16px] leading-[1.6] w-[580px] p-[6px]">
        <p class="flex">
          <span class="w-[40%]">window.alert()</span><span class="w-[60%]">//跳出一個警告訊息窗。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.close()</span><span class="w-[60%]">//關閉瀏覽器視窗。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.confirm()</span><span class="w-[60%]">//跳出一個有確認與取消按鈕地確認框。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.createPopup()</span><span class="w-[60%]">//建立一個彈出視窗。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.focus()</span><span class="w-[60%]">//取得焦點。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.blur()</span><span class="w-[60%]">//移除該視窗焦點。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.moveBy()</span><span class="w-[60%]">//以相對位置移動視窗。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.moveTo()</span><span class="w-[60%]">//移動視窗到指定位置。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.open()</span><span class="w-[60%]">//開啟一個新的瀏覽器視窗。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.print()</span><span class="w-[60%]">//輸出目前窗口內容。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.prompt()</span><span class="w-[60%]">//跳出可輸入訊息的對話。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.setInterval()</span><span class="w-[60%]">//計時器。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.setTimeout()</span><span class="w-[60%]">//計時器。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.clearInterval()</span><span class="w-[60%]">//取消由setInterval()設定的計時器。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.clearTimeout()</span><span class="w-[60%]">//取消由setTimeout()方法設定的計時器。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.resizeBy()</span><span class="w-[60%]">//調整視窗大小。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.resizeTo()</span><span class="w-[60%]">//調整視窗大小。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.scrollBy()</span><span class="w-[60%]">//滾動內容。</span>
        </p>
        <p class="flex">
          <span class="w-[40%]">window.scrollTo()</span><span class="w-[60%]">//滾動內容。</span>
        </p>
      </div>
    </div>
  </div>
  <div class="relative" @mouseenter="mouseEnterHand($event)" @mousemove="mouseMove($event)" @mouseleave="mouseLeave($event)">
    <img class="pointer-events-none block" src="@/assets/img/bg/12.jpg" alt="">
    <!-- <p class="absolute top-0 left-0">{{ x }}, {{ y }}</p>  -->
    <img
      ref="fly"
      :class="[
        'pointer-events-none w-[200px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]',
        canMove ? '[transition:transform_.3s]' : '[transition:top_.4s,left_.4s,transform_.4s]'
      ]" 
      src="@/assets/img/fly.png" 
    >
  </div>
  <div class="relative" @mousedown="mouseEnterHand($event)" @mousemove="mouseMove($event)" @mouseup="mouseLeave($event)">
    <img class="pointer-events-none select-none block" src="@/assets/img/bg/12.jpg" alt="">
    <img 
      ref="flyDU" 
      :class="['pointer-events-none w-[200px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]',{'[transition:top_.4s,left_.4s]':!canMoveDU}]" 
      src="@/assets/img/fly.png" 
    >
  </div>
  <!-- <p class="font-[Helvetica] font-[sans-serif] [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] 
   max-w-[420px] max-h-[80px] p-[10px_5px] m-[10px_5px] top-[80px] animate-spin">TheCodingPro</p> -->
</div>
</template>

<style lang="scss" scoped>
.textSize{ font-size:v-bind(fontSize); }
// .content > a{
//   color:#f66;
//   text-decoration:underline;
//   padding:2px 4px;
// }
// // --GB-color: #00BCD4;
// // rgba(#000, .5)
</style>