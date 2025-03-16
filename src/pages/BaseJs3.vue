<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, toRaw } from 'vue';
// 復雜資料類型 : 陣列、物件
type Tobj = { name:string; age:number; height?:number; }
type Tnews = { title:string; url:string; }
type Tdata = { text:string; }
type Tseach = { topic:string; data:Array<Tdata & Tnews>; }
type Tsort = { idx:number; name:string; money:number; age:number; sex:string; }
type Trule = { title:string; content:string; labelTxt:string; isSelect:boolean; }
// type Tmap = { name:string; sex:string; }
type Tinterest = { code:string; sports:string; watch:string; }
type Tinfo = { age:number; address:string; sex:string; interest:Tinterest }
type TdeepObj = { name:string; info:Tinfo; }
type TtestObj = Omit<Tsort,'idx' | 'money'> & Pick<Tinfo,'address'> & Tinterest

const numArr:Array<number> = [],
      peopleObj:Partial<Tobj> = {},
      newArr:Array<number> = new Array(),
      
      seachTopic = ref<string>('線上課程'),
      BannerIdx = ref<number>(0),
      sortMoney = ref<number>(0),
      sortAge = ref<number>(0),
      sortSex = ref<string>('no'),
      passArr1 = ref<Array<string>>(['AAA','BBB','CCC']),
      passArr2 = ref<Array<string>>([...passArr1.value]),
      passArr3 = ref<Array<string>>(passArr1.value.slice()),
      testArr = ref<Array<string>>([]),
      newTestArr = ref<Array<string>>([]),
      BannerData = ref<Array<string>>(['a1', 'a2', 'a3', 'a4', 'a5']),
      newsData = ref<Array<Tnews>>([
        { title:'31歲女繼承8.5億遺產!海選50人「幫忙花錢」',url:'https://www.ettoday.net/news/20240113/2663120.htm' },
        { title:'外媒：台灣反抗中國選出「麻煩製造者」',url:'https://www.ettoday.net/news/20240113/2663739.htm' },
        { title:'罷免侯友宜」破7.6萬人加入 謝龍介發聲...',url:'https://www.ettoday.net/news/20240114/2663821.htm' },
        { title:'BBC為何台灣大選對世界很重要?',url:'https://www.ettoday.net/news/20240113/2663642.htm' },
        { title:'網美浴室自拍爆紅短片800萬次觀看',url:'https://www.ettoday.net/news/20240113/2663072.htm' },
        { title:'男子辭職後「刪光4000份公司文件」',url:'https://www.ettoday.net/news/20240112/2662372.htm' },
      ]),
      newObj = new Object() as Tobj,
      sortHead = ref<Array<string>>(['名字','戶頭錢','年齡','性別']),
      seachBg = ref<Array<number>>([3,4,5,9,11,12]),
      topicData = ref<Array<Tseach>>([
        {
          topic:"媽祖",
          data:[
            {
              title:"台灣媽祖信仰- 维基百科，自由的百科全书",
              url:"https://zh.wikipedia.org/zh-tw/台灣媽祖信仰",
              text:"媽祖信仰是臺灣普遍民間信仰。早期移民多自華南渡海，心驚膽顫，且台灣四面環海，海上活動頻繁，海神媽祖婆成臺灣人重要精神託付。臺灣有媽祖廟510座以上，有 ...",
            },
            {
              title:"台灣歷史與文化資產課大甲媽祖遶境活動",
              url:"https://dcdm.ntcu.edu.tw/albumContent.php?id=43",
              text:"媽祖就是「天上聖母」，我們一般通稱「媽祖」或「媽祖婆」。 媽祖是古時候的宋朝人，她的本名叫「林默娘」，從小就相當相當聰明，讀經書過目不忘。 媽祖十三歲的時後 ...",
            },
          ],
        },{
          topic:"地震",
          data:[{
            title: "地震 - 中央氣象局",
            url: "https://www.cwb.gov.tw/V7/earthquake/",
            text: "資料來源：美國地質調查所主動發布之全球地震自動定位資訊，透過EMAIL方式通報.本網頁僅展示地震規模大於6之全球地震初步訊息，欲查詢詳細地震資訊請 ...",
          }],
        },{
          topic:"線上課程",
          data:[
            {
              title: "JavaScript & TypeScript 前端工程師入門班",
              url: "https://thecodingpro.com/courses/javascript",
              text: "從基礎、進階、應用全面規劃，帶您學會前端工程師需要 JavaScript 與 TypeScript 的必備知識與應用能力！",
            },
            {
              title: "Nuxt3 高效入門全攻略",
              url: "https://thecodingpro.com/courses/nuxt3",
              text: "本次課程屬 Nuxt3 的進階課程，你將會學習到 Nuxt3 相關的核心概念，並了解如何使用 Nuxt3 所提供的功能，來開發一個 SSR 的 Vue 網頁！也因此購課前提醒，學習者需有 Vue 開發經驗者為佳，強烈不建議完全的新手加入本課程。",
            },
            {
              title: "Vue 單元測試 vue-test-utils｜入門",
              url: "https://thecodingpro.com/courses/vue-test-utils",
              text: "若你是寫過 Vue 但沒有寫過單元測試的工程師，這堂課程你將會學習到使用 vue-test-utils 更有效率地完成 Vue 的單元測試！因此課程將建立在已熟悉 Javascript、Vue3 的同學來學習，比較不適合尚未寫過 Vue 或沒用過 Vue-cli、Vite 的同學上課唷！",
            },
          ],
        }
      ]),
      sortData = ref<Array<Tsort>>([
        { idx:1,name:"小豬",money:12000,age:12,sex:"boy" },
        { idx:2,name:"小烏龜",money:52000,age:20,sex:"girl" },
        { idx:3,name:"小鳥",money:150,age:16,sex:"boy" },
        { idx:4,name:"小貓",money:360000,age:35,sex:"boy" },
        { idx:5,name:"小狗",money:650,age:19,sex:"boy" },
        { idx:6,name:"鱷魚",money:9999,age:40,sex:"girl" },
        { idx:7,name:"龍蝦",money:10,age:2,sex:"girl" },
        { idx:8,name:"海藻",money:500,age:30,sex:"boy" }
      ]),
      sortResArr = ref<Array<Tsort>>([]),
      ruleData = ref<Array<Trule>>([
        {
          title:'● 規章一',
          content:'規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章!',
          labelTxt:'你願意遵守以上規章?',
          isSelect:false
        },
        {
          title:'● 規章二',
          content:'規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章!',
          labelTxt:'你願意遵守以上規章?',
          isSelect:false
        },
        {
          title:'● 規章三',
          content:'規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章規章!',
          labelTxt:'你願意遵守以上規章?',
          isSelect:false
        }
      ]),
      // mapArr = ref<Array<Tmap>>([
      // Partial 把所有的屬性變成可選的
      // mapArr = ref<Array<Partial<Tsort>>>([
      // 可以使用 Pick 來挑選出需要的屬性，另外組成新的 type
      // mapArr = ref<Array<Pick<Tsort,'name' | 'sex'>>>([
      // 使用 Omit 來挑選出不需要的屬性，另外組成新的 type
      mapArr = ref<Array<Omit<Tsort,'idx' | 'money' | 'age'>>>([
        { name: "遊戲", sex: "boy", },
        { name: "幸子", sex: "girl", },
        { name: "城之內", sex: "boy", },
        { name: "海馬", sex: "boy", },
        { name: "本田", sex: "boy", },
      ]),
      passObj1 = ref<Tobj>({ name:'mike', age:12 }),
      passObj2 = ref<Tobj>({...passObj1.value}),
      passObj3 = ref<Tobj>(Object.assign({},passObj1.value)),
      deepObj = ref<TdeepObj>({
        name:"mike",
        info:{
          age: 12, address:"taiwan", sex:"boy",
          interest:{ code:"javascript", sports:"basketball", watch:"movie" }
        }
      }),
      deepCopyObj = ref<TdeepObj>(JSON.parse(JSON.stringify(deepObj.value))),
      deepCopyObj2 = reactive<TdeepObj | {}>({}),
      testObj = ref<TtestObj>({
        name:"mike", age:12, address:"taiwan", sex:"boy", code:"javascript", sports:"basketball", watch:"movie",
      }),
      seachData = computed<Array<Tdata & Tnews>>(() => {
        const filterArr = topicData.value.filter(item => item.topic === seachTopic.value)[0]
        return filterArr ? filterArr.data : []
      }),
      seachIdx = computed<number>(() => seachBg.value[Math.round(Math.random()*(seachBg.value.length-1))]),
      // isAllSelect = computed<boolean>(() => ruleData.value.every(obj => obj.isSelect)),
      isAllSelect = computed<boolean>(() => ruleData.value.every(({isSelect}) => isSelect)),
      // newMapArr = computed<Array<string>>(() => mapArr.value.map(obj => obj.name + obj.sex)),
      newMapArr = computed<Array<string>>(() => mapArr.value.map(({name,sex}) => name + sex)),

      topicClick = (val:string) => seachTopic.value = val,
      getImgBannerPath = (fileName:string):string => new URL(`../assets/img/08/small/${fileName}.jpg`,import.meta.url).href,
      getImgSeachPath = (fileName:number):string => new URL(`../assets/img/bg/${fileName}.jpg`,import.meta.url).href,
      bannerClick = (num:number) => BannerIdx.value = (BannerIdx.value + num + BannerData.value.length) % BannerData.value.length,
      handSubmit = () => alert('制度規章OK，送出成功');

