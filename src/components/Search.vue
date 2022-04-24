<template>
  <div class="search-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
