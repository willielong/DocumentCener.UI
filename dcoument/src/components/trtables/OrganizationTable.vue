<template>
  <div class="row">
    <div class="col">
      <div>
        <ul class="list-group  list-group-flush .list_group" id="list_group">
          <li class="list-group-item text-alg">
            <el-button-group v-if="visablePage">
              <el-button
                type="primary"
                icon="el-icon-s-home"
                @click="DialogAddOrganization(0)"
                size="small"
                v-if="visableUnit"
                >添加单位</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-school"
                @click="DialogAddOrganization(1)"
                size="small"
                >添加部门</el-button
              >
            </el-button-group>
          </li>
          <li class="list-group-item text-alg">
            <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              v-loading="loading"
            >
              <el-table-column prop="cnname" label="中文名">
                <template slot-scope="scope">
                  <el-link
                    :icon="
                      scope.row.orgtype == 0
                        ? 'el-icon-s-home'
                        : 'el-icon-school'
                    "
                    :underline="false"
                    :type="scope.row.orgtype == 0 ? 'primary' : 'success'"
                    @click="linkData(scope.row)"
                    >{{ scope.row.cnname }}</el-link
                  >
                  <el-tooltip placement="right-start" effect="light">
                    <div slot="content">
                      <el-link
                        class="el-link-m3"
                        :type="scope.row.orgtype == 0 ? 'primary' : 'success'"
                        :underline="false"
                        icon="el-icon-edit"
                        plain
                        @click="DialogOrganization(scope.row)"
                        >编辑</el-link
                      ><br />
                      <el-link
                        class="el-link-m3"
                        :type="scope.row.orgtype == 0 ? 'primary' : 'success'"
                        :underline="false"
                        icon="el-icon-delete"
                        plain
                        @click="deldata(scope.row)"
                        >删除</el-link
                      ><br />
                    </div>
                    <el-button
                      :type="scope.row.orgtype == 0 ? 'primary' : 'success'"
                      size="mini"
                      icon="el-icon-more"
                      round
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="enname" label="英文名">
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    :type="scope.row.orgtype == 0 ? 'primary' : 'success'"
                    >{{ scope.row.enname }}</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column prop="orgcode" label="组织编码" width="80">
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    :type="scope.row.orgtype == 0 ? 'primary' : 'success'"
                    >{{ scope.row.orgcode }}</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column prop="dic_orgtype" label="部门类型" width="80">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      size="medium"
                      type="success"
                      v-if="scope.row.orgtype == 1"
                      >{{ scope.row.dic_orgtype }}</el-tag
                    >
                    <el-tag size="medium" v-if="scope.row.orgtype == 0">{{
                      scope.row.dic_orgtype
                    }}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="dic_head" label="领导" width="80">
              </el-table-column>
              <el-table-column prop="dic_c_head" label="分管领导" width="80">
              </el-table-column>
              <el-table-column
                prop="dic_creator"
                label="创建人"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="dic_createdate"
                label="创建日期"
                width="80"
              ></el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
    </div>
    <ed-department-vue
      @add-comment="expandedTreeNode"
      ref="EdDepartmentVue"
    ></ed-department-vue>
    <edit-compay-vue
      @add-comment="expandedTreeNode"
      ref="EditCompayVue"
    ></edit-compay-vue>
  </div>
</template>
<script>
import EdDepartmentVue from "../EdDepartment.vue";
import EditCompayVue from "../EditCompay.vue";
export default {
  data() {
    return {
      tableData: [],
      orgtype: 0,
      unitid: 0,
      pid: 0,
      id: 0,
      visablePage: false,
      loading: true,
      visableUnit: true
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      console.log(row);
      return "";
    },
    loadData(orgtype, id, unitid) {
      this.orgtype = orgtype;
      this.id = id;
      this.unitid = unitid;
      this.visablePage = true;
      this.InitBind();
      this.loading = false;
      this.visableUnit = orgtype == 0 ? true : false;
    },
    expandedTreeNode() {
      this.loadData(this.orgtype, this.id, this.unitid);
    },
    DialogAddOrganization(type) {
      let data = new Object();
      data.id = 0;
      data.orgtype = type;
      data.parentid=this.id;
      if (this.orgtype == 0 && type == 1) {
        data.parentid = 0;
      }
      this.DialogOrganization(data);
    },
    ///进行组织添加和修改
    DialogOrganization(data) {
      if (data.orgtype === 1) {
        this.$refs.EdDepartmentVue.dialogVisible(
          data.id,
          data.id == 0 ? "添加部门" : "修改部门信息",
          true,
          data.parentid,
          this.unitid
        );
      } else {
        this.$refs.EditCompayVue.dialogVisible(
          data.id,
          data.id == 0 ? "添加公司" : "修改公司信息",
          true,
          this.id
        );
      }
    },
    InitBind() {
      let url = "company/tables?pid=" + this.id;
      if (this.orgtype === 1) url = "organization/tables?pid=" + this.id;
      this.common.$Get(null, url).then(data => {
        this.tableData = data.body;
      });
    },
    linkData(data) {
      this.loadData(data.orgtype, data.id, data.unitid);
    },
    deldata(data) {
      let url = "company/delete/" + data.id;
      if (data.orgtype === 1) {
        url = "organization/delete/" + data.id;
      }
      this.$confirm("此操作将永久删除组织, 是否继续?", "提示", {
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
  },
  components: { EdDepartmentVue, EditCompayVue }
};
</script>
<style scoped>
.text-alg {
  text-align: left;
  padding-left: 0px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 0.4px 6px;
  margin-left: 5px;
  margin-bottom: -5px;
}
.el-link-m3 {
  margin-top: 3px;
  margin-bottom: 3px;
}
.icon {
  width: 1.1em;
  height: 1.1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.list_group {
  border-right: 1px solid #eeeeee;
}
</style>
