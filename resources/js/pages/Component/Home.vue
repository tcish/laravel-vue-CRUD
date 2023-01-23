<template>
  <div class="main">
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7f7fd5;
  background: -webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}

a {
  font-size: 2rem;
  font-weight: bold;
}
</style>