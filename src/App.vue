<template>
  <nav>
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo1.png" />
      <!-- <span> About Indescribable Emotions</span> -->
    </router-link>
  </nav>

  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'" mode="out-in">
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from {
  transform: translateX(50vw);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-50vw);
  opacity: 0;
}
// .slide-right-enter-from {
//   transform: translateX(-100vw);
// }
// .slide-right-leave-to {
//   transform: translateX(100vw);
// }
</style>

<style lang="scss">
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-Thin.ttf");
  font-weight: 100;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-ExtraLight.ttf");
  font-weight: 200;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-Light.ttf");
  font-weight: 300;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-Regular.ttf");
  font-weight: 300;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-Medium.ttf");
  font-weight: 400;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-SemiBold.ttf");
  font-weight: 500;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-Bold.ttf");
  font-weight: 600;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-ExtraBold.ttf");
  font-weight: 700;
}
@font-face {
  font-family: "gothicA1";
  src: url("@/assets/font/Gothic_A1/GothicA1-Black.ttf");
  font-weight: 800;
}
@font-face {
  font-family: "YdestreetL";
  src: url("@/assets/font/Yde-street.ttf") format("ttf");
  font-weight: normal;
  font-style: normal;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "gothicA1";
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
// :root {
//   --background: #f2f3f7;
//   --gray2: #cccccc;
//   --gray1: #aaaaaa;
//   --light: #ffffff;
//   --shadow: #c6cde1;
//   --black: #333333;
// }
:root {
  --background: #000;
  --gray2: #cccccc;
  --gray1: #aaaaaa;
  --light: #222;
  --shadow: #111;
  --black: #eee;
  --point: #ff7a00;
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
  z-index: 10000;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 0 50px;
    font-size: 0.9rem;
    color: var(--black);
    transition: 0.2s;

    img {
      width: auto;
      height: 30px;
    }
    span {
      font-weight: 700;
      margin-left: 5px;
      font-family: "YdeStreet";
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
  letter-spacing: -0.07rem;
}
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 반응형 (mobile)
@media screen and (min-width: 100px) and (max-width: 1000px) {
  body {
    overflow: auto;
  }
  nav .logo {
    margin: 20px 0 0 20px;
  }
}
</style>
