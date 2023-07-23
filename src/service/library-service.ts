import { request } from "../utils/axios-interceptors";

export const postRequest = () => request({ url: "/posts" });