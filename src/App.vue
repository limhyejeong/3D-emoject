<template>
  <nav>
    <!-- <router-link class="logo" to="/">🪐 About Indescribable Emotion</router-link> -->
    <router-link to="/" class="logo"
      >🪐 형용할 수 없는 감정에 대하여</router-link
    >
    <!-- <router-link to="/about">About</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/list">List</router-link> -->
    <!-- <router-link class="list" to="/list">🍕</router-link> -->
  </nav>

  <div class="page">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    return {};
  },
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
  transition: all 0.5s ease-in-out;
}
.slide-enter-to,
.slide-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
</style>

<style lang="scss">
@font-face {
  font-family: "nanumsquareneo";
  src: url("@/assets/font/nanumsquareneo/NanumSquareNeoTTF-aLt.woff");
  font-weight: 100;
}
@font-face {
  font-family: "nanumsquareneo";
  src: url("@/assets/font/nanumsquareneo/NanumSquareNeoTTF-bRg.woff");
  font-weight: 300;
}
@font-face {
  font-family: "nanumsquareneo";
  src: url("@/assets/font/nanumsquareneo/NanumSquareNeoTTF-cBd.woff");
  font-weight: 500;
}
@font-face {
  font-family: "nanumsquareneo";
  src: url("@/assets/font/nanumsquareneo/NanumSquareNeoTTF-dEb.woff");
  font-weight: 700;
}
@font-face {
  font-family: "nanumsquareneo";
  src: url("@/assets/font/nanumsquareneo/NanumSquareNeoTTF-eHv.woff");
  font-weight: 900;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "nanumsquareneo";
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  width: 100%;
  height: 100vh;
  background: var(--background-color);
  letter-spacing: -0.07rem;
}
:root {
  --background-color: #fff;
  // --background-color: #000;
  --section-color: #eee;
  // --section-color: #232332;
  --article-color: #aaa;
  // --article-color: #2c2e40;
  --inactive-color: #747c95;
  --highlight-color: #a99df4;
  --main-color: #725ded;
  --shadow-color: #5c47eb;
  --text-color: #e2dcff;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  background: var(--background-color);
  // color: #fff;
}
a {
  color: var(--inactive-color);
  text-decoration: none;
}
p {
  line-height: 1.8rem;
}
.logo {
  position: absolute;
  padding: 50px 50px;
  // font-size: 0.9rem;
  color: #000;
  &:hover {
    text-decoration: underline;
    opacity: 0.5;
  }
}
// .list {
//   position: absolute;
//   right: 0;
// }
a {
  &.router-link-exact-active {
  }
}

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
  // padding: 70px 30px 0 30px;
}
</style>
