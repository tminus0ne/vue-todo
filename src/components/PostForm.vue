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
    <my-button @click="createPost" class="button">Apply post</my-button>
  </form>
</template>

<script>
import MyButton from './UI/MyButton.vue';
export default {
  components: { MyButton },
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

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.button {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
