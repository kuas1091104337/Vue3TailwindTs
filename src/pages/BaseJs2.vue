<script setup lang="ts">
import { ref, computed, onUpdated, onMounted, onUnmounted } from 'vue';
type TlistData = { name:string; isActive:boolean; }
type TtimeData = { text:string; state:string; }
type Tbanner = { srcPath:string; isShow:boolean; }

const boxNum = ref<number>(0),
      ballNum = ref<number>(0),
      ballNum2 = ref<number>(0),
      actIdx = ref<number>(0),
      timeIdx = ref<number>(0),
      timeNum = ref<number>(0),
      bannerIdx = ref<number>(0),
      timer = ref<ReturnType<typeof setInterval> | null>(null),
      outTimer = ref<ReturnType<typeof setTimeout> | null>(null),
      bnTimer = ref<ReturnType<typeof setTimeout> | null>(null),
      boxTag = ref<string>(''),
      ballTag = ref<string>(''),
      btnName = ref<string>('Add Box'),
      btnName2 = ref<string>('Add Ball'),
      btnName3 = ref<string>('Add Ball'),
      timeTxt = ref<string>('3秒後開始'),
      timeState = ref<string>('stop'),
      isMenuOpen = ref<boolean>(false),
      menuArr = ref<Array<string>>(['abous', 'content', 'user', 'address']),
      listData = ref<Array<TlistData>>([
        {name:'首頁',isActive:true},
        {name:'關於我們',isActive:false},
        {name:'連絡客服',isActive:false},
        {name:'最新課程',isActive:false},
        {name:'最新消息',isActive:false},
        {name:'課程公告',isActive:false},
        {name:'成為老師',isActive:false},
      ]),
      timeData = ref<Array<TtimeData>>([
        {text:'播放',state:'play'},
        {text:'重新',state:'reset'},
        {text:'暫停',state:'stop'},
      ]),
      bannerData = ref<Array<Tbanner>>([
        {srcPath:'a1.jpg', isShow:true},
        {srcPath:'a2.jpg', isShow:false},
        {srcPath:'a3.jpg', isShow:false},
        {srcPath:'a4.jpg', isShow:false},
        {srcPath:'a5.jpg', isShow:false} 
      ]),
      bnIdx = computed<number>(() => bannerData.value.findIndex((item) => item.isShow)),
      AddBoxFn = () => {
        if(boxNum.value > 0){
          btnName.value = 'Add Box';
          boxNum.value = 0;
          boxTag.value = '';
        }else{
          btnName.value = 'Clear Box';
          while(boxNum.value < 24){
            boxNum.value++;
            boxTag.value += `<li class="h-[160px] flex bg-amber-600">
                              <span class="text-white text-[38px] font-extralight m-auto -skew-x-6">BOX - ${boxNum.value}</span>
                            </li>`;
          }
        }
      },
      AddBallFn = () => {
        if(ballNum.value > 0){
          btnName2.value = 'Add Ball';
          ballNum.value = 0;
          ballTag.value = '';
        }else{
          btnName2.value = 'Clear Ball';
          for(let i=0, max=50; i<=max; i++){
            ballNum.value++;
            ballTag.value += `<li id="list-${i}" class="cursor-pointer w-[100px] h-[100px] flex bg-amber-100 border border-sky-800 mb-4 mr-4 transition-colors" style="border-radius:${i}px;">
              <span class="pointer-events-none text-[32px] font-thin m-auto -skew-x-6">${i}px</span>
            </li>`
          }
        }
        console.log(ballTag.value.length);
      },
      AddBallFn2 = () => {
        if(ballNum2.value > 0){
          btnName3.value = 'Add Ball';
          ballNum2.value = 0;
        }else{
          btnName3.value = 'Clear Ball';
          ballNum2.value = 51;
        }
      },
      ballHandFn = (e:Event) => (e.target as HTMLLIElement).classList.add('text-white','bg-red-600'),
      menuHandFn = () => isMenuOpen.value = !isMenuOpen.value,
      clickHand = () => { if(!isMenuOpen.value) window.open("https://thecodingpro.com/") },
      listActive = (idx:number) => {
        listData.value[actIdx.value].isActive = false
        listData.value[idx].isActive = true
        actIdx.value = idx
      },
      TimeGo = () => {
        timeNum.value++;
        outTimer.value = setTimeout(TimeGo,1000)
      },
      timeHand = (val:string) => {
        timeState.value = val;
        if(val === 'play'){
          outTimer.value = setTimeout(TimeGo,1000);
        }else if(val === 'stop' && outTimer.value){
          clearTimeout(outTimer.value);
        }else if(val === 'reset' && outTimer.value){
          clearTimeout(outTimer.value);
          timeNum.value = 0;
        }else{
          console.error('timeHand val error');
        }
      },
      getImgBigPath = (fileName:string):string => new URL(`../assets/img/08/big/${fileName}`,import.meta.url).href,
      getImgSmallPath = (fileName:string):string => new URL(`../assets/img/08/small/${fileName}`,import.meta.url).href,
      bannerChange = (idx:number) => {
        bannerData.value[bnIdx.value].isShow = false;
        bannerData.value[idx].isShow = true;
      },
      bannerClick = (idx:number) => {
        if(bnTimer.value) clearTimeout(bnTimer.value)
        console.log('Click : '+idx);
        bannerChange(idx)
        bnTimer.value = setTimeout(bannerGo,2000)
      },
      bannerGo = () => {
        const idx = (bnIdx.value + 1) % bannerData.value.length;
        console.log('Go : '+idx);
        bannerChange(idx)
        bnTimer.value = setTimeout(bannerGo,2000)
      };
