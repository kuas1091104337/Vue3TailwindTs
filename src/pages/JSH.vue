<script setup lang="ts">
import { ref, onMounted } from 'vue';
var a:any
console.log(a, typeof a, typeof a === 'undefined', a === undefined);

function Person1(this:any,name:string,age:number){
  this.name = name
  this.age = age
  console.log(this.name, this.age);
}
var p1 = new (Person1 as any)('tom',12)

class Person2 {
  name:string;
  age:number;
  constructor(name:string, age:number) {
    this.name = name;
    this.age = age;
    console.log(this.name, this.age);
  }
}
const p2 = new Person2('tom', 12);

type Tb1 = { 
  b2:[number,string,(arg:any) => void]; 
  b3:() => () => string; 
}
var b1:Tb1 = {
  b2:[1,'abc',console.log],
  b3:function(){
    console.log('b3')
    return function(){
      return 'xyz'
    };
  }
}
console.log(typeof b1.b2[2]);
console.log(b1.b2[2](4));

function info(age:number){
  switch(true) {
    case age < 18 :
      console.log('未成年，再等等!');
      break;
    case age > 60 :
      console.log('算了吧!');
      break;
    default :
      console.log('剛好!');
  }
}
info(17)
info(61)
info(24)
const btn = ref<HTMLButtonElement | null>(null),
      btnArr = ref<Array<string>>(['測試1', '測試2', '測試3']),
      clickHand = (e:Event) => {
        console.log((e.target as HTMLButtonElement).innerHTML);
        console.log((btn.value as HTMLButtonElement).innerText);
        alert((btn.value as HTMLButtonElement).innerText);
      }

// function Person3(this:any, color:string){
//   console.log(this)
//   this.color = color;
//   this.getColor = function(){
//     console.log(this) 
//     return this.color;
//   };
//   this.setColor = function(color:string){
//     console.log(this)
//     this.color = color;
//   }
// }
// Person3("red");//this是誰？
// var p = new (Person3 as any)("yello"); //this是誰？
// p.getColor();//this是誰？
// var obj = {};
// p.setColor.call(obj,"black"); //this是誰？
// var test = p.setColor;
// test(); //this是誰？
// 0 1 1 2 3 5 8 13 21 34
function btnHand(e:Event){
  console.log(e.target);
}
onMounted(() => {
});
</script>