numArr.push(...[1,2,3])
newArr.push(...numArr)
peopleObj.name = newObj.name = 'mike';
peopleObj.age = newObj.age = 32;
peopleObj.height = newObj.height = 180;
console.log(numArr,newArr,peopleObj,newObj);
console.log('numArr + newArr' + [...numArr, ...newArr]);
console.log('numArr + newArr' + numArr.concat(newArr));
type THandNum = {
  (a:number, b:number):number
}
const str:string = 'mike',
      // Array<number> 是可變長度的，將 arr 定義為元組（tuple）類型 [number, number]
      arr:[number, number] = [1,3],
      addFn:THandNum = (x,y) => x + y;
console.log(addFn(...arr));
console.log(addFn(arr[0],arr[1]));
console.log(str.split(''));
console.log([...str]);

const { name, age, ...other } = testObj.value
console.log(name, age, other);
// const name2:string = testObj.value.name,
//       age2:number = testObj.value.age,
//       other2:Omit<TtestObj,'name' | 'age'> = {
//         sex:testObj.value.sex,
//         address:testObj.value.address,
//         code:testObj.value.code,
//         sports:testObj.value.sports,
//         watch:testObj.value.watch
//       }

watch([sortMoney,sortAge,sortSex],([moneyNew,ageNew,sexNew],[moneyOld,ageOld,sexOld]) => {
  // let arr:Array<Tsort> = []
  // if(moneyNew !== moneyOld){ // console.log('money')
    // sortData.value.forEach(obj => {
    //   if(obj.money > moneyNew) arr.push(obj)
    // })
    // arr = sortData.value.filter(obj => obj.money > moneyNew)
  // }else if(ageNew !== ageOld){ // console.log('age')
    // sortData.value.forEach(obj => {
    //   if(obj.age > ageNew) arr.push(obj)
    // })
    // arr = sortData.value.filter(obj => obj.age > ageNew)
  // }else if(sexNew !== sexOld){ // console.log('sex')
    // sortData.value.forEach(obj => { // 1
    //   if(obj.sex === sexNew){
    //     arr.push(obj)
    //   }else if(sexNew === 'no'){
    //     arr = sortData.value
    //   }
    // })
    // arr = sortData.value.filter(obj => { // 2
    //   return sexNew === 'no' ? obj : obj.sex === sexNew
    //   // if(sexNew === 'no'){
    //   //   return obj;
    //   // }else{
    //   //   return obj.sex === sexNew;
    //   // }
    // })
    // arr = sortData.value.filter(obj => (sexNew === 'no') ? obj : obj.sex === sexNew)
  // }else{ console.error('select watch error') }
  // sortResArr.value = arr
  if(sexNew === 'no'){
    // sortResArr.value = sortData.value.filter(obj => obj.money > moneyNew && obj.age > ageNew)
    sortResArr.value = sortData.value.filter(obj => obj.money > moneyNew).filter(obj => obj.age > ageNew)
  }else{
    sortResArr.value = sortData.value.filter(obj => obj.money > moneyNew && obj.age > ageNew && obj.sex === sexNew)
  }
});

