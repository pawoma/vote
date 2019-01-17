<template>
  <div class="list-item">
    <img :src="item.pic" alt>
    <div class="btn-box">
      <span class="detail-btn" @click="detail">详情</span>
      <span class="vote-btn" :class="{'selected':item.selected}" @click="vote">{{item.selected?'已投':'投票'}}</span>
    </div>
    <div class="vote-num">{{item.Count}}票</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {};
  },
  computed: {
    selectedVoteList() {
      return this.$store.state.selectedVoteList;
    }
  },
  methods: {
    detail() {
      this.$emit("on-detail", this.item);
    },
    vote() {
      if (this.selectedVoteList.length >= 10 && !this.item.selected) {
        return;
      }
      this.item.selected = !this.item.selected;
      this.$emit("on-vote", this.item);
    }
  }
};
</script>

<style scoped lang="less">
.list-item {
  width: 45%;
  margin-bottom: 40px;
  position: relative;

  .vote-num {
    text-align: center;
    padding: 5px 0;
    color: rgb(21, 125, 203);
  }
  .btn-box {
    display: flex;
    justify-content: space-between;
    width: 100%;

    span {
      width: 50px;
      line-height: 22px;
      border-radius: 5px;
      border: solid 1px #0071bb;
      font-size: 14px;
      text-align: center;
    }
    .selected {
      background: #949494;
    }
  }
  img {
    width: 100%;
  }
  .item-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 3px 8px;
    text-align: center;
    background: rgba(0, 0, 0, 0.44);
    color: white;
    font-size: 14px;
  }
}
</style>
