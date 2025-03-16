<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Big from 'big.js';
import xss from 'xss';
const webTet = 'https://medium.com/i-am-mike/%E5%9C%A8%E9%96%8B%E5%A7%8B%E5%AF%ABcode%E5%89%8D%E7%9A%84%E9%81%B8%E6%93%87-662b3a2debe8',
      website = decodeURIComponent(webTet),
      webTet2 = 'https://thecodingpro.com/courses/Nuxt3高效入門全攻略',
      website2 = encodeURIComponent(webTet2),
      num1 = 0.1, num2 = 0.2, num3 = 0.3, num7 = 0.7, num9 = 0.9,
      addFn = (n1, n2) => n1 + n2,
      cutFn = (n1, n2) => n1 - n2,
      start1 = new Big(num1),
      end1 = start1.plus(num2),
      result1 = end1.toNumber(),
      result2 = Big(num1).plus(num7).toNumber(),
      pathname = location.hash.slice(0,location.hash.indexOf('?')),
      paramsObj = new URLSearchParams(window.location.search);

let age = 10
const route = useRoute(),
      // fullPathParams = route.fullPath,
      // ppIdx = fullPathParams.indexOf('?'), // -1 or N
      // paramsTxt = fullPathParams.slice(ppIdx > 0 ? ppIdx : fullPathParams.length),
      paramsTxt = window.location.search,
      searchTxt = ref<string>(''),
      XSSTxt = ref<string>(''),
      inputTxt = ref<string>(''),
      filterXSSTxt = ref<string>(''),
      searchHand = () => XSSTxt.value = searchTxt.value,
      searchXSShand = () => filterXSSTxt.value = xss(inputTxt.value),
      // clickHand = () => open(`https://www.google.com.tw/${paramsTxt}`,'_blank'),
      clickHand = () => open(`https://www.google.com.tw/${location.search}`,'_blank'),
      routerQueryPush = (params:string) => {
        const queryKey = params.split('=')[0]
        if(location.search === ''){
          params = '?'+params
        }else if(location.search.includes(queryKey)){
          // pageIdx 內有 age 所以有 bug
          const paramsObj = new URLSearchParams(window.location.search);
          params = location.search.replace(queryKey+'='+paramsObj.get(queryKey),params)
        }else{
          params = location.search+'&'+params
        }
        // window.history.pushState({},null,`${pathname}${params}`);
        window.history.pushState({},null,params);
      },
      addNameNewHand = () => routerQueryPush('name=mike'),
      addAgeNewHand = () => {
        age++
        routerQueryPush('AGE='+age)
      },
      addIdxNewHand = () => routerQueryPush('pageIdx=4'),
      backPageHand = () => history.go(-1),
      addNameHand = () => window.history.pushState({},null,'?name=mike'),
      addAgeHand = () => window.history.pushState({},null,'?age=12'),
      addIdxHand = () => window.history.pushState({},null,'?pageIdx=4'),
      addAllHand = () => window.history.pushState({},null,'?name=mike&age=12&pageIdx=4'),
      forwardPageHand = () => history.go(1);

console.log(route);
onMounted(() => {
  
});
</script>

<template>
<!-- < = &lt; | > = &gt; | &#123;	= { | &#125; = } -->
<div class="w-4/5 max-w-[1920px] mx-auto">
  <p class="mb-2">
    小數點的陷阱 - 解決方案Big.js
    <a class="text-[#00bd7e] bg-[rgb(0_189_126/20%)] px-2 py-1" href="https://mikemcl.github.io/big.js/" target="_blank">https://mikemcl.github.io/big.js/</a>
  </p>
  <p class="mb-2">常用方法 plus：加法、minus：減法、times：乘法、div：除法</p>
  <p class="mb-2">{{num1}} + {{num2}} = {{addFn(num1,num2)}}</p>
  <p class="mb-2">{{num1}} + {{num2}} = {{result1}}</p>
  <p class="mb-2">{{num1}} + {{num7}} = {{addFn(num1,num7)}}</p>
  <p class="mb-2">{{num1}} + {{num7}} = {{result2}}</p>
  <p class="mb-2">{{num9}} + {{num3}} = {{cutFn(num9,num3)}}</p>
  <p class="mb-2">{{num9}} + {{num3}} = {{Big(num9).minus(num3).toNumber()}}</p>
  <p class="mb-2">0.6 * 3 = {{0.6*3}}</p>
  <p class="mb-2">0.6 * 3 = {{Big(0.6).times(3)}}</p>
  <p class="mb-2">0.6 * 3 = {{(0.6*3).toFixed(8)/1}}</p>
