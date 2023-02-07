<template>
  <div class="main__container">
    <nav>
      <span>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </span>
    </nav>

    <h1 class="text-center">Login</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="password"
          />
        </div>
        <button @click.prevent="login" class="btn btn-primary btn-block">
          Login
        </button>
      </div>
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
    };
  },
  methods: {
    login() {
      this.getCookie();

      axios
        .post("/login", this.form)
        .then((response) => {
          this.$Message.success("Inserted Successfully!");
          // this.handleReset(formRefName);
          this.$root.$emit("login", true);
          localStorage.setItem("auth", "true");
          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          console.log(error.response);
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