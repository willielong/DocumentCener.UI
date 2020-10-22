<template>
  <div id="Man_div">
    <div class="shadow mb-5 bg-white rounded Shead_div">
      <ul class="list-group">
        <li class="list-group-item  bg-info text-white "><h3>登录</h3></li>
        <li class="list-group-item">
          <div class="input-group flex-nowrap mb-2 mt-2">
            <div class="input-group-prepend">
              <span
                class="input-group-text bg-primary text-white"
                id="addon-wrapping"
                >{{ aclab }}</span
              >
            </div>
            <input
              type="text"
              class="form-control"
              :placeholder="accounttips"
              :ria-label="accounttips"
              aria-describedby="addon-wrapping"
              v-model="account"
            />
          </div>
        </li>
        <li class="list-group-item">
          <div class="input-group flex-nowrap mb-2 mt-2">
            <div class="input-group-prepend">
              <span
                class="input-group-text bg-primary text-white"
                id="addon-wrapping"
                >{{ pwlab }}</span
              >
            </div>
            <input
              type="password"
              class="form-control"
              :placeholder="passwordtip"
              :aria-label="passwordtip"
              aria-describedby="addon-wrapping"
              v-model="password"
            />
          </div>
        </li>
        <li class="list-group-item">
          <div
            class="btn-group mb-2 mt-2"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              class="btn  btn-outline-primary pl-5 pr-5"
              href="/about"
              @click="login()"
            >
              确定
            </button>
            <button type="button" class="btn  btn-outline-danger pl-5 pr-5">
              取消
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
@import url("~@/assets/Index/Index.css");
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
      this.common.$Post({ key: parameter,keys:keys }, "token/login").then((data) => {
        window.localStorage.removeItem("account_token");
        window.localStorage.setItem("account_token", data.body.access_token);
        window.location.href = "/home";
      });
    },
  },
  props: {},
};
</script>
