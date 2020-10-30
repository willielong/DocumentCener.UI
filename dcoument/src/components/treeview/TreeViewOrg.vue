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
          node-key="id"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-link
              @click="handleCheckChange(node)"
              :type="data.item"
              :underline="false"
            >
              <i :class="data.icon"></i>
              <el-tooltip placement="right-start" effect="light">
                <div slot="content">
                  <div v-if="data.type == 0">
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="dialo(node, 0)"
                    >
                      <i class="el-icon-circle-plus m5"></i>添加公司</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == 0">
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="dialo(node, 1)"
                    >
                      <i class="el-icon-edit m5"></i>编辑公司</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == 0">
                    <el-link
                      type="danger"
                      :underline="false"
                      @click="del(node)"
                    >
                      <i class="el-icon-delete m5"></i>删除公司</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == 0 || data.type == 1">
                    <el-link
                      type="success"
                      :underline="false"
                      @click="dialoDp(node, 0)"
                    >
                      <i class="el-icon-circle-plus m5"></i>添加部门</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == 1">
                    <el-link
                      type="success"
                      :underline="false"
                      @click="dialoDp(node, 1)"
                    >
                      <i class="el-icon-edit m5"></i>编辑部门</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == 1">
                    <el-link
                      type="danger"
                      :underline="false"
                      @click="del(node)"
                    >
                      <i class="el-icon-delete m5"></i>删除部门</el-link
                    ><br />
                  </div>
                </div>
                <span>{{ node.label }}</span>
              </el-tooltip>
            </el-link>
          </span>
        </el-tree>
      </li>
    </ul>
    <EditCompayVue
      ref="EditCompany"
      @add-comment="expandedTreeNode"
    ></EditCompayVue>
    <EdDepartmentVue
      ref="EdDepartmentVue"
      @add-comment="expandedTreeNode"
    ></EdDepartmentVue>
  </div>
</template>
<script>
import EdDepartmentVue from "../EdDepartment.vue";
import EditCompayVue from "../EditCompay.vue";
import $ from "jquery";
export default {
  components: {
    EdDepartmentVue,
    EditCompayVue
  },
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
      this.form = this.$emit("tr-node-clicke", node);
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
          this.form = this.$emit("tr-node-clicke", res);
        }
        this.loading = false;
        if ($("#list_group") != undefined) {
          $("#list_group").height($(window).height() - 210);
        }
        return resolve(data.body);
      });
    },
    ///弹出单位提示框
    dialo(node, contrall) {
      ///新增公司
      if (contrall === 0) {
        this.treenode = node;
        this.$refs.EditCompany.dialogVisible(
          0,
          "添加新公司",
          true,
          node.data.id
        );
      } else {
        this.treenode = node.parent;
        this.$refs.EditCompany.dialogVisible(
          node.data.id,
          "编辑公司",
          true,
          node.data.pid
        );
      }
    },
    ////部门
    dialoDp(node, contrall) {
      let type = node.data.type;
      let unitid = node.data.unitid;
      let pId = node.data.id;
      if (type == 0) {
        unitid = node.data.id;
        pId = 0;
      }
      ///新增公司
      if (contrall === 0) {
        this.treenode = node;
        this.$refs.EdDepartmentVue.dialogVisible(
          0,
          "添加部门",
          true,
          pId,
          unitid
        );
      } else {
        this.treenode = node.parent;
        this.$refs.EdDepartmentVue.dialogVisible(
          node.data.id,
          "编辑部门",
          true,
          pId,
          unitid
        );
      }
    },
    ///打开节点
    expandedTreeNode() {
      if (this.treenode.expanded) {
        this.treenode.loaded = false;
        this.treenode.collapse();
        // 主动调用展开节点方法，重新查询该节点下的所有子节点
        this.treenode.expand();
      }
      this.form = this.$emit("tr-node-clicke", this.treenode);
    },
    expandedTreeNodeByKey(key) {
      var node = this.$refs.tree.getNode(key);
      if (node.expanded) {
        node.loaded = false;
        node.collapse();
        // 主动调用展开节点方法，重新查询该节点下的所有子节点
        node.expand();
      }
    },
    del(node) {
      this.treenode = node.parent;
      let unt = "单位";
      var url = "company/delete/" + node.data.id;
      ///组织
      if (node.data.type === 1) {
        url = "organization/delete/" + node.data.id;
        unt = "部门";
      }
      this.$confirm("此操作将永久删除该" + unt + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.common.$Delete(null, url).then(data => {
            let mssg =
              data.message == undefined || data.message == ""
                ? "成功!"
                : data.message;

            this.common.$mxAlert(mssg, "success");
            this.expandedTreeNode();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
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
