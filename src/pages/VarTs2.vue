<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TUserBaseType, TUserJobType } from '../types';// /index
// import { getRandomInt, createRandomBool } from '../lib/randomFn'; Vue3TailwindTs

type Tlist = { url:string; }
const list = ref<Array<Tlist>>([]);
// 泛型 ( Generics )
const resArg = <T>(arg:T):T => arg;
function resArg2<T>(arg:T):T{
  return arg;
}
const res3 = resArg<string>("Mike");
const res4 = resArg2<number>(100);
console.log(res3); // -> "Mike"
console.log(res4); // -> 100

const getFirstItem2 = <T>(arr:T[]):T => arr[0];
function getFirstItem<T>(arr:T[]):T{
  return arr[0];
}
const numbers = [1, 2, 3, 4];
const firstNumber = getFirstItem<number>(numbers);
console.log(firstNumber); // => 1
const strings = ["a", "b", "c", "d"];
const firstString = getFirstItem2<string>(strings);
console.log(firstString); // => "a"

type Tphone = { url:string; }
async function apiRequest<T>(url:string):Promise<{status:number;data:T;}>{
  const response = await fetch(url);
  const data = await response.json() as T;
  return { 
    status:response.status, 
    data 
  }
}
apiRequest<Array<Tphone>>("https://vue-lessons-api.vercel.app/photo/list").then((res) => {
  console.log("API then=>", res.data);
  list.value = res.data;
});
// const res = await apiRequest<Tphone[]>("https://vue-lessons-api.vercel.app/photo/list")
// console.log("API await=>", res.data);

// 非同步(Asynchronous)函式
import axios from "axios";
import type { AxiosResponse } from "axios";
// import axios, { AxiosResponse } from "axios";
// 如果使用 Axios 就不需要自己定義，因為 Axios 已經定義好了，AxiosResponse<T> 就是一個泛型
axios.get<Array<Tphone>>("https://vue-lessons-api.vercel.app/photo/list")
.then((res:AxiosResponse<Array<Tphone>>) => {
  console.log("axios=>", res.data);
});

const apiGetPhotoList = ():Promise<AxiosResponse<Array<Tphone>>> => axios.get("https://vue-lessons-api.vercel.app/photo/list");
function apiGetPhotoList2():Promise<AxiosResponse<Array<Tphone>>>{
  return axios.get("https://vue-lessons-api.vercel.app/photo/list");
}
// const resPhoto = await apiGetPhotoList();
// const resPhoto2 = await apiGetPhotoList2();
// console.log("photo list=>", resPhoto.data);
// console.log("photo list=>", resPhoto2.data);

// 使用映射型別 (Mapped Types)
// 可以鎖住物件的 key 和 value 的型別
type TlolStateKey = 'Offline' | 'Online' | 'nostate' | 'leave'
type TlolState = {
  [k in TlolStateKey]:string;
}
const lolState:TlolState = {
  Offline: "離線",
  Online: "在線",
  leave: "離開",
  nostate: "不存在"
}

type TlolStateMap = {
  [k in string]:string;
}
const lolState2:TlolStateMap = {
  Offline: "離線",
  Online: "在線",
  leave: "離開",
  nostate: "不存在"
}

type TlolStateMapKey = 'Offline' | 'Online'  | 'leave'  | 'nostate';
type TlolStateMapValue = '離線' | '在線'  | '離開'  | '不存在';
// Record<K,T> 會幫你建立一個新物件，並且鎖定 key 和 value 的型別
const lolStateMap:Record<TlolStateMapKey,TlolStateMapValue> = {
  Offline: "離線",
  Online: "在線",
  leave: "離開",
  nostate: "不存在"
};

// 用interface定義也一樣沒問題
// interface IuserValue { age:number;address:string; };
type TuserValue = { age:number;address:string; };
type TuserKey = 'mike' | 'jacky' | 'andy';
type TuserData = Record<TuserKey,TuserValue>;
const subscribersUserInfo:TuserData = {
  mike: {
    age: 18,
    address: "桃園"
  },
  jacky: {
    age: 20,
    address: "台北"
  },
  andy: {
    age: 22,
    address: "台中"
  }
};
type Tcolor = 'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';
type TstyleClassName = `bg-${Tcolor}-500` | `text-${Tcolor}-500` | `border-${Tcolor}-500`;
const resTextStatus:TstyleClassName = 'text-rose-500',
      resBgStatus:TstyleClassName = 'bg-cyan-500',
      resBorderStatus:TstyleClassName = 'border-amber-500';
