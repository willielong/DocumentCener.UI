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
        <el-form-item
          label="姓名-zh"
          :label-width="formLabelWidth"
          prop="cnnme"
        >
          <el-input v-model="form.cnname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名-en"
          :label-width="formLabelWidth"
          prop="enname"
        >
          <el-input v-model="form.enname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="员工编码"
          :label-width="formLabelWidth"
          prop="empcode"
        >
          <el-input
            v-model="form.empcode"
            autocomplete="off"
            :disabled="empdocedisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="移动电话"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
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
  name: "edit-company",
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
    var checkEmpcode = (rule, value, callback) => {
      value = this.form.empcode;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入员工编码"));
      } else {
        if (value.length > 20) {
          return callback(new Error("员工编码不大于20字符"));
        } else {
          var regex = new RegExp("^([a-zA-Z0-9]){1,20}$"); //包含“-”
          if (!regex.test(value)) {
            return callback(new Error("请输入英文字符、数字组成的员工编码"));
          } else {
            callback();
          }
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      value = this.form.phone;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入电话号码"));
      } else {
        callback();
      }
    };
    var checkEmil = (rule, value, callback) => {
      value = this.form.email;
      if (value === undefined || value === "" || value === null) {
        return callback(new Error("请输入邮箱"));
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
        empid: 0,
        orgid: 0,
        cnname: "",
        enname: "",
        empcode: "",
        email: "",
        phone: "",
        enable: true,
        sequence: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date(),
      },
      formLabelWidth: "120px",
      err: "",
      id: 0, ///公司ID
      title: "", ///标题
      dialogFormVisible: false,
      prId: 0,
      empdocedisable: false,
      from_rules: {
        cnnme: [{ required: true, validator: checkCnname, trigger: "blur" }],
        enname: [{ required: true, validator: checkEnname, trigger: "blur" }],
        empcode: [{ required: true, validator: checkEmpcode, trigger: "blur" }],
        email: [{ required: true, validator: checkEmil, trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
          },],
        phone: [
          { required: true, validator: checkPhone, trigger: "blur" },
          {
            pattern: /^1[345789]\d{9}$/,
            message: "请输入正确的电话号码",
          },
        ],
        sequence: [
          { required: true, validator: checkSequence, tigger: "blur" },
          {
            pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确格式,可保留两位小数",
          },
        ],
      },
    };

    // eslint-disable-next-line no-unreachable
  },
  methods: {
    dialogVisible(id, title, dialogFormVisible, prId) {
      this.id = id;
      this.title = title;
      this.dialogFormVisible = dialogFormVisible;
      if (id !== 0) {
        this.InitData();
      } else {
        this.InitEmpty();
      }
      this.form.orgid = prId;
      this.$refs["form"].resetFields();
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var url = "employee/add";
          let type = "new";
          if (this.form.empid !== 0) {
            url = "employee/update";
            type = "up";
          }
          this.form.sequence = parseFloat(this.form.sequence);
          this.common.$Post(this.form, url).then((data) => {
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
      this.empdocedisable = true;
      var url = "employee/query/" + this.id;
      this.common.$Get(null, url).then((data) => {
        this.form = data.body;
      });
    },
    InitEmpty() {
      this.form = {
        empid: 0,
        orgid: 0,
        cnname: "",
        enname: "",
        empcode: "",
        email: "",
        phone: "",
        enable: true,
        sequence: 0,
        creator: 1,
        modifier: 1,
        creatdate: new Date(),
        modifdate: new Date(),
      };
       this.empdocedisable = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
