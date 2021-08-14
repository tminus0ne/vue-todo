<template>
  <nav-bar></nav-bar>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  padding: 20px;
}
</style>