console.log(resTextStatus, resBgStatus, resBorderStatus);

const userData: TUserBaseType & TUserJobType = {
  name: "Mike",
  age: 12,
  companyName: "TheCodingPro",
  jobTitle: "Teacher",
  seniority: 3,
  userAddress: "台灣桃園市",
  companyAddress: "台灣台北市",
};
console.log("模組化 type:", userData);

// Partial 把所有的屬性變成可選的
type TUserDataInfo = {
  name:string;
  age:number;
  address:string;
  // address?:string;
};
const user1:Partial<TUserDataInfo> = {
  name:"Mike",
  age:12,
};

// Required 把所有的屬性變成必選的
type TUserRequiredInfo = {
  name?: string;
  age?: number;
  address?: string;
};
const user3:Required<TUserRequiredInfo> = {
  name: "Mike",
  age: 12,
  address: "台灣台北市",
};

// Pick_and_Omit
type TUserAllType = {
  name:string; userAddress:string; companyName:string; jobTitle:string; companyAddress:string;
  age:number; seniority:number;
};
// 可以使用 Pick 來挑選出需要的屬性，另外組成新的 type
const userBaseType:Pick<TUserAllType,'name' | 'userAddress' | 'jobTitle'> = {
  name:'Mike',
  userAddress:'Taiwan',
  jobTitle:'Frontend Engineer',
};
// 使用 Omit 來挑選出不需要的屬性，另外組成新的 type 
const userJobType:Omit<TUserAllType,'name' | 'age' | 'userAddress'> = {
  companyName:'TheCodingPro',
  jobTitle:'Teacher',
  seniority:3,
  companyAddress:'台灣台北市',
};

// Extract and Exclude
type TButtonKeyAttr = 'create' | 'edit' | 'success' | 'error';
type TButtonValue = '新增' | '修改' | '完成' | '失敗';
//  Extract 聯合類型 "選取" 指定內容，另外組成新的 type
type TExtractBtnKey = Extract<TButtonKeyAttr, 'create' | 'success'>;
const successUseBtn: TExtractBtnKey[] = ['create', 'success'];
// Exclude 聯合類型 "排除" 指定內容，另外組成新的 type
type TExcludeBtnKey = Exclude<TButtonKeyAttr, 'create' | 'success'>;
const errorUseBtn: TExcludeBtnKey[] = ['edit', 'error'];

// Readonly 無法更改jobData內的屬性，因為已經被設定為只能讀取
type TJobType = {
  companyName:string; jobTitle:string; companyAddress:string;
  seniority:number;
};
type TReadOnlyJobType = Readonly<TJobType>;
const jobData:TReadOnlyJobType = {
  companyName:'TheCodingPro',
  jobTitle:'Teacher',
  companyAddress:'台灣台北市',
  seniority:3,
};
const jobData2:Readonly<TJobType> = {
  companyName:'TheCodingPro',
  jobTitle:'Teacher',
  companyAddress:'台灣台北市',
  seniority:3,
};
// 無法更改jobData內的屬性，因為已經被設定為只能讀取
// jobData.jobTitle = 'Engineer';

// onMounted(() => {
//   console.log(createRandomBool());
//   console.log(getRandomInt(2,5));
// });
</script>

<template>
<p :class="[resTextStatus, resBgStatus, resBorderStatus,'border']">
  gray、red、orange、amber、yellow、lime、green、emerald、teal、cyan、sky、blue、indigo、violet、purple、fuchsia、pink、rose
</p>
<pre>
{{ jobData }}
{{ userBaseType }}
{{ userJobType }}
{{ user3 }}
{{ user1 }}
{{ lolStateMap }}
{{ subscribersUserInfo }}
{{ list }}
</pre>
</template>

<style lang="scss">

</style>