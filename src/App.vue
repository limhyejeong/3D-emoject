<template>
  <nav>
    <router-link to="/" class="logo">
      <img src="@/assets/logo2.png" />
      <span>형용할 수 없는 감정에 대하여</span>
    </router-link>
  </nav>

  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </router-view>
</template>

<script>
export default {
  name: "App",
  setup() {},
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s;
}
.slide-left-enter-from {
  transform: translateX(100vw);
}
.slide-left-leave-to {
  transform: translateX(-100vw);
}
.slide-right-enter-from {
  transform: translateX(-100vw);
}
.slide-right-leave-to {
  transform: translateX(100vw);
}
</style>

<style lang="scss">
@font-face {
  font-family: "notosanskr";
  src: url("@/assets/font/notosanskr/NotoSansKR-Thin.woff");
  font-weight: 100;
}
@font-face {
  font-family: "notosanskr";
  src: url("@/assets/font/notosanskr/NotoSansKR-Light.woff");
  font-weight: 200;
}
@font-face {
  font-family: "notosanskr";
  src: url("@/assets/font/notosanskr/NotoSansKR-Regular.woff");
  font-weight: 300;
}
@font-face {
  font-family: "notosanskr";
  src: url("@/assets/font/notosanskr/NotoSansKR-Medium.woff");
  font-weight: 500;
}
@font-face {
  font-family: "notosanskr";
  src: url("@/assets/font/notosanskr/NotoSansKR-Bold.woff");
  font-weight: 700;
}
@font-face {
  font-family: "notosanskr";
  src: url("@/assets/font/notosanskr/NotoSansKR-Black.woff");
  font-weight: 800;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "nanumsquareneo";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  width: 100%;
  height: 100vh;
  background: var(--background);
  letter-spacing: -0.07rem;
  color: var(--black);
  overflow: hidden;
}
:root {
  --background: #f2f3f7;
  --gray2: #cccccc;
  --gray1: #aaaaaa;
  --light: #ffffff;
  --shadow: #c6cde1;
  --black: #333333;
}
a {
  text-decoration: none;
}
p {
  line-height: 1.8rem;
}
nav {
  position: absolute;
  top: 0;
  left: 0;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 0 50px;
    font-size: 0.9rem;
    color: var(--black);

    img {
      width: 25px;
      height: 25px;
    }
    span {
      font-weight: 700;
      margin-left: 5px;
    }

    &:hover {
      text-decoration: underline;
      opacity: 0.5;
    }
  }
}

// a {
//   &.router-link-exact-active {
//   }
// }
button {
  cursor: pointer;
  transition: 0.25s;
}
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
