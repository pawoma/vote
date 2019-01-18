<template>
  <div class="lottery-wrap">
    <img class="bg" :src="require('@/assets/lottery-bg.jpg')" alt>
    <img :src="prizeImg" class="prize" v-if="isLotteryed" alt>
    <div class="btn-box" v-if="isLotteryed">
      <span v-if="level===0" @click="backPage">
        <img :src="require('@/assets/red-back.png')" alt>
      </span>
      <span v-if="level==1" @click="sign">
        <img :src="require('@/assets/get-btn.png')" alt>
      </span>
      <span v-if="level==2" @click="sign">
        <img :src="require('@/assets/get-btn.png')" alt>
      </span>
      <span v-if="level===3" @click="wxGet">
        <img :src="require('@/assets/wx-get.png')" alt>
      </span>
    </div>

    <van-dialog v-model="showSignDialog" :lazy-render="false" :before-close="beforeClose">
      <van-field required v-model="username" @blur="onBlur" label="姓名" placeholder="请输入姓名"/>
      <van-field required v-model="tel" @blur="onBlur" label="电话" placeholder="请输入电话"/>
    </van-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import Shake from "shake.js";
import { lottery, saveInfo } from "@/services";
import VanDialog from "vant/lib/dialog";
import VanField from "vant/lib/field";
import "vant/lib/dialog/style";
import "vant/lib/field/style";

import Vue from "vue";
Vue.use(VanDialog);

export default {
  components: {
    VanField
    // Toast
  },
  data() {
    return {
      isLotteryed: false,
      isShake: false,
      level: 0,
      showSignDialog: false,
      username: "",
      tel: ""
    };
  },
  computed: {
    prizeImg() {
      return require(`@/assets/prize${this.level}.jpg`);
    },
    prizeLevel() {
      return this.$store.state.prizeLevel;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    sign() {
      this.showSignDialog = true;
    },
    wxGet() {
      this.getMoney();
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        if (this.validate()) {
          this.doSaveInfo(done);
        } else {
          done(false);
        }
      } else {
        done(false);
      }
    },
    validate() {
      if (!this.username) {
        alert("姓名不能为空");
        return false;
      }
      if (!this.tel || !/1[235678]\d{9}/.test(this.tel)) {
        alert("手机号为空或格式不正确");
        return false;
      }
      return true;
    },
    doSaveInfo(done) {
      let params = {
        OpenID: this.userInfo.openid,
        Phone: this.tel,
        Name: this.username
      };
      saveInfo(params).then(res => {
        if (res == 1) {
          VanDialog.alert({
            message: "恭喜你领票成功"
          }).then(() => {
            Go("", "1");
          });
        } else if (res == 0) {
          VanDialog.alert({
            message: "该电话号码已经使用过"
          }).then(() => {
            // Go("", "1");
            done(false);
          });
        }
      });
    },
    onBlur() {
      document.body && (document.body.scrollTop = document.body.scrollTop);
    },
    backPage() {
      Go("", "1");
    },
    getLottery() {
      if (this.isShake) {
        return;
      }

      this.isShake = true;
      this.myShakeEvent.stop();
      $("#shake-audio")[0].play();

      setTimeout(() => {
        let params = {
          OpenID: this.userInfo.openid
        };

        lottery(params).then(res => {
          const result = res.split(",");
          const level = parseInt(result[0]);
          const sResult = result[1];
          const money = result[2];

          if (level == 3 && sResult != 1) {
            this.level = 0;
          } else {
            this.level = level;
          }

          this.isLotteryed = true;

          $("#shake-audio")[0].pause();
          $("#match-audio")[0].play();

          // this.sResult = sResult;

          // if (this.sResult == "-1") {
          //   VanDialog.alert({
          //     message: "活动未开始~"
          //   }).then(() => {
          //     Go("", "1");
          //   });
          // } else if (this.sResult == "3" || this.sResult == "-2") {
          //   VanDialog.alert({
          //     message: "很遗憾，今天的奖品已经发放完毕~"
          //   }).then(() => {
          //     Go("", "1");
          //   });
          // } else {
          //   if (this.sResult != "1") {
          //     VanDialog.alert({
          //       message: "很抱歉，你被微信判定为非活跃用户，无法领取红包！~"
          //     }).then(() => {
          //       Go("", "1");
          //     });
          //   }
          // }
        });
      }, 500);
    },
    getMoney() {
      //领取红包
      VanDialog.alert({
        message: "点击确定返回微信主页面，在服务通知中领取红包~"
      }).then(() => {
        wx.closeWindow();
      });
    }
  },
  created() {
    this.myShakeEvent = new Shake({
      threshold: 5, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    });
    this.myShakeEvent.start();
    window.addEventListener("shake", this.getLottery, false);

    // this.getLottery();
  }
};
</script>

<style scoped lang="less">
.lottery-wrap {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  .bg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .prize {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .btn-box {
    position: absolute;
    bottom: 10%;
    text-align: center;
    span {
      display: inline-block;
      width: 50%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
