<template>
  <div>
    <div class="warning-bg">
      <div class="table-wrapper text-center" id="table-wrapper">
        <div class="table-row">
          <div class="table-cell">
            <div class="login">
              <h4 class="text-center">{{ lab.titlelab }}</h4>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="login"
                    :placeholder="lab.accounttips"
                    v-model="paramter.account"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    :placeholder="lab.passwordtip"
                    v-model="paramter.password"
                  />
                </div>
                <div class="form-group text-left">
                  <div class="checkbox checkbox-primary">
                    <label
                      ><input type="checkbox" v-model="remembers"/> <i></i
                    ></label>
                    <span class="white f-s-16 m-l-5">{{ lab.remember }}</span>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-block btn-lg btn-primary"
                  @click="login"
                  @keyup.enter="enterSearch"
                >
                  {{ lab.logname }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped></style>

<script>
export default {
  name: "Index",
  data() {
    return {
      lab: {
        passwordtip: "请输入密码",
        accounttips: "请输入用户名",
        titlelab: "文档管理中心",
        logname: "登 录",
        remember: "记住我"
      },
      paramter: {
        account: "",
        password: ""
      },
      remembers: false
    };
  },
  components: {},
  methods: {
    login() {
      var keys = this.aes.generatekey(32);
      if (this.paramter.account != "admin") {
        this.paramter.password = this.aes.encrypt(this.paramter.password);
      }
      var parameter = this.aes.encrypt(JSON.stringify(this.paramter), keys);
      let remembers = this.remembers;
      this.common
        .$Post({ key: parameter, keys: keys }, "token/login")
        .then(data => {
          window.localStorage.removeItem("account_token");
          window.localStorage.setItem("account_token", data.body.access_token);
          window.location.href = "/file";
          ///记住我
          if (remembers) {
            window.localStorage.setItem(
              "account_remembers",
              this.paramter.account
            );
          }
        });
      if (this.paramter.account != "admin") {
        this.paramter.password = this.aes.decrypt(this.paramter.password);
      }
    },
    //回车搜索
    enterSearch() {
      document.onkeydown = e => {
        //13表示回车键，baseURI是当前页面的地址，为了更严谨，也可以加别的，可以打印e看一下
        if (e.keyCode === 13 && e.target.baseURI.match('/')) {
          //回车后执行搜索方法
          this.login();
        }
      };
    }
  },
  props: {},
  created: function() {
    ///初始化时判断是否记住我
    let account_remembers = window.localStorage.getItem("account_remembers");
    if (
      account_remembers != null &&
      account_remembers != undefined &&
      account_remembers != ""
    ) {
      this.paramter.account = window.localStorage.getItem("account_remembers");
      this.remembers = true;
    }
     this.enterSearch();
  }
};
</script>
