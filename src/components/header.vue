<template>
  <div class="header">
    <div class="logo">
      <a href="#">
        <img src='../assets/logo.png'>
      </a>
    </div>
    <el-menu default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            text-color="#fff"
            active-text-color="#ffd04b">
      <el-menu-item index="1">帐户列表</el-menu-item>
      <el-menu-item index="2">帐户详情</el-menu-item>
    </el-menu>
    <div class="title">
      <span class="username">{{ userInfo.userName }}</span>
      <span class="logout" @click='logout'>退出登陆</span>
    </div>
  </div>
</template>
<script>
// const userName = IOT.getUserItems('USER_INFO');
// console.log(IOT.getUserItems('USER_INFO'));
export default {
 data(){
   return{
     userInfo: JSON.parse(IOT.getUserItems('USER_INFO'))
   }
 },
 methods:{
   'logout': function(){
     const _this = this;
    _this.$store.dispatch('login/Logout').then(function(res){
      if(res.code === 200) {
        console.log('------')
        console.log(res)
        _this.$message.success('登出成功！');
        setTimeout(function(){
          _this.$router.push({path:'/login'})
        },1000)
      } else {
         _this.$message.error(res.error.message || '未知错误');
      }
    })
   }
 }
}
</script>
<style lang="less" scoped>
 .header{
   width: 100%;
   overflow: hidden;
   border-bottom: 1px solid #ddd;
   .logo{
     float: left;
     height: 50px;
     padding: 5px 30px 5px 30px;
     margin-right: 30px;
     img{
       width: auto;
       height: 100%;
     }
   }
   .el-menu{
     float: left;
     &.el-menu--horizontal{
       border-bottom:none;
     }
   }
   .el-menu-item {
      color: #000!important;
   }
   .title{
     float:right;
     padding-right: 10px;
     font-size: 14px;
     span{
       line-height: 60px;
       padding-left: 8px;
       &:hover{
         cursor: pointer;
       }
       &.username{
         color: red
       }
     }
     
   }
 }
</style>


