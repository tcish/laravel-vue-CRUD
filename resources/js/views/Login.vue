<template>
  <div class="main__container">
    <div style="width: 300px">
      <nav>
        <span>
          <router-link to="/">Login</router-link> |
          <router-link to="/register">Register</router-link>
        </span>
      </nav>
      <h1 style="text-align: center">Login</h1>
      <Form ref="login" :model="form" :rules="rule">
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
        <FormItem>
          <Button type="primary" @click="handleSubmit('login')">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      rule: {
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
      },
    };
  },
  methods: {
    handleSubmit(formRefName) {
      this.$refs[formRefName].validate((valid) => {
        if (valid) {
          this.getCookie();

          axios
            .post("/login", this.form)
            .then(() => {
              this.$root.$emit("login", true);
              localStorage.setItem("auth", "true");
              this.$router.push({ name: "Dashboard" });
              this.$refs[formRefName].resetFields();
            })
            .catch((error) => {
              console.log(error.response);
              if (error.response.data.message) {
                this.$Notice.error({
                  title: "Login Failed!",
                  desc: error.response.data.message,
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

      return axios.get("/sanctum/csrf-cookie");
    },
  },
};
</script>

<style scoped >
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