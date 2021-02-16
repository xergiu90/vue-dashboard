<template>
  <div id="app">
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "email",
        password: "password"
      },
      timeout:null
    }
  },
  created() {
    this.refresh();
    document.addEventListener('click', () => this.refresh());
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    refresh () {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$store.dispatch({
          type: 'logout'
        });
      }, 10 * 60 * 1000);
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#main-app {
  height: 100%;
}

aside {
  padding-top: 24px;
}

a {
  color: white;
}
</style>
