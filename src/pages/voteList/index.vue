<template>
  <div class="wrap">
    <img :src="require('@/assets/top.jpg')" alt class="page-top">
    <div class="page-center">
      <div class="page-center-con">
        <notice-bar style="background:transparent" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="volume-o"/>

        <div class="message-box">
          <div class="topArea-else-data">
            <div class="item candidate_count">
              <span>候选对象</span>
              <b>25</b>
            </div>
            <div class="dot" style></div>
            <div class="item vote_num">
              <span>总投票数</span>
              <b>{{voteCount}}</b>
            </div>
            <div class="dot"></div>
            <div class="item p_num">
              <span>活动热度</span>
              <b>{{voteUser}}</b>
            </div>
          </div>
        </div>

        <div class="line"></div>
        <div class="part part1">
          <div class="part-title">河流篇</div>
          <div class="part-list">
            <list-item v-for="item in riverList" :key="item.id" :item="item" @on-vote="onSelected" @on-detail="onDetail"></list-item>
          </div>
          <img :src="require('../../assets/start.png')" class="star left" alt>
          <img :src="require('../../assets/start.png')" class="star right" alt>
        </div>
        <div class="part part1">
          <div class="part-title">湖泊篇</div>
          <div class="part-list">
            <list-item v-for="item in lakeList" :key="item.id" :item="item" @on-vote="onSelected" @on-detail="onDetail"></list-item>
          </div>
          <img :src="require('../../assets/start.png')" class="star left" alt>
          <img :src="require('../../assets/start.png')" class="star right" alt>
        </div>
      </div>
    </div>

    <div class="bottom-fixed-propmt">
      <div class="selected-box">已选择 ( {{selectedVoteList.length}} / 10 )</div>
      <div class="submit-btn" @click="submit">提交</div>
    </div>

    <div class="detail-wrap" v-if="visibleDetail">
      <img :src="detailImg" style="width:100%;height:100%;" alt>
      <div class="vote-num">{{voteDetail.Count}}</div>
      <div class="rank-num">{{voteDetail.Order}}</div>
      <div class="back" @click="backVotePage">返回</div>
    </div>
  </div>
</template>

<script>
import ListItem from "./listItem";

import { voteList } from "./config";
import { cloneDeep } from "@/utils";
import { getVoteList, postVote } from "@/services";

import NoticeBar from "vant/lib/notice-bar";
import Toast from "vant/lib/toast";
import "vant/lib/notice-bar/style";
import "vant/lib/toast/style";

