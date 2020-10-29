<template>
    <form class="Personal">
      <div class="row">
        <div class="col source el-row">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/home">首页</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                人员管理
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row" style="margin-top: -15px;">
        <div class="col el-row" style="margin:0px;">
          <TreeViewPersonalVue @tr-node-clicke="tr_node_clicke"></TreeViewPersonalVue>
        </div>
        <div class="col-9" style="margin:0px;">
        </div>
      </div>
  </form>
</template>
<script>
import TreeViewPersonalVue from '../../components/treeview/TreeViewPersonal.vue';
export default {
  name: "Organization",
  components: { TreeViewPersonalVue },
  methods: {
    tr_node_clicke(node) {
      //this.$refs.MainTableVue.loadData(false, node.data.type==-1?2:node.data.type, node.data.id, '', 0, 0)
         //this.common.$mxAlert(node, "success");
         console.log('tag',node)
    },
  },
}
</script>
<style lang="stylus" scoped>
@import url("~@/assets/css/home.css");
</style>