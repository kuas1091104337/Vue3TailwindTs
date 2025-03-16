<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUpdated } from 'vue';
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Ttwzip, Tphone, TseoHome, Tlogin, TerrorMsg, Tinfo } from '../types';
import { apiPostRegistered, apiGetCityList, apiGetPhotoList, apiGetSeoHome } from '../api';

const img = 'https://ik.imagekit.io/thecodingpro/mike-school/tr:w-1920,c-at_max/o/web%2F1701877845.jpg?alt=media&token=c54b2697-dd91-44f3-a109-7da4c2cf4c30',
      imgSrc = ref<string>(''),
      imgSrc2 = ref<string>(''),
      isRgistered = ref<boolean>(false),
      isSuccess = ref<boolean>(false),
      terms = ref<boolean>(false),
      errorMsg = ref<TerrorMsg>({}),
      info = reactive<Tinfo>({
        username:'', password:'', email:'', sex:'', age:'',
        terms:computed(() => (terms.value ? 'on' : 'off'))
      }),
      loadImg = (
        url:string,
        callback:(error:Error | null, image?:HTMLImageElement) => void
      ):void => {
        const image = new Image()
        image.src = url
        image.onload = () => callback(null,image)
        image.onerror = () => callback(new Error('圖片出錯'))
      },
      loadImage = (url:string):Promise<HTMLImageElement> => {
        return new Promise((resolve,reject) => {
          const image:HTMLImageElement = new Image()
          image.src = url
          image.onload = () => resolve(image)
          image.onerror = () => reject(new Error('圖片出錯'))
        });
      },
      sendHand = async () => {
        console.log(isRgistered.value);
        if(isRgistered.value) return
        isRgistered.value = true
        //方法1
        // axios.post<Tlogin>('https://vue-lessons-api.vercel.app/auth/registered',info)
        //   .then((res:AxiosResponse<Tlogin>) => {
        //     console.log(res.data)
        //     if(res.data.success) isSuccess.value = true
        //   }).catch((error:any) => {
        //     console.log(error.response.data);
        //     errorMsg.value = error.response.data.error_message
        //     isRgistered.value = false
        //   });
        //方法2
        try{
          const res = await apiPostRegistered(info)
          console.log(res.data)
          if(res.data.success) isSuccess.value = true
        }catch(error:any){
          console.log(error.response.data);
          errorMsg.value = error.response.data.error_message
          isRgistered.value = false
        }
      };
loadImg(img,(error,image) => {
  if(error){
    console.error(error);
  }else if(image){
    // document.querySelector('#app').appendChild(image)
    imgSrc.value = image.src
  }
});
loadImage(img)
  .then(image => imgSrc2.value = image.src)
  .catch(error => console.error(error))
// function stopTime(callback) {
//   setTimeout(() => { callback() }, 2000);
// }
// stopTime(() => { console.log("時間到了") });

function stopTime():any{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
      reject('error')
    },2000);
  });
}
stopTime().then((res:any) => {
  console.log(res);
}).catch((error:any) => {
  console.log(error);
});
// 回傳 Promise {<pending>}
console.log(axios.get<Ttwzip>("https://vue-lessons-api.vercel.app/city/list"));
console.log(fetch("https://vue-lessons-api.vercel.app/city/list",{method:"GET"}));

const str = "ECMAScript is a scripting-language specification standardized by Ecma International in ECMA-262 and ISO/IEC 16262. It was created to standardize JavaScript, so as to foster multiple independent implementations. JavaScript has remained the best-known implementation of ECMAScript since the standard was first published, with other well-known implementations including JScript and ActionScript.ECMAScript is commonly used for client-side scripting on the World Wide Web, and it is increasingly being used for writing server applications and services using Node.js.",
      str2 = "ECMAScript Javscript EggCat E123456789t Eabcdefg ecmascripT Ecmascript",
      strArr = [ "airline","banner","apple","cat","dog","applepay","linerair","airplane","wayair","habit" ],
      mailArr = [ "a123@gmail.com","tesst@hotmail.com","n789@gmail.com","abcdef@yahoo.com","55555@gmail.com","1245@hotmail.com","abc123@hotmail.com" ],
      DateArr = [ "2006/02/03","test/07/sd","2016/05/10","1998/03/07","12345/23/45678","1234/23/45678","12345/23/45" ],
      txtRep = ref<string>(''),
      searchTxt = ref<string>(''),
      txtRep2 = ref<Array<string>>([]),
      txtRep3 = ref<Array<string>>([]),
      startFilter = ref<Array<string>>([]),
      endFilter = ref<Array<string>>([]),
      midFilter = ref<Array<string>>([]),
      mailFilter = ref<Array<string>>([]),
      dateFilter = ref<Array<string>>([]),
      searchHand = () => {
        if(searchTxt.value === ''){
          alert('欄位不可以空白')
        }else if(!/^[A-Z]+$/.test(searchTxt.value)){
          alert('請輸入大寫英文字母')
        }else{
          alert('輸入成功')
        }
      },
      checkOnlyStringNumber = (str:string):boolean => { // 檢查字串只能有文字與數字
        const reg = /^[a-zA-Z0-9]+$/;
        return reg.test(str);
      },
      checkOnlyString = (str:string):boolean => { // 檢查字串只能有文字
        const reg = /^[a-zA-Z]+$/;
        return reg.test(str);
      },
      checkOnlyNumber = (str:string):boolean => { // 檢查字串只能有數字
        const reg = /^[0-9]+$/;
        return reg.test(str);
      },
      checkDate = (str:string):boolean => { // 檢查日期型態 (MM/DD/YYYY)
        const reg = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
        return reg.test(str);
      },
      checkDate2 = (str:string):boolean => { // 檢查日期型態 (YYYY/MM/DD)
        const reg = /^(19|20)\d{2}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;
        return reg.test(str);
      },
      checkEmail = (str:string):boolean => { // Email檢查
        const reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
        return reg.test(str);
      },
      checkIP = (str:string):boolean => { // 檢查IP位址
        const reg =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/;
        return reg.test(str);
      },
      checkPassword = (str:string):boolean => { // 檢查密碼：密碼長度必須有八碼，並且包含至少一個小寫字母與一個大寫字母和一個數字
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return reg.test(str);
      },
      checkURL = (str:string):boolean => { // 檢查網址
        const reg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return reg.test(str);
      };
