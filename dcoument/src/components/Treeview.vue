<template>
  <div class="tree">
    <EditCompany ref="EditCompany" @add-comment="appendComment"></EditCompany>
    <EdDepartmentVue
      ref="EdDepartmentVue"
      @add-comment="appendComment"
    ></EdDepartmentVue>
    <EdPersonVue ref="EdPersonVue" @add-comment="appendComment"></EdPersonVue>
    <EdFolderVue ref="EdFolderVue" @ref-folder="rffolder"></EdFolderVue>
    <ul class="list-group list-group-flush" id="list_group">
      <li class="list-group-item">
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
                  <div v-if="data.type == 1">
                    <el-link
                      type="warning"
                      :underline="false"
                      @click="dialoPeron(node, 0)"
                    >
                      <i class="el-icon-circle-plus m5"></i
                      >添加人员信息</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == -1">
                    <el-link
                      type="warning"
                      :underline="false"
                      @click="dialoPeron(node, 1)"
                    >
                      <i class="el-icon-edit m5"></i>编辑人员信息</el-link
                    ><br />
                  </div>
                  <div v-if="data.type == -1">
                    <el-link
                      type="danger"
                      :underline="false"
                      @click="del(node)"
                    >
                      <i class="el-icon-delete m5"></i>删除人员</el-link
                    ><br />
                  </div>
                  <div>
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="dialofolder(node)"
                    >
                      <i class="el-icon-folder-add m5"></i>添加文件夹</el-link
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
  </div>
</template>

<script>
import EditCompany from "@/components/EditCompay";
import EdDepartmentVue from "./EdDepartment.vue";
import EdPersonVue from "./EdPerson.vue";
import EdFolderVue from "./EdFolder.vue";
import $ from "jquery";
export default {
  cnode: null,
  data() {
    return {
      props: {
        label: "name",
        children: "children",
        type: "type",
        class: "class",
      },
      count: 1,
      loading: true,
    };
  },
  components: {
    EditCompany,
    EdDepartmentVue,
    EdPersonVue,
    EdFolderVue,
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
      let url = "tree?type=" + type + "&pid=" + pid;
      this.common.$Get(null, url).then((data) => {
        if (node.level === 0) {
          let res = new Object();
          res.data = data.body[0];
          this.form = this.$emit("tr-node-clicke", res);
        }
        this.loading = false;
        return resolve(data.body);
      });
    },
    ///弹出单位提示框
    dialo(node, contrall) {
      ///新增公司
      if (contrall === 0) {
        this.cnode = node;
        this.$refs.EditCompany.dialogVisible(
          0,
          "添加新公司",
          true,
          node.data.id
        );
      } else {
        this.cnode = node.parent;
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
        this.cnode = node;
        this.$refs.EdDepartmentVue.dialogVisible(
          0,
          "添加部门",
          true,
          pId,
          unitid
        );
      } else {
        this.cnode = node.parent;
        this.$refs.EdDepartmentVue.dialogVisible(
          node.data.id,
          "编辑部门",
          true,
          pId,
          unitid
        );
      }
    },
    ///人员
    dialoPeron(node, contrall) {
      ///新增公司
      if (contrall === 0) {
        this.cnode = node;
        this.$refs.EdPersonVue.dialogVisible(
          0,
          "添加人员信息",
          true,
          node.data.id
        );
      } else {
        this.cnode = node.parent;
        this.$refs.EdPersonVue.dialogVisible(
          node.data.id,
          "编辑人员信息",
          true,
          node.data.pid
        );
      }
    },

    dialofolder(node) {
      ///新增文件夹
      this.cnode = node;
      this.$refs.EdFolderVue.dialogVisible(
        0,
        "创建文件夹",
        true,
        0,
        node.data.id,
        node.data.type,
        ""
      );
    },
    appendComment(type) {
      if (this.cnode.expanded || type !== "new") {
        this.cnode.loaded = false;
        this.cnode.collapse();
        // 主动调用展开节点方法，重新查询该节点下的所有子节点
        this.cnode.expand();
      }
    },
    rffolder() {
      this.handleCheckChange(this.cnode);
    },
    del(node) {
      this.cnode = node.parent;
      let unt = "单位";
      var url = "company/delete/" + node.data.id;
      ///组织
      if (node.data.type === 1) {
        url = "organization/delete/" + node.data.id;
        unt = "部门";
      }
      ///人员
      else if (node.data.type === -1) {
        url = "employee/delete/" + node.data.id;
        unt = "员工";
      }
      this.$confirm("此操作将永久删除该" + unt + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.common.$Delete(null, url).then((data) => {
            let mssg =
              data.message == undefined || data.message == ""
                ? "成功!"
                : data.message;

            this.common.$mxAlert(mssg, "success");
            this.appendComment();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
$(function(){
  $("#list_group").height($(window).height()-290);
})
</script>
<style scoped>
.m5 {
  margin-right: 3px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 3px;
}
#list_group{
  border-right:1px solid #eeeeee;
}
</style>
