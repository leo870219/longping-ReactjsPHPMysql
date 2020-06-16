import _axios from 'axios';
const axios= baseURL=>{
    const instance =_axios.create({
        baseURL:baseURL || 'http://localhost/',
        timeout:1000
    });
    return instance;
}

export {axios};
export default axios();