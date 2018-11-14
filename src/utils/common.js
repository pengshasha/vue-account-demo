import axios from 'axios'
import { url_prefix } from '../../config/index'
let _ = require('lodash')

 const api = (function(){

  let fetch = function(url, params, method = 'post'){
    if(!arguments.length){
      return 
    }
    if(!['get','delete','post','put','pathch'].includes(method)){
      throw new Error('方法使用异常，请检查');
    } 
    if(!!arguments[0] && typeof arguments[0] === 'string') {
      url = url_prefix + url
    }
    // if(!!arguments[0] && _.isPlainObject(arguments[0]) && arguments[0]['url']){
    //   url = [url_prefix +url['url'],params=url['data']][0]
    // }
    return new Promise(function(resolve, reject){
      let config = {
        url: url,
        method: method,
        timeout: 1000,
        headers:{
          'Content-Type' : 'application/json'
        }
      }
      if(['put','post','patch'].includes(method)){
        config.data = params;
      } else{
        config.params = params;
      }
      axios(config).then(res => resolve(res.data), err =>{
        if(err.errMsg) {
          resolve(err)
        } else {
          resolve({code:501,data:{message:'服务器异常'}})
        }
      })
    })
  }

  return (function(array){
    return array.reduce(function(prev, cur){
      prev[cur] =(url, params) => fetch(url, params, cur)
      console.log(prev)
      return prev
    },{})
  })(['get','delete','post','put','pathch']);
})()
export default api