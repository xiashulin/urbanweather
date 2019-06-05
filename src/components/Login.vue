<template>
  <div class="login">
    <form action="/login" method="post" @submit="checkForm">
      <p class="login_title">欢迎登录</p>
      <div class="input_bar">
        <i class="user_icon"></i>
        <input type="number" id="uid" v-model="uid" name="uid" maxlength="18" required placeholder="请输入您的账号">
      </div>
      <div class="input_bar">
        <i class="lock_icon"></i>
        <input type="password" id="psw" v-model="psw" name="psw" maxlength="18" required placeholder="请输入您的密码">
      </div>
      <div class="read">
        <a
          href="javascript:;"
          onclick="javascript:$('#login').hide();$('#resetPwdOne').show();"
        >忘记密码</a>
      </div>
      <div class="login_btn">
        <button class="submit" type="submit">登录系统</button>
      </div>
      <div class="err_tip">{{errmsg}}</div>
      <input name="redirecturl" type="hidden" value v-model="redirecturl">
      <input name="key" type="hidden" value v-model="key">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  // el: '#app',
  data () {
    return {
      uid: null,
      psw: null,
      errmsg: '',
      redirecturl: 'http://br.test.upchina.com',
      key: new Date().toString()
    }
  },
  methods: {
    checkForm: function (e) {
      if (!this.uid) {
        this.errmsg = '请输入登录账号'
        return
      }

      if (!this.psw) {
        this.errmsg = '请输入登录密码'
      }
    }
    // get: function () {
    //   this.$http
    //     .get('http://t.weather.sojson.com/api/weather/city/101030100')
    //     .then(result => {
    //       // document.write(JSON.stringify(result.body));
    //       this.city = result.body.cityInfo.city
    //     })
    //     .catch(err => {
    //       console.log('请求处理失败', err.message)
    //     })
    // }
  }
}
</script>
