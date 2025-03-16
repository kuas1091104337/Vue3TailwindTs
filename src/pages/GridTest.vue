<script setup lang="ts">

</script>

<template>
<div class="body">
  <div class="gridText gridText-1">
    <div class="gridText_item"><span class="gridText_item_txt">Box 1</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 2</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 3</span></div>
  </div>
  <div class="gridText gridText-2">
    <div class="gridText_item"><span class="gridText_item_txt">Box 1</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 2</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 3</span></div>
  </div>
  <div class="gridText gridText-3">
    <div class="gridText_item"><span class="gridText_item_txt">Box 1</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 2</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 3</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 4</span></div>
  </div>
  <div class="gridText gridText-4">
    <div class="gridText_item"><span class="gridText_item_txt">Box 1</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 2</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 3</span></div>
    <div class="gridText_item">
      <span class="gridText_item_txt">
      【黃仁勳夜市美食名單】：
      ✦寧夏夜市：豆花莊、詹記水果、圓環邊蚵仔煎、爆漿脆皮魷魚、甘記燒仙草飲料店、甲上現炒栗子
      ✦臨江街夜市：冰世界雪花冰Ice World、今晚吃糖冰糖葫蘆、通化觀光夜市 甘蔗汁&泡泡冰、瑪拉桑原住民山豬肉香腸
      ✦遼寧街夜市：鵝肉城活海鮮
      【黃仁勳餐廳美食名單】：春韭、梨園湯包館、花娘小館、老撈麻辣火鍋、驥園川菜餐廳、富霸王豬腳、長春路雞家莊、牛耳精緻麵館、鄒記食舖磚窯古早味懷舊餐廳、聚聚無菜單料理、五燈獎豬腳魯肉飯、譽展蜜餞行
      </span>
    </div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 5</span></div>
    <div class="gridText_item"><span class="gridText_item_txt">Box 6</span></div>
  </div>
</div>
</template>

<style lang="scss">
.body{
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding-top:50px;
}
.gridText{
  width: 80%;
  display:grid;
  margin:0 auto 50px;
  &-1{
    grid-template-columns:30% 30% 30%;
    grid-column-gap:5%;
  }
  &-2{
    grid-template-columns:minmax(250px,1fr) 2fr 1fr;
    grid-column-gap:20px;
  }
  &-3{
    grid-template-columns:repeat(auto-fit,minmax(250px, 1fr));
    // grid-template-columns:repeat(2,1fr 2fr);
    grid-column-gap:20px;
  }
  &-4{
    grid-template-columns:repeat(3,1fr);
    grid-template-rows:200px minmax(100px, max-content);
    grid-gap:20px 50px;
  }
  &_item{
    color:#333;
    display:flex;
    width: 100%;
    height: 200px;
    background-color:#ff0;
    &_txt{margin:auto;}
  }
}
// ===== 手機版型區 =====
@media screen and (max-width:640px){
  .grid{
    &-1{grid-template-columns:repeat(1,1fr);}
    &-4{
      grid-template-columns:repeat(1,1fr);
      grid-template-rows:epeat(6,minmax(200px, max-content));
    }
  }
}

@media screen and (max-width: 767px) and (orientation:portrait){
   
}
// 手機版拿橫的時候 Landscape
@media screen and (max-width: 767px) and (orientation:landscape){
   
}
// ===== 平板版型區 =====
@media screen and (min-width: 768px) and (max-width: 1019px) {
   
}
// ===== 桌機版型區 =====
@media screen and (min-width: 1020px) {
   
}
</style>