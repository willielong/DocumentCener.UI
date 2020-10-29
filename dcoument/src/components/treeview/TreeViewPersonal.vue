<template>
  <div id="TreeViewOrg">
    <ul class="list-group list-group-flush" id="list_group">
      <li class="list-group-item" style="height:100%">
        <el-tree
          :data="data"
          node-key="id"
          ref="treePerson"
          :expand-on-click-node="false"
          v-loading="loading"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-link
              @click="handleCheckChange(node)"
              :type="data.item"
              :underline="false"
            >
              <i :class="data.icon"></i>
              <el-tooltip
                placement="right-start"
                effect="light"
                v-if="data.type == 1"
              >
                <div slot="content">
                  <div>
                    <el-link
                      type="success"
                      :underline="false"
                      @click="dialoAddPerson(node)"
                    >
                      <i class="el-icon-circle-plus m5"></i
                      >添加人员信息</el-link
                    ><br />
                  </div>
                </div>
                <span>{{ node.label }}</span>
              </el-tooltip>
              <span v-if="data.type == 0">{{ node.label }}</span>
            </el-link>
          </span>
        </el-tree>
      </li>
    </ul>
    <ed-person-vue
      ref="EdPersonVue"
      @add-comment="expandedTreeNode"
    ></ed-person-vue>
  </div>
</template>
<script>
import $ from "jquery";
import EdPersonVue from "../EdPerson.vue";

export default {
  components: { EdPersonVue },
  treenode: null,
  data() {
    return {
      data: [],
      count: 1,
      loading: true
    };
  },
  methods: {
    handleCheckChange(node) {
      this.loadNode(node.data.type, node.data.id);
    },
    dialoAddPerson(node) {
      this.$refs.EdPersonVue.dialogVisible(0, "添加人员信息", true, node.data.id);
    },
    ///异步加载数据
    loadNode(type, id) {
      if (id == 0) {
        let url = "tree/org?type=" + type + "&pid=" + id;
        this.common.$Get(null, url).then(data => {
          let res = data.body;
          this.data = [];
          res.forEach(element => {
            this.data.push({
              label: element.name,
              type: element.type,
              id: element.id,
              pid: element.pid,
              icon: element.icon,
              item: element.item,
              unitid: element.unitid,
              children: []
            });
            this.loading = false;
            if ($("#list_group") != undefined) {
              $("#list_group").height($(window).height() - 210);
            }
          });
          this.form = this.$emit("tr-node-clicke", node);
        });
      } else {
        var node = this.$refs.treePerson.getNode(id);
        let url = "tree/org?type=" + type + "&pid=" + id;
        this.common.$Get(null, url).then(data => {
          let res = data.body;
          node.data.children = [];
          res.forEach(element => {
            node.data.children.push({
              label: element.name,
              type: element.type,
              id: element.id,
              pid: element.pid,
              icon: element.icon,
              item: element.item,
              unitid: element.unitid,
              children: []
            });
            this.loading = false;
            if ($("#list_group") != undefined) {
              $("#list_group").height($(window).height() - 210);
            }
          });
          node.loaded = false;
          node.collapse();
          // 主动调用展开节点方法，重新查询该节点下的所有子节点
          node.expand();
          this.form = this.$emit("tr-node-clicke", node);
        });
      }
    },
    expandedTreeNode(key) {
      this.loadNode(1, key);
    }
  },
  created() {
    this.loadNode(0, 0);
  }
};
</script>
<style scoped>
.m5 {
  margin-right: 3px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 3px;
}
#list_group {
  border-right: 1px solid #eeeeee;
  height: 100%;
}
</style>
