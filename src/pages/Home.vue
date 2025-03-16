<script setup lang="ts">
// import axios, { AxiosResponse } from "axios";
// import axios from "axios";
// import type { AxiosResponse } from "axios";
import { ref, reactive, watch, computed, onMounted } from 'vue';
import type { Tcourses } from '../types/index';

type Tinfo = { name:string; age:number; email:string; }
type Titem = { title:string }
type Tlist = {txt:string; isShow:boolean;}
type TlistArr = {id:number;name:string;}
type TcheckArr = { name:string; isSelect:boolean; id:number; }

const isShow = ref<boolean>(false),
      name = ref<string>('mike'),
      title = ref<string>('Loading...'),
      text = ref<string>(''),
      verCode = ref<string>(''),
      word = ref<string>('abcdefghijklmnopqrstuvwxyz'),
      list = ref<number>(3),
      actIdx = ref<number>(0),
      linkHtml = ref<string>('<a href="https://thecodingpro.com/courses/vue3" target="_blank"> TheCodingpro </a>'),
      content = ref<string>('本課程將帶你一步步的學習理解 <h1>Vue3 每個重要的語法以及搭配</h1> TypeScript 進行開發，讓同學們可以嘗試處理專案上面周邊技術的整合應用，以及體驗更真實的實際開發會遇到的問題情境，來教你思考解決如何解決問題，你將會一步步的學習到前端工程師在開發專案時的經驗過程。'),
      listArr = ref<Array<string>>(['nke','sbux','wba']),
      // listArr2 = ref<string[]>(['nke','sbux','wba']),
      userInfo = ref<{text:string;}>({text:'0123456789'}),
      linkList = ref<[string,string]>(['https://thecodingpro.com/courses/nuxt3','https://thecodingpro.com/courses/vue3']),
      infoData = ref<{ name:string, age:number, address:string }>({ name:'mike', age:22, address:'Taiwan' }),
      items = ref<Array<Titem>>([
        {title:'foo'},{title:'baz'}
      ]),
      listData = ref<Array<Tlist>>([
        {txt:'首頁',isShow:true},
        {txt:'關於我們',isShow:false},
        {txt:'商品列表',isShow:false},
        {txt:'歷史沿革',isShow:false},
        {txt:'未來藍圖',isShow:false}
      ]),
      listArry = ref<Array<TlistArr>>([
        {id:1,name:"mike"}, 
        {id:2,name:"jacky"}, 
        {id:3,name:"xuan"}, 
        {id:4,name:"andy"}, 
        {id:5,name:"ban"}, 
        {id:6,name:"mgi"}
      ]),
      checkArry = ref<Array<TcheckArr>>([
        {name:'項目1', isSelect:false, id:Math.random()},
        {name:'項目2', isSelect:false, id:Math.random()},
        {name:'項目3', isSelect:false, id:Math.random()},
        {name:'項目4', isSelect:false, id:Math.random()},
        {name:'項目5', isSelect:false, id:Math.random()}
      ]),
      coursesArr = ref<Array<Tcourses>>([]),
      info:Tinfo = reactive({
        name:'mike',
        age:12,
        email:'adfa@gmail.com' 
      }),
      isSHow = computed<boolean>(() => items.value && items.value.length > 0 ? true : false),
      isShowList = computed<boolean>(() => listArry.value.length > 0 ? true :false),
      titleTxt = computed<string>(() => '你的名字是, '+name.value),
      newListData = computed<Array<Tlist>>(() => listData.value.filter(obj => obj.isShow)),
      isAllSelect= computed<boolean>({
        get():boolean{ return checkArry.value.every(item => item.isSelect) },
        set(val:boolean){ checkArry.value.forEach(item => item.isSelect = val) }
      }),
      handleInput = (e:Event) => name.value = (e.target as HTMLInputElement).value,
      addText = (txt:string, e:Event) => {
        text.value = txt;
        console.log(e.target);
      },
      closeList = (idx:number) => {
        listArry.value = listArry.value.filter((obj,index) => index !== idx)
      },
      switchFn = () => isShow.value = !isShow.value,
      menuHand = (idx:number) => {
        listData.value[actIdx.value].isShow = false;
        listData.value[idx].isShow = true;
        actIdx.value = idx;
      },
      handSubmit = () => console.log('code : '+verCode.value),
      handleKeydown = (e:KeyboardEvent) => {
        console.log(e);
        console.log(`你點了按鈕 : key:${e.key}, code:${e.code}, KeyCode:${e.keyCode}`);
      },
      openUrl = (url:string) => window.open(url+'','_blank');
      