txtRep.value = str.replace(/ECMAScript/g,'@-JS-@')
txtRep2.value = str2.match(/E([a-zA-Z]+)t/g)
txtRep3.value = str2.match(/ECMAScript/gi)
// txtRep3.value = str2.match(/()/gi)
startFilter.value = strArr.filter(el => /^air/.test(el))
endFilter.value = strArr.filter(el => /air$/.test(el))
midFilter.value = strArr.filter(el => /^a.*e$/.test(el))
mailFilter.value = mailArr.filter(el => /^.+@gmail\.com$/.test(el))
// dateFilter.value = DateArr.filter(el => /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/.test(el))
dateFilter.value = DateArr.filter(el => el.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/)).map(item => item.replace(/\//g,'-'))
onUpdated(() => {
  // console.log(terms.value);
  // console.log(info);
})
onMounted(async () => {
  // const dataArr:Array<Promise<AxiosResponse<any>>> = [
  //   axios.get<Array<Tphone>>("https://vue-lessons-api.vercel.app/photo/list"),
  //   axios.get<TseoHome>("https://vue-lessons-api.vercel.app/seo/home"),
  //   axios.get<Ttwzip>("https://vue-lessons-api.vercel.app/city/list"),
  // ],
  const dataArr:Array<Promise<AxiosResponse<any>>> = [
    apiGetPhotoList(), apiGetSeoHome(), apiGetCityList()
  ],
  dataArr2:Array<Promise<AxiosResponse<any>>> = [
    axios.get<Array<Tphone>>("https://vue-lessons-api.vercel.app/photo/list"),
    axios.get<TseoHome>("https://vue-lessons-api.vercel.app/seo/home"),
    axios.get<Ttwzip>("https://vue-lessons-api.vercel.app/city/list"),
    axios.get<Array<Tphone>>("https://vue-lessons-api.vercel.app/photo/list?status=error"),
  ]
  try{
    const resArr = await Promise.all(dataArr);
    console.log(resArr);
    console.log(resArr[0].data, resArr[1].data, resArr[2].data);
    const resArr2 = await Promise.allSettled(dataArr2);
    console.log(resArr2);
    resArr2.forEach((res,idx) => {
      if(res.status === 'fulfilled'){
        console.log('res - '+(idx+1)+' : '+res.value.data);
      }else if(res.status === 'rejected'){
        console.error('res - '+(idx+1)+' : '+res.reason.message);
      }
      console.log(resArr2[idx].status === 'fulfilled' ? resArr2[idx].value .data : resArr2[idx].reason.message);
    });
    //方法1
    // const res = await axios.get<Ttwzip>('https://vue-lessons-api.vercel.app/city/list');
    //方法2
    const res = await apiGetCityList()
    console.log(res.data);
  }catch(error){
    console.error(error);
  }finally{
    console.log('async/await 結束');
  }
  // axios.get<Ttwzip>("https://vue-lessons-api.vercel.app/city/list")
  //   .then((res:AxiosResponse<Ttwzip>) => {
  //     console.log(res.data);
  //   }).catch((error:any) => {
  //     console.log(error);
  //   });
});

</script>

<template>
  <div class="w-4/5 max-w-[1920px] mx-auto">
    <img :src="imgSrc">
    <h3 class="max-w-600px mt-4 mx-auto">ECMAScript to @-JS-@</h3>
    <p class="max-w-600px mt-1 mx-auto">{{ txtRep }}</p>
    <h3 class="max-w-600px mt-4 mx-auto">全部單字：</h3>
    <p class="max-w-600px mt-1 mx-auto" v-text="str2"></p>
    <p class="max-w-600px mt-1 mx-auto">E開頭t結尾：{{ txtRep2 }}</p>
    <p class="max-w-600px mt-1 mx-auto">ECMAScript不分大小寫：{{ txtRep3 }}</p>
    <h3 class="max-w-600px mt-4 mx-auto">全部單字：</h3>
    <p class="max-w-600px mt-1 mx-auto" v-text="strArr"></p>
    <p class="max-w-600px mt-1 mx-auto">air 開頭：{{ startFilter }}</p>
    <p class="max-w-600px mt-1 mx-auto">air 結尾：{{ endFilter }}</p>
    <p class="max-w-600px mt-1 mx-auto">a 開頭，中間不管，e 結尾：{{ midFilter }}</p>
    <h3 class="max-w-600px mt-4 mx-auto">全部帳號：</h3>
    <p class="max-w-600px mt-1 mx-auto" v-text="mailArr"></p>
    <p class="max-w-600px mt-1 mx-auto">gmail的帳號：{{ mailFilter }}</p>
    <h3 class="max-w-600px mt-4 mx-auto">全部資料：</h3>
    <p class="max-w-600px mt-1 mx-auto" v-text="DateArr"></p>
    <p class="max-w-600px mt-1 mx-auto">正確日期：{{ dateFilter }}</p>
    <img class="mt-4" :src="imgSrc2" >
  </div>

  <div class="bg-[#eeb8b8] p-50px">
    <img class="w-[260px] mx-auto" src="../assets/img/logo2.png">
    <div v-show="!isSuccess" class="w-[280px] mx-auto">
      <div class="mb-20px">
        <label class="text-[#4a0d0d] block mb-2" for="username">NAME</label>
        <input
          v-model="info.username"
          class="text-sm w-full h-30px border border-black rounded-sm px-5px" id="username"
          type="text"
          placeholder="輸入使用者名稱"
          autocomplete="off"
        />
        <p v-if="errorMsg.username" class="text-red-600 pt-1">{{ errorMsg.username }}</p>
      </div>
      <div class="mb-20px">
        <label class="text-[#4a0d0d] block mb-2" for="password">PASSWORD</label>
        <input
          v-model="info.password"
          class="text-sm w-full h-30px border border-black rounded-sm px-5px" id="password"
          type="password"
          placeholder="輸入密碼"
          autocomplete="off"
        />
        <p v-if="errorMsg.password" class="text-red-600 pt-1">{{ errorMsg.password }}</p>
      </div>
      <div class="mb-20px">
        <label class="text-[#4a0d0d] block mb-2" for="email">E-MAIL</label>
        <input
          v-model="info.email"
          class="text-sm w-full h-30px border border-black" id="email"
          type="text"
          placeholder="輸入email"
          autocomplete="off"
        />
        <p v-if="errorMsg.email" class="text-red-600 pt-1">{{ errorMsg.email }}</p>
      </div>
      <div class="mb-20px">
        <label class="text-[#4a0d0d] block mb-2" for="age">年齡</label>
        <input
          v-model="info.age"
          class="text-sm w-full h-30px border border-black rounded-sm px-5px" id="age" 
          type="number"
          placeholder="輸入年齡"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-center mb-20px">
        <label class="flex items-center" for="boy">
          <input v-model="info.sex" type="radio" class="size-5 mr-2" id="boy" name="sex" value="boy" />
          boy
        </label>
        <label class="flex items-center ml-6" for="girl">
          <input v-model="info.sex" type="radio" class="size-5 mr-2" id="girl" name="sex" value="girl" />
          girl
        </label>
      </div>
      <div class="mb-20px">
        <label class="flex items-center justify-center mx-auto" for="terms">
          <input v-model="terms" class="size-5 mr-2" id="terms" type="checkbox" />
          我已閱讀使用者條款
        </label>
      </div>
      <button 
        @click="sendHand"
        class="cursor-pointer text-[darkslategrey] text-20px leading-[46px] w-[280px] bg-[#fadcda] rounded-full [box-shadow:0_3px_10px_#b45151]"
      >送出</button>
    </div>
    <h1
      v-show="isSuccess"
      class="text-white text-32px text-center py-3"
    >註冊成功</h1>
  </div>

  <div class="relative">
    <img src="@/assets/img/bg/11.jpg" alt="">
    <div class="PosAbsTR50Translate-50">
      <h1 class="text-white text-36px text-center leading-[40px] mb-6">請輸入你的英文名字</h1>
      <input 
        v-model.trim="searchTxt"
        class="w-400px h-30px border border-black rounded-sm px-2" 
        type="text" placeholder="輸入大寫的英文字母"
      />
      <button
        @click="searchHand"
        class="w-100px h-30px block border border-black rounded-sm mt-3 mx-auto"
      >送出</button>
    </div>
  </div>
</template>

<style lang="scss">

</style>