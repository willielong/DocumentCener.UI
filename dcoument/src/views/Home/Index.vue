<template>
  <div>
    <nav class="navbar">
      <div class="navbar-header container" style="padding-left:0px">
        <a href="#" class="menu-toggle" @click="isCollapses()"
          ><i class="zmdi zmdi-menu"></i
        ></a>
      </div>
    </nav>
    <el-menu
      id="el-menu"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :style="height"
    >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
    <div class="wl_body_widen" id="wl_body_widen" :style="rstyle">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
  z-index: 9999;
  position: relative;
  float: left;
  border-right:none
}
.el-menu--collapse{
    float: left;
}
.el-menu-item{
text-align: left;
}
.wl_body_widen{
min-height: 600px; 
text-align: left;
color: #000;
}
.el-menu{
    border-right:none;
}
</style>

<script>
import $ from "jquery";
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      isCollapse: true,
      tableData: Array(20).fill(item),
      height: "height:768px",
      rstyle:"",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isCollapses() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
      let h = window.outerHeight - 111 + "px";
      this.height = "height:" + h;
      this.rstyle="height:" + (window.outerHeight - 111)+"px";
    }
  }
};

$(function() {
  $("#el-menu").height($(window).height() - 40 + "px");
  $("#wl_body_widen").height($(window).height() - 40 + "px");
});
</script>