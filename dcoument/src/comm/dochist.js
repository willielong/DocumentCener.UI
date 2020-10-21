import $ from "jquery";
var  hits= {
  setHist: function(version, url, docEditor) {
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
      },
    });
  },
  LoadHist: function(url, docEditor) {
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
      },
    });
  },
};
export default {
  hits
};

