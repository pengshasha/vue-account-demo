<template>
  <div class="login-page">
    <div class="content-box">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="vcode">
          <el-col :span="16">
            <el-input v-model="form.vcode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <span class="vcode-box" @click="createCaptcha">
              <img :src="`/account/server/api/captcha?t=${time}`">
            </span>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
          <el-button>取消</el-button>
         </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
 data(){
   return {
     time: new Date().getTime(),
     form: {
       userName: '',
       password: '',
       vcode: ''
     },
     rules: {
      //  userName:[
      //    { required: true, message: '请输入用户名称', trigger: 'blur' },
      //    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      //  ],
      //  password:[
      //    { required: true, message: '请输入密码', trigger: 'blur' },
      //    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
      //  ],
      //  vcode:[
      //    { required: true, message: '请输入验证码', trigger: 'blur' }
      //  ]
     }
   }
 },
 mounted(){
   this.createCaptcha()
 },
//  watch:{
//   captcha(){
//     const _this = this;
//     _this.$refs.captchaBox.append(_this.captcha)
//   }
//  },
 methods: {
   onSubmit (){
     var _this = this;
     _this.$refs.ruleForm.validate((valid)=> {
       if(valid){
         console.log(_this.$store.login)
          _this.$store.dispatch('login/Login', _this.form).then(res => {
            console.log(res)
            if(res.code === 200 && res.data) {
              this.$message.success('登陆成功！');
              setTimeout(function(){
                _this.$router.push({path:'/accountList'})
              },1000)
             
            } else {
               this.$message.error(res.error.message || '登陆异常');
            }
          })
       } else {
         console.log('sumbit fail');
         return false;
       }
     })
   },
   createCaptcha (){
     var _this = this;
      _this.time = new Date().getTime()
    //  _this.$store.dispatch('login/createCaptcha').then(res =>{
    //    console.log('res')
    //    console.log(res)
    //    if(res && res.code === 200){
    //      _this.captcha = res.data.data
    //    }
    //  },err =>{
    //    _this.$message.error(res.error.message || '验证码获取失败')
    //  })
   }
 }
}
</script>

<style lang="less">
  .login-page{
    width: 100%;
    .content-box{
      width: 400px;
      height: 260px;
      overflow: hidden;
      padding: 20px;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -130px;
      margin-left: -200px;
      background-color: #ccc;
      box-shadow: 0 0 8px #888;
      .vcode-box{
        display: block;
        width: 80px;
        height: 40px;
        float: right;
        background-color: #fff;
      }
    }
  }
</style>