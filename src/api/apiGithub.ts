// import axios, { AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
const request:AxiosInstance = axios.create({
  baseURL:"https://api.github.com/",
});
import type { TgitUser, TgitUserRepos } from '../types/index';
export const apiGetUserData = (name = 'MikeCheng1208'):Promise<AxiosResponse<Array<TgitUser>>> => request.get<Array<TgitUser>>(`/users/${name}`);
export const apiGetUserRepos = (name = 'MikeCheng1208',page = 1,perPage = 10):Promise<AxiosResponse<Array<TgitUserRepos>>> => request.get<Array<TgitUserRepos>>(`/users/${name}/repos?page=${page}&per_page=${perPage}&sort=pushed`);