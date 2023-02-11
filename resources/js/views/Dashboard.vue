<template>
  <div class="app-admin-wrap-layout-2">
    <Header />
    <Sidebar />
    <div
      :class="
        store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen === true
          ? ''
          : 'full'
      "
      class="main-content-wrap"
    >
      <main>
        <div class="main-content-wrap flex flex-col print-area h-screen pt-16">
          <div class="flex-grow">
            <router-view />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import Header from "../views/pages/layout/Header.vue";
import Sidebar from "../views/pages/layout/Sidebar.vue";
import Footer from "../views/pages/layout/Footer.vue";

let store = useStore();
</script>

<style lang="scss" scoped>
.app-admin-wrap-layout-2 {
  width: 100%;
  // height: 100%;
  .main-content-wrap {
    width: calc(100% - 90px);
    margin-left: 70px;
    // min-height: 100vh;
    // margin-top: 30px;
    transition: all 0.24s ease-in-out;
    .main-content-body {
      min-height: calc(100vh - 80px);
    }
    &.full {
      width: 100%;
      margin-left: 0px;
      transition: all 0.24s ease-in-out;
    }
    @media screen and (max-width: 991px) {
      width: 100%;
      margin-left: 0px;
      padding-right: 16px;
      padding-left: 16px;
    }
  }
}
</style>