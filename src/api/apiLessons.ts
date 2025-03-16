// import axios, { AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
const request:AxiosInstance = axios.create({
  baseURL:'https://vue-lessons-api.vercel.app/',
});
// , TerrorMsg 
import type { Ttwzip, Tphone, Tcourses, TseoHome, Tlogin, Tinfo, TpostLogin, TpostLoginData } from '../types';

export const apiGetCityList = ():Promise<AxiosResponse<Ttwzip>> => request.get<Ttwzip>('/city/list');
export const apiGetPhotoList = ():Promise<AxiosResponse<Array<Tphone>>> => request.get<Array<Tphone>>('/photo/list');
export const apiGetCoursesList = ():Promise<AxiosResponse<Array<Tcourses>>> => request.get<Array<Tcourses>>('/courses/list');
export const apiGetSeoHome = ():Promise<AxiosResponse<TseoHome>> => request.get<TseoHome>('/seo/home');
export const apiPostRegistered = (req:Tinfo):Promise<AxiosResponse<Tlogin>> => request.post<Tlogin>('https://vue-lessons-api.vercel.app/auth/registered',req);
export const apiPostLogin = (req:TpostLogin):Promise<AxiosResponse<TpostLoginData>> => request.post<TpostLoginData>('https://vue-lessons-api.vercel.app/auth/login',req);

// export const apiGet = ():Promise<AxiosResponse<>> => request.get<>('');
// export const apiPost = ():Promise<AxiosResponse<>> => request.post<>('');