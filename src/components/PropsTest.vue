<script setup lang="ts">
// const props = defineProps({
//         name:{
//           type:String,
//           default:'mike'
//         },
//         age:{
//           type:Number,
//           default:12
//         },
//         info:{
//           type:Object,
//           default:() => ({
//             email:'adfadf@gmail.com',
//             phone:'0912-345-678'
//           })
//         }
//       })
// type TInfo = {
//   email:String;
//   phone:String;
// }
// type TUser = {
//   name:String;
//   age?:Number; //?代表可傳可不傳
//   info:TInfo;
// }
// const props = withDefaults(defineProps<TUser>(),{
//         name:'mike',
//         age:12,
//         info:() => ({
//           email:'adfadf@gmail.com',
//           phone:'0912-345-678',
//         }),
//       });

const { name = 'mike', age = 12, info = { email:'adfadf@gmail.com', phone:'0912-345-678' } } = defineProps<{
        name:String;
        age?:Number;
        info:() => ({
          email:String;
          phone:String;
        }),
      }>();
</script>

<template>
<div>
  <pre>
    {{ name }}
    {{ age }}
    {{ info }}
  </pre>
</div>
</template>

<style lang="scss">

</style>