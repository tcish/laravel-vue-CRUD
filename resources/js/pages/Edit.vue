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
import HeaderLink from "./component/HeaderLink.vue";

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
    getOneData() {
      const id = this.$route.params.id;
      axios
        .get(`/api/crud/${id}`)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const id = this.$route.params.id;
          axios
            .put(`/api/crud/${id}`, this.form)
            .then(() => {
              this.$Message.success("Updated Successfully!");
              this.handleReset(form);
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

    handleReset(form) {
      this.$refs[form].resetFields();
    },
  },

  created() {
    this.getOneData();
  },
};
</script>
