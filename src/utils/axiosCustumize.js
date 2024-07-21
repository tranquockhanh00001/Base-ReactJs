import axios from "axios";
import { store } from "../redux/store";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed:80
});

const instance = axios.create({
    baseURL: 'http://localhost:8081/api/',
    
  });

  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
      
      const accessToken = store?.getState()?.user?.account?.access_token;
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    NProgress.start();
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
  });

  export default instance