<template>
  <div class="menu">
    <div class="tab">
      <div class="tab-item" @click="vote">
        <img class="icon" :src="require('../assets/vote-icon.png')" alt>
      </div>
      <div class="tab-item" @click="guide">
        <img class="icon" :src="require('../assets/guide-icon.png')" alt>
      </div>
      <div class="tab-item" @click="rank">
        <img class="icon" :src="require('../assets/rank-icon.png')" alt>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      curTabName: "vote"
    };
  },
  methods: {
    vote() {
      this.$router.push("vote");
    },
    guide() {
      this.$router.push("guide");
    },
    rank() {
      this.$router.push("rank");
    }
  }
};
</script>

<style scoped lang="less">
.menu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;

  .tab {
    height: 100%;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ccc;
    height: 100%;
    color: #a2abc7;
    display: flex;
    .tab-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 16px;
      color: #3c3c3c;

      .icon {
        width: 40%;
      }
    }
  }

}
</style>