onMounted(() => {
  // var - 1
  console.log('(瞬間)提升(hoisting)的 var i : '+i+', n : '+n);
  var n:number | undefined = 0;
  console.log('(瞬間)var n 後的 i : '+i+', n : '+n);
  for(var i:number | undefined=1; i<=5; i++){
    console.log('(瞬間)for 裡面(1000 * i)，但在 setTimeout 之前的 var i : '+i+', n : '+n);
    setTimeout(() => {
      (n as number)++
      console.log('(延遲)setTimeout 裡面的 var i : '+i+', n : '+n+'秒');
    },1000*i);
  }
  console.log('(瞬間)for 結束的 var i : '+i+', n : '+n);
  // var - 2
  for(var k:number=1; k<=5; k++){
    ((m:number) => {
      setTimeout(() => {
        console.log('立即函式裡的 var m : '+m);
      },1000*m);
    })(k)
  }
  // var - 3
  for(var o:number=1; o<=5; o++){
    setTimeout((s:number) => {
      console.log('setTimeout 的第三個參數 o 傳入 setTimeout 裡面的 s : '+s+'秒');
    },1000*o,o);
  }
  // let
  for(let j:number=6; j<=10; j++){
    console.log('(瞬間)for 裡面(1000 * j)，但在 setTimeout 之前的 let j : '+j);
    setTimeout(() => {
      console.log('(延遲)setTimeout 裡面的 let j : '+j+'秒');
    },1000*j);
  }
  testArr.value.push('A(push後面加)')
  testArr.value.push('B(push後面加)')
  testArr.value.push('C(push後面加)')
  testArr.value.unshift('c((unshift前面加))')
  testArr.value.unshift('b((unshift前面加))')
  testArr.value.unshift('a((unshift前面加))')
  newTestArr.value = [...testArr.value]
  setTimeout(() => testArr.value.pop(),1000);
  setTimeout(() => testArr.value.pop(),2000);
  setTimeout(() => testArr.value.shift(),3000);
  setTimeout(() => testArr.value.shift(),4000);
  setTimeout(() => newTestArr.value.length = 0,5000);
  newsData.value.forEach(({title, url}) => console.log(title, url));
  sortResArr.value = sortData.value
  setTimeout(() => passArr2.value[1] = 'GGG',1500);
  setTimeout(() => passArr3.value[2] = 'QQQ',3000);
  setTimeout(() => passObj2.value.name = 'jacky',1500);
  setTimeout(() => passObj3.value.height = 155,3000);
  setTimeout(() => deepCopyObj.value.info.interest.code = 'php',1500);
  const {name, age, address, sex, code, sports, watch} = testObj.value;
  setTimeout(() => console.log(name, age, address, sex, code, sports, watch),11000);
  // 在 Vue 3 中，ref 和 reactive 物件是 Proxy 包裝的，這些 Proxy 對象包含某些無法被 structuredClone 克隆的部分，
  // 例如其內部的 getter 和 setter。因此，在嘗試克隆 deepObj.value 時會觸發 DataCloneError
  // const deepCopyObj3 = structuredClone(deepObj.value)
  // 方法：移除 Proxy 包裝後進行克隆，使用 toRaw 方法將 deepObj.value 轉換為原始物件
  const deepCopyObj3 = structuredClone(toRaw(deepObj.value));
  deepCopyObj3.name = 'Alex'
  deepCopyObj3.info.age = 99
  console.log(deepCopyObj3);
  const deepCopyObj2 = structuredClone(toRaw(deepObj.value));
  console.log(deepCopyObj2);
});
</script>

