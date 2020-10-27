<template>
  <form class="">
    <remote-script
      src="http://10.55.165.50:85/web-apps/apps/api/documents/api.js"
    ></remote-script>
      <div class="row">
        <div class="col source el-row">
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
      <div id="iframeEditor_div"
        class="row"
        style="margin-left:0px;margin-right:0px;margin-top:-15px"
      >
        <div id="iframeEditor"></div>
      </div>
  </form>
</template>
<script src="http://10.55.165.50:85/web-apps/apps/api/documents/api.js"></script>
<script>
import $ from "jquery";
import "@/comm/importJS.js";
import httpbaseVue from "../../comm/httpbase.vue";

var docEditor;
var innerAlert = function(message) {
  if (console && console.log) console.log(message);
};

var onAppReady = function() {
  innerAlert("Document editor ready");
};

var onDocumentStateChange = function(event) {
  var title = document.title.replace(/\*$/g, "");
  document.title = title + (event.data ? "*" : "");
};

var onRequestEditRights = function() {
  location.href = location.href.replace(RegExp("action=view\\&?", "i"), "");
};

var onError = function(event) {
  if (event) innerAlert(event.data);
};
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
var onOutdatedVersion = function(event) {
  location.reload(true);
  console.log(event);
};
window.onload = function() {
  var fileId = getUrlParam("fileid");
  var ctype =  getUrlParam("ctype");
  var systemType = getUrlParam("systemType");
  let url =
    httpbaseVue.api + "file/config?editType=" + ctype + "&systemType="+systemType+"&fileid=" + fileId;
  $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    beforeSend: function(request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("account_token")
      );
    },
    success: function(data) {
      var config = data.body;
      config.events = {
        onAppReady: onAppReady,
        onDocumentStateChange: onDocumentStateChange,
        onRequestEditRights: onRequestEditRights,
        onError: onError,
        onOutdatedVersion: onOutdatedVersion
      };
      config.events["onRequestHistoryClose "] = function() {
        document.location.reload();
      };
      config.events["onRequestHistory"] = function() {
        LoadHist(fileId);
      };
      config.events["onRequestHistoryData"] = function(event) {
        var ver = event.data;
        setHist(ver, fileId);
      };
      docEditor = new DocsAPI.DocEditor("iframeEditor", config);
    }
  });
};
function LoadHist(fileId) {
  let url = httpbaseVue.api + "version/hist?fileid=" + fileId;
  $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    beforeSend: function(request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("account_token")
      );
    },
    success: function(data) {
      var hit = data.body;
      docEditor.refreshHistory(hit);
    }
  });
}
function setHist(version, fileid) {
  let url =
    httpbaseVue.api +
    "version/sethist?fileid=" +
    fileid +
    "&version=" +
    version;
  $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    beforeSend: function(request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("account_token")
      );
    },
    success: function(data) {
      var hit = data.body;
      docEditor.setHistoryData(hit);
    }
  });
}
export default {
  name: "docedit",
  components: {  }
};
$(function(){
$("#iframeEditor_div").height($(window).height()-90);
$(".el-carousel").attr("style","display:none");
})
</script>
<style lang="stylus" scoped>
@import url('~@/assets/css/home.css');
</style>
