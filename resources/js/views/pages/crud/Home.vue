<template>
  <div class="main">
    <HeaderLink />

    <Table stripe border height="auto" :columns="columns" :data="data">
      <template #action="{ row }">
        <router-link :to="'/dashboard/edit/' + row.id">
          <Button type="primary" size="small" style="margin-right: 5px"
            >Edit</Button
          >
        </router-link>
        <Button type="error" size="small" @click="remove(row.id)"
          >Delete</Button
        >
      </template>
    </Table>
  </div>
</template>
<script>
import axios from "axios";
import HeaderLink from "../Component/HeaderLink.vue";

export default {
  components: {
    HeaderLink,
  },

  data() {
    return {
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "Name",
          key: "name",
          align: "center",
        },
        {
          title: "Email",
          key: "email",
          align: "center",
        },
        {
          title: "Address",
          key: "address",
          align: "center",
        },
        {
          title: "Action",
          slot: "action",
          align: "center",
        },
      ],

      data: null,
    };
  },

  methods: {
    async getData() {
      await axios
        .get("/api/crud")
        .then((response) => {
          this.data = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.status == "fail") {
            this.$Message.error(error.response.data.message);
          }
        });
    },

    async remove(id) {
      console.log(id);
      await axios
        .delete(`/api/crud/${id}`)
        .then((response) => {
          if (response.data.status == "success") {
            this.$Message.success("Deleted Successfully");
            this.getData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
.main {
  margin: 0 3rem;
}
</style>
