<template>
  <div>
    <nav class="navbar">
      <div class="navbar-header" style="padding-left:0px">
        <a href="#" class="menu-toggle" @click="isCollapses()"
          ><i class="zmdi zmdi-menu"></i
        ></a>
      </div>
    </nav>
    <el-menu
      id="el-menu"
      :default-active="activicateIndex"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :style="height"
    >
      <el-menu-item index="1">
        <i class="el-icon-files"></i>
        <span slot="title">文档中心</span>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-s-home"></i>
        <span slot="title">组织管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-custom"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
    <div class="wl_body_widen" id="wl_body_widen" :style="rstyle">
      <div class="row">
        <div class="col el-row">
          <banner></banner>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <router-link id="c-link" :to="linkUrl" style="display:none"></router-link>
  </div>
</template>
<style>
@import url("~@/assets/css/home.css");
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
  z-index: 9999;
  position: relative;
  float: left;
  border-right: none;
}
.el-menu--collapse {
  float: left;
}
.el-menu-item {
  text-align: left;
}
.wl_body_widen {
  min-height: 600px;
  text-align: left;
  color: #000;
}
.el-menu {
  border-right: none;
}
</style>

<script>
import $ from "jquery";
import banner from "@/components/banner.vue";
export default {
  data() {
    return {
      isCollapse: true,
      height: "height:768px",
      rstyle: "",
      activicateIndex: "1",
      linkUrl: "/home",
    };
  },
  methods: {
    handleSelect(key) {
      switch (key) {
        case "1":
          {
            this.activicateIndex = "1";
            this.linkUrl = "/home";
          }
          break;
        case "2":
          {
            this.activicateIndex = "2";
            this.linkUrl = "/org";
          }
          break;
        default:
          {
            this.activicateIndex = "1";
            this.linkUrl = "/home";
          }
          break;
      }
      setTimeout(() => {
        document.getElementById("c-link").click();
        let h = window.outerHeight - 111 + "px";
        this.height = "height:" + h;
        this.rstyle = "height:" + (window.outerHeight - 111) + "px";    
      }, 100);
    },
    isCollapses() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
      let h = window.outerHeight - 111 + "px";
      this.height = "height:" + h;
      this.rstyle = "height:" + (window.outerHeight - 111) + "px";
    },
  },
  components: { banner },
};

$(function() {
  $("#el-menu").height($(window).height() - 40 + "px");
  $("#wl_body_widen").height($(window).height() - 40 + "px");
  if ($("#list_group") != undefined) {
    $("#list_group").height($(window).height() - 290);
  }
});
</script>
