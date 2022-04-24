<template>
  <aside>
    <header class="d-flex flex-column align-items-center">
      <router-link to="/main">
        <i class="fa-solid fa-wallet"></i>
        <small>POS</small>
      </router-link>
      <router-link to="/settings">
        <i class="fa-solid fa-gear"></i>
        <small>Настройки</small>
      </router-link>
    </header>

    <footer class="d-flex flex-column align-items-center">
      <router-link to="/lock">
        <i class="fa-solid fa-lock"></i>
        <small>Блокировка</small>
      </router-link>
      <router-link to="/collapsed">
        <i class="fa-solid fa-down-left-and-up-right-to-center"></i>
        <small>Свернут</small>
      </router-link>
      <router-link to="/quit">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <small>Выход</small>
      </router-link>
    </footer>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
aside {
  background: $myColor;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100%;
  header,
  footer {
    a {
      text-decoration: none;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      gap: 10px;
      width: 70px;
      height: 70px;
      i {
        font-size: 20px;
      }
      small {
        font-size: 10px;
      }

      &.router-link-active {
        background: #333c93;
        width: 70px;
        height: 70px;
        border-radius: 10px;
      }
    }
  }
}
</style>
