<template>
  <form class="">
    <remote-script
      src="http://192.168.0.105:801/web-apps/apps/api/documents/api.js"
    ></remote-script>
    <div class="row">
      <div class="col el-row">
        <banner></banner>
      </div>
    </div>
    <div id="iframeEditor_div" class="row" style="margin:0px">
      <div id="iframeEditor"></div>
    </div>
  </form>
</template>
<script src="http://192.168.0.105:801/web-apps/apps/api/documents/api.js"></script>

<script>
import $ from "jquery";
import "@/comm/importJS.js";
import banner from "@/components/banner.vue";
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
  var ctype = getUrlParam("ctype");
  var systemType = getUrlParam("systemType");
  let url =
    httpbaseVue.api +
    "file/config?editType=" +
    ctype +
    "&systemType=" +
    systemType +
    "&fileid=" +
    fileId;
  $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    beforeSend: function(request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("account_token"),
        "x-api-version",
        1.0
      );
      request.setRequestHeader("x-api-version", 1.0);
    },
    success: function(data) {
      var config = data.body;
      config.events = {
        onAppReady: onAppReady,
        onDocumentStateChange: onDocumentStateChange,
        onRequestEditRights: onRequestEditRights,
        onError: onError,
        onOutdatedVersion: onOutdatedVersion,
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
    },
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
        "Bearer " + window.localStorage.getItem("account_token"),
        "x-api-version",
        1.0
      );
      request.setRequestHeader("x-api-version", 1.0);
    },
    success: function(data) {
      var hit = data.body;
      docEditor.refreshHistory(hit);
    },
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
        "Bearer " + window.localStorage.getItem("account_token"),
        "x-api-version",
        1.0
      );
      request.setRequestHeader("x-api-version", 1.0);
    },
    success: function(data) {
      var hit = data.body;
      docEditor.setHistoryData(hit);
    },
  });
}
export default {
  name: "docedit",
  components: { banner },
};
$(function() {
  $("#iframeEditor_div").height($(window).height() - 120);
});
</script>
<style lang="stylus" scoped>
@import url('~@/assets/css/home.css');
</style>
