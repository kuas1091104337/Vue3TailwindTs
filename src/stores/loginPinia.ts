import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ref, computed, readonly } from 'vue';
import { defineStore } from 'pinia';
import type { Tcourses } from '../types';

export const useLoginStore = defineStore('login',() => {
  const userName = ref<string>('mike'),
        coursesArr = ref<Array<Tcourses>>([]),
        coursesId = ref<number>(0),
        IdTitle = computed<string>(() => '當前 ID : '+coursesId.value),
        usetTitle = computed<string>(() => '今天天氣真好 '+userName.value),
        nameHandle = (txt:string) => userName.value = txt,
        getDataList = async () => {
          try{
            const res = await axios.get<Array<Tcourses>>('https://vue-lessons-api.vercel.app/courses/list');
            coursesArr.value = res.data;
            console.log(res.data);
          }catch(error){
            console.error(error);
          }
        };

  return { 
    userName:readonly(userName),
    usetTitle:readonly(usetTitle),
    coursesId:readonly(coursesId),
    coursesArr:readonly(coursesArr),
    IdTitle:readonly(IdTitle),
    nameHandle,
    getDataList
  }
})