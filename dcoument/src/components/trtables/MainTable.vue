<template>
  <div class="row">
    <div class="col">
      <div>
        <ul class="list-group  list-group-flush">
          <li class="list-group-item text-alg">
            <el-button-group v-if="visablePage">
              <el-button
                type="primary"
                icon="el-icon-folder-add"
                @click="editfolder"
                >新建文件夹</el-button
              >
              <el-tooltip
                placement="bottom-end"
                effect="light"
                v-if="visablefilebtn"
              >
                <div slot="content">
                  <el-link
                    class="el-link-m3"
                    type="danger"
                    :underline="false"
                    plain
                    @click="edtifile(0, 'pptx')"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-PPT"></use>
                    </svg>
                    PPT </el-link
                  ><br />
                  <el-link
                    class="el-link-m3"
                    type="success"
                    :underline="false"
                    plain
                    @click="edtifile(0, 'xlsx')"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-ECEL"></use>
                    </svg>
                    EXCEL</el-link
                  ><br />
                  <el-link
                    class="el-link-m3"
                    type="primary"
                    :underline="false"
                    plain
                    @click="edtifile(0, 'docx')"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-WORD"></use>
                    </svg>
                    WORD</el-link
                  >
                </div>
                <el-button type="primary" icon="el-icon-document-add"
                  >新建文件</el-button
                >
              </el-tooltip>
            </el-button-group>
          </li>
          <li class="list-group-item text-alg">
            <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              v-loading="loading"
            >
              <el-table-column prop="cnname" label="文件名">
                <template slot-scope="scope">
                  <el-link
                    icon="el-icon-folder"
                    :underline="false"
                    v-if="scope.row.filetype == 3"
                    type="warning"
                    @click="linkData(scope.row)"
                    >{{ scope.row.cnname }}</el-link
                  >
                  <el-link
                    :underline="false"
                    v-if="scope.row.filetype != 3"
                    :type="
                      scope.row.filetype == 2
                        ? 'danger'
                        : scope.row.filetype == 1
                        ? 'success'
                        : 'primary'
                    "
                    @click="linkData(scope.row)"
                  >
                    <svg
                      class="icon"
                      aria-hidden="true"
                      v-if="scope.row.filetype == 1"
                    >
                      <use xlink:href="#icon-ECEL"></use>
                    </svg>
                    <svg
                      class="icon"
                      aria-hidden="true"
                      v-if="scope.row.filetype == 2"
                    >
                      <use xlink:href="#icon-PPT"></use>
                    </svg>
                    <svg
                      class="icon"
                      aria-hidden="true"
                      v-if="scope.row.filetype == 0"
                    >
                      <use xlink:href="#icon-WORD"></use>
                    </svg>
                    <svg
                      class="icon"
                      aria-hidden="true"
                      v-if="scope.row.filetype > 2"
                    >
                      <use xlink:href="#icon-TET"></use>
                    </svg>
                    {{ scope.row.cnname }}</el-link
                  >
                  <el-tooltip placement="right-start" effect="light">
                    <div slot="content">
                      <el-link
                        class="el-link-m3"
                        type="primary"
                        :underline="false"
                        icon="el-icon-edit"
                        plain
                        @click="edit(scope.row)"
                        >编辑</el-link
                      ><br />
                      <el-link
                        class="el-link-m3"
                        type="primary"
                        :underline="false"
                        icon="el-icon-view"
                        plain
                        v-if="scope.row.filetype != 3"
                        @click="viewDocmnet(scope.row)"
                      >
                        在线查看</el-link
                      ><br v-if="scope.row.filetype != 3" />
                      <el-link
                        class="el-link-m3"
                        type="primary"
                        :underline="false"
                        icon="el-icon-edit"
                        plain
                        v-if="scope.row.filetype != 3"
                        @click="editDocmnet(scope.row)"
                        >在线编辑</el-link
                      ><br v-if="scope.row.filetype != 3" />
                      <el-link
                        class="el-link-m3"
                        type="primary"
                        :underline="false"
                        icon="el-icon-download"
                        plain
                        v-if="scope.row.filetype != 3"
                        @click="downloaddoc(scope.row)"
                        >下载文件</el-link
                      ><br v-if="scope.row.filetype != 3" />
                      <el-link
                        class="el-link-m3"
                        type="primary"
                        :underline="false"
                        icon="el-icon-delete"
                        plain
                        @click="deldata(scope.row)"
                        >删除</el-link
                      ><br />
                    </div>
                    <el-button
                      :type="
                        scope.row.filetype == 3
                          ? 'warning'
                          : scope.row.filetype == 2
                          ? 'danger'
                          : scope.row.filetype == 1
                          ? 'success'
                          : 'primary'
                      "
                      size="mini"
                      icon="el-icon-more"
                      round
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="enname" label="文件英文名">
                <template slot-scope="scope">
                  <el-link
                    :underline="false"
                    :type="
                      scope.row.filetype == 3
                        ? 'warning'
                        : scope.row.filetype == 2
                        ? 'danger'
                        : scope.row.filetype == 1
                        ? 'success'
                        : 'primary'
                    "
                    >{{ scope.row.enname }}</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column prop="dic_filetype" label="文件类型" width="80">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      size="medium"
                      type="success"
                      v-if="scope.row.filetype == 1"
                      >{{ scope.row.dic_filetype }}</el-tag
                    >
                    <el-tag size="medium" v-if="scope.row.filetype == 0">{{
                      scope.row.dic_filetype
                    }}</el-tag>
                    <el-tag
                      size="medium"
                      type="danger"
                      v-if="scope.row.filetype == 2"
                      >{{ scope.row.dic_filetype }}</el-tag
                    >
                    <el-tag
                      size="medium"
                      type="warning"
                      v-if="scope.row.filetype == 3"
                      >{{ scope.row.dic_filetype }}</el-tag
                    >
                  </div>
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
                    <el-tag
                      size="medium"
                      type="warning"
                      v-if="scope.row.orgtype == 2"
                      >{{ scope.row.dic_orgtype }}</el-tag
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="ext" label="后缀名" width="80">
              </el-table-column>
              <el-table-column prop="size" label="文件大小" width="80">
              </el-table-column>
              <el-table-column
                prop="currentVersion"
                label="当前版本"
                width="80"
              ></el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
    </div>
    <ed-folder-vue ref="EdFolderVue" @ref-folder="rffolder"></ed-folder-vue>
    <ed-files-vue ref="EdFilesVue" @ref-folder="rffolder"></ed-files-vue>
  </div>
