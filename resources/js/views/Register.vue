<template>
  <div class="main__container">
    <div style="width: 300px">
      <nav>
        <span>
          <router-link to="/">Login</router-link> |
          <router-link to="/register">Register</router-link>
        </span>
      </nav>

      <h1 style="text-align: center">Register</h1>
      <Form ref="register" :model="form" :rules="rule">
        <FormItem label="Name" prop="name" autocomplete="false">
          <Input v-model="form.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="Email" prop="email">
          <Input v-model="form.email" placeholder="Enter your email"></Input>
        </FormItem>
        <FormItem label="Password" prop="password">
          <Input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
          ></Input>
        </FormItem>
        <FormItem label="Confirm Password" prop="password_confirmation">
          <Input
            type="password"
            v-model="form.password_confirmation"
            placeholder="Confirm password"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('register')"
            >Submit</Button
          >
          <Button @click="handleReset('register')" style="margin-left: 8px"
            >Reset</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("Confirm passwords do not match!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },

      rule: {
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
        password: [
          {
            required: true,
            message: "Password cannot be empty!",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Password length must be at least 8!",
            trigger: "blur",
          },
        ],
        password_confirmation: [
          {
            required: true,
            message: "Confirm password cannot be empty!",
            trigger: "blur",
          },
          {
            min: 8,
            message: "Confirm password length must be at least 8!",
            trigger: "blur",
          },
          { validator: validatePassCheck, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    handleSubmit(formRefName) {
      this.$refs[formRefName].validate((valid) => {
        if (valid) {
          this.getCookie();

          return axios
            .post("/register", this.form)
            .then(() => {
              this.$Notice.success({
                title: "Registered Successfully",
              });
              this.handleReset(formRefName);
              this.$router.push({ name: "Login" });
            })
            .catch((error) => {
              console.log(error.response);
              if (error.response.data.message) {
                this.$Notice.error({
                  title: error.response.data.message,
                });
              }
            });
        }
      });
    },

    getCookie() {
      let token = Cookie.get("XSRF-TOKEN");

      if (token) {
        return new Promise((resolve) => {
          resolve(token);
        });
      }

      return axios.get("/csrf-cookie");
    },

    handleReset(formRefName) {
      this.$refs[formRefName].resetFields();
    },
  },
};
</script>

<style scoped>
.main__container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

nav {
  padding: 30px !important;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 1rem;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>