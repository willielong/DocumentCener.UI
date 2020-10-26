<template>
  <div id="app">
    <div id="preloader">
      <div class="refresh-preloader">
        <div class="preloader"><i>.</i><i>.</i><i>.</i></div>
      </div>
    </div>
    <div class="wrapper ">
      <router-view />
    </div>
  </div>
</template>
<style lang="stylus" scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
@import url('~@/assets/css/bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css');
@import url('~@/assets/css/bower_components/animate.css/animate.min.css');
@import url('~@/assets/css/bower_components/metisMenu/dist/metisMenu.min.css');
@import url('~@/assets/css/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');
@import url('~@/assets/css/bower_components/Waves/dist/waves.min.css');
@import url('~@/assets/css/style.css');
</style>
<script>
 export default{}
import $ from "jquery";
$("#preloader").height($(window).height() + "px");
$(window).on("load", function() {
  $("#table-wrapper").height($(window).height() + "px");
  setTimeout(function() {
    $("body").css("overflow-y", "visible");
    $("#preloader").fadeOut(400);
  }, 400);
});
</script>
