<template>
  <div class="row">
    <div class="col">
      <div>
        <ul class="list-group  list-group-flush .list_group" id="list_group">
          <li class="list-group-item text-alg">
            <el-button
              type="warning"
              icon="el-icon-user-solid"
              @click="DialogAddPerson()"
              size="small"
              plain
              :disabled="visablePage"
              >添加人员信息</el-button
            >
          </li>
          <li class="list-group-item text-alg">
            <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              v-loading="loading"
            >
              <el-table-column prop="cnname" label="中文名" min-width="140">
                <template slot-scope="scope">
                  <el-link
                    icon="el-icon-user"
                    :underline="false"
                    type="warning"
                    >{{ scope.row.cnname }}</el-link
                  >
                  <el-tooltip placement="right-start" effect="light">
                    <div slot="content">
                      <el-link
                        class="el-link-m3"
                        type="warning"
                        :underline="false"
                        icon="el-icon-edit"
                        plain
                        @click="DialogAddPerson(scope.row)"
                        >编辑</el-link
                      ><br />
                      <el-link
                        class="el-link-m3"
                        type="warning"
                        :underline="false"
                        icon="el-icon-delete"
                        plain
                        @click="deldata(scope.row)"
                        >删除</el-link
                      ><br />
                    </div>
                    <el-button
                      type="warning"
                      size="mini"
                      icon="el-icon-more"
                      round
                      plain
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="enname" label="英文名" width="200">
                <template slot-scope="scope">
                  <el-link :underline="false" type="warning">{{
                    scope.row.enname
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="empcode" label="员工编码" width="120">
                <template slot-scope="scope">
                  <el-link :underline="false" type="warning">{{
                    scope.row.empcode
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="200">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-link
                      class="el-link-m3"
                      type="warning"
                      :underline="false"
                      plain
                      >{{ scope.row.email }}</el-link
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="联系电话" width="140">
              </el-table-column>
              <el-table-column prop="dic_OrgName" label="所属部门" width="140">
              </el-table-column>
              <el-table-column
                prop="dic_creator"
                label="创建人"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="dic_createdate"
                label="创建日期"
                width="140"
              ></el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
    </div>
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
  data() {
    return {
      tableData: [],
      pid: 0,
      visablePage: false,
      loading: false
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      let sty = "";
      if (rowIndex % 2 == 1) {
        sty = "warning-row";
      } else {
        sty = "success-row";
      }
      console.log(row);
      return sty;
    },
    loadData(pid) {
      this.loading = true;
      this.visablePage = pid == -1;
      this.pid = pid;
      this.InitBind();
      this.loading = false;
    },
    expandedTreeNode() {
      this.loadData(this.pid);
    },
    ///进行组织添加和修改
    DialogAddPerson(data) {
      let id = 0;
      if (data != null && data != undefined) id = data.empid;
      this.$refs.EdPersonVue.dialogVisible(
        id,
        id == 0 ? "添加人员信息" : "修改人员信息",
        true,
        this.pid
      );
    },
    InitBind() {
      let url = "employee/tables/ " + this.pid;
      this.common.$Get(null, url).then(data => {
        this.tableData = data.body;
        $(".el-table__body-wrapper").height($(window).height() - 338);
      });
    },
    deldata(data) {
      let url = "employee/delete/" + data.empid;
      this.$confirm("此操作将永久删除该人员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.common.$Delete(null, url).then(data => {
            let mssg =
              data.message == undefined || data.message == ""
                ? "删除该人员信息成功!"
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
  components: { EdPersonVue }
};
</script>
<style lang="stylus" scoped>
@import url('~@/assets/css/comm.css');
</style>
