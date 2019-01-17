<template>
  <div class="guide-wrap">
      <img :src="require('@/assets/guide.jpg')" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.guide-wrap{
    padding-bottom:60px;
    img{
        width:100%;
        display: block;
    }
}
</style>
