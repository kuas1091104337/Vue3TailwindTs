<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 型別指定
const num:number = 1;
const str:string = "mike";
const bool:boolean = true;
const arr1:Array<number> = [1, 2, 3];//外>內
const arr2:number[] = [1, 2, 3];//內>外
const arr3:Array<string> = ["a", "b", "c"];//外>內
const arr4:string[] = ["a", "b", "c"];//內>外
const arr5:Array<boolean> = [true, false, true];//外>內
const arr6:boolean[] = [true, false, true];//內>外
const arr7a:Array<number | string> = [1, "a"];//外>內
const arr7b:(number | string)[] = [1, "a"];//內>外
const arr8b:number[][] = [ [1, 2], [3, 4] ];//內>外
const arr8c:Array<Array<number>> = [ [1, 2], [3, 4] ];//外>內
const arr8a:Array<number>[] = [ [1, 2], [3, 4] ];
const arr9a:Array<Array<number | string>> = [ [1, "a"], [2, "b"] ];
const arr9b:(number | string)[][] = [ [1, "a"], [2, "b"] ];
const arr9c:Array<number | string>[] = [ [1, "a"], [2, "b"] ];
const arr10:Array<{id:number, name:string}> = [
  { id: 1, name: "mike" },
  { id: 2, name: "jane" },
];
const arr11:Array<{id:number, name?:string}> = [{ id: 1, name: "mike" }, { id: 2 }];
const arr12:Array<{id:number, name:string | null | undefined}> = [
  { id: 1, name: "mike" },
  { id: 2, name: null },
  { id: 3, name: undefined },
];

const obj1:{id:number, name:string} = { id: 1, name: "mike" };
const obj2:{id:number, name?:string} = { id: 1 };
const obj3:{id:number, name:string | undefined} = { id: 1, name: undefined };
const obj4:{id:number, name:string | null} = { id: 1, name: null };
const obj5:{id:number} = { id: 1 };
const obj6a:{id:number, name:string | null | undefined} = { id: 1, name: "mike" };
const obj6b:{id:number, name:string | null | undefined} = { id: 1, name: undefined };
const obj6c:{id:number, name:string | null | undefined} = { id: 1, name: null };

//Array 與 Tuple(元組)
//tuple 是固定長度的 array，type 和 value 相互對應
const tuple1: [number, string] = [1, "a"];
const tuple2: [string, number] = ["a", 1]; // string, number 有類型順序要一樣
const tuple3: [number, string, number] = [1, "a", 2]; // [裡面值的數量和類型順序要一樣]

//列舉 (Enum)
enum DaysWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
function getTodaySpecial(day:DaysWeek) {
  switch (day) {
    case DaysWeek.Monday:
      return "星期一大特價: 買一送一!";
    case DaysWeek.Tuesday:
      return "星期二大特價: 三人同行一人免費!";
    case DaysWeek.Wednesday:
      return "星期三大特價: 五折優惠!";
    case DaysWeek.Thursday:
      return "星期四大特價: 三人同行一人免費!";
    case DaysWeek.Friday:
      return "星期五大特價: 五折優惠!";
    case DaysWeek.Saturday:
      return "星期六大特價: 買一送一!";
    case DaysWeek.Sunday:
      return "星期日大特價: 三人同行一人免費!";
    default:
      return "今天沒有特價活動!";
  }
}
console.log(getTodaySpecial(0));
console.log(getTodaySpecial(DaysWeek.Sunday));
console.log(getTodaySpecial(DaysWeek['Friday']));
const val = 'Tuesday'
console.log(getTodaySpecial(DaysWeek[val]));

enum OnlineStatus {
  Online, Offline, leave
}
function getLOLUserStatus(status:OnlineStatus){
  if(status === OnlineStatus.Online){
    return "上線";
  }else if(status === OnlineStatus.Offline){
    return "離線";
  }else if(status === OnlineStatus.leave){
    return "不在位子上";
  }else{
    return "都不是";
  }
}
console.log(getLOLUserStatus(0));
const getVal1 = 'Offline'
console.log(getLOLUserStatus(OnlineStatus[getVal1]));
const getVal2 = 'leave'
console.log(getLOLUserStatus(OnlineStatus[getVal2]));

enum ErrorCode {
  NotFound = 404,
  Forbidden = 403,
  Unauthorized = 401
}
const handleError = (code:number = 0) => {
  if(code === ErrorCode.NotFound){
    console.log("ERROR: 沒有這個東西");
    return "ERROR: 沒有這個東西";
  }else if(code === ErrorCode.Forbidden){
    console.log("ERROR: 禁止存取");
    return "ERROR: 禁止存取";
  }else if(code === ErrorCode.Unauthorized){
    console.log("ERROR: 未經授權");
    return "ERROR: 未經授權";
  }else{
    console.log("ERROR: 未知的錯誤");
    return "ERROR: 未知的錯誤";
  }
}
console.log(handleError(404));
console.log(handleError(403));
console.log(handleError(401));
console.log(ErrorCode.NotFound);

const title = ref<HTMLHeadingElement | null>(null),
      inputTxt = ref<HTMLInputElement | null>(null),
      send = ref<HTMLButtonElement | null>(null),
      vtWrap = ref<HTMLDivElement | null>(null);
