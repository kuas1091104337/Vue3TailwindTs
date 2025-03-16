export const local = {
  set:(key:string,data:any) => {
    if(typeof data === 'object') data = JSON.stringify(data);
    localStorage.setItem(key,data);
  },
  // get:(key:string) => {
  //   if(key === 'all'){
  //     if(localStorage.length === 0) return {}; 
  //     const obj:Record<string,any> = {}
  //     // const obj:{ [key:string]:any } = {}
  //     for(let i=0, max=localStorage.length; i<max; i++){
  //       let value:string = localStorage.getItem(localStorage.key(i) as string)!
  //       if((value[0] === "{" && value[value.length - 1] === "}") || (value[0] === "[" && value[value.length - 1] === "]")){
  //         value = JSON.parse(value);
  //       }
  //       obj[localStorage.key(i)!] = value
  //     }
  //     return obj;
  //   }
  //   let data:string | null = localStorage.getItem(key);
  //   if(data === null){
  //     return data;
  //   }else if((data[0] === "{" && data[data.length - 1] === "}") || (data[0] === "[" && data[data.length - 1] === "]")){
  //     data = JSON.parse(localStorage.getItem(key) as string);
  //   }else{
  //     try{
  //       data = JSON.parse(localStorage.getItem(key) as string);
  //     }catch(error){
  //       console.log(error);
  //       data = localStorage.getItem(key);
  //     }
  //   }
  //   return data;
  // },
  get:(key:string) => {
    const parseJSON = (data:string | null):any => {
      if(data === null) return data;
      try{
        return JSON.parse(data);
      }catch{
        return data;
      }
    };
    if(key === 'all'){
      if(localStorage.length === 0) return {}; 
      const obj:Record<string,any> = {}
      for(let i=0, max=localStorage.length; i<max; i++){
        const storageKey:string | null = localStorage.key(i)
        if(storageKey !== null) obj[storageKey] = parseJSON(localStorage.getItem(storageKey))
      }
      return obj;
    }
    return parseJSON(localStorage.getItem(key));
  },
  remove:(key:string) => {
    if(key === "all"){
      localStorage.clear();
    }else{
      localStorage.removeItem(key);
    }
  },
};