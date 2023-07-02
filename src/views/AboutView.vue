<template>
  <div class="about">
    <!-- <div class="loadingAbout">
      <span>loading</span>
    </div> -->

    <!-- <img
      src="https://user-images.githubusercontent.com/84780174/207597124-fae638e9-6b5f-4286-b826-6bba2d5bbf1a.png"
    />
    <img
      src="https://user-images.githubusercontent.com/84780174/207597138-6c6006cc-d5ab-43e2-82ce-a99e70a4d3fd.png"
    />

    <img
      src="https://user-images.githubusercontent.com/84780174/207597151-50644db6-050a-4963-8da9-4866068b12b8.png"
    />

    <img
      src="https://user-images.githubusercontent.com/84780174/207597163-53f802d1-a822-4d65-b303-4d99ec222c56.png"
    />

    <img
      src="https://user-images.githubusercontent.com/84780174/207597171-310114a5-14fa-4787-a03c-904c82804bdf.png"
    />

    <img
      src="https://user-images.githubusercontent.com/84780174/207597643-6f3c3444-9137-4be7-add4-67d201c5b135.png"
    />
    -->

    <img src="@/assets/img/0.png" />
    <img src="@/assets/img/1.png" loading="lazy" />
    <!-- <img
      src="https://user-images.githubusercontent.com/84780174/207597143-4c101da9-770a-4db8-8447-a070e1469fdd.gif"
    /> -->
    <img src="@/assets/img/2.png" loading="lazy" />
    <img src="@/assets/img/3.png" loading="lazy" />
    <!-- <img loading="lazy" src="@/assets/img/4.gif" alt="" /> -->
    <img
      src="https://user-images.githubusercontent.com/84780174/207597419-6d754b65-3896-4840-8b17-fb07e8f1d07d.gif"
      loading="lazy"
    />
    <img src="@/assets/img/5.png" style="margin-bottom: 100px" loading="lazy" />
    <img
      src="https://user-images.githubusercontent.com/84780174/207597164-7aeb252f-04b0-4649-841d-fbba036ed40e.gif"
      loading="lazy"
    />
    <!-- <img loading="lazy" src="@/assets/img/7.gif" alt="" /> -->
    <img src="@/assets/img/8.png" loading="lazy" />
    <img
      src="https://user-images.githubusercontent.com/84780174/207597631-7aa23f1f-41d1-4fd4-bbd1-85ae1ff8b75f.gif"
      loading="lazy"
    />
    <!-- <img loading="lazy" src="@/assets/img/9.gif" style="" alt="" /> -->
    <img src="@/assets/img/10.png" loading="lazy" />
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
.loadingAbout {
  width: 100%;
  height: 100vh;
  background: #000;
  span {
    color: #fff;
  }
}
.about {
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
  // padding-top: 100px;
}
img {
  width: 100%;
}
</style>
