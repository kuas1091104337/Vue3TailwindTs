import Cookies from 'js-cookie'
export const cookie = {
  set:(key:string,data:any) => {
    if(typeof data === 'object') data = JSON.stringify(data);
    Cookies.set(key,data,{expires:7});
  },
  get:(key:string) => {
    if(key === "all") return Cookies.get()
    let data:string | undefined = Cookies.get(key);
    if(data === undefined) return data;
    try{
      return JSON.parse(data);
    }catch{
      return data;
    }
    // if(data === undefined){
    //   return data;
    // }else if((data[0] === "{" && data[data.length - 1] === "}") || (data[0] === "[" && data[data.length - 1] === "]")){
    //   data = JSON.parse((Cookies.get(key) as string));
    // }
    // return data;
  },
  remove:(key:string) => {
    if(key === "all"){
      Object.keys(Cookies.get()).forEach(item => Cookies.remove(item))
    }else{
      Cookies.remove(key);
    }
  },
};