<template>
<div class="bg-blue-400 py-10 relative">
  <div class="w-[420px] mx-auto">
    <ul class="flex items-center">
      <!-- rotate-45 origin-[0%_50%] transition-transform bg-red-700  -->
      <li 
        class="cursor-pointer w-[12%] bg-white/25 pb-[12%] relative"
        @click="bannerClick(-1)"
      >
        <span class="w-[55%] pb-[16%] PosAbsTR50Translate-50
                    before:content-[''] before:w-full before:h-full before:bg-zinc-800 before:absolute before:top-0 before:left-0 before:rotate-45 before:origin-[18%_78%]
                    after:content-[''] after:w-full after:h-full after:bg-zinc-800 after:absolute after:top-0 after:left-0 after:-rotate-45 after:origin-[18%_20%]"></span>
      </li>
      <li 
        class="w-[76%] animate-[opShow_.4s]" 
        v-for="(item, idx) in BannerData" :key="idx"
        v-show="idx === BannerIdx"
      >
        <img :src="getImgBannerPath(item)">
      </li>
      <li 
        class="cursor-pointer w-[12%] bg-white/25 pb-[12%] relative"
        @click="bannerClick(1)"
      >
        <span class="w-[55%] pb-[16%] PosAbsTR50Translate-50
                    before:content-[''] before:w-full before:h-full before:bg-zinc-800 before:absolute before:top-0 before:left-0 before:rotate-45 before:origin-[82%_24%]
                    after:content-[''] after:w-full after:h-full after:bg-zinc-800 after:absolute after:top-0 after:left-0 after:-rotate-45 after:origin-[84%_74%]"></span>
      </li>
    </ul>
    <p class="font-thin text-white text-2xl text-center leading-1.8">{{ BannerIdx+1 }} / {{ BannerData.length }}</p>
  </div>
