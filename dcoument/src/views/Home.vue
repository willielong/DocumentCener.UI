<template>
  <form class="">
    <div class="shadow bg-white rounded Shead_div">
      <div class="row">
        <div class="col">
          <banner></banner>
        </div>
      </div>
      <div class="row">
        <div class="col source">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">首页</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                文档中心
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row" style="margin-top: -15px;">
        <div class="col-3" style="margin:0px;">
          <Treeview @tr-node-clicke="tr_node_clicke"></Treeview>
        </div>
        <div class="col-9" style="margin:0px;">
          <main-table-vue ref="MainTableVue"></main-table-vue>
        </div>
      </div>
    </div>
  </form>
</template>
<style lang="stylus" scoped>
@import url("~@/assets/css/home.css");
</style>
<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import Treeview from "@/components/Treeview.vue";
import banner from "@/components/banner.vue";
import MainTableVue from '../components/trtables/MainTable.vue';

export default {
  name: "Home",
  components: { Treeview, banner,MainTableVue },
  methods: {
    tr_node_clicke(node) {
      this.$refs.MainTableVue.loadData(false, node.data.type==-1?2:node.data.type, node.data.id, '', 0, 0)
    },
  },
};
</script>
