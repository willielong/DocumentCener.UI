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
        <TreeViewPersonalVue
          @tr-node-clicke="tr_node_clicke"
        ></TreeViewPersonalVue>
      </div>
      <div class="col-9" style="margin:0px;">
        <person-table-vue ref="PersonTableVue"></person-table-vue>
      </div>
    </div>
  </form>
</template>
<script>
import TreeViewPersonalVue from "../../components/treeview/TreeViewPersonal.vue";
import PersonTableVue from "../../components/trtables/PersonTable.vue";
export default {
  name: "Organization",
  components: { TreeViewPersonalVue, PersonTableVue },
  methods: {
    tr_node_clicke(node) {
      this.$refs.PersonTableVue.loadData(node.type === 1 ? node.id : -1);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import url('~@/assets/css/home.css');
</style>