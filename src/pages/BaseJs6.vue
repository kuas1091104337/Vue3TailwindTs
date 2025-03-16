<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
// import axios from "axios";
// import type { AxiosResponse } from "axios";

import type { TerrorMsg, TpostLogin, Tphone, TgitUserRepos } from '../types';
import { apiPostLogin, apiGetPhotoList, apiGetUserRepos } from '../api/index';
import { local } from '../lib/localSave'
import { cookie } from '../lib/cookieSave'
import scrollListShow from '../components/slot_ui/scrollListShow.vue'

// import Cookies from 'js-cookie'
// let initTokenCookies = Cookies.get('token-Cookies') // undefined | 636b6030-3ee3-11eb-b378-0242ac130002
// let initTokenLocalStorage = localStorage.getItem('token-localStorage') // null | 636b6030-3ee3-11eb-b378-0242ac130002
let initTokenLocal = local.get('token-local')
let initTokenCookie = cookie.get('token-cookie')
const phoneMediaQuery = window.matchMedia('(max-width:768px)'),// 是不是手機 版
      test = ref<HTMLDivElement | null>(null),
      loading = ref<HTMLHeadingElement | null>(null),
      isLogin = ref<boolean>(false),
      isSuccess = ref<boolean>(false),
      isDisable = ref<boolean>(false),
      windowWidth = ref<number>(0),
      windowHeight = ref<number>(0),
      windowMiddle = ref<number>(0),
      pageIdx = ref<number>(0),
      pageLimit = ref<number>(10),
      errorMsg = ref<TerrorMsg>({}),
      photoList = ref<Array<Tphone>>([]),
      newRenderPhotoList = ref<Array<Tphone>>([]),
      reposList = ref<Array<TgitUserRepos>>([]),
      info = reactive<TpostLogin>({ username:'', password:'', terms:false }),
      isMobile = computed<boolean>(() => windowWidth.value < 768),
      renderPhotoList = computed<Array<Tphone>>(() => isMobile.value ? photoList.value.slice(0,4) : photoList.value),
      // { username: "mike", password: "7654321" }
      sendHand = async () => {
        if(!info.terms){
          alert('請閱讀使用者條款')
          return
        }
        if(isLogin.value) return
        isLogin.value = true
        //方法2
        try{
          const res = await apiPostLogin(info)
          // Cookies.set('token-Cookies',res.data.data.token,{expires:7})
          // localStorage.setItem('token-localStorage',res.data.data.token)
          local.set('token-local',res.data.data.token)
          cookie.set('token-cookie',res.data.data.token)
          errorMsg.value = {}
          console.log(res.data)
        }catch(error){
          console.log(error.response.data);
          errorMsg.value = error.response.data.error_message
          isLogin.value = false
        }
        //方法1
        // const res = await axios.post("https://vue-lessons-api.vercel.app/auth/login",info)
        //   .then((res) => {
        //     // console.log(res.data)
        //     Cookies.set('token',res.data.data.token)
        //     errorMsg.value = {}
        //   }).catch((error) => {
        //     // console.log(error.response.data);
        //     errorMsg.value = error.response.data.error_message
        //     isLogin.value = false
        //   });
      },
      checkLoginStatus = () => {
        // const token = Cookies.get('token-Cookies')
        // const token = localStorage.getItem('token-localStorage')
        // const token = local.get('token-local')
        const token = cookie.get('token-cookie')
        if(token){ 
          isSuccess.value = true
        }else{
          isSuccess.value = isLogin.value = false;
        }
        // initTokenLocalStorage = token
        // initTokenCookies = token
        initTokenCookie = token 
        // initTokenLocal = token
      },
      logoutHand = () => {
        // console.log(Cookies.get());
        // Cookies.remove('token-Cookies')
        // localStorage.removeItem('token-localStorage')
        local.remove('token-local')
        cookie.remove('token-cookie')
        // console.log(cookie.get('all'));
      },
      windowResize = () => { 
        windowWidth.value = window.innerWidth
        windowHeight.value = window.innerHeight
        windowMiddle.value = window.innerHeight*2/3
      },
      getRepos = async () => {
        if(isDisable.value) return
        try{
          pageIdx.value += 1
          const res = await apiGetUserRepos('MikeCheng1208',pageIdx.value,pageLimit.value)
          console.log(res.data);
          reposList.value = [...reposList.value, ...res.data]
          if(res.data.length < pageLimit.value){
            isDisable.value = true 
            loadingIO.unobserve(loading.value);
          }
        }catch(error){
          console.error(error);
        } 
      },
      // windowScroll = () => {
      //   const Ele:HTMLElement = document.documentElement;
      //   if(Ele.scrollHeight - Ele.scrollTop - windowHeight.value <= 0) getRepos() 
      // },
      renderPhotoListFn = () => { newRenderPhotoList.value = phoneMediaQuery.matches ? photoList.value.slice(0,4) : photoList.value },
      loadingIO = new IntersectionObserver(entries => {
        console.log(entries[0].intersectionRatio);
        if(entries[0].isIntersecting) getRepos()
        //if(entries[0].intersectionRatio > 0) getRepos() //如果 intersectionRatio 为 0，则目标在视野外
      });

