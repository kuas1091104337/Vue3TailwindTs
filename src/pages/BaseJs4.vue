<script setup lang="ts">
// import axios from "axios";
// import type { AxiosResponse } from "axios";
import { ref, computed, onMounted, watch } from 'vue';
const inputVal = ref<string>(''),
      inputVal2 = ref<string>(''),
      mailText = ref<string>('@gmail.com'),
      textVal = ref<string>(''),
      textTest = ref<string>('HelloMike!'),
      date = ref<string>('2019-01-01'),
      num = ref<number>(5241522),
      numVal = computed<string>(():string => {
        let i:number = 0;
        const strArr = [...(num.value+'')].reverse(),
              arr:Array<string> = [];
        strArr.forEach(val => {
          i++
          if(i > 3){
            i = 1
            arr.push(',')
          }
          arr.push(val)
        })
        return arr.reverse().join('');
      }),
      numVal2 = computed<string>(():string => (num.value+'').replace(/\B(?=(\d{3})+(?!\d))/g,',')),
      reDate = computed<string>(():string => date.value.replace(/-/g,'/')),
      reverseText = computed<string>(():string => [...textTest.value].reverse().join('')),
      mailName = computed<string>(():string => mailText.value.slice(0, mailText.value.indexOf('@'))),
      mailAccount = computed<string>(():string => mailText.value.split('@')[0]),
      textValLower = computed<string>(():string => textVal.value.toLocaleLowerCase()),
      textValUpper = computed<string>(():string => textVal.value.toLocaleUpperCase()),
      submitHand = () => console.log(inputVal.value),
      submitHand2 = () => console.log(inputVal2.value);

import type { Tmoive, TcityArr, Tarea, Tcity, Ttwzip } from '../types';
const selectCity = ref<string>(''),
      selectArea = ref<string>(''),
      cityList = ref<Array<Tcity>>([]),
      cityArr = computed<Array<TcityArr>>(() => {
        const arr:Array<TcityArr> = []
        cityList.value.forEach((obj:Tcity) => arr.push({name:obj.name}))
        return arr
      }),
      areaArr = computed<Array<Tarea>>(() => {
        const filterArr = cityList.value.filter(item => item.name === selectCity.value)
        // return filterArr.length ? filterArr[0].area : []
        return filterArr[0]?.area ?? []
      });

watch(selectCity,(newCity,oldCity) => {
  if(newCity !== oldCity) selectArea.value = ''
});

import { apiGetCityList } from '../api';
onMounted(async () => {
  //方法1
  // fetch("https://vue-lessons-api.vercel.app/city/list")
  //   .then((res:Response) => res.json())
  //   .then((res:Ttwzip):void => { console.log(res); });
  //方法2
  // axios.get<Ttwzip>("https://vue-lessons-api.vercel.app/city/list")
  //   .then((res:AxiosResponse<Ttwzip>) => {
  //     console.log(res.data.twzip.city);
  //     const jpzip = res.data.twzip.jpzip ?? []
  //     console.log(jpzip);
  //     cityList.value = res.data.twzip.city;
  //   }).catch((error:any) => {
  //     console.log(error);
  //   });
  //方法3
  try{
    const res = await apiGetCityList()
    console.log(res.data);
    const jpzip = res.data.jpzip ?? []
    console.log(jpzip);
    cityList.value = res.data.twzip.city;
  }catch(error){
    console.error(error);
  }
  // CORS 
  // axios.get<Array<Tmoive>>("https://www.vscinemas.com.tw/VsWeb/api/GetLstDicCinema")
  // .then(res => {
  //   console.log("拿到資料:", res.data);
  // }).catch((error:any) => {
  //   alert(error.response?.data?.msg || '發生錯誤');
  //   console.error("發生錯誤 狀態碼不是200:", error.response?.data?.msg || error.message);
  // });
});

</script>