<template>
<div class="leading-1.7 min-w-360px max-w-800px bg-black p-20px mx-auto">
  <p class="text-amber-300 text-18px">1. 基本(值)類型</p>
  <p class="text-white pl-18px">String：任意字符串</p>
  <p class="text-white pl-18px">Number：任意的數字</p>
  <p class="text-white pl-18px">boolean：true / false</p>
  <p class="text-white pl-18px">undefined：undefined：</p>
  <p class="text-white pl-18px">null：null：</p>
  <p class="text-amber-300 text-18px">2. 對象(引用類型)</p>
  <p class="text-white pl-18px">Object：任意對象</p>
  <p class="text-white pl-18px">Function：一種特別的對象(可以執行)</p>
  <p class="text-white pl-18px">Array：一種特別的對象(內部數據是有序/數值下標)</p>
  <p class="text-amber-300 text-18px">3. 判斷</p>
  <p class="text-white pl-18px">typeof (類型)：返回數據類型的字符串表達</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">可以判斷：undefined / 數值 / 字符串 / 布林值 / function</a></p>
  <p class="text-white pl-18px">不能判斷：null / object / array</p>
  <p class="text-white pl-18px">instanceof (實例)：判斷對象具體類型</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">===</a>：可以判斷：undefined / <a class="underline decoration-red-600 decoration-2 decoration-wavy">null</a></p>
  <p class="text-amber-300 text-18px">4. 基本運用</p>
  <p class="text-white pl-18px">var a</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">typeof a === 'undefined', a === undefined <span class="bg-white/25 p-[2px_6px_6px]">// true</span></a></p>
  <p class="text-white pl-18px">a = 4</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">typeof a === 'number' <span class="bg-white/25 p-[2px_6px_6px]">// true</span></a></p>
  <p class="text-white pl-18px">a = 'abcd'</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">typeof a === 'string' <span class="bg-white/25 p-[2px_6px_6px]">// true</span></a></p>
  <p class="text-white pl-18px">a = true</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">typeof a === 'boolean' <span class="bg-white/25 p-[2px_6px_6px]">// true</span></a></p>
  <p class="text-white pl-18px">a = function(){ console.log('a') }</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">typeof a <span class="bg-white/25 p-[2px_6px_6px]">// 'function'</span></a></p>
  <p class="text-white pl-18px">a = null</p>
  <p class="text-white pl-18px">typeof a <span class="bg-white/25 p-[2px_6px_6px]">// 'object'</span> , <a class="underline decoration-red-600 decoration-2 decoration-wavy">a === nul <span class="bg-white/25 p-[2px_6px_6px]">// true</span></a></p>
  <p class="text-amber-300 text-18px">5. 對象運用</p>
  <p class="text-white pl-18px">var b1 = {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;b2:[1,'abc',console.log],</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;b3:function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log('b3')</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;return function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 'xyz'</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;}</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">new Object 說明 Object 是 構造函數 <span class="bg-white/25 p-[2px_6px_6px]">const obj = new Object() = {};</span></p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">b1 instanceof Object <span class="bg-white/25 p-[2px_6px_6px]">// true</span> , b1 instanceof Array <span class="bg-white/25 p-[2px_6px_6px]">// false</span></a></p>
  <p class="text-white pl-18px">(b1 是 Object 實例 - 構造函數)</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">b1.b2 instanceof Object <span class="bg-white/25 p-[2px_6px_6px]">// true</span> , b1.b2 instanceof Array <span class="bg-white/25 p-[2px_6px_6px]">// true</span></a></p>
  <p class="text-white pl-18px">b1.b3 instanceof Object <span class="bg-white/25 p-[2px_6px_6px]">// true</span> , b1.b3 instanceof Function <span class="bg-white/25 p-[2px_6px_6px]">// true</span></p>
  <p class="text-white pl-18px">typeof b1.b2[2] <span class="bg-white/25 p-[2px_6px_6px]">// function</span></p>
  <p class="text-white pl-18px">b1.b2[2](4) <span class="bg-white/25 p-[2px_6px_6px]">// 4</span></p>
  <p class="text-white pl-18px">console.log(b1.b3()()) <span class="bg-white/25 p-[2px_6px_6px]">// xyz</span></p>
  <p class="text-amber-300 text-18px">補充：實例 > 實例對象、類型 > 類型對象</p>
  <p class="text-white pl-18px">function Person(name,age){ <span class="bg-white/25 p-[2px_6px_6px]">// 構造函數 類型</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;this.name = name</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;this.age = age</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">var p = new Person('Tom',12)&nbsp;&nbsp;<span class="bg-white/25 p-[2px_6px_6px]">// 根據類型創建的實例對象</span></p>
  <p class="text-white pl-18px">Person('Jack',12) <span class="bg-white/25 p-[2px_6px_6px]">// 這樣用沒有意義</span></p>
  <p class="text-amber-300 text-18px">6. undefined 與 null 的區別?</p>
  <p class="text-white pl-18px">undefined 代表定義未賦值</p>
  <p class="text-white pl-18px">null 定義並賦值了，只是值為 null</p>
  <p class="text-amber-300 text-18px">7. 什麼時候給變數賦值為 null?</p>
  <p class="text-white pl-18px">var b = null <span class="bg-white/25 p-[2px_6px_6px]">// 初始賦值為null，表明將要賦值為對象</span></p>
  <p class="text-white pl-18px">b = ['abc',123] <span class="bg-white/25 p-[2px_6px_6px]">// 確定對象就賦值</span></p>
  <p class="text-white pl-18px">b = null <span class="bg-white/25 p-[2px_6px_6px]">// 讓b指向的對象成為垃圾對象(被垃圾回收器回收)</span></p>
  <p class="text-white pl-18px">初始賦值，表明將要賦值為對象</p>
  <p class="text-white pl-18px">結束前，讓對象成為垃圾對象(被垃圾回收器回收)</p>
  <p class="text-amber-300 text-18px">8. 嚴格區別變數類型與數據類型?</p>
  <p class="text-white pl-18px">* 數據的類型</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;a. 基本類型、b. 對象類型</p>
  <p class="text-white pl-18px">* 變數的類型（變數內存值的類型）</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;a. 基本類型：保存就是基本類型的數據、b. 引用類型：保存的是地址值</p>
  <p class="text-amber-300 text-18px">9.什麼是數據？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 儲存在記憶體中代表特定資訊的'東西'，本質上是0101...</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 資料的特點：可傳遞，可運算</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 一切皆數據</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 記憶體中所有操作的目標：數據</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;a. 算術運算、b. 邏輯運算、c. 賦值、d. 運行函數</p>
  <p class="text-amber-300 text-18px">10.什麼是內存(記憶體)？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 記憶體條通電後產生的可儲存資料的空間（暫時的）</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 記憶體產生與死亡：記憶體條（電路版）==＞ 通電 ==＞ 產生記憶體空間 ==＞ 儲存資料 ==＞ 處理資料 ==＞ 斷電 ==＞ 記憶體空間與資料都消失</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 一塊小內存的2個數據</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;a. 內部儲存的數據、b. 地址值</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 內存分類</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;a. 棧：全域變數/局部變數 (stack[stæk]一堆，一疊)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;b. 堆：對象 (heap[hip]堆，堆積)</p>
  <p class="text-amber-300 text-18px">11.什麼是變數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 可變化的量，由變數名和變數值組成</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 每個變數都對應的一塊小內存，變數名用來找出對應的內存，變數值就是內存中保存的數據</p>
  <p class="text-amber-300 text-18px">12.內存，數據，變數三者之間的關係</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 記憶體用來儲存資料的空間</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 變數是內存的標識</p>
  <p class="text-white pl-18px">var a = XXX，a內存中到底保存的是什麼？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* XXX是基本數據，保存的就是這個數據，a = 3</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* XXX是對象，保存的是對象的地址值，a = {} 或 a = function(){}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* XXX是一個變數，保存的xxx的內存內容（可能是基本數據，也可能是地址值）</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;var b = 'abc';&nbsp;&nbsp;a = b;&nbsp;&nbsp;&nbsp;&nbsp;b = { };&nbsp;&nbsp;a = b;</p>
  <p class="text-white pl-18px">關於引用變數賦值問題</p>
  <p class="text-white pl-18px">* n個引用變數指向同一個對象，透過一個變數修改對象內部數據，其它所有變數看到的是修改之後的數據</p>
  <p class="text-white pl-18px">* 2個引用變數指向同一個對象，透過一個變數修改對象內部數據，另一個變數看到的是修改之後的數據</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var obj1 = {name:'Tom'};&nbsp;&nbsp;var obj2 = obj1;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;obj2.age = 12;&nbsp;&nbsp;console.log(obj1.age) <span class="bg-white/25 p-[2px_6px_6px]">// 12</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn(obj){ obj.name = 'A' };&nbsp;&nbsp;fn(obj1);&nbsp;&nbsp;console.log(obj2.name) <span class="bg-white/25 p-[2px_6px_6px]">// A</span></p>
  <p class="text-white pl-18px">* 2個引用變數指向同一個對象，讓其中一個引用變數指向另一個對象，另一個引用變數仍指向前一個對象</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = {age:12};&nbsp;&nbsp;var b = a;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;a = {name:'Bob',age:13};&nbsp;&nbsp;b.age = 14;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(b.age, a.name, a.age) <span class="bg-white/25 p-[2px_6px_6px]">// 14 Bob 13</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn2(obj){&nbsp;&nbsp;<span class=" text-black/50 bg-white/50 p-[2px_6px_6px]">obj 等於 var obj = a</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;obj = {age:15}</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn2(a);&nbsp;&nbsp;console.log(a.age) <span class="bg-white/25 p-[2px_6px_6px]">// 13</span></p>
  <p class="text-amber-300 text-18px">13.在 js 呼叫函數時傳遞變數參數時，是 "值傳遞" 還是 "引用傳道"？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 理解1：都是值(基本/位址值)傳遞</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 理解2：可能是值傳遞，也可能是引用傳遞(位址值)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var <i class="text-emerald-600 font-bold">n</i> = 3</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn3(<i class="text-red-600 font-bold">n</i>){&nbsp;&nbsp;<span class=" text-black/50 bg-white/50 p-[2px_6px_6px]"><i class="text-red-600 font-bold">n</i> 等於 var <i class="text-red-600 font-bold">n</i> = <i class="text-emerald-600 font-bold">n</i> 或是值傳遞的 3</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;<i class="text-red-600 font-bold">n</i> = <i class="text-emerald-600 font-bold">n</i> + 1</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn3(<i class="text-emerald-600 font-bold">n</i>); &nbsp;&nbsp;console.log(<i class="text-red-600 font-bold">n</i>) <span class="bg-white/25 p-[2px_6px_6px]">// 3</span></p>
  <p class="text-amber-300 text-18px">14.JS引擎如何管理內存(記憶體)？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;1. 內存生命週期</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;* 分配小內存空間，得到它的使用權</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;* 儲存數據，可以重複進行操作</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;* 釋放小內存空間</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;2. 釋放內存</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 3;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var obj = {name:'Tom'}; obj = null</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn4(){ var b = {} }</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn4() <span class="bg-white/25 p-[2px_6px_6px]">// b是自動釋放，b所指向的對像是在後面的某個時刻由垃圾回收器回收</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 局部變數：函數執行完自動釋放</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 對象：成為垃圾對象 ==＞ 垃圾回收器回收</p>
  <p class="text-amber-300 text-18px">15. 什麼是對象？</p>
  <p class="text-white pl-18px">* 多個資料的封裝體</p>
  <p class="text-white pl-18px">* 用來保存多個資料的容器</p>
  <p class="text-white pl-18px">* 一個物件代表現實中的一個事物</p>
  <p class="text-amber-300 text-18px">16. 為什麼要用對象？</p>
  <p class="text-white pl-18px">* 統一管理多個數據</p>
  <p class="text-amber-300 text-18px">17. 對象的組成</p>
  <p class="text-white pl-18px">* 屬性：屬性名(字串)和屬性值(任意)組​​成</p>
  <p class="text-white pl-18px">* 方法：一種特別的屬性(屬性值是函數)</p>
  <p class="text-amber-300 text-18px">18. 如何存取對像內部資料？</p>
  <p class="text-white pl-18px">* .屬性名：編碼簡單，有時不能用</p>
  <p class="text-white pl-18px">* ['屬性名'］：編碼麻煩，能通用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var p = {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;name:'Tom', age:12,</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;setName:function(name){ this.name = name },</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;setAge:function(age){ this.age = age }</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-amber-300 text-18px">19. 什麼時候必須使用［'屬性名'］的方式？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;1. 屬性名包含包含特殊字符： - , 空格</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;2. 屬任名不確定</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var p = {}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;// 1. 給 p 對象新增一個屬性：content type : text/json</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;// p.content-type = 'text/json' 不能用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;p['content-type'] = 'text/json' 可以 console.log(p['content-type'])</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;// 2. 屬性名不確定</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var propName = 'myAge';&nbsp;&nbsp;var value = 18</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;// p.propName = value 結果不會是 {myAge:18} 會是 {propName:18}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;p[propName] = value 可以 console.log(p[propName])</p>
  <p class="text-amber-300 text-18px">20. 什麼是函數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 實現特定功能的n條語句的封裝體</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 只有函數是可以執行的，其它類型的資料不能執行</p>
  <p class="text-amber-300 text-18px">21. 為什麼要用函數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 提高程式碼復用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 方便閱讀交流</p>
  <p class="text-amber-300 text-18px">22. 如何定義函數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 函數聲明 function fn(){ }</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 表達式 var fn = function(){ }</p>
  <p class="text-amber-300 text-18px">23. 如何調用(執行)函數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* test()：直按調用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* obj.test()：適過物件調用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* new test()：new調用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* test.call / apply(obj, 參數)：暫時讓test成為obj的方法進行調用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;var obj = {}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;function test2(){ this.xxx = 'abcde' }</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;<a class="underline decoration-red-600 decoration-2 decoration-wavy">obj.test2() <span class=" text-amber-600 bg-white/25 p-[2px_6px_6px]">// error : obj.test2 is not a function</span></a></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;test2.call(obj) <span class="bg-white/25 p-[2px_6px_6px]">// 假設這樣調用的 obj.test2()，可以讓一個函數成為指定任意對象的方法進行調用。</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;obj.xxx <span class="bg-white/25 p-[2px_6px_6px]">// abcde</span></p>
  <p class="text-amber-300 text-18px">24. 什麼函數才是回調函數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;1). 你定義的</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;2). 你沒有調用</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;3). 但最終它執行了(在某個時刻或某條件下)</p>
  <p class="text-amber-300 text-18px">25. 常見的回調函數？</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* dom事件回調函數 <span class="bg-white/25 p-[2px_6px_6px]">// this 是發生事件的 dom 元素</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;document.getElementById('btn').onclick = function(){&nbsp;&nbsp;<span class="bg-white/25 p-[2px_6px_6px]">// dom事件回調函數</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;alert(this.innerHTML)</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 定時器回調函數&nbsp;&nbsp;<span class="bg-white/25 p-[2px_6px_6px]">//  this 是 window，定時器 (超時定時器、循環定時器)</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;setTimeout(function(){&nbsp;&nbsp;<span class="bg-white/25 p-[2px_6px_6px]">// 定時器回調函數</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;alert('到點了')</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;},2000)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* ajax請求回調函數</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;* 生命週期回調函數</p>
  <button class="rounded px-2 m-2" ref="btn" @click="clickHand($event)">測試點擊事件</button>
  <p class="text-amber-300 text-18px">26. Immediately-Invoked Function Expression(IIFE) ？</p>
  <p class="text-white pl-18px">作用：* 隱藏實現、* 不會污染外部(全域)命名空間、* 用它來編碼JS模塊</p>
  <p class="text-white pl-18px">(function(){ <span class="bg-white/25 p-[2px_6px_6px]">// 匿名函數自調用</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 3;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(a+3)</p>
  <p class="text-white pl-18px">})() <span class="bg-white/25 p-[2px_6px_6px]">// 6</span></p>
  <p class="text-white pl-18px">(function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 1;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function test(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(++a)</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;window.$ =  function(){ <span class="bg-white/25 p-[2px_6px_6px]">// 向外暴露一個全局函數</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;return { test:test }</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">})()</p>
  <p class="text-white pl-18px">$().text() <span class="bg-white/25 p-[2px_6px_6px]">// 2 ， 1. $是一個函數、 2. $執行後返回的是一個對象</span></p>
  <p class="text-amber-300 text-18px">27. this 是什麼？</p>
  <p class="text-white pl-18px">* 任何函數本質上都是通過某個對象來調用的，如果沒有直接指定就是 window</p>
  <p class="text-white pl-18px">* 所有函數內部都有一個變數 this</p>
  <p class="text-white pl-18px">* 它的值是調用函數的當前對象</p>
  <p class="text-white pl-18px">function Person3(color){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(this)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;this.color = color;</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;this.getColor = function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(this)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;return this.color;</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;};</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;this.setColor = function(color){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(this)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;this.color = color;</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">Person3("red"); <span class="bg-white/25 p-[2px_6px_6px]">// this是誰？ Window</span></p>
  <p class="text-white pl-18px">var p = new Person3("yello"); <span class="bg-white/25 p-[2px_6px_6px]">// this是誰？ 當前 new 的對象來調用的 或 p</span></p>
  <p class="text-white pl-18px">p.getColor(); <span class="bg-white/25 p-[2px_6px_6px]">// this是誰？ p</span></p>
  <p class="text-white pl-18px">var obj = {};</p>
  <p class="text-white pl-18px">p.setColor.call(obj,"black"); <span class="bg-white/25 p-[2px_6px_6px]">// this是誰？ obj</span></p>
  <p class="text-white pl-18px">var test = p.setColor;</p>
  <p class="text-white pl-18px">test(); <span class="bg-white/25 p-[2px_6px_6px]">// this是誰？ Window</span></p>
  <p class="text-white pl-18px">function fn1(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn2(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(this)</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn2() <span class="bg-white/25 p-[2px_6px_6px]">// 沒有直接指定就是 window</span></p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn1() <span class="bg-white/25 p-[2px_6px_6px]">// this是誰？ Window</span></p>
  <p class="text-amber-300 text-18px">28. 如何確定 this 的值？</p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">* test() <span class="bg-white/25 p-[2px_6px_6px]">// window</span></a></p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">* p.test() <span class="bg-white/25 p-[2px_6px_6px]">// p</span></a></p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">* new test() <span class="bg-white/25 p-[2px_6px_6px]">// 新創建的對象</span></a></p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">* p.call(obj) <span class="bg-white/25 p-[2px_6px_6px]">// obj</span></a></p>
  <p class="text-amber-300 text-18px">29 .在下面2種情況下不加分號會有問題？</p>
  <p class="text-white pl-18px">* 小括號開頭的前面語句</p>
  <p class="text-white pl-18px">* 中方括號開頭的前一句</p>
  <p class="text-white pl-18px">解決方法：在行首加分號</p>
  <p class="text-white pl-18px">var a = 3</p>
  <p class="text-white pl-18px"><i class="text-red-600 font-bold bg-white/25 p-[0_2px_2px_4px]">;</i>(function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(111)</p>
  <p class="text-white pl-18px">})()&nbsp;&nbsp;<a class="underline decoration-red-600 decoration-2 decoration-wavy"><span class="bg-white/25 p-[2px_6px_6px]">// TypeError : 3 is not a function</span></a></p>
  <p class="text-white bg-red-600/35 pl-18px">※ 錯誤理解 var a = 3(function(){ ... })</p>
  <p class="text-white pl-18px">var b = 4</p>
  <p class="text-white pl-18px"><i class="text-red-600 font-bold bg-white/25 p-[0_2px_2px_4px]">;</i>[1,3].forEach(function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(111)</p>
  <p class="text-white pl-18px">})&nbsp;&nbsp;<a class="underline decoration-red-600 decoration-2 decoration-wavy"><span class="bg-white/25 p-[2px_6px_6px]">// TypeError : Cannot read properties of undefined</span></a></p>
  <p class="text-white bg-red-600/35 pl-18px">※ 錯誤理解 var b = 4[1,3].forEach(function(){ ... })</p>
  <p class="text-amber-300 text-18px">30 .函數 的prototype 屬性</p>
  <p class="text-white pl-18px">* 每個函數都有一個 prototype 屬性，它預設指向一個 Object 空物件(即稱為：原型物件)</p>
  <p class="text-white pl-18px">* 原型對像中有一個屬性 constructor ，它指向函數對象</p>
  <p class="text-amber-300 text-18px">31 .給原型對象添加屬性(一般都是方法)</p>
  <p class="text-white pl-18px">* 作用：函數的所有實例物件自動擁有原型中的屬性(方法)</p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// 每個函數都有一個 prototype 屬性，它預設指向一個 Object 空物件(即稱為：原型物件)</span></p>
  <p class="text-white pl-18px">console. log(Date.prototype, typeof Date.prototype) <span class="bg-white/25 p-[2px_6px_6px]">// {toString: ƒ, toDateString: ƒ, …} , 'object'</span></p>
  <p class="text-white pl-18px">function Fun(){}</p>
  <p class="text-white pl-18px">console. log(Fun.prototype) <span class="bg-white/25 p-[2px_6px_6px]">// 默認指向一個 Object 空對象(沒有我們的屬性)</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// 原型對像中有一個屬性 constructor，它指向函數對象</span></p>
  <p class="text-white pl-18px">console.log(Date.prototype.constructor === Date) <span class="bg-white/25 p-[2px_6px_6px]">// true</span></p>
  <p class="text-white pl-18px">console.log(Fun.prototype.constructor === Fun) <span class="bg-white/25 p-[2px_6px_6px]">// true</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// 為原型對象添加屬性(一般是方法) ===＞ 實例對象可以訪問</span></p>
  <p class="text-white pl-18px">Fun.prototype.test = function(){</p> 
  <p class="text-white pl-18px">&nbsp;&nbsp;console. log('test()')</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">var fun = new Fun()</p>
  <p class="text-white pl-18px">fun.test() <span class="bg-white/25 p-[2px_6px_6px]">// 'test()'</span></p>
  <p class="text-white pl-18px"></p>
  <p class="text-amber-300 text-18px">32 .每個函數 function 都有一個 prototype，即顯式原型(屬性)，預設指向一個空的 Object 對象</p>
  <p class="text-white pl-18px">function Fn(){ <span class="bg-white/25 p-[2px_6px_6px]">// 內部語句：this.prototype = {}</span> }</p>
  <p class="text-white pl-18px">console. log(Fn.prototype) <span class="bg-white/25 p-[2px_6px_6px]">// {}</span></p>
  <p class="text-amber-300 text-18px">33 .每個實例對像都有一個 __proto__，可稱為隱式原型(屬性)</p>
  <p class="text-white pl-18px">var fn = new Fn() <span class="bg-white/25 p-[2px_6px_6px]">// 內部語句：fn.__proto__ = this.__proto__ = Fn.prototype</span></p>
  <p class="text-white pl-18px">console.log(fn.__proto__) <span class="bg-white/25 p-[2px_6px_6px]">// {}</span></p>
  <p class="text-amber-300 text-18px">34 .實例對象的隱式原型的值為其對應構造函數的顯式原型的值</p>
  <p class="text-white pl-18px">console. log(Fn.prototype === fn.__proto__) <span class="bg-white/25 p-[2px_6px_6px]">// true</span></p>
  <p class="text-amber-300 text-18px">35 .內存結構</p>
  <p class="text-white pl-18px">Fn.prototype.test2 = function(){ <span class="bg-white/25 p-[2px_6px_6px]">// 給原型添加方法</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log('test2()')</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn.test2() <span class="bg-white/25 p-[2px_6px_6px]">// 通過實例調用原型的方法</span></p>
  <p class="text-amber-300 text-18px">36 .總結：</p>
  <p class="text-white pl-18px">* 函數的 prototype 屬性：在定義函數時自動添加的，默以值是一個空 Object 對象</p>
  <p class="text-white pl-18px">* 對象的 __proto__ 屬性：在創建實例對象時自動添加的，預設值為構造函數的 prototype 屬性值</p>
  <p class="text-white pl-18px">* 能直接操作顯式原型，但不能直接操作隱式原型(E56之前)</p>
  <p class="text-white pl-18px">function Fn(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;this.test1 = function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log('test1()')</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">Fn.prototype.test2 = function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log('test2()')</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">var fn = new Fn()</p>
  <p class="text-white pl-18px">fn.test1() <span class="bg-white/25 p-[2px_6px_6px]">// test1()</span></p>
  <p class="text-white pl-18px">fn.test2() <span class="bg-white/25 p-[2px_6px_6px]">// test2()</span></p>
  <p class="text-white pl-18px">console.log(fn.toString()) <span class="bg-white/25 p-[2px_6px_6px]">// [object Object]</span></p>
  <p class="text-white pl-18px">fn.test3() <span class="bg-white/25 p-[2px_6px_6px]">// TypeError: fn.test3 is not a function</span></p>
  <p class="text-white pl-18px">function Foo(){} 等於 var Foo = new Function()</p>
  <p class="text-amber-300 text-18px">37 . ？</p>
  <p class="text-amber-300 text-18px">38 . ？</p>
  <p class="text-amber-300 text-18px">39 . ？</p>
  <p class="text-amber-300 text-18px">40 . ？</p>
  <p class="text-amber-300 text-18px">41 . ？</p>
  <p class="text-amber-300 text-18px">42 . ？</p>
  <p class="text-amber-300 text-18px">43 . ？</p>
  <p class="text-amber-300 text-18px">44 . ？</p>
  <p class="text-amber-300 text-18px">45 . ？</p>
  <p class="text-amber-300 text-18px">46 . ？</p>
  <p class="text-amber-300 text-18px">47 .變量聲明(宣告)提升</p>
  <p class="text-white pl-18px">* 透過 var 定義(聲明)的變量，在定義語句之前就可以訪問到</p>
  <p class="text-white pl-18px">* 值：undefined</p>
  <p class="text-amber-300 text-18px">48 .函數聲明提升</p>
  <p class="text-white pl-18px">*遇過 function 聲明的函數，在之前就可以直接調用</p>
  <p class="text-white pl-18px">* 值：函數定義（對象）</p>
  <p class="text-amber-300 text-18px">49 .問題：變數提升和函數提升是如何產生的？</p>
  <p class="text-white pl-18px">var a = 3</p>
  <p class="text-white pl-18px">function fn(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(a)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 4</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn() <span class="bg-white/25 p-[2px_6px_6px]">// undefined</span></p>
  <p class="text-white pl-18px">console.log(b) <span class="bg-white/25 p-[2px_6px_6px]">// undefined</span></p>
  <p class="text-white pl-18px">fn2() <span class="bg-white/25 p-[2px_6px_6px]">// 可調用函數提升</span></p>
  <p class="text-white pl-18px">fn3() <span class="bg-white/25 p-[2px_6px_6px]">// 不能調用，因為變量提升</span></p>
  <p class="text-white bg-red-600/35 pl-18px">※ TypeError : fn3 is not a function</p>
  <p class="text-white pl-18px">var b = 3</p>
  <p class="text-white pl-18px">function fn2(){ console.log('fn2()') }</p>
  <p class="text-white pl-18px">var fn3 = function(){ console.log('fn3()') }</p>
  <p class="text-amber-300 text-18px">50 .代碼分類(位置)</p>
  <p class="text-white pl-18px">* 全局(域)代碼</p>
  <p class="text-white pl-18px">* 函數(局部)代碼</p>
  <p class="text-amber-300 text-18px">51 .全局執行上下文</p>
  <p class="text-white pl-18px">* 在執行全局代碼前將 window 確定為全局執行上下文</p>
  <p class="text-white pl-18px">* 對全局數據進行預處理</p>
  <p class="text-white pl-18px">* var 定義的全局變數 ==> undefined，加入為window的屬性</p>
  <p class="text-white pl-18px">* function 宣告的全局函數 ==> 賦值(fun)，添加為 window 的方法</p>
  <p class="text-white pl-18px">* this ==> 賦值(window)</p>
  <p class="text-white pl-18px">console.log(a1, window.a1) <span class="bg-white/25 p-[2px_6px_6px]">// undefined, undefined</span></p>
  <p class="text-white pl-18px">a2(); window.a2(); <span class="bg-white/25 p-[2px_6px_6px]">// a2(), a2()</span></p>
  <p class="text-white pl-18px">console.log(this) <span class="bg-white/25 p-[2px_6px_6px]">// Window</span></p>
  <p class="text-white pl-18px">var a1 = 3</p>
  <p class="text-white pl-18px">function a2(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log('a2()')</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">console.log(a1) <span class="bg-white/25 p-[2px_6px_6px]">// 3</span></p>
  <p class="text-white pl-18px">* 開始執行全局代碼</p>
  <p class="text-amber-300 text-18px">52 .函數執行上下文</p>
  <p class="text-white pl-18px">* 在調用函數，準備執行函數體之前，創建對應的函數執行上下文對象(虛擬的，存在於棧中)</p>
  <p class="text-white pl-18px">* 對局部數據進行預處理</p>
  <p class="text-white pl-18px">* 形參變數 ==＞ 賦值(安參) ==＞ 添加為執行上下文的屬性</p>
  <p class="text-white pl-18px">* arguments ==> 賦值(實參列表)，添加為執行上下文的屬性</p>
  <p class="text-white pl-18px">* var 定義的局部變數 ==> undefined，添加為執行上下文的屬性</p>
  <p class="text-white pl-18px">* function 宣告的函式 ==> 賦值(fun)，添加為執行上下文的方法</p>
  <p class="text-white pl-18px">* this ==> 賦值(調用函數的對象)</p>
  <p class="text-white pl-18px">* 開始執行函數體程式碼</p>
  <p class="text-white pl-18px">function fn(a1){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(a1) <span class="bg-white/25 p-[2px_6px_6px]">// 2</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(a2) <span class="bg-white/25 p-[2px_6px_6px]">// undefined</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;a3() <span class="bg-white/25 p-[2px_6px_6px]">// a3()</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(this) <span class="bg-white/25 p-[2px_6px_6px]">// window</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(arguments) <span class="bg-white/25 p-[2px_6px_6px]">// [2,3,4] 偽數組</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a2 = 3</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function a3(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log('a3()')</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn(2,3,4)</p>
  <p class="text-amber-300 text-18px">53 .在全局代碼執行前，JS引擎就會創建一個棧來儲存管理所有的執行上下文對象</p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// 1.進入全局執行上下文</span></p>
  <p class="text-white pl-18px">var a = 10</p>
  <p class="text-white pl-18px">var bar = function(x){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var b = 5</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;foo(x+b) <span class="bg-white/25 p-[2px_6px_6px]">// 3.進入 foo 執行上下文</span></p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">var foo = function(x){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var c = 5</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console. log(a + c + y)</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">bar(10) <span class="bg-white/25 p-[2px_6px_6px]">// 2.進入 bar 函數執行上下文</span></p>
  <p class="text-amber-300 text-18px">54 .在全局執行上下文(window)確定後，將其添加到棧中(壓棧)</p>
  <p class="text-amber-300 text-18px">55 .在函數執行上下文創建後，將其添加到棧中(壓棧)</p>
  <p class="text-white pl-18px">函數執行中產生 : N + 1 個執行上下文</p>
  <p class="text-amber-300 text-18px">56 .在當前函數執行完後，將棧頂的對象移除(出棧)</p>
  <p class="text-amber-300 text-18px">57 .當所有的代碼執行完後，棧中只剩下 window</p>
  <p class="text-amber-300 text-18px">58 .依序輸出什麼？</p>
  <p class="text-white pl-18px">console. log('global begin: '+ i) </p>
  <p class="text-white pl-18px">var i = 1</p>
  <p class="text-white pl-18px">foo(1)</p>
  <p class="text-white pl-18px">function foo(i){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;if(i == 4){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;return;</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console. log('foo( ) begin:' + i);</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;foo(i + 1); <span class="bg-white/25 p-[2px_6px_6px]">// 遞歸調用：在函數內部調用自己</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console. log('foo( ) end:' + i);</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">console. log('global end: ' + i)</p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// global begin: undefined</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// foo( ) begin:1</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// foo( ) begin:2</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// foo( ) begin:3</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// foo( ) end:3 <a class="underline decoration-red-600 decoration-2 decoration-wavy">參考 55.~56.</a></span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// foo( ) end:2</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// foo( ) end:1</span></p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">// global end: 1</span></p>
  <p class="text-amber-300 text-18px">59 .整個過程中產生了幾個執行上下文？</p>
  <p class="text-white pl-18px">window、foo(1)、foo(2)、foo(3)、foo(4)，產生了5個</p>
  <p class="text-white pl-18px">測驗題1：先執行變數提開，再執行函數提升</p>
  <p class="text-white pl-18px">function a(){}</p>
  <p class="text-white pl-18px">var a;</p>
  <p class="text-white pl-18px">console.log(typeof a) <span class="bg-white/25 p-[2px_6px_6px]">// 'function'</span></p>
  <p class="text-white pl-18px">測驗題2：</p>
  <p class="text-white pl-18px">if(!(b in window)){ var b = 1 }</p>
  <p class="text-white pl-18px">console.log(b) <span class="bg-white/25 p-[2px_6px_6px]">// undefined，因為 var 是函數作用域</span></p>
  <p class="text-white pl-18px">測驗題3：</p>
  <p class="text-white pl-18px">var c = 1</p>
  <p class="text-white pl-18px">function c(c){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(c) </p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var c = 3</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">c(2) <span class="bg-white/25 p-[2px_6px_6px]">// TypeError : c is not a function</span></p>
  <p class="text-white pl-18px"><a class="underline decoration-red-600 decoration-2 decoration-wavy">實際上是</a></p>
  <p class="text-white pl-18px">var c</p>
  <p class="text-white pl-18px">function c(c){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(c)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var c = 3</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">c = 1</p>
  <p class="text-white pl-18px">c(2) <span class="bg-white/25 p-[2px_6px_6px]"><a class="underline decoration-red-600 decoration-2 decoration-wavy">// c = 1 自然就報錯了</a></span></p>
  <p class="text-white pl-18px"></p>
  <p class="text-amber-300 text-18px">60 .棧的結構用一句話怎麼說，它的特點？</p>
  <p class="text-white pl-18px">後進先出</p>
  <p class="text-amber-300 text-18px">61 .作用域理解</p>
  <p class="text-white pl-18px">* 就是一塊"地盤"，一個代碼受段所在的區域</p>
  <p class="text-white pl-18px">* 它是靜態的(相對於上下文對象)，在編寫程式碼時就確定了</p>
  <p class="text-amber-300 text-18px">62 .作用域分類</p>
  <p class="text-white pl-18px">* 全域作用城</p>
  <p class="text-white pl-18px">* 函數作用域</p>
  <p class="text-white pl-18px">* 沒有塊作用域(ES6有了)</p>
  <p class="text-white pl-18px">if(true){ var c = 3 }</p>
  <p class="text-white pl-18px">console.log(c) <span class="bg-white/25 p-[2px_6px_6px]">// undefined</span></p>
  <p class="text-amber-300 text-18px">63 .作用域作用</p>
  <p class="text-white pl-18px">* 隔離變數，不同作用域下同名變數不會有衝突</p>
  <p class="text-white pl-18px">var a = 10, b = 20</p>
  <p class="text-white pl-18px">function fn(x){ <span class="bg-white/25 p-[2px_6px_6px]">// var x = 10</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 100, c = 300</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log('fn()', a, b, c, x); <span class="bg-white/25 p-[2px_6px_6px]">// fn() 100 20 300 10</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function bar(x){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;var a = 1000, d = 400</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log('bar()',a ,b ,c ,d ,x);</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;bar(100) <span class="bg-white/25 p-[2px_6px_6px]">// bar() 1000 20 300 400 100</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;bar(200) <span class="bg-white/25 p-[2px_6px_6px]">// bar() 1000 20 300 400 200</span></p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn(10)</p>
  <p class="text-amber-300 text-18px">64 .區別1</p>
  <p class="text-white pl-18px">* 全局作用域之外，每個函數都會創建自己的作用域，作用域在函數定義時就已經確定了。而不是在函數調用時</p>
  <p class="text-white pl-18px">* 全局執行上下文環境是在全局作用域確定之後，js程式碼馬上執行之前創建</p>
  <p class="text-white pl-18px">* 函數執行上下文是在調用函數時，函數體代碼執行之前創建</p>
  <p class="text-amber-300 text-18px">65 .區別2</p>
  <p class="text-white pl-18px">* 作用域是靜態的，只要函數定義好了就一直存在，且不會再變化</p>
  <p class="text-white pl-18px">* 執行上下文環境是動態的，調用函數時創建，函數調用結束時就會自動被釋放(局部變量)</p>
  <p class="text-amber-300 text-18px">66 .聯繫</p>
  <p class="text-white pl-18px">* 執行上下文(對象)是從屬於所在的作用域</p>
  <p class="text-white pl-18px">* 全域上下文環境 ==> 全域作用域</p>
  <p class="text-white pl-18px">* 函數上下文環境 ==> 對應的函數使用域</p>
  <p class="text-amber-300 text-18px">67 .理解</p>
  <p class="text-white pl-18px">* 多個上下級關係的作用域形成的鏈，它的方向是從下向上的(從內到外)</p>
  <p class="text-white pl-18px">* 查找出變數時就是沿著作用域鏈來尋找的</p>
  <p class="text-amber-300 text-18px">68 .查找一個變數的查找規則</p>
  <p class="text-white pl-18px">* 在當前作用域下的執行上下文中查找對應的屬性，如果有直接返回，否則進入2</p>
  <p class="text-white pl-18px">* 在上一級作用域的執行上下文中查找對應的屬性，如果有直接返回，否則進入3</p>
  <p class="text-white pl-18px">* 再次執行2的相同操作，直到全局作用域，如果還找不到就拋出找不到的異常</p>
  <p class="text-white pl-18px">var a = 2</p>
  <p class="text-white pl-18px">function fn1(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var b = 3</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn2(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;var c = 4</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(c); <span class="bg-white/25 p-[2px_6px_6px]">// 4</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(b); <span class="bg-white/25 p-[2px_6px_6px]">// 3</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(a); <span class="bg-white/25 p-[2px_6px_6px]">// 2</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(d); <span class="bg-white/25 p-[2px_6px_6px]"><i class="text-red-600 font-bold">// ReferenceError: d is not defined</i></span></p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn2()</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn1()</p>
  <p class="text-white text-12px leading-1 pl-18px">------------------------------------------------</p>
  <p class="text-white pl-18px">var x = 10</p>
  <p class="text-white pl-18px">function fn(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(x);</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">function show(f){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var x = 20</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;f()</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">show(fn) <span class="bg-white/25 p-[2px_6px_6px]">// 10</span></p>
  <p class="text-white text-12px leading-1 pl-18px">------------------------------------------------</p>
  <p class="text-white pl-18px">var fn = function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;console.log(fn);</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn() <span class="bg-white/25 p-[2px_6px_6px]">// (){ console.log(fn); }</span></p>
  <p class="text-white pl-18px">var obj = {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn2:function(){ <span class="bg-white/25 p-[2px_6px_6px]">// JS 會在作用域中尋找 fn2 的變數或函數，fn2 是 obj 的屬性，而不是一個變數或函數</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(fn2); <span class="bg-white/25 p-[2px_6px_6px]"><i class="text-red-600 font-bold">// ReferenceError: fn2 is not defined</i></span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(this.fn2, obj.fn2); <span class="bg-white/25 p-[2px_6px_6px]">// (){ console.log(this.fn2, obj.fn2); }</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;<span class="bg-white/25 p-[2px_6px_6px]"><a class="underline decoration-red-600 decoration-2 decoration-wavy">// this 引用的是 obj，因此可以正確找到 fn2</a></span></p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">obj.fn2()</p>
  <p class="text-amber-300 text-18px">69 .閉包 Closure</p>
  <button 
    class="btn text-14px leading-2 w-16 rounded mx-3"
    @click="btnHand($event)"
    v-for="item in btnArr" :key="item"
  >
    {{ item }}
  </button>
  <p class="text-white pl-18px">const btns = document.getElementsByClassName('btn')</p>
  <p class="text-white pl-18px">for(var i = 0, max = btnArr.value.length; i < max; i++){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;((i) => {</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;const btn = btns[<span class="text-emerald-600 font-bold bg-white/25 p-[2px_6px_6px]">i</span>]<span class="text-emerald-600 font-bold bg-white/25 p-[2px_6px_6px]">// 局部變數</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;btn.onclick = () => alert('第'+(i+1)+'個')</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;})(<span class="text-red-600 font-bold bg-white/25 p-[2px_6px_6px]">i</span>) <span class="text-red-600 font-bold bg-white/25 p-[2px_6px_6px]">// 全局變數</span></p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-amber-300 text-18px">70 .如何產生閉包？</p>
  <p class="text-white pl-18px">* 當一個嵌套的內部(子)函數引用了嵌套的外部(父)函數的變數(函數)時，就產生了閉包</p>
  <p class="text-amber-300 text-18px">71 .閉包到底是什麼？</p>
  <p class="text-white pl-18px">* 使用 chrome 調試查看</p>
  <p class="text-white pl-18px">* 理解一：閉包是嵌套的內部函數(絕大部分人)</p>
  <p class="text-white pl-18px">* 理解二：包含被引用變數(函數)的對象(極少數人)</p>
  <p class="text-white pl-18px">* 注意：閉包存在於嵌套的內部函數中</p>
  <p class="text-amber-300 text-18px">72 .產生閉包的條件？</p>
  <p class="text-white pl-18px">* 函數巢狀</p>
  <p class="text-white pl-18px">* 內部函數引用了外部函數的數據(變數/函數)</p>
  <p class="text-white pl-18px">* 執行外部函數</p>
  <p class="text-white pl-18px">function fn1(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 2 </p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn2(){ <span class="bg-white/25 p-[2px_6px_6px]">// 執行函數定義就會產生閉包(不用調用內部函數)</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console. log(a)</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;fn2()</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">fn1()</p>
  <p class="text-amber-300 text-18px">73 .將函數作為另一個函數的返回值</p>
  <p class="text-white pl-18px">function fn1{</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;<span class="bg-white/25 p-[2px_6px_6px]">// 此時閉包就已經產生了(函數提升，內部函數對象已經創建了)</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;var a = 2</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;function fn2(){ <span class="bg-white/25 p-[2px_6px_6px]">// 用表達式時，要fn2執行完後才產生閉包 var fn2 = function(){}</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;a++</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;console.log(a)</p>
  <p class="text-white text-12px leading-1 pl-18px">&nbsp;&nbsp;}</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;return fn2</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">var f = fn1()</p>
  <p class="text-white pl-18px">f( ) <span class="bg-white/25 p-[2px_6px_6px]">// 3</span></p>
  <p class="text-white pl-18px">f( ) <span class="bg-white/25 p-[2px_6px_6px]">// 4</span></p>
  <p class="text-white pl-18px">閉包的生命週期</p>
  <p class="text-white pl-18px">1. 產生：在嵌套內部函數定義執行完時就產生了(不是在調用)</p>
  <p class="text-white pl-18px">2. 死亡：在嵌套的內部函數成為垃圾對象時</p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">f = null 閉包死亡(包含閉包的函數對象成為垃圾對象)</span></p>
  <p class="text-amber-300 text-18px">74 .將函數作為實參傳遞給另一個函數調用</p>
  <p class="text-white pl-18px">function showDeLay(msg, time){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;setTimeout(function(){</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;&nbsp;&nbsp;alert(msg)</p>
  <p class="text-white pl-18px">&nbsp;&nbsp;},time)</p>
  <p class="text-white text-12px leading-1 pl-18px">}</p>
  <p class="text-white pl-18px">showDelay('atguigu',2000)</p>
  <p class="text-amber-300 text-18px">74 .使用函數內部的變數在函數執行完後，仍然存活在內存中(延長了局部變數的生命週期)</p>
  <p class="text-amber-300 text-18px">75 .讓函數外部可以操作(讀寫)到函數內部的數據(變數/函數)</p>
  <p class="text-white pl-18px">問題：</p>
  <p class="text-white pl-18px">1．函數執行完後，函數內部聲明的局部變數是否還存在？</p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">一般是不存在，存在於閉包中的變數才可能存在</span></p>
  <p class="text-white pl-18px">2．在函數外部能直接存取函數內部的局部變數嗎？</p>
  <p class="text-white pl-18px"><span class="bg-white/25 p-[2px_6px_6px]">不能，但我們可以通過閉包讓外部操作它</span></p>
  <p class="text-white pl-18px">&nbsp;&nbsp;</p>
  <p class="text-amber-300 text-18px">76 .？</p>
  <p class="text-amber-300 text-18px">77 .？</p>
  <p class="text-amber-300 text-18px">78 .？</p>
  <p class="text-amber-300 text-18px">79 .？</p>
  <p class="text-amber-300 text-18px">80 .？</p>
  <p class="text-amber-300 text-18px">8 .？</p>
  <p class="text-amber-300 text-18px">90 .？</p>
  <p class="text-amber-300 text-18px">9 .？</p>
  <p class="text-amber-300 text-18px">100 .？</p>
  <p class="text-amber-300 text-18px">10 .？</p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-white pl-18px"></p>
  <p class="text-amber-300 text-18px"></p>
  <i class="text-emerald-600 font-bold"></i>
  <i class="text-red-600 font-bold"></i>
  <a class="underline decoration-red-600 decoration-2 decoration-wavy"></a>
  <span class="bg-white/25 p-[2px_6px_6px]"></span>
</div>
</template>

<style lang="scss">

</style>