onUpdated(() => {
  if(ballTag.value.length > 0){
    for(let i=0, max=50; i<=max; i++){
      document.querySelector(`#list-${i}`)?.addEventListener('click',(e:Event) => {
        (e.target as HTMLLIElement).classList.toggle('bg-red-600'); 
      });
    }
  }
});
onMounted(() => {
  timer.value = setInterval(() => {
    timeIdx.value++;
    if(timeIdx.value >= 10 && timer.value){
      clearInterval(timer.value);
      timer.value = null;
      // console.log(typeof timer.value);
    }
  },1000);
  setTimeout(() => {
    timeTxt.value = '開始';
  },3000);
  setTimeout(() => {
    timeTxt.value = 'END';
  },6000);
  bnTimer.value = setTimeout(bannerGo,2000)
});
onUnmounted(() => {
  if(bnTimer.value) clearTimeout(bnTimer.value)
})
</script>

<template>
<button
  @click="AddBoxFn"
  class="w-[80px] block bg-gray-300 hover:bg-amber-300 border border-indigo-600 rounded p-1 mx-auto mb-3 [transition:background-color_.4s] animate-bounce"
>{{ btnName }}</button>
<ul 
  class="w-[96%] max-w-[1200px] grid gap-2 grid-cols-rwd160px mx-auto empty:before:content-['BOX-0'] empty:before:text-[38px] empty:before:font-extralight empty:before:italic empty:before:text-white empty:before:leading-[160px] empty:before:text-center empty:before:bg-amber-600 empty:before:opacity-35"
  v-html="boxTag"
></ul>

<button
  @click="AddBallFn"
  class="w-[80px] block bg-gray-300 hover:bg-amber-300 border border-indigo-600 rounded p-1 mx-auto mb-3 [transition:background-color_.4s] animate-bounce"
>{{ btnName2 }}</button>
<ul 
  class="w-[96%] max-w-[1200px] flex flex-wrap mx-auto empty:before:content-['0px'] empty:before:text-[32px] empty:before:font-thin empty:before:italic empty:before:leading-[100px] empty:before:text-center empty:before:w-[100px] empty:before:bg-amber-100 empty:before:border empty:before:border-sky-800 empty:before:opacity-35"
  v-html="ballTag"
></ul>

<button
  @click="AddBallFn2"
  class="w-[80px] block bg-gray-300 hover:bg-amber-300 border border-indigo-600 rounded p-1 mx-auto mb-3 [transition:background-color_.4s] animate-bounce"
>{{ btnName3 }}</button>
<ul class="w-[96%] max-w-[1200px] flex flex-wrap mx-auto 
          empty:before:content-['0px'] 
          empty:before:text-[32px] empty:before:font-thin empty:before:italic empty:before:leading-[100px] empty:before:text-center 
          empty:before:w-[100px] empty:before:bg-amber-100 empty:before:border empty:before:border-sky-800 empty:before:opacity-35
          ">
  <li
    v-for="num in ballNum2" :key="num"
    class="cursor-pointer w-[100px] h-[100px] flex bg-amber-100 border border-sky-800 mb-4 mr-4 [transition:background-color_.4s]"
    :style="{borderRadius:(num-1)+'px'}"
    @click="ballHandFn($event)"
  >
    <span class="pointer-events-none text-[32px] font-thin m-auto -skew-x-6">{{ num-1 }}px</span>
  </li>
