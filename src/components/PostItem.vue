<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      <my-button class="post__button" @click="$emit('remove', post)"
        >Delete</my-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  margin-top: 15px;
  border: 2px solid teal;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post__button {
  color: red;
  border: 1px solid red;
}

.post__buttons {
  display: flex;
}
</style>
