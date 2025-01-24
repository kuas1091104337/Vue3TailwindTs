import{d as j,r as x,A as B,b as M,e as o,k as S,t as s,F as C,f as F}from"./index-cmZk8Nz2.js";const a="text-rose-500",r="bg-cyan-500",c="border-amber-500",O=j({__name:"VarTs2",setup(N){const t=x([]),i=e=>e;function w(e){return e}const l=i("Mike"),d=100;console.log(l),console.log(d);const u=e=>e[0];function p(e){return e[0]}const g=p([1,2,3,4]);console.log(g);const m=u(["a","b","c","d"]);console.log(m);async function y(e){const n=await fetch(e),_=await n.json();return{status:n.status,data:_}}y("https://vue-lessons-api.vercel.app/photo/list").then(e=>{console.log("API then=>",e.data),t.value=e.data}),B.get("https://vue-lessons-api.vercel.app/photo/list").then(e=>{console.log("axios=>",e.data)});const b={Offline:"離線",Online:"在線",leave:"離開",nostate:"不存在"},f={mike:{age:18,address:"桃園"},jacky:{age:20,address:"台北"},andy:{age:22,address:"台中"}};console.log(a,r,c),console.log("模組化 type:",{name:"Mike",age:12,companyName:"TheCodingPro",jobTitle:"Teacher",seniority:3,userAddress:"台灣桃園市",companyAddress:"台灣台北市"});const h={name:"Mike",age:12},T={name:"Mike",age:12,address:"台灣台北市"},k={name:"Mike",userAddress:"Taiwan",jobTitle:"Frontend Engineer"},A={companyName:"TheCodingPro",jobTitle:"Teacher",seniority:3,companyAddress:"台灣台北市"},v={companyName:"TheCodingPro",jobTitle:"Teacher",companyAddress:"台灣台北市",seniority:3};return(e,n)=>(F(),M(C,null,[o("p",{class:S([a,r,c,"border"])}," gray、red、orange、amber、yellow、lime、green、emerald、teal、cyan、sky、blue、indigo、violet、purple、fuchsia、pink、rose ",2),o("pre",null,""+s(v)+`
`+s(k)+`
`+s(A)+`
`+s(T)+`
`+s(h)+`
`+s(b)+`
`+s(f)+`
`+s(t.value)+`
`,1)],64))}});export{O as default};
