<template>
  <div class="about">
    <img src="@/assets/img/1.png" alt="" />
    <img src="@/assets/img/2.gif" alt="" />
    <img src="@/assets/img/3.png" alt="" />
    <img src="@/assets/img/4.gif" alt="" />
    <img src="@/assets/img/5.gif" alt="" />
    <img src="@/assets/img/6.png" alt="" />
    <img src="@/assets/img/7.gif" alt="" />
    <img src="@/assets/img/8.png" alt="" />
    <img src="@/assets/img/9.gif" alt="" />
    <img src="@/assets/img/10.png" alt="" />

    <!-- <h3>Overview</h3>
    <p>
      사람은 누구나 표현할 수 없는 감정이 있습니다.<br />
      특별한 기억이나 특정한 상황, 대상에 대한 감정, 미래에 대한 기대와 과거의
      회상으로도 느낄 수 있습니다.<br />
      이 프로젝트는 언어로 표현할 수 없는 복합적인 감정을 3D 오브젝트 형태로
      표현하고,<br />
      웹 사이트상에 아카이브하여 많은 사람의 감정을 보관하고 감상할 수 있도록
      하고자 합니다.
    </p> -->
  </div>
</template>

<script>
export default {
  name: "AboutView",
  components: {},
  setup() {},
};
</script>

<style lang="scss">
.about {
  overflow: scroll;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
}
img {
  width: 100%;
}
</style>
