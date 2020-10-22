<template>
  <form class="main_div">
    <remote-script
      src="http://192.168.0.105:801/web-apps/apps/api/documents/api.js"
    ></remote-script>
    <div class="shadow mb-5 bg-white rounded  Shead_div">
      <div class="row">
        <div class="col">
          <bannerVue></bannerVue>
        </div>
      </div>
      <div class="row">
        <div class="col source">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/home">首页</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                编辑
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row" style="height:900px;margin-left:0px;margin-right:0px;margin-top:0px">
        <div id="iframeEditor"></div>
      </div>
    </div>
  </form>
</template>
<script>
import bannerVue from "../components/banner.vue";
import "@/comm/importJS.js";
export default {
  name: "document",
  components: { bannerVue },
  data() {
    return new { docEditor: null }();
  },
  methods: {
    innerAlert(message) {
      if (console && console.log) console.log(message);
    },
    onAppReady() {
      this.innerAlert("Document editor ready");
    },

    onDocumentStateChange(event) {
      var title = document.title.replace(/\*$/g, "");
      document.title = title + (event.data ? "*" : "");
    },

    onRequestEditRights() {
      location.href = location.href.replace(RegExp("action=view&?", "i"), "");
    },

    onError(event) {
      if (event) this.innerAlert(event.data);
    },

    onOutdatedVersion(event) {
      location.reload(true);
      console.log(event);
    },
    LoadHist(fileId, config) {
      let url = "version/hist?hist?fileid=" + fileId;
      this.common.$Get(null, url).then((data) => {
        var hit = data.body;
        this.docEditor.refreshHistory(hit);
        console.log("111", config);
      });
    },
    setHist(version, fileid) {
      let url = "version/sethist?fileid=" + fileid + "&version=" + version;
      this.common.$Get(null, url).then((data) => {
        var hit = data.body;
        this.docEditor.setHistoryData(hit);
      });
    },

    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    loadConfig() {
      var fileId = this.getUrlParam("fileid");
      var ctype =this.getUrlParam("ctype");
      let systemType=this.getUrlParam("systemType");
      let url =
        "file/config?editType=" + ctype + "&systemType="+systemType+"&fileid=" + fileId;
      this.common.$Get(null, url).then((data) => {
        let config = data.body;
        config.events = {
          onAppReady: this.onAppReady,
          onDocumentStateChange: this.onDocumentStateChange,
          onRequestEditRights: this.onRequestEditRights,
          onError: this.onError,
          onOutdatedVersion: this.onOutdatedVersion,
        };
        config.events["onRequestHistoryClose "] = function() {
          document.location.reload();
        };
        config.events["onRequestHistory"] = function() {
          this.LoadHist(fileId, config);
        };
        config.events["onRequestHistoryData"] = function(event) {
          let ver = event.data;
          this.setHist(ver, fileId);
        };
        // eslint-disable-next-line no-undef
        this.docEditor = new DocsAPI.DocEditor("iframeEditor", config);
      });
    },
  },
  created: function() {
    this.loadConfig();
  },
};
</script>
<style lang="stylus" scoped>
@import url("~@/assets/Home/home.css");
</style>