onMounted(async () => {
  checkLoginStatus();
  console.log(initTokenCookie, initTokenLocal);//, initTokenLocalStorage, initTokenCookies
  setInterval(() => {
    // if(initTokenCookies !== Cookies.get('token-Cookies')) checkLoginStatus()
    // if(initTokenLocalStorage !== localStorage.getItem('token-localStorage')) checkLoginStatus()
    // if(initTokenLocal !== local.get('token-local')) checkLoginStatus()
    if(initTokenCookie !== cookie.get('token-cookie')) checkLoginStatus()
  },300);
  try{
    const res = await apiGetPhotoList()
    photoList.value = res.data
    console.log(res.data);
  }catch(error){
    console.error(error);
  }
  getRepos()
  windowResize()
  window.addEventListener('resize',windowResize);
  // window.addEventListener('scroll',windowScroll);
  renderPhotoListFn();
  // 有些瀏覽器 window.matchMedia 沒有 addEventListener
  if('addEventListener' in phoneMediaQuery){
    phoneMediaQuery.addEventListener('change',renderPhotoListFn);
  }else if('addListener' in phoneMediaQuery){
    (phoneMediaQuery as MediaQueryList).addListener(renderPhotoListFn);
  }
  // 開始監聽目標是否在視野內
  loadingIO.observe(loading.value);
});
onUnmounted(() => {
  window.removeEventListener('resize',windowResize);
  // window.removeEventListener('scroll',windowScroll);
  if('removeEventListener' in phoneMediaQuery){
    phoneMediaQuery.removeEventListener('change',renderPhotoListFn);
  }else if('removeListener' in phoneMediaQuery){
    (phoneMediaQuery as MediaQueryList).removeListener(renderPhotoListFn);
  }
})

</script>