</ul>
<div class="relative"> 
  <ul class="flex list-disc list-inside">
    <li>box1</li>
    <li>box2</li>
    <li>box3</li>
  </ul>
  <div class="p-8">
    <input
      type="file"
      class="block w-full text-sm text-neutral-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-cyan-50 file:text-cyan-700
            hover:file:bg-cyan-100"/>
  </div>
  <div class="container grid grid-cols-3 gap-4 mx-auto">
    <div class="text-base leading-1.8 bg-amber-400/50 p-4">
      <h2>什麼是 object-fit</h2>
      <p>指定元素的內容應該如何去適應指定容器的高度與寬度。</p>
      <p>用於 img 和 video 標籤，可以對元素進行保留原始比例的剪切、縮放或直接進行拉伸等。</p>
      <p>可以透過使用 object-position 屬性，來切換元素框內的對齊方式。</p>
    </div>
    <div class="">
      <img src="@/assets/img/bg/11.jpg" class="w-full h-3/4 object-scale-down bg-red-500" />
      <p>scale-down - 選 none 或 container 兩者間較小的那個</p>
    </div>
    <div class="">
      <img src="@/assets/img/logo1.png" class="w-full h-3/4 object-contain bg-red-500" />
      <p>contain - resource 在 element 內保持寬高比</p>
    </div>
    <div class="a">
      <img src="@/assets/img/fly.png" class="w-full h-3/4 object-cover object-[0%_100%] bg-red-500" />
      <p>cover - resource 填滿 element 並保持寬高比，超出的部分會被裁切</p>
    </div>
    <div class="a">
      <img src="@/assets/img/16590-006.jpg" class="w-full h-3/4 object-fill bg-red-500" />
      <p>fill - 預設值，強制變形所定義元素寬高，不管原檔比例</p>
    </div>
    <div class="a">
      <img src="@/assets/img/bg/4.jpg" class="w-full h-3/4 object-none bg-red-500" />
      <p>none - 不做任何大小及比例調整(原始尺寸大小)</p>
    </div>
  </div>
</div>
<div class="relative">
  <img src="@/assets/img/bg/11.jpg" alt="">
  <div class="w-2/3 max-w-[800px] PosAbsTR50Translate-50">
    <img src="@/assets/img/logo1.png" alt="" />
    <a
      @click="clickHand"
      :class="[
        'text-white text-2xl text-center leading-2.5 w-[200px]',
        'block bg-[#49b9a5] rounded-full [box-shadow:0_4px_25px_#298272] mt-5 mx-auto',
        {'cursor-pointer':!isMenuOpen}
      ]"
    >點擊看課程</a>
  </div>
  <div :class="[
    'w-80 h-full bg-white absolute top-0 right-0 [transition:transform_.4s]',
    {'[transform:translate3d(100%,0,0)]':!isMenuOpen}
  ]">
    <ul class="mt-24">
      <li :class="['font-thin text-3xl leading-2 pl-5',{'border-t':idx > 0}]" v-for="(item,idx) in menuArr" :key="idx">
        {{ item }}
      </li>
    </ul>
  </div>
  <a 
    class="cursor-pointer size-[44px] bg-white/30 absolute top-12 right-12 [transition:transform_.4s]"
    @click="menuHandFn"
  >
    <span 
      class=""
      :class="[
        `before:content-[''] after:content-[''] w-9 h-[5px] rounded-full m-auto absolute top-0 left-0 right-0 bottom-0`,
        'before:w-full before:h-full before:rounded-full before:absolute before:left-0',
        'after:w-full after:h-full after:rounded-full after:absolute after:left-0',
        isMenuOpen ? 'bg-transparent before:bg-gray-950 before:top-0 before:rotate-45 before:[transition:background-color_.3s,transform_.3s] after:bg-gray-950 after:top-0 after:-rotate-45 after:[transition:background-color_.3s,transform_.3s]' : ' bg-white before:bg-white before:top-3 before:[transition:background-color_.3s,top_.3s] after:bg-white after:-top-3 after:[transition:background-color_.3s,top_.3s]'
      ]"
    ></span>
  </a>
</div>
<div class="bg-red-300 pb-[58%] relative">
  <div class="w-[300px] PosAbsTR50Translate-50">
    <img src="@/assets/img/logo2.png" alt="">
    <ul>
      <li 
        v-for="(item,idx) in listData" :key="idx"
        @click="listActive(idx)"
        :class="[
          'cursor-pointer font-light text-[lightcoral] leading-[50px]',
          'bg-white border-l-[lightcoral] pl-5 mt-[6px] [transition:color_.3s,background_.3s,font-size_.3s,border_.3s]',
          'hover:text-white hover:bg-[lightcoral]',
          item.isActive ? 'text-2xl border-l-[20px]' : 'border-l-8'
        ]"
      >
        <span class="inline-block -skew-x-5">{{ item.name }} ></span>
      </li>
      <!-- [transition:color_.3s,background_.3s,font-size_.3s,border_.3s]-->
    </ul>
  </div>
  <div class="text-[red] [text-shadow:1px_1px_2px_#000,_0_1px_6px_rgb(0_0_0_/_.5)]">123</div>
  <!-- <div class="text-slate-800 [perspective:100vw] animate-[bj2ListShow_1s_ease-in-out_infinite]">123</div> -->