</div>
<pre class="text-white bg-black p-5 m-5">
{{ passArr1 }}
{{ passArr2 }}
{{ passArr3 }}
{{ passObj1 }}
{{ passObj2 }}
{{ passObj3 }}
{{ testArr }}
{{ newTestArr }}
deepObj : 
{{ deepObj }}
deepCopyObj :
{{ deepCopyObj }}
</pre>
<div class="min-w-[360px] max-w-[500px] bg-[#f3f3f3] p-[40px_50px] mx-auto mb-5">
  <h1 class="text-[28px] border-l-8 border-l-[#2e2770] pl-5">即時新聞</h1>
  <ul class="">
    <li class="text-[#333] leading-[50px] border-b border-dashed border-b-[#888] pl-5 hover:text-[#2e2770] hover:bg-[rgb(46_39_112/.1)] [transition:color_.4s,background-color_.4s]" v-for="item in newsData" :key="item.url">
      <a class="inline-block -skew-x-5" :href="item.url" target="_blank">{{ item.title }}</a>
    </li>
  </ul>
  <p class="text-right mt-4">
    <a class="text-[#000] p-2 hover:text-[#2e2770] [transition:color_.4s]" href="javascript:;">More ></a>
  </p>
</div>
<div class="relative">
  <img class="h-svh object-cover" :src="getImgSeachPath(seachIdx)">
  <div class="max-w-[500px] bg-white/35 rounded-md p-4 PosAbsTR50Translate-50">
    <input class="w-full h-9 border border-blue-950 rounded p-2" type="text" v-model="seachTopic" />
    <p class="text-[#2e2e2e] [text-shadow:0_1px_1px_#fff,1px_0_1px_#fff,-1px_0_1px_#fff,0_-1px_1px_#fff] py-4">
      最近熱門搜尋 : 
      <a 
        v-for="(item,idx) in topicData" :key="item.topic"
        :class="[
          'p-1 hover:text-red-500 [transition:color_.4s]',
          {'mr-4 relative after:content-[\'、\'] after:pointer-events-none after:absolute after:left-full hover:after:text-black':topicData.length !== idx+1},
          {'text-red-500':item.topic === seachTopic}
        ]" 
        @click="topicClick(item.topic)"
        href="javascript:;"
      >{{ item.topic }}</a>
    </p>
    <div 
      v-for="(item,idx) in seachData" :key="idx"
      :class="['bg-white rounded-[10px] p-6',{'mt-3':idx > 0}]"
    >
      <h3 class="text-xl">{{ item.title }}</h3>
      <a 
        class="text-[cornflowerblue] text-sm p-1 hover:text-[#2866da] [transition:color_.4s]" 
        :href="item.url"  
        target="_blank"
      >{{ item.url }}</a>
      <p class="text-sm leading-5 p-1">{{ item.text }}</p>
    </div>
  </div>