// H1~H6 HTMLHeadingElement
const titleRef:HTMLHeadingElement | null = document.querySelector('.title');
// input HTMLInputElement
const inputTxtRef:HTMLInputElement | null = document.querySelector('.inputTxt');
// button	HTMLButtonElement
const sendRef:HTMLButtonElement | null = document.querySelector('.send');
// div HTMLDivElement
const vtWrapRef:HTMLDivElement | null = document.querySelector('.vtWrap');
// 這樣就不用處理 null 的部分，因為你確定類型不可能是 null
const titleRef2 = document.querySelector(".title") as HTMLHeadingElement;
const inpTxtRef2 = document.querySelector(".inputTxt") as HTMLInputElement;
const sendRef2 = document.querySelector(".send") as HTMLButtonElement;
console.log(inputTxt.value);
onMounted(() => {
  console.log(inputTxt.value);
  setTimeout(() => compose("Mike",12),2000);
});
const inputVal = ref<string>(''),
      compose = (name:string, age:number) => {
        inputVal.value = `你好 ${name} ~ 今年 ${age} 歲`
        // inputTxt.value.value = `你好 ${name} ~ 今年 ${age} 歲`
        // inpTxtRef2.value = `你好 ${name} ~ 今年 ${age} 歲`;
      };

// 任意型別 any 一般來說會盡量避免使用
let count:any = 3;
count = '4'
count = 5
// 未知型別 unknown
let price:unknown = 3.14159;
if(typeof price === 'number'){
  price = Number(price.toFixed(2))
}else if(typeof price === 'string'){
  price += ' - 文字'
}
console.log(price, typeof price);

type Tuser = { id: number; name: string; age: number; }
//結合類型
type TJob = { baseInfo:Tuser; job:string; }
type A = { name:string; age:number; }
type B = { sex:string; }
type TPerson = A & B & {address:string;};
const user:Tuser = { id: 1, name: "mike", age: 12 };
const job:TJob = {
  baseInfo: {
    id: 1, name: "mike", age: 12,
  },
  job: "Frontend Engineer",
};
console.log(job.baseInfo.name);
const person:TPerson = {
  name:"mike", age:12, sex:"boy", address:"Taiwan"
};

interface Imike { firstName:string; lastName:string; }
const mike:Imike = { firstName: "Cheng", lastName: "Mike" };

interface Ibase { name:string; age:number; address:string; }
interface IjobInfo { job:string; baseInfo:Ibase; }
const jobInfo:IjobInfo = {
  job: "Frontend Engineer",
  baseInfo: {
    name: "Mike",
    age: 18,
    address: "Taipei",
  },
};

interface Iarea { name:string; zip:string | number; }
interface ICity {
  name:string;
  // area:Iarea[];
  area:Array<Iarea>;
}
const taipei:ICity = {
  name: "新北市",
  area: [
    { name: "萬里區", zip: "207", },
    { name: "金山區", zip: 208, },
  ],
};

interface IWidth { width: string; }
interface IHeight { height: string; }
interface IBoxFontSize { color: string; "font-size": string; "font-weight": string; }
interface IBoxStyle extends IWidth, IHeight, IBoxFontSize {
  border: string;
  padding: string;
  margin: string;
}
const box:IBoxStyle = {
  color:"red",
  "font-size":"16px",
  "font-weight":"bold",
  width:"100px",
  height:"100px",
  border:"4px solid #000",
  padding:"10px",
  margin:"10px",
};
console.log(box);

const priceNum:unknown = 3.14159;
const countNum:number = priceNum as number; //如果你確定類型，可以使用斷言告訴ts編譯器它是什麼類型
console.log(countNum.toFixed(2));

const strVal:any = "this is a string";
const strLength:number = (strVal as string).length;
console.log(strLength);

// 函式定義 ( function type 定義 )
// 不需要回傳任何值的 function 後面可加上 :void 或不加
// 回傳string的 function() 後面加上 :string
const composeReturn1 = (name:string, age:number):string => `你好 ${name} ~ 今年 ${age} 歲`;
function composeReturn2(name:string, age:number):string{
  return `你好 ${name} ~ 今年 ${age} 歲`;
}
const res1 = composeReturn1("Mike", 12),
      res2 = composeReturn2("Mike", 12);
console.log(res1, res2);
// 可以透過定義 input 跟 output 來限制 function 的輸入跟輸出型別
type THandNum = {
  (a:number, b:number):number
};
// const add = (a:number, b:number):number => a + b;
const add:THandNum = (a, b) => a + b;
const reduce:THandNum = (a, b) => a - b;
console.log("加:", add(2, 3)); // -> 5
console.log("減:", reduce(6, 3)); // -> 3
</script>

<template>
<div ref="vtWrap" class="leading-normal max-w-4xl mx-auto">
  <h1 class="text-2xl text-teal-600">TypeScript是JavaScript的嚴格語法超集，提供了可選的靜態型別檢查。</h1>
  <h2 class="text-xl text-teal-600">為什麼我們需要 TypeScript ?</h2>
  <ul class="list-disc">
    <li>
      <p>靜態型別檢查，可以在編譯前檢測到部分的型別錯誤。</p>
    </li>
    <li>
      <p>像是定義查詢和程式碼提示等功能跟 vscode 搭配有更好的整合。</p>
    </li>
    <li>
      <p>提升程式碼的可讀性，一眼就能明白當前型別定義。</p>
    </li>
    <li>
      <p>開發函式庫時，可以提供型別定義給使用者更良好的開發體驗。</p>
    </li>
  </ul>
  <h3 ref="title" class="title text-lg">請填入名字</h3>
  <input
    ref="inputTxt"
    v-model="inputVal"
    class="inputTxt block bg-gray-300 border-2 border-gray-400 rounded p-1 mb-3" 
    type="text" 
    placeholder="請填入名字" 
  />
  <button 
    ref="send" 
    class="send min-w-20 block bg-gray-300 border border-indigo-600 rounded p-1 mb-3"
  >送出</button>
</div>
</template>

<style lang="scss">

</style>