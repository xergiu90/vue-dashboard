<template>
  <div id="login">
    <a-card title="Login">
      <a-input name="username" v-model="input.username" placeholder="Username" />
      <a-input-password placeholder="Enter password" @pressEnter="login()" v-model="input.password"/>
      <a-button type="default" v-on:click="login()">Login</a-button>
    </a-card>
    <a-result status="warning" title="Invalid username or password!" v-if="isInvalidLogin"></a-result>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      isInvalidLogin: false
    }
  },
  methods: {
    login() {
      if(this.input.username !== "" && this.input.password !== "") {
        if(this.input.username === this.$parent.mockAccount.username && this.input.password === this.$parent.mockAccount.password) {
          this.$emit("authenticated", true);

          this.$store.dispatch({
            type: 'loginUser'
          });

          localStorage.setItem('isLoggedIn', this.input.username);

          this.$router.replace({ name: "Home" });
        } else {
          this.isInvalidLogin = true;
          console.log("The username and / or password is incorrect");
        }
      } else {
        this.isInvalidLogin = true;
        console.log("A username and password must be present");
      }
    }
  }
}
</script>

<style scoped>

input, .ant-input-password {
  margin-bottom: 20px;
}

#login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ant-card {
  max-width: 400px;
}

::v-deep .ant-card-head {
  background: dodgerblue;
  font-size: 30px;
  color: white;
}

::v-deep .ant-card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

::v-deep .ant-result-title {
  color: red;
}

</style>
