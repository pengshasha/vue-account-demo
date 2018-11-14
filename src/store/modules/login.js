import axios from 'axios'
import stateCode from '../../utils/stateCode'


export default {
  namespaced: true,
  state: {
    user: '',
    token: ''
  },
  mutations: {
    SET_USER(state, data){
      state.user = data
    },
    SET_TOKEN(state, data){
      state.token = data
    }
  },
  actions: {
    async Login ({commit}, userInfo){
      const result = await api.post('/account/server/api/login',userInfo)
      if(result.code === stateCode.SUCCESS && result.data) {
        // commit('SET_USER', res.data.userName)
        // commit('SET_TOKEN',res.data.meta.token)
        // setUserItems('USER_ID', res.data.userId)
        // setUserItems('USER_NAME', res.data.userName)
        IOT.setUserItems('USER_INFO', JSON.stringify(result.data))
        IOT.setUserItems('TOKEN', result.token)
        return result;
      } else {
        return result
      }
      
    //   return new Promise((resolve, rejects)=>{
    //     axios.post(`/account/server/api/login`, userInfo).then(res =>{
    //       console.log(res)
    //       if(res.code === stateCode.SUCCESS && res.data) {
    //         commit('SET_USER', res.data.userName)
    //         commit('SET_TOKEN',res.data.meta.token)
    //         setUserItems('USER_ID', res.data.userId)
    //         setUserItems('USER_NAME', res.data.userName)
    //         setUserItems('TOKEN', res.data.meta.token)
    //         resolve(res)
    //       } else {
    //         resolve({
    //           code : stateCode.FAIL,
    //           msg : '未知错误'
    //         })
    //       }
    //     }, error =>{
    //       console.log(error)
    //       rejects(error)
    //     })
    //   }
    // )
  },
  async Logout(){
    try{
      const result = await api.get('/account/server/api/logout');
      if(result && result.code === 200) {
        IOT.removeUserItem('USER_INFO')
        IOT.removeUserItem('TOKEN')
        return result
      } else {
        return result
      }
    }catch(err){
      return {
        code: 500,
        error:{message:'未知错误或服务器异常'}
      }
    }
  },
  async createCaptcha (){
    try{
      const result = await api.get('/account/server/api/captcha');
      if(result && result.code === 200) {
        return result
      }
    }catch(err){
      return {
        code: 500,
        error:{message:'未知错误或服务器异常'}
      }
    }
  }

  }
}
