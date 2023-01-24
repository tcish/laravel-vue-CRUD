<template>
  <div>
    <HeaderLink />

    <div style="width: 400px; margin: 0 auto">
      <Form ref="form" :model="form" :rules="ruleValidate">
        <FormItem label="Name" prop="name">
          <Input v-model="form.name" placeholder="Enter your name"></Input>
        </FormItem>

        <FormItem label="E-mail" prop="email">
          <Input v-model="form.email" placeholder="Enter your e-mail"></Input>
        </FormItem>

        <FormItem label="Address" prop="address">
          <Input
            v-model="form.address"
            placeholder="Enter your address"
          ></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('form')">Submit</Button>
          <Button @click="handleReset('form')" style="margin-left: 8px"
            >Reset</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderLink from "./Component/HeaderLink.vue";

export default {
  components: {
    HeaderLink,
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        address: "",
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty!",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "E-mail cannot be empty!",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Incorrect email format!",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Address cannot be empty!",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    handleSubmit(formRefName) {
      this.$refs[formRefName].validate((valid) => {
        if (valid) {
          axios
            .post("/api/crud", this.form)
            .then((response) => {
              this.$Message.success("Inserted Successfully!");
              this.handleReset(formRefName);
              this.$router.push("/");
            })
            .catch((error) => {
              if (error.response.data.message) {
                this.$Message.error(error.response.data.message);
              }
            });
        } else {
          this.$Message.error("Please check all the inputs!");
        }
      });
    },

    handleReset(formRefName) {
      this.$refs[formRefName].resetFields();
    },
  },
};
</script>
