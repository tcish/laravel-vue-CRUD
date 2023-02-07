import axios from "axios";
import Csrf from "./Csrf";

export default {
    async register(form) {
        await Csrf.getCookie();

        return (
            axios
                .post("/register", form)
                // .then((response) => {
                //     this.$Message.success("Inserted Successfully!");
                //     this.handleReset(formRefName);
                //     this.$router.push("/");
                // })
                .catch((error) => {
                    console.log(error.response);
                    // if (error.response.data.message) {
                    //     this.$Message.error(error.response.data.message);
                    // }
                })
        );

        // return Api.post("/register", form);
    },

    async login(form) {
        await Csrf.getCookie();

        return (
            axios
                .post("/login", form)
                // .then((response) => {
                //     this.$Message.success("Inserted Successfully!");
                //     this.handleReset(formRefName);
                //     this.$router.push("/");
                // })
                .catch((error) => {
                    console.log(error.response);
                    // if (error.response.data.message) {
                    //     this.$Message.error(error.response.data.message);
                    // }
                })
        );

        // return Api.post("/login", form);
    },

    async logout() {
        await Csrf.getCookie();

        return axios.post("/logout");
        // .then((response) => {
        //     this.$Message.success("Inserted Successfully!");
        //     this.handleReset(formRefName);
        //     this.$router.push("/");
        // })

        // return Api.post("/logout");
    },

    auth() {
        return axios.get("/api/user");
        // return Api.get("/user");
    },
};
