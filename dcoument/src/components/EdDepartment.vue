<template>
  <div class="edit_organization">
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
          label="上级部门"
          :label-width="formLabelWidth"
          style="display:none"
        >
          <el-input v-model="form.parentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="部门名称-zh"
          :label-width="formLabelWidth"
          prop="cnnme"
        >
          <el-input v-model="form.cnname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="部门名称-en"
          :label-width="formLabelWidth"
          prop="enname"
        >
          <el-input v-model="form.enname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="部门编码"
          :label-width="formLabelWidth"
          prop="orgcode"
        >
          <el-input
            v-model="form.orgcode"
            autocomplete="off"
            :disabled="codedisable"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门领导"
          :label-width="formLabelWidth"
          prop="head"
        >
          <el-input v-model="form.head" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="部门领导（副）"
          :label-width="formLabelWidth"
          prop="c_head"
        >
          <el-input v-model="form.c_head" autocomplete="off"></el-input>
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
        <el-button @click="dialogFormVisible = false" type="danger" size="small"
          >取 消</el-button
        >
        <el-button type="success" @click="submitForm()" size="small"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "edit-organization",
  data() {
    var checkCnname = (rule, value, callback) => {
      value = this.form.cnname;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入中文名"));
      } else {
        if (value.length > 20) {
          return callback(new Error("中文名不大于20字符"));
        } else {
          var regex = new RegExp(
            "^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9-]){1,20}$"
          ); //包含“-”
          if (!regex.test(value)) {
            return callback(
              new Error("请输入汉字、英文字符、数字、-、组成的中文名称")
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
          var regex = new RegExp("^([a-zA-Z0-9- ]){1,20}$"); //包含“-”
          if (!regex.test(value)) {
            return callback(
              new Error("请输入英文字符、数字、-、组成的英文名称")
            );
          } else {
            callback();
          }
        }
      }
    };
    var checkorgcode = (rule, value, callback) => {
      value = this.form.orgcode;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入部门编码"));
      } else {
        if (value.length > 20) {
          return callback(new Error("部门编码不大于20字符"));
        } else {
          var regex = new RegExp("^([a-zA-Z0-9]){1,20}$"); //包含“-”
          if (!regex.test(value)) {
            return callback(new Error("请输入英文字符、数字组成的部门编码"));
          } else {
            if (this.form.orgid === 0) {
              this.common
                .$Get(null, "organization/getlist/" + value)
                .then(res => {
                  if (res.body.length > 0) {
                    return callback(new Error("已存在相同的部门编码"));
                  } else {
                    callback();
                  }
                });
            } else {
              callback();
            }
          }
        }
      }
    };
    var checkHead = (rule, value, callback) => {
      value = this.form.head;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入部门领导"));
      } else {
        callback();
      }
    };
    var checkCHead = (rule, value, callback) => {
      value = this.form.c_head;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入部门领导(副)"));
      } else {
        callback();
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
        orgid: 0,
        untid: 0,
        parentId: "",
        cnname: "",
        enname: "",
        orgcode: "",
        head: "",
        c_head: "",
        enable: true,
        sequence: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date(),
        isvirorg: true,
        istree: true
      },
      codedisable: false,
      formLabelWidth: "120px",
      err: "",
      id: 0, ///公司ID
      title: "", ///标题
      dialogFormVisible: false,
      prId: 0,
      from_rules: {
        cnnme: [{ required: true, validator: checkCnname, trigger: "blur" }],
        enname: [{ required: true, validator: checkEnname, trigger: "blur" }],
        orgcode: [{ required: true, validator: checkorgcode, trigger: "blur" }],
        head: [{ required: true, validator: checkHead, trigger: "blur" }],
        c_head: [{ required: true, validator: checkCHead, trigger: "blur" }],
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
    dialogVisible(id, title, dialogFormVisible, prId, unitId) {
      this.id = id;
      this.title = title;
      this.dialogFormVisible = dialogFormVisible;
      if (id !== 0) {
        this.InitData();
      } else {
        this.InitEmpty();
      }
      this.form.untid = unitId;
      this.form.parentId = prId;
      if (this.$refs["form"] != undefined) this.$refs["form"].resetFields();
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var url = "organization/add";
          let type = "new";
          if (this.form.orgid !== 0) {
            url = "organization/update";
            type = "up";
          }
          this.form.parentId = parseInt(this.form.parentId);
          this.form.head = parseInt(this.form.head);
          this.form.sequence = parseFloat(this.form.sequence);
          this.common.$Post(this.form, url).then(data => {
            let mssg =
              data.message == undefined || data.message == ""
                ? "成功!"
                : data.message;

            this.common.$mxAlert(mssg, "success");
            this.dialogFormVisible = false;
            this.form = this.$emit("add-comment", type);
          });
        }
      });
    },
    InitData() {
      this.codedisable = true;
      var url = "organization/query/" + this.id;
      this.common.$Get(null, url).then(data => {
        this.form = data.body;
      });
    },
    InitEmpty() {
      this.form = {
        orgid: 0,
        untid: 0,
        parentId: "",
        cnname: "",
        enname: "",
        orgcode: "",
        head: "",
        c_head: "",
        enable: true,
        sequence: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date(),
        isvirorg: true,
        istree: true
      };
      this.codedisable = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
