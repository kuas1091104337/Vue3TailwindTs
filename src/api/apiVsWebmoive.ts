// import axios, { AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
const request:AxiosInstance = axios.create({
  baseURL:"https://www.vscinemas.com.tw/",
});
import type { Tmoive } from '../types/index';
export const apiGetLstDicCinema = ():Promise<AxiosResponse<Array<Tmoive>>> => request.get<Array<Tmoive>>("/VsWeb/api/GetLstDicCinema");
// CORS
// axios.get<Array<Tmoive>>("https://www.vscinemas.com.tw/VsWeb/api/GetLstDicCinema")