setTimeout(() => {
  name.value = 'alex';
  title.value = 'it\'s ok';
  userInfo.value.text = '9876543210';
  info.email = '123456@gmail.com';
},1000);
watch(title,(newTitle:string,oldTitle:string) => console.log(newTitle,oldTitle));
watch(() => info.email,(newVal:string,oldVal:string) => console.log(newVal,oldVal));
watch(() => userInfo.value.text,(newVal:string,oldVal:string) => console.log(newVal,oldVal));

import { apiGetCoursesList } from '../api';
onMounted(async () => {
  //方法1
  // axios.get<Array<Tcourses>>("https://vue-lessons-api.vercel.app/courses/list")
  // .then((res:AxiosResponse<Array<Tcourses>>) => {
  //   coursesArr.value = res.data;
  //   console.log(coursesArr.value);
  // });
  //方法2
  // const res = await axios.get<Array<Tcourses>>("https://vue-lessons-api.vercel.app/courses/list");
  // coursesArr.value = res.data;
  //方法3
  try{
    const res = await apiGetCoursesList()
    console.log(res.data);
    coursesArr.value = res.data
  }catch(error){
    console.error(error);
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <ul class="flex justify-center mt-12">
      <li v-for="item in newListData" :key="item.txt">
        <a class="text-yellow-400 bg-indigo-500/20 px-2 py-1" href="javascript:;">
          {{ item.txt }} - {{ actIdx }}
        </a>
      </li>
    </ul>
    <ul class="flex justify-center mt-12">
      <li
        :class="{'ml-2':idx > 0}"
        v-show="!item.isShow"
        v-for="(item,idx) in listData"
        :key="item.txt"
      >
        <a 
          :class="[
            'bg-slate-200/30 px-2 py-1 [transition:color_.3s,background-color_.3s]',
            actIdx === idx ? 'text-yellow-400 bg-indigo-500/20' : 'text-sky-400'
          ]"
          href="javascript:;" 
          @click="menuHand(idx)"
        >{{ item.txt }}</a>
      </li>
    </ul>
    <h2>{{ titleTxt }}</h2>
    <h1>{{ name }}</h1>
    <input type="text" class="block bg-gray-300 border-2 border-gray-400 rounded p-1 mb-3" v-model="name">
    <input type="text" class="block bg-gray-300 border-2 border-gray-400 rounded p-1 mb-3" @input="handleInput">
    <p>{{ title }}</p>
    <p>{{ userInfo.text }}</p>
    <pre>{{ info }}</pre>
    <h2>{{ text }}</h2>
    <button class="min-w-20 block bg-gray-300 border border-indigo-600 rounded p-1 mb-3" @click="addText('ABC', $event)">click ABC</button>
    <button class="min-w-20 block bg-gray-300 border border-indigo-600 rounded p-1 mb-3" @click="addText('123', $event)">click 123</button>
    <a :class="['inline-block bg-gray-300 rounded border border-indigo-600 p-2',{'ml-2':idx === 1}]" v-for="(item,idx) in linkList" :key="idx" :href="item" target="_blank">{{ item }}</a>
    <ul>
      <li v-for="(item,idx) in list" :key="item">{{ item }},{{ idx }}</li>
    </ul>
    <ul>
      <li v-for="(item2,idx2) in listArr" :key="idx2">
        <p>{{ idx2 }} - {{ item2 }}</p>
      </li>
    </ul>
    <ul>
      <li v-for="(value,key,idx3) in infoData" :key="key">
        <p>{{ idx3 }} - {{ key }} : {{ value }}</p>
      </li>
    </ul>
    <div>
      <span v-for="(txt,idx4) in word" :key="idx4">{{ txt }},</span>
    </div>
    <p v-if="isShow">show</p>
    <p v-show="!isShow">hide</p>
    <button class="min-w-20 block bg-gray-300 border border-indigo-600 rounded p-1 mb-3" @click="switchFn">switch</button>
    <template v-if="isSHow">
      <p v-for="item in items" :key="item.title">
        {{ item.title }}
      </p>
    </template>
    <p v-show="!isShowList">目前沒有列表</p>
    <p v-show="isShowList">以下是列表</p>
    <ul v-show="isShowList">
      <li v-for="(item,idx) in listArry" :key="item.id">
        {{ item.name }}
        <button @click="closeList(idx)">X</button>
      </li>
    </ul>
    <label for="checkAll">
      <input type="checkbox" id="checkAll" v-model="isAllSelect">全選
    </label>
    <div>
      <label :for="'checkList'+idx" v-for="(item,idx) in checkArry" :key="item.id">
        <input type="checkbox" :id="'checkList'+idx" v-model="item.isSelect"> {{ item.name }}
      </label>
    </div>
    <p class="min-w-20 inline-block bg-gray-300 border border-indigo-600 rounded p-2 my-3" v-html="linkHtml"></p>
    <p v-text="content"></p>
    <div class="flex my-3">
      <p>
        驗證碼:
        <input
          class="bg-gray-300 border border-indigo-600 rounded p-1 mr-3"
          type="text"
          v-model="verCode" 
          placeholder="輸入驗證碼"
          @keyup.enter="handSubmit"
        >
      </p>
      <button class="bg-gray-300 border border-indigo-600 rounded p-1" @click="handSubmit">Submit</button>
    </div>
    <input
      class="input bg-gray-300 border border-indigo-600 rounded p-1 mb-3"
      type="text"
      placeholder="測試驗證碼"
      @keyup="handleKeydown"
    >
    <div class="lg:flex lg:flex-wrap lg:justify-center">
      <a 
        class="cursor-pointer w-80 block rounded-md opacity-85 shadow-lg overflow-hidden mx-auto mb-5 relative 
              [transition:opacity_.3s] hover:opacity-100 lg:mx-7" 
        v-for="item in coursesArr" :key="item.id" href="javascript:;" 
        @click="openUrl(item.url)"
      >
        <p class="text-white text-xs bg-gray-950 px-1 py-2 absolute top-0 ring-0" @click.stop="openUrl(item.moreUrl)">觀看更多</p>
        <img class="w-full" :src="item.photo" :alt="item.name">
        <div class="text-indigo-900">
          <h1 class="text-2xl text-center px-8">{{ item.name }}</h1>
          <p class="text-xs px-6 py-4">{{ item.description }}</p>
          <div class="text-gray-800 flex justify-between items-center px-3.5 px-4 py-3">
            <div class="flex items-center">
              <img class="w-7 rounded-full mr-2" :src="item.teacher.img" :alt="item.teacher.name">
              <p>{{ item.teacher.name }}</p>
            </div>
            <h2 class="text-sm">NTD: {{ item.money }}</h2>
          </div>
        </div>
      </a>
    </div>
    <!-- @keyup="handleKeydown($event)" -->
    <!-- <div class="a md:flex-row sm:text-wrap max-[320px]:text-center min-[1920px]:inset-x-28"></div> -->
  </div>
</template>

<style lang="scss">
</style>