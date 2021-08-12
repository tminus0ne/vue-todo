<template>
  <form @submit.prevent>
    <h3>Create post</h3>
    <input v-model="post.title" class="input" type="text" placeholder="Title" />
    <input
      v-model="post.body"
      class="input"
      type="text"
      placeholder="Description"
    />
    <button @click="createPost" class="button">Apply post</button>
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
}

.button {
  align-self: center;
  padding: 10px 15px;
  margin-top: 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
