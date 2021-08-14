<template>
  <form @submit.prevent>
    <h3>Create post</h3>
    <my-input v-focus v-model="post.title" type="text" placeholder="Title" />
    <my-input v-model="post.body" type="text" placeholder="Description" />
    <my-button @click="createPost" class="button">Apply post</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.title = '';
      this.body = '';
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.button {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