<template>
<div class="min-h-300px bg-[url('@/assets/img/bg/12.jpg')] bg-cover py-25px">
  <p class="font-extralight text-sky-700 text-30px text-center leading-1.5 w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ inputVal2 }}</span></p>
  <input type="text" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model="inputVal2">
  <button class="w-100px h-30px block border border-black rounded mt-12px mx-auto mb-25px" @click="submitHand2">送出</button>
  <p class="font-extralight text-sky-700 text-30px text-center leading-1.5 w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ inputVal }}</span></p>
  <input type="text" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model.trim="inputVal">
  <button class="w-100px h-30px block border border-black rounded mt-12px mx-auto mb-25px" @click="submitHand">送出</button>
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">account : {{ mailAccount }}</span></p>
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">account : {{ mailName }}</span></p>
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ mailText }}</span></p>
  <input type="text" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model.trim="mailText">
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">lower : {{ textValLower }}</span></p> 
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">upper : {{ textValUpper }}</span></p>
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ textVal }}</span></p>
  <input type="text" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model.trim="textVal">
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ reverseText }}</span></p>
  <input type="text" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model.trim="textTest">
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ reDate }}</span></p>
  <input type="text" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model.trim="date">
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ numVal2 }}</span></p>
  <p class="font-extralight text-sky-700 text-24px text-center leading-[45px] w-300px h-45px bg-gray-300 mx-auto"><span class="inline-block -skew-x-5">{{ numVal }}</span></p>
  <input type="number" class="w-300px h-30px block border border-black rounded p-8px mx-auto my-12px" id="" v-model.trim="num">
</div>
<div class="leading-1.8 min-w-360px max-w-800px bg-black p-20px mx-auto">
  <p class="text-white pl-18px">fetch(url,{</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;method:"POST" | "GET" | "PUT" | "PATCH" | "DELETE",</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;headers:{ <span class="text-14px bg-white/25 p-[2px_4px]">// 帶什麼樣格式給後端</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;"Content-Type": "application/json",</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}, <span class="text-14px bg-white/25 p-[2px_4px]">// F12 >> Network >> Headers >> Response Headers (回傳的結果)、Request Headers (發起請求帶的資訊內容)</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;body:JSON.stringify({ <span class="text-14px bg-white/25 p-[2px_4px]">// 要帶給後端的資料</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;email: "",</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;password: "",</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}),</p>
  <p class="text-white pl-18px">}).then((response) => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;return response.json();</p>
  <p class="text-white pl-18px">}).then((response) => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(response);</p>
  <p class="text-white pl-18px">}).catch((error) => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(`error:`, error);</p>
  <p class="text-white text-12px leading-1 pl-18px">});</p>
  <p class="text-amber-300 text-18px">axios.post(url[, data[, config]])</p>
  <p class="text-amber-300 text-18px">axios.delete(url[, config])</p>
  <p class="text-amber-300 text-18px">axios.patch(url[, data[, config]])</p>
  <p class="text-amber-300 text-18px">axios.put(url[, data[, config]])</p>
  <p class="text-amber-300 text-18px">用法 1</p>
  <p class="text-white pl-18px">axios.post(</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;url,</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;{ email:"", password:"" },</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;{</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;headers:{</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content-type":"application/json",</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Authorization:"AUTH_TOKEN",</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;},</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">).then(res => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(res);</p>
  <p class="text-white pl-18px">}).catch(error => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(error);</p>
  <p class="text-white text-12px leading-1 pl-18px">});</p>
  <p class="text-amber-300 text-18px">用法 2</p>
  <p class="text-white pl-18px">axios({</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;method:"post",</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;url:"api/url",</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;data:{ email:"", password:"" },</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;headers:{</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;"content-type":"application/json",</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;Authorization:"AUTH_TOKEN",</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;},</p>
  <p class="text-white pl-18px">}).then(res => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(res);</p>
  <p class="text-white pl-18px">}).catch(error => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(error);</p>
  <p class="text-white text-12px leading-1 pl-18px">});</p>
  <!-- <p class="text-white text-12px leading-1 pl-18px"></p> -->
</div>
<div class="relative">
  <img src="@/assets/img/bg/4.jpg">
  <div class="w-3/4 max-w-1000px PosAbsTR50Translate-50">
    <p>{{ selectCity }},{{ selectArea }}</p>
    <p class="text-xs">{{ areaArr }}</p>
    <img class="w-3/4 mx-auto" src="@/assets/img/logo1.png">
    <div class="flex justify-center">
      <select class="w-[45%] max-w-200px h-40px px-10px" name="city" v-model="selectCity">
        <option disabled value="">請選擇縣市</option>
        <option v-for="item in cityArr" :key="item.name" :value="item.name">{{ item.name }}</option>
      </select>
      <select class="w-[45%] max-w-200px h-40px px-10px ml-[10%]" name="area" v-model="selectArea">
        <option disabled value="">請選擇區域</option>
        <option v-for="item in areaArr" :key="item.name" :value="item.zip">{{ item.name }}</option>
      </select>
    </div>
  </div>
</div>

</template>

<style lang="scss">

</style>