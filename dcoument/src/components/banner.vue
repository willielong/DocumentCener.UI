<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in banners" :key="item.src">
      <h3><img :src="item.src" class="image" :title="item.alert" /></h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      banners: [
        {
          src: require("../assets/banner/a.jpg"),
          alert: "图片一",
        },
        {
          src: require("../assets/banner/b.jpg"),
          alert: "图片二",
        },
        {
          src: require("../assets/banner/c.jpg"),
          alert: "图片三",
        },{
          src: require("../assets/banner/d.jpeg"),
          alert: "图片四",
        },
        {
          src: require("../assets/banner/e.jpg"),
          alert: "图片五",
        },
        {
          src: require("../assets/banner/f.jpg"),
          alert: "图片六",
        },
        {
          src: require("../assets/banner/g.jpg"),
          alert: "图片七",
        },
        {
          src: require("../assets/banner/h.jpg"),
          alert: "图片八",
        },
      ]
    };
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  position: relative;
  height: 200px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.image {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 200px;
  width: 100%;
  margin: 0;
  height: 200px;
}
</style>
