<template>
  <nav>
    <router-link class="logo" to="/"
      >🪐 형용할 수 없는 감정에 대하여</router-link
    >
    <!-- <router-link to="/about">About</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/list">List</router-link> -->
    <!-- <router-link class="list" to="/list">🍕</router-link> -->
  </nav>
  <div class="page">
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss">
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-Thin.ttf");
  font-weight: 100;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-ExtraLight.ttf");
  font-weight: 200;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-Light.ttf");
  font-weight: 300;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-Regular.ttf");
  font-weight: 400;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-Medium.ttf");
  font-weight: 500;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-SemiBold.ttf");
  font-weight: 600;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-Bold.ttf");
  font-weight: 700;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-ExtraBold.ttf");
  font-weight: 800;
}
@font-face {
  font-family: "poppins";
  src: url("@/assets/font/Poppins-Black.ttf");
  font-weight: 900;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "poppins";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  width: 100%;
  height: 100vh;
  background: var(--background-color);
  letter-spacing: -0.03rem;
}
:root {
  --background-color: #1a1a23;
  // --background-color: #000;
  --section-color: #232332;
  --article-color: #2c2e40;
  --inactive-color: #747c95;
  --highlight-color: #a99df4;
  --main-color: #725ded;
  --shadow-color: #5c47eb;
  --text-color: #e2dcff;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  background: var(--background-color);
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
}
nav {
  position: absolute;
  padding: 30px;
  font-weight: 500;
  // text-align: center;
  .logo {
    font-weight: 500;
    font-size: 0.85rem;
    color: var(--inactive-color);

    &:hover {
      text-decoration: underline;
      opacity: 0.5;
    }
  }
  .list {
    position: absolute;
    right: 0;
  }
  a {
    &.router-link-exact-active {
    }
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
