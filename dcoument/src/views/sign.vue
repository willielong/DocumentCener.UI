<template>
  <div>
    <div class="log">
      <div class="content1">
        <h2>登录文档中心</h2>
        <form>
          <input
            type="text"
            name="userid"
            v-model="account"
            onfocus="this.value = '';"
            :placeholder="accounttips"
          />
          <input
            type="password"
            name="psw"
            v-model="password"
            onfocus="this.value = '';"
            :placeholder="passwordtip"
          />
          <div class="button-row">
            <input
              type="button"
              class="sign-in"
              value="登录"
              @click="login()"
            />
            <input type="button" class="reset" value="重置" @click="Reset()" />
            <div class="clear"></div>
          </div>
        </form>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style lang="stylus">
@import url('~@/assets/css/Index.css');
</style>
<script>
export default {
  name: "Index",
  data() {
    return {
      account: "",
      password: "",
      passwordtip: "请输入密码",
      accounttips: "请输入用户名",
      pwlab: "密  码",
      aclab: "用户名",
    };
  },
  components: {},
  methods: {
    login() {
      var keys = this.aes.generatekey(32);
      var parameter = this.aes.encrypt(
        JSON.stringify({ account: this.account, password: this.password }),
        keys
      );
      this.common
        .$Post({ key: parameter, keys: keys }, "token/login")
        .then(data => {
          window.localStorage.removeItem("account_token");
          window.localStorage.setItem("account_token", data.body.access_token);
          window.location.href = "/home";
        });
    },
    Reset() {
      this.account = "";
      this.password = "";
    }
  },
  props: {}
};
</script>
