<script setup lang="ts">
const emit = defineEmits<{
        activeId:[id:number];
        updateName:[name:string];
      }>(),
      handleActiveIdx = (id:number) => {
        emit('activeId',id)
      },
      handleNameClick = (name:string) => {
        emit('updateName',name)
      };
</script>

<template>
<div>
  <button @click="handleActiveIdx(1)">click</button>
  <button @click="handleNameClick('Mike')"></button>
</div>
</template>

<style lang="scss">

</style>