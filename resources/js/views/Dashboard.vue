<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
        <button type="submit" @click.prevent="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  data() {
    return {
      user: null,
    };
  },

  methods: {
    logout() {
      this.getCookie();

      return axios.post("/logout").then(() => {
        this.$root.$emit("login", false);
        localStorage.removeItem("auth");
        this.$router.push({ name: "Dashboard" });
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
  },

  mounted() {
    axios.get("/api/user").then((response) => {
      this.user = response.data;
    });
  },
};
</script>