</div>
<div class="flex bg-[pink]">
  <div class="w-[40%]">
    <div class="w-[300px] mx-auto my-20">
      <img src="@/assets/img/logo2.png" alt="">
      <ul>
        <li 
          v-for="(item,idx) in listData" :key="idx"
          @click="listActive(idx)"
          :class="[
            'cursor-pointer font-light text-[lightcoral] leading-[50px]',
            'bg-white border-l-[lightcoral] pl-5 mt-[6px] [transition:color_.3s,background_.3s,font-size_.3s,border_.3s]',
            'hover:text-white hover:bg-[lightcoral]',
            item.isActive ? 'text-2xl border-l-[20px]' : 'border-l-8'
          ]"
        >
          <span class="inline-block -skew-x-5">{{ item.name }} ></span>
        </li>
      </ul>
    </div>
  </div>
  <div class="w-[60%] bg-[lightcoral]">
    <div 
      v-for="(item,idx) in listData" :key="idx"
      :class="['font-thin text-white text-8xl h-full',item.isActive ? 'flex bj2ListShow' : 'hidden']"
    >
      <span class="m-auto -skew-x-5"># {{ item.name }}</span>
    </div>
  </div>
</div>
<div class="relative">
  <img src="@/assets/img/bg/4.jpg" alt="">
  <h1 class="text-white text-[20vw] [text-shadow:0_1px_3px_rgba(0,0,0,.6),0_1vw_3vw_rgba(0,0,0,.6)] PosAbsTR50Translate-50">{{ timeIdx }}</h1>
</div>
<div class="relative">
  <img src="@/assets/img/bg/9.jpg" alt="">
  <h1 class="text-white text-[10vw] [text-shadow:0_1px_3px_rgba(0,0,0,.6),0_1vw_3vw_rgba(0,0,0,.6)] PosAbsTR50Translate-50">{{ timeTxt }}</h1>
</div>
<div class="relative">
  <img src="@/assets/img/bg/11.jpg" alt="">
  <div class="PosAbsTR50Translate-50">
    <h1 class="text-white text-[12vw] text-center [text-shadow:0_1px_3px_rgba(0,0,0,.6),0_1vw_3vw_rgba(0,0,0,.6)]">{{ timeNum }}</h1>
    <div class="w-[320px] flex justify-between">
      <a
        v-for="item in timeData" :key="item.state"
        :class="[
          'cursor-pointer text-center leading-[36px] rounded-[10px] w-[30%] hover:bg-red-200 [transition:color_.4s,background-color_.4s]',
          timeState === item.state ? 'text-white bg-[crimson]' : 'bg-white'
        ]"
        @click="timeHand(item.state)"
      >{{ item.text }}</a>
    </div>
  </div>
</div>
<div class="bg-teal-200 py-10">
  <div class="w-[70%] max-w-[1600px] mx-auto">
    <p>{{ bnIdx }}</p>
    <ul class="">
      <li class="animate-[bj2BannerShow_.4s_linear]" v-for="item in bannerData" :key="item.srcPath" v-show="item.isShow">
        <img :src="getImgBigPath(item.srcPath)">
      </li>
    </ul>
    <ul class="flex">
      <li
        class="hover:bg-white [transition:background-color_.4s]" 
        v-for="(item,idx) in bannerData" :key="item.srcPath"
        @click="bannerClick(idx)"
      >
        <img :src="getImgSmallPath(item.srcPath)" :class="['[transition:opacity_.4s]',{'opacity-50':!item.isShow}]">
      </li>
    </ul>
  </div>
</div>
</template>

<style lang="scss">
@keyframes bj2BannerShow{
  0%{ opacity:0.5; }
}
@keyframes bj2ListShow{
  0%{
    opacity:0;
    transform:scale3d(.6,.6,1);
  }
  100%{ opacity:1; }
}
.bj2ListShow{ animation:bj2ListShow .4s cubic-bezier(0,0,.5,1.5); }
.bj2BannerShow{ }
// transform-origin:X% Y%;
// transform:rotate3d(x, y, z, ndeg);
// transform:rotate3d(x, y, z, ndeg);
// transform:skew(Xdeg, Ydeg);
// transform:translate3d(-50%,-50%,0);
// perspective:1000px;
    
</style>