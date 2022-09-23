<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/list">List</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fff;
  color: #000;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #aaa;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
