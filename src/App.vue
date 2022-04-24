<template>
  <div class="app">
    <router-view class="one"></router-view>
    <router-view class="two" name="two"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  mounted() {
    if (!localStorage.getItem("myToken")) {
      this.$router.push("/");
    }
  },
};
</script>



<style lang="scss">
@import "./styles/variables";
@import "~bootstrap/dist/css/bootstrap.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
 
}

/* width */
::-webkit-scrollbar {
  display: none;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
  background-color: $sidebar-bg-color;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $header-bg-color;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: red;
}

.app {
  display: flex;
  width: 100%;
  height: 100vh;
  user-select:none;
  .one {
    height: 100%;
  }
  .two {
    background: #cdcdcd;
    height: 100%;
  }
}
</style>


