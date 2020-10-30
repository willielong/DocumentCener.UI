<template>
  <div id="TreeViewOrg">
    <ul class="list-group list-group-flush" id="list_group">
      <li class="list-group-item" style="height:100%">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          @check-click="handleCheckChange"
          :expand-on-click-node="false"
          ref="tree"
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
  components: {EdPersonVue},
  treenode: null,
  data() {
    return {
      props: {
        label: "name",
        children: "children",
        type: "type",
        class: "class"
      },
      count: 1,
      loading: true
    };
  },
  methods: {
    handleCheckChange(node) {
      this.form = this.$emit("tr-node-clicke", node.data);
    },
    ///异步加载数据
    loadNode(node, resolve) {
      let type = 0;
      let pid = 0;
      if (node.level !== 0) {
        type = node.data.type;
        pid = node.data.id;
      }
      let url = "tree/org?type=" + type + "&pid=" + pid;
      this.common.$Get(null, url).then(data => {
        if (node.level === 0) {
          let res = new Object();
          res.data = data.body[0];
          this.form = this.$emit("tr-node-clicke", res.data);
        }
        this.loading = false;
        if ($("#list_group") != undefined) {
          $("#list_group").height($(window).height() - 210);
        }
        return resolve(data.body);
      });
    },
    dialoAddPerson(node) {
      this.treenode=node;
      this.$refs.EdPersonVue.dialogVisible(0, "添加人员信息", true, node.data.id);
    },
    expandedTreeNode() {
      this.form = this.$emit("tr-node-clicke", this.treenode.data);
    },
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