export default {
  components: {
    ListItem,
    NoticeBar
  },
  data() {
    return {
      list: [],
      voteCount: 0,
      voteUser: 0,
      detailImg: "",
      voteDetail: {},
      visibleDetail: false
    };
  },
  computed: {
    selectedVoteList() {
      return this.$store.state.selectedVoteList;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    riverList() {
      return this.list.filter(item => item.type === 1);
    },
    lakeList() {
      return this.list.filter(item => item.type === 2);
    }
  },
  methods: {
    onSelected(item) {
      if (item.selected) {
        this.$store.commit("SELECTE_VOTE", item);
      } else {
        this.$store.commit("REMOVE_VOTE", item);
      }
    },
    onDetail(data) {
      this.voteDetail = data;
      this.detailImg = require(`@/assets/vote-detail/${data.No}.jpg`);
      this.visibleDetail = true;
    },
    backVotePage() {
      this.visibleDetail = false;
    },
    loadData() {
      this.$store.commit("CLEAR_SELECTED");
      const { openid, nickname, headimgurl } = this.userInfo;
      let params = {
        OpenID: openid,
        NickName: nickname,
        HeadImg: headimgurl
      };
      getVoteList(params).then(res => {
        let rows = res.Table;
        let stat = res.Table1[0];

        this.voteCount = stat.VoteCount; //总投票数
        this.voteUser = stat.VoteUser; //热度
        this.voteUser = stat.VoteUser; //热度

        this.$store.commit("UPDATE_LEVEL", stat.Level);
        this.$store.commit("UPDATE_IS_LOGIN", !!stat.Name);

        let _list = cloneDeep(voteList);

        rows.forEach((item, index) => {
          _list[index] = Object.assign(_list[index], item);
        });

        this.list = _list;

        this.wxshare();
      });
    },
    wxshare() {
      PlusNums("ShuiLi.S.190115");
      Share(
        "选样板河湖赢新年红包",
        "http://web.v-ishare.com/ShuiLi.S.190115/index.html",
        "http://web.v-ishare.com/ShuiLi.S.190115/icon.jpg",
        "选样板河湖赢新年红包",
        "ShuiLi.S.190115",
        this.userInfo.openid
      );
    },
    submit() {
      // this.doSubmit()
      if (this.selectedVoteList.length === 10) {
        this.doSubmit();
      } else {
        Toast("请选择十个选项投票");
      }
    },
    doSubmit() {
      const voteIds = this.selectedVoteList.map(item => item.ID).join(",");
      const { openid } = this.userInfo;
      // let params = { OpenID: openid, VoteIDList: "1,2,3,4,5,6,7,8,10,9" };
      let params = { OpenID: openid, VoteIDList: "," + voteIds + "," };

      postVote(params).then(res => {
        let Status = res[0].Status;
        if (Status) {
          //投票成功，跳转抽奖
          // flag = true;
          this.$router.push("/lottery");
        } else {
          Toast("您的投票次数已经用完！");
        }
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less">
.detail-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  .vote-num {
    position: absolute;
    left: 22%;
    top: 37%;
    font-weight: bold;
  }
  .rank-num {
    position: absolute;
    left: 50%;
    top: 37%;
    font-weight: bold;
  }
  .back {
    position: absolute;
    border-radius: 5px;
    background: #0071bb;
    padding: 3px 8px;
    letter-spacing: 8px;
    right: 8%;
    top: 2%;
    color: white;
    font-size: 14px;
  }
}

.topArea-else-data {
  margin: 0 auto;
  width: 100%;
  padding: 0 4%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.06rem;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  margin-top: 19px;
  padding: 10px 0;
  width: 90%;

  .item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    b {
      margin-top: 3px;
      font-size: 16px;
      color: rgb(21, 125, 203);
    }
  }
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgb(21, 125, 203);
  }
}
.bottom-fixed-propmt {
  position: fixed;
  bottom: 60px;
  left: 0;
  width: 100%;

  .selected-box {
    width: 160px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.68);
    color: #fff;
    text-align: center;
    position: absolute;
    top: -50px;
    left: 50%;
    margin-left: -80px;
    padding: 7px 0;
  }

  .submit-btn {
    position: absolute;
    right: 0px;
    top: -40px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 40px 0 0 0;
    background: #0087ff;
    color: #fff;
    background-color: rgb(21, 125, 203);
  }
}
.wrap {
  background: url(../../assets/bg.jpg) no-repeat center top;
  background-size: 100% 100%;
  padding-bottom: 120px;

  .page-top {
    width: 100%;
  }
  .page-center {
    min-height: 1000px;
    background: url(../../assets/bg.jpg) no-repeat center top;
    background-size: 100% 100%;
    padding: 10px;
  }

  .page-center-con {
    border: solid 2px #0071bb;
    border-radius: 10px;
    background: #e4e4e4;
  }

  .part {
    position: relative;
    border-bottom: solid 2px #0071bb;
    margin-top: 60px;
    .star {
      position: absolute;
      left: -3%;
      bottom: -2%;
      width: 23%;
    }
    .right {
      right: -3%;
      left: inherit;
    }
    .part-title {
      text-align: center;
      font-size: 20px;
      color: #000;
      padding: 5px 0;
      letter-spacing: 4px;
    }
    .part-list {
      display: flex;
      padding: 10px;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
