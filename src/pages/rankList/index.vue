<template>
  <div class="rank-wrap">
    <img :src="require('@/assets/top.jpg')" alt class="page-top">
    <div class="page-center">
      <div class="page-center-con">
        <img :src="require('@/assets/rank-top.jpg')" style="display:block;width:90%;margin:10px auto" alt>
        <div class="first rank-item">
          <div class="title">{{beforeThree[0]&&beforeThree[0].Name}}</div>
          <div class="vote-num">{{beforeThree[0]&&beforeThree[0].Count}}票</div>
        </div>
        <div class="second rank-item">
          <div class="title">{{beforeThree[1]&&beforeThree[1].Name}}</div>
          <div class="vote-num">{{beforeThree[1]&&beforeThree[2].Count}}票</div>
        </div>
        <div class="third rank-item">
          <div class="title">{{beforeThree[2]&&beforeThree[2].Name}}</div>
          <div class="vote-num">{{beforeThree[2]&&beforeThree[2].Count}}票</div>
        </div>
        <div class="rank-list">
          <div class="list-item" v-for="(item,index) in afterList" :key="index">
            <div class="order">{{index+4}}</div>
            <div class="title">{{item.Name}}</div>
            <div class="vote-num">{{item.Count}}票</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankList } from "@/services";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    loadData() {
      getRankList().then(res => {
        this.list = res;
      });
    }
  },
  computed: {
    beforeThree() {
      return this.list.slice(0, 3);
    },
    afterList() {
      return this.list.slice(3);
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less">
.page-top {
  width: 100%;
  display: block;
}
.page-center {
  width: 100%;
  min-height: 1000px;
  background: url(../../assets/bg.jpg) no-repeat center top;
  background-size: 100% 100%;
  padding: 10px;
}

.page-center-con {
  border: solid 2px #0071bb;
  border-radius: 10px;
  background: #e4e4e4;
  padding: 10px;
  position: relative;
}

.rank-wrap {
  padding-bottom: 60px;

  .rank-list {
    margin-top: 100px;
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .order {
        width: 70px;
        text-align: center;
        color: white;
        background: #1b69af;
        line-height: 27px;
        font-size: 16px;
      }
      .title {
        font-size: 16px;
        width: 42%;
      }
      .vote-num {
        color: #0087ff;
        font-size: 14px;
      }
    }
  }
  .rank-item {
    position: absolute;
    text-align: center;
    width: 100%;
    .title {
      font-size: 16px;
    }
    .vote-num {
      font-size: 14px;
      color: #0087ff;
    }
  }
  .first {
    left: 0;
    top: 10%;
  }
  .second {
    left: 0;
    top: 19%;
    width: 50%;
  }
  .third {
    right: 0;
    top: 19%;
    width: 50%;
  }
}
</style>