</template>
<script>
import EdFilesVue from "../EdFiles.vue";
import EdFolderVue from "../EdFolder.vue";

export default {
  data() {
    return {
      tableData: [],
      visablefilebtn: true,
      orgtype: 0,
      orgid: 0,
      path: "",
      pid: 0,
      id: 0,
      visablePage: false,
      loading: true
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
    loadData(visablefilebtn, orgtype, orgid, path, pid, id) {
      this.visablefilebtn = visablefilebtn;
      this.orgtype = orgtype;
      this.orgid = orgid;
      this.path = path;
      this.pid = pid;
      this.id = id;
      this.visablePage = true;
      this.InitBind();
      this.loading = false;
    },
    rffolder() {
      this.loadData(
        this.visablefilebtn,
        this.orgtype,
        this.orgid,
        this.path,
        this.pid,
        this.id
      );
    },
    edit(row) {
      if (row.filetype === 3) {
        this.id = row.id;
        this.editfolder();
      } else {
        this.edtifile(row.id, "");
      }
    },
    editfolder() {
      let title = "创建文件夹";
      if (this.id !== 0) {
        title = "编辑文件夹信息";
      }
      ///新增文件夹
      this.$refs.EdFolderVue.dialogVisible(
        this.id,
        title,
        true,
        this.pid,
        this.orgid,
        this.orgtype,
        this.path
      );
    },
    edtifile(id, ext) {
      let title = "添加文件";
      if (id !== 0) {
        title = "编辑文件信息";
      }
      this.$refs.EdFilesVue.dialogVisible(
        id,
        title,
        true,
        this.orgtype,
        this.pid,
        ext
      );
    },
    InitBind() {
      let url =
        "folder/floders?orgid=" +
        this.orgid +
        "&type=" +
        this.orgtype +
        "&pid=" +
        this.pid;
      this.common.$Get(null, url).then(data => {
        this.tableData = data.body;
      });
    },
    linkData(data) {
      if (data.filetype === 3) {
        this.loadData(true, data.orgtype, data.orgid, data.path, data.id, 0);
      } else {
        window.open("/docedit?fileid=" + data.id + "&ctype=2&systemType=0");
      }
    },
    deldata(data) {
      let url = "file/delete/" + data.id;
      if (data.filetype === 3) {
        url = "folder/delete/" + data.id;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
            this.rffolder();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ///查看视图
    viewDocmnet(data) {
      window.open("/docedit?fileid=" + data.id + "&ctype=2&systemType=2");
    },
    ///查看视图
    editDocmnet(data) {
      window.open("/docedit?fileid=" + data.id + "&ctype=0&systemType=0");
    },
    downloaddoc(item) {
      window.location.href = item.fileurl;
    }
  },
  components: { EdFolderVue, EdFilesVue }
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
</style>
