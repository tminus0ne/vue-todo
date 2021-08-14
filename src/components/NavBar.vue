<template>
  <div class="navbar">
    <h3 @click="$router.push('/')" style="cursor: pointer">Vue 3</h3>
    <div class="navbar__links">
      <my-button @click="$router.push('/posts')">ToDo List</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 30px"
        >About this site</my-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__links {
  margin-left: auto;

  font-size: 24px;
  text-decoration: none;
  color: teal;
}
</style>
