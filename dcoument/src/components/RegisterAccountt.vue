<template>
  <div class="edit_company">
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
        <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confirmPwd"
        >
          <el-input
            v-model="form.confirmPwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          type="danger"
          plain
          size="small"
          >取 消</el-button
        >
        <el-button type="warning" plain @click="submitForm()" size="small"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "edit-company",
  data() {
    var checkAccount = (rule, value, callback) => {
      value = this.form.account;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入账号"));
      } else {
        if (value.length > 10) {
          return callback(new Error("中文名不大于10字符"));
        } else {
          var regex = new RegExp("^([a-zA-Z0-9]){1,20}$"); //包含“-”
          if (!regex.test(value)) {
            return callback(new Error("请输入英文字符、数字组成的账号"));
          } else {
            callback();
          }
        }
      }
    };
    var checkPassword = (rule, value, callback) => {
      value = this.form.password;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入密码"));
      } else {
        if (value.length > 8) {
          return callback(new Error("密码不大于8字符"));
        } else {
          var regex = new RegExp("^([a-zA-Z0-9-@#$&]){1,20}$"); //包含“-”
          if (!regex.test(value)) {
            return callback(new Error("密码的安全性不够"));
          } else {
            callback();
          }
        }
      }
    };
    var checkconfirmPwd = (rule, value, callback) => {
      value = this.form.password;
      let cvalue = this.form.confirmPwd;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入确认密码"));
      } else {
        if (value.length > 8) {
          return callback(new Error("确认密码不大于8字符"));
        } else {
          if (value !== cvalue) {
            return callback(new Error("确认密码和密码不一致"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      form: {
        empid: 0,
        autoid: 0,
        name: "",
        account: "",
        password: "",
        email: "",
        phone: "",
        enable: true,
        sequence: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date(),
        confirmPwd: ""
      },
      formLabelWidth: "120px",
      err: "",
      title: "", ///标题
      dialogFormVisible: false,
      from_rules: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        confirmPwd: [
          { required: true, validator: checkconfirmPwd, trigger: "blur" }
        ]
      }
    };

    // eslint-disable-next-line no-unreachable
  },
  methods: {
    dialogVisible(title, dialogFormVisible, model) {
      this.form.empid = model.empid;
      this.form.phone = model.phone;
      this.form.email = model.email;
      this.form.sequence = model.sequence;
      this.form.name = model.cnname;
      this.InitData(model.empid);
      if (this.$refs["form"] != undefined) this.$refs["form"].resetFields();
      this.dialogFormVisible = dialogFormVisible;
      this.title = title;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let url = "account/add";
          if (this.form.autoid != 0) url = "account/update";
          this.form.sequence = parseFloat(this.form.sequence);
          if (this.form.account !== "admin")
            this.form.password = this.aes.encrypt(this.form.password);
          delete this.form.confirmPwd;
          this.common.$Post(this.form, url).then(data => {
            let mssg =
              data.message == undefined || data.message == ""
                ? "注册成功!"
                : data.message;

            this.common.$mxAlert(mssg, "success");
            this.dialogFormVisible = false;
          });
          if (this.form.account !== "admin")
            this.form.password = this.aes.decrypt(this.form.password);
        }
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    InitData(empid) {
      var url = "account/emp/" + empid;
      this.common.$Get(null, url).then(data => {
        if (data.body != null && data.body != "") {
          if (data.body.account !== "admin")
            data.body.password = this.aes.decrypt(data.body.password);
          this.form = data.body;
        }
      });
    }
  }
};
</script>
