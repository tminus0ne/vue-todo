<template>
  <div class="page">
    <h1>Page with posts</h1>
    <my-button @click="showModal" style="margin: 15px 0">Create post</my-button>
    <my-modal v-model:show="modalVisible">
      <post-form @create="createPost" />
    </my-modal>
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import MyButton from './components/UI/MyButton.vue';
import MyModal from './components/UI/MyModal.vue';

export default {
  components: { PostForm, PostList, MyModal, MyButton },

  data() {
    return {
      posts: [
        { id: 1, title: 'Post title', body: 'Post description' },
        { id: 2, title: 'Post title', body: 'Post description' },
        { id: 3, title: 'Post title', body: 'Post description' },
        { id: 4, title: 'Post title', body: 'Post description' },
      ],
      modalVisible: false,
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.modalVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showModal() {
      this.modalVisible = true;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  padding: 20px;
}
</style>
