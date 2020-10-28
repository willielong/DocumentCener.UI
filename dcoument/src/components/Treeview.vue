<template>
  <div class="tree">
    <EdFolderVue ref="EdFolderVue" @ref-folder="rffolder"></EdFolderVue>
    <ul class="list-group list-group-flush" >
      <li class="list-group-item" style="height:100%" id="list_group">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          @check-click="handleCheckChange"
          :expand-on-click-node="false"
          ref="tree"
          v-loading="loading"
          id="el-tree-files"
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
                  <div>
                    <el-link
                      :type="data.item"
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
        class: "class"
      },
      count: 1,
      loading: true
    };
  },
  components: {
    EdFolderVue
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
      this.common.$Get(null, url).then(data => {
        if (node.level === 0) {
          let res = new Object();
          res.data = data.body[0];
          this.form = this.$emit("tr-node-clicke", res);
        }
        this.loading = false;
        if ($("#list_group") != undefined) {
          $("#list_group").height($(window).height() - 235);
        }
        return resolve(data.body);
      });
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
      let url = "employee/delete/" + node.data.id;
      let unt = "员工";
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
            this.appendComment();
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
}
</style>
