<template>
  <nav>
    <router-link class="logo" to="/">Indescribable Emotion</router-link>
    <!-- <router-link to="/about">About</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/list">List</router-link> -->
  </nav>
  <router-view />
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
  background: #000;
  letter-spacing: -0.03rem;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background: #000;
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
}
nav {
  padding: 30px;
  font-weight: 500;

  .logo {
    text-decoration: underline;
  }

  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