<template>
  <div class="h-full relative">
    <img class="w-full h-full object-fill" src="@/assets/img/bg/9.jpg">
    <div class="PosAbsTR50Translate-50">
      <img class="w-[250px] mx-auto" src="../assets/img/logo1.png">
      <p class="text-xs">{{ info }}</p>
      <div v-show="!isSuccess" class="w-[280px] mx-auto">
        <div class="mb-20px">
          <label class="text-[#fff] block mb-2" for="username">NAME</label>
          <input
            v-model="info.username"
            class="text-sm w-full h-30px border border-black rounded-sm px-5px" id="username"
            type="text"
            placeholder="輸入使用者名稱"
          />
          <p v-if="errorMsg.username" class="text-red-600 pt-1">{{ errorMsg.username }}</p>
        </div>
        <div class="mb-20px">
          <label class="text-[#fff] block mb-2" for="password">PASSWORD</label>
          <input
            v-model="info.password"
            class="text-sm w-full h-30px border border-black rounded-sm px-5px" id="password"
            type="password"
            placeholder="輸入密碼"
          />
          <p v-if="errorMsg.password" class="text-red-600 pt-1">{{ errorMsg.password }}</p>
        </div>
        <div class="mb-20px">
          <label class="text-[#fff] flex items-center justify-center mx-auto" for="terms">
            <input v-model="info.terms" class="size-5 rounded mr-2" id="terms" type="checkbox" />
            我已閱讀使用者條款
          </label>
        </div>
        <button 
          @click="sendHand"
          class="cursor-pointer text-[darkslategrey] text-20px leading-[46px] w-[280px] bg-[#ccc] rounded-full [box-shadow:0_2px_8px_rgb(0,0,0,.7)] [transition:background-color_.4s,box-shadow_.4s] hover:bg-[#eee] hover:[box-shadow:0_6px_8px_rgb(0,0,0,.7)]"
        >登入</button>
      </div>
      <div class="" v-show="isSuccess">
        <h1 class="text-white text-32px text-center py-3">登入成功</h1>
        <button
          @click="logoutHand"
          class="cursor-pointer leading-[30px] w-[120px] block rounded-full mx-auto"
        >登出</button>
      </div>
    </div>
  </div>
  <div class="py-16" ref="test">
    <p class="text-center">computed 方法 - window width : {{windowWidth}} , is mobile : {{isMobile}}</p>
    <ul class="flex flex-wrap justify-evenly border-2 border-[#6c5ed8] py-[3%] mx-auto md:w-4/5 md:flex-nowrap md:overflow-y-auto md:p-0">
      <li 
        :class="['w-[45.5%] border-2 border-[#aaa] mb-3 md:w-[250px] md:flex-shrink-0',{'md:ml-3':idx > 0}]" 
        v-for="(item,idx) in renderPhotoList" :key="item.url"
      >
        <img :src="item.url" class="w-full">
        <p class="text-center pb-3 md:pb-6">{{idx}} - 這是一個好的產品</p>
      </li>
    </ul>
    <p class="text-center mt-6">window.matchMedia 方法</p>
    <ul class="flex flex-wrap justify-evenly border-2 border-[#6c5ed8] py-[3%] mx-auto md:w-4/5 md:flex-nowrap md:overflow-y-auto md:p-0">
      <li 
        :class="['w-[45.5%] border-2 border-[#aaa] mb-3 md:w-[250px] md:flex-shrink-0',{'md:ml-3':idx > 0}]" 
        v-for="(item,idx) in newRenderPhotoList" :key="item.url"
      >
        <img :src="item.url" class="w-full">
        <p class="text-center pb-3 md:pb-6">{{idx}} - 這是一個好的產品</p>
      </li>
    </ul>
  </div>
  <div class="bg-[#e5e5e5] pt-20">
    <ul class="py-px">
      <scrollListShow v-for="(item,idx) in reposList" :key="item.name" :listIdx="idx">
        <h1 class="text-18px font-bold mb-1">{{ item.name }}</h1>
        <h2 class="text-[#7f7f7f] mb-1">{{ item.decoration }}</h2>
        <a 
          class="text-[#888] text-14px overflow-ellipsis block overflow-hidden mb-1 hover:text-[#3d638a] hover:font-bold [transition:color_.4s,font-weight_.4s]" 
          :href="item.html_url" 
          target="_blank"
        >{{ item.html_url }}</a>
        <div class="text-[#888] font-black flex">
          <img class=" w-5 mr-1" src="@/assets/star.svg" alt=""/>{{ item.stargazers_count }}
        </div>
      </scrollListShow>
      <!-- <li
        v-for="item in reposList" :key="item.name"
        class="max-w-500px bg-white [box-shadow:0_3px_5px_rgba(71,71,71,.1)] p-5 mx-auto mb-5"
      >
        <h1 class="text-18px font-bold mb-1">{{ item.name }}</h1>
        <h2 class="text-[#7f7f7f] mb-1">{{ item.decoration }}</h2>
        <a 
          class="text-[#888] text-14px overflow-ellipsis block overflow-hidden mb-1 hover:text-[#3d638a] hover:font-bold [transition:color_.4s,font-weight_.4s]" 
          :href="item.html_url" 
          target="_blank"
        >{{ item.html_url }}</a>
        <div class="text-[#888] font-black flex">
          <img class=" w-5 mr-1" src="@/assets/star.svg" alt=""/>{{ item.stargazers_count }}
        </div>
      </li> -->
    </ul>
    <h1 ref="loading" v-show="!isDisable" class="text-center ">LOADING...</h1>
  </div>
</template>

<style lang="scss">

</style>