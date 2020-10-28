<template>
  <div class="edit_files">
    <el-dialog
      :title="title"
      :visible="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        size="small"
        status-icon
        :rules="from_rules"
        class="demo-ruleForm"
        ref="form"
      >
        <el-form-item
          label="文件名称-zh"
          :label-width="formLabelWidth"
          prop="cnnme"
        >
          <el-input v-model="form.cnname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="文件名称-en"
          :label-width="formLabelWidth"
          prop="enname"
        >
          <el-input v-model="form.enname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          :label-width="formLabelWidth"
          prop="sequence"
        >
          <el-input v-model="form.sequence" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "edit-folder",
  data() {
    var checkCnname = (rule, value, callback) => {
      value = this.form.cnname;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入中文名"));
      } else {
        if (value.length > 100) {
          return callback(new Error("中文名不大于100字符"));
        } else {
          var regex = new RegExp(
            "^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){1,20}$"
          ); //包含“-”
          if (!regex.test(value)) {
            return callback(
              new Error("请输入汉字、英文字符、数字、组成的中文名称")
            );
          } else {
            callback();
          }
        }
      }
    };
    var checkEnname = (rule, value, callback) => {
      value = this.form.enname;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入英文名"));
      } else {
        if (value.length > 100) {
          return callback(new Error("英文名不大于100字符"));
        } else {
          var regex = new RegExp("^([a-zA-Z0-9 ]){1,20}$"); //包含“-”
          if (!regex.test(value)) {
            return callback(new Error("请输入英文字符、数字、组成的英文名称"));
          } else {
            callback();
          }
        }
      }
    };
    var checkSequence = (rule, value, callback) => {
      value = this.form.sequence;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入排序值"));
      } else {
        callback();
      }
    };
    return {
      form: {
        autoid: 0,
        folderid: 0,
        cnname: "",
        enname: "",
        ext: "",
        filetype: "",
        fileuri: "",
        filepath: "",
        path: "",
        folderpath: "",
        size: 0,
        currentVersion: 0,
        enable: true,
        sequence: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date()
      },
      codedisable: false,
      formLabelWidth: "120px",
      err: "",
      title: "", ///标题
      dialogFormVisible: false,
      from_rules: {
        cnnme: [{ required: true, validator: checkCnname, trigger: "blur" }],
        enname: [{ required: true, validator: checkEnname, trigger: "blur" }],
        sequence: [
          { required: true, validator: checkSequence, tigger: "blur" },
          {
            pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确格式,可保留两位小数"
          }
        ]
      }
    };

    // eslint-disable-next-line no-unreachable
  },
  methods: {
    dialogVisible(id, title, dialogFormVisible, orgtype, floderid, ext) {
      this.form.autoid = id;
      this.title = title;
      this.dialogFormVisible = dialogFormVisible;
      if (id !== 0) {
        this.InitData();
      } else {
        this.InitEmpty();
        this.form.folderid = floderid;
        this.form.filetype = orgtype;
        this.form.ext = ext;
      }
      if (this.$refs["form"]!= undefined)
        this.$refs["form"].resetFields();
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var url = "file/add";
          if (this.form.autoid !== 0) {
            url = "file/update";
          }
          this.form.sequence = parseFloat(this.form.sequence);
          this.common.$Post(this.form, url).then(data => {
            let mssg =
              data.message == undefined || data.message == ""
                ? "成功!"
                : data.message;

            this.common.$mxAlert(mssg, "success");
            this.dialogFormVisible = false;
            this.form = this.$emit("ref-folder");
          });
        }
      });
    },
    InitData() {
      this.codedisable = true;
      var url = "file/query/" + this.form.autoid;
      this.common.$Get(null, url).then(data => {
        this.form = data.body;
      });
    },
    InitEmpty() {
      this.form = {
        autoid: 0,
        folderid: 0,
        cnname: "",
        enname: "",
        ext: "",
        filetype: "",
        fileuri: "",
        filepath: "",
        path: "",
        folderpath: "",
        size: 0,
        currentVersion: 0,
        enable: true,
        sequence: 0,
        orgid: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date()
      };
      this.codedisable = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
