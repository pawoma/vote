<template>
  <div id="app">
    <router-view v-if="loaded"></router-view>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
/* eslint-disable */

import BottomMenu from "./components/bottomMenu";
import { getOpenID } from "@/services";

export default {
  name: "app",
  components: {
    BottomMenu
  },
  data() {
    return {
      loaded: false
    };
  },
  created() {
    if ($.cookie("userInfo")) {
      let userInfo = JSON.parse($.cookie("userInfo"));
      this.$store.commit("UPDATE_USERINFO", userInfo);
      this.loaded = true;
    } else {
      let params = {
        Code: GetQueryString("code")
      };
      getOpenID(params).then(userInfo => {
        this.$store.commit("UPDATE_USERINFO", userInfo);
        $.cookie("userInfo", JSON.stringify(userInfo));
        this.loaded = true;
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 100vw;
  min-height: 100vh;
}
</style>
