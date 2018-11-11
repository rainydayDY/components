import store from '@/store';


// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.state.user.token) {
        config.headers.token = localStorage.getItem('TokenKey'); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, error => {
    // Do something with request error
    Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error);// for debug
        Vue.prototype.$message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    });

export default service;