</div>
<!-- 靜態資源：將圖片放到 public，然後使用相對於根目錄的路徑 /img/... -->
<!-- <div class=" bg-[url('/img/bg/9.jpg')] relative"> -->
<!-- 圖片需要經過打包處理：保留在 src/assets -->
<div class="bg-[url('@/assets/img/bg/9.jpg')]">
  <!-- h-full <img class="w-full h-full object-cover" src="../assets/img/bg/9.jpg"> -->
   <div class="min-w-360px max-w-500px mx-auto py-60px">
    <p>{{ sortMoney }} {{ sortAge }} {{ sortSex }}</p>
    <ul class="text-14px flex justify-center mb-24px">
      <li class="w-1/4 ">
        <select v-model="sortMoney" class="text-center w-full h-28px px-1">
          <option value="0">選擇錢</option>
          <option value="300">大於300</option>
          <option value="700">大於700</option>
          <option value="10000">大於10000</option>
        </select>
      </li>
      <li class="w-1/4 mx-[6%]">
        <select v-model="sortAge" class="text-center w-full h-28px px-1">
          <option value="0">選擇年齡</option>
          <option value="10">10歲以上</option>
          <option value="20">20歲以上</option>
          <option value="30">30歲以上</option>
        </select>
      </li>
      <li class="w-1/4">
        <select v-model="sortSex" class="text-center w-full h-28px px-1">
          <option value="no">選擇性別</option>
          <option value="boy">boy</option>
          <option value="girl">girl</option>
        </select>
      </li>
    </ul>
    <ul class="flex bg-white border border-black border-b-0">
      <li class="text-14px text-center leading-[30px] w-1/4 border border-black" v-for="item in sortHead" :key="item">
        {{ item }}
      </li>
    </ul>
    <div class="border border-black border-t-0">
      <ul 
        class="flex bg-white/60"
        v-for="item in sortResArr" :key="item.idx"
      >
        <li class="text-14px text-center leading-[30px] w-1/4 border border-black">{{ item.name }}</li>
        <li class="text-14px text-center leading-[30px] w-1/4 border border-black">{{ item.money }}</li>
        <li class="text-14px text-center leading-[30px] w-1/4 border border-black">{{ item.age }}</li>
        <li class="text-14px text-center leading-[30px] w-1/4 border border-black">{{ item.sex }}</li>
      </ul>
    </div>
   </div>
</div>
<div class="bg-[url('@/assets/img/bg/3.jpg')] bg-cover">
  <div class="min-w-360px max-w-600px mx-auto py-60px">
    <h1>制度規章</h1>
    <p>{{ isAllSelect }}</p>
    <form>
      <div class="mb-36px" v-for="(item,idx) in ruleData" :key="idx">
        <h3 class="mb-10px">{{ item.title }}</h3>
        <p class="leading-6 mb-10px">{{ item.content }}</p>
        <label class="cursor-pointer flex items-center" :for="`item$-${idx}`">
          <input 
            :id="`item$-${idx}`" 
            class="size-20px mr-6px" 
            type="checkbox" 
            v-model="item.isSelect"
          />{{ item.labelTxt }}
        </label>
      </div>
      <button 
        :disabled="!isAllSelect"
        class="w-100px h-30px bg-white border border-black rounded"
        @click="handSubmit"
      >送出</button>
    </form>
  </div>
</div>
<div class="bg-[url('@/assets/img/bg/4.jpg')] bg-cover py-10">
  <div class="font-thin text-21px text-center w-360px border border-black m-auto mb-50px">
    <h3 class="text-white bg-[#888] border-b border-black p-10px">名字 + 性別</h3>
    <ul>
      <li v-for="item in newMapArr" :key="item" class="tracking-[2px] bg-white/25 p-10px">
        {{ item }}
      </li>
    </ul>
  </div>
  <div class="font-thin text-30px text-center w-500px border border-black m-auto">
    <ul class="flex">
      <li class="text-white w-1/2 bg-[#666] p-10px">Pass by value</li>
      <li class="text-white w-1/2 bg-[#666] border-l border-black p-10px">Pass by reference</li>
    </ul>
    <ul class="flex">
      <li class="bg-white/50 w-1/2 p-10px">
        <span class="block">String</span>
        <span class="block">Number</span>
        <span class="block">Boolean</span>
        <span class="block">Undefined</span>
        <span class="block">Null</span>
      </li>
      <li class="bg-white/50 w-1/2 border-l border-black p-10px">
        <span class="block">Array</span>
        <span class="block">Object</span>
      </li>
    </ul>
  </div>
    
</div>

</template>

<style lang="scss">
// transform-origin:X%,Y%;
// pointer-events:none;
// .a{letter-spacing:;}
</style>