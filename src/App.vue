<template>
  <div id="app">
    <a-layout id="main-app">
      <a-layout-sider>
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-menu-item  key="1">
            <a-icon type="user" />
            <span><router-link to="/">Initial consultation</router-link></span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="upload" />
            <span><router-link to="/escalation">Escalations</router-link></span>
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
