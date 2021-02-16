<template>
  <div class="dashboard">
    <a-layout id="main-app">
      <a-layout-sider>
        <a-menu theme="dark" mode="inline" :default-selected-keys="'/home' === $route.path || '/consultation' === $route.path ?['1']:'/escalation' === $route.path? ['2'] : ['3'] ">
          <a-menu-item key="1">
            <router-link to="/home">
              <a-icon type="user"/>
              <span>Initial consultation</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/escalation">
              <a-icon type="upload"/>
              <span>Escalations</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/time">
              <a-icon type="hourglass"/>
              <span>Time Data</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <a-button type="link" v-on:click="logout">
              <a-icon type="logout"/>
              <span>Logout</span>
            </a-button>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>


<script>

export default {
  name: 'Dashboard',
  methods: {
    logout: function () {
      this.$store.dispatch({
        type: 'logout'
      });
    }
  }
}
</script>


<style>
a {
  text-align: left;
}

.dashboard {
  height: 100%;
}

button {
  float: left;
}
</style>