</div>
<div class="relative">
  <img src="@/assets/img/bg/11.jpg" alt="">
  <div class="PosAbsTR50Translate-50">
    <p class="text-white text-center leading-2 mb-6">&lt;img src="logo2.png" onerror="alert('哈哈我程式執行了')"&gt;</p>
    <div class="text-white text-36px text-center leading-[40px] mb-6" v-html="XSSTxt"></div>
    <input 
      v-model.trim="searchTxt"
      class="max-w-400px w-full h-30px border border-black rounded-sm px-2" 
      type="text" placeholder="請填入文字"
    />
    <button
      @click="searchHand"
      class="w-100px h-30px block border border-black rounded-sm mt-3 mx-auto"
    >送出</button>
    <div class="text-white text-36px text-center leading-[40px] mb-6" v-html="filterXSSTxt"></div>
    <input 
      v-model.trim="inputTxt"
      class="max-w-400px w-full h-30px border border-black rounded-sm px-2" 
      type="text" placeholder="filter XSS"
    />
    <button
      @click="searchXSShand"
      class="w-100px h-30px block border border-black rounded-sm mt-3 mx-auto"
    >送出</button>
  </div>
</div>
<div class="relative">
  <img src="../assets/img/bg/4.jpg" alt="">
  <div class="PosAbsTR50Translate-50">
    <a
      href="javascript:;"
      class="leading-[30px] text-center block bg-white rounded-full w-100px mx-auto"
      @click="clickHand"
    >click</a>
  </div>
</div>
<div class="relative">
  <img src="../assets/img/bg/11.jpg" alt="">
  <div class="text-white leading-1.8 [text-shadow:0_0_1px_#000,0_0_2px_#000,0_1px_4px_#000] PosAbsTR50Translate-50">
    <p class="text-sm break-words">Unicode編碼 : </p>
    <p class="text-sm break-words max-w-500px">{{webTet}}</p>
    <p class="text-sm break-words">decodeURIComponent() 轉成文字</p>
    <p class="text-sm break-words">{{website}}</p>
    <p class="text-sm break-words">網址文字 : </p>
    <p class="text-sm break-words">{{webTet2}}</p>
    <p class="text-sm break-words">encodeURIComponent() 轉成Unicode編碼</p>
    <p class="text-sm break-words max-w-500px">{{website2}}</p>
  </div>
</div>
<div class="relative">
  <img src="../assets/img/bg/12.jpg" alt="">
  <div class="leading-1.8 min-w-[520px] PosAbsTR50Translate-50">
    <p class="text-sm">route.query : {{route.query}}</p>
    <p class="text-sm">route.query.country : {{route.query.country}}、route.query.view : {{route.query.view}}、route.query.rate : {{route.query.rate}}</p>
    <p class="text-sm">route.fullPath : {{route.fullPath}}</p>
    <p class="text-sm">const params = new URLSearchParams(window.location.search)</p>
    <p class="text-sm">params.get('country') : {{paramsObj.get('country')}}、params.get('view') : {{paramsObj.get('view')}}、params.get('rate') : {{paramsObj.get('rate')}}</p>
    <p class="text-sm">params.forEach((val,key) => { console.log(val,key) })</p>
    <p class="text-sm">for(const key of params.keys()){ console.log(key) }</p>
    <p class="text-sm">for(const value of params.values()){ console.log(value) }</p>
    <p class="text-sm"></p>
  </div>
</div>
<div class="relative">
  <img src="../assets/img/bg/9.jpg" alt="">
  <div class="PosAbsTR50Translate-50">
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mx-auto"
      @click="backPageHand"
    >上一頁</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addNameHand"
    >加入 name 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addAgeHand"
    >加入 age 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addIdxHand"
    >加入 pageIdx 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addAllHand"
    >加入 all 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="forwardPageHand"
    >下一頁</a>
  </div>
</div>
<div class="relative">
  <img src="../assets/img/bg/9.jpg" alt="">
  <div class="PosAbsTR50Translate-50">
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mx-auto"
      @click="backPageHand"
    >上一頁</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addNameNewHand"
    >加入 name 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addAgeNewHand"
    >加入 age 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="addIdxNewHand"
    >加入 pageIdx 參數</a>
    <a
      href="javascript:;"
      class="text-sm leading-[30px] text-center block w-[160px] bg-white rounded-full w-100px [box-shadow:0_2px_4px_2px_rgb(0,0,0,.5),0_0_0_1px_#000_inset] mt-4 mx-auto"
      @click="forwardPageHand"
    >下一頁</a>
  </div>
</div>
</template>

<style lang="scss">

</style>