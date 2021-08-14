<template>
  <div class="page">
    <h1>Page with posts</h1>
    <div class="app__buttons">
      <my-button @click="showModal">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model:show="modalVisible">
      <post-form @create="createPost" />
    </my-modal>
    <post-list v-if="!isPostsLoading" :posts="posts" @remove="removePost" />
    <div v-else style="text-align: center">Loading...</div>
  </div>
</template>

<script>
import axios from 'axios';

import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import MyButton from './components/UI/MyButton.vue';
import MyModal from './components/UI/MyModal.vue';
import MySelect from './components/UI/MySelect.vue';

export default {
  components: { PostForm, PostList, MyModal, MyButton, MySelect },

  data() {
    return {
      posts: [],
      modalVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'Sort by title' },
        { value: 'body', name: 'Sort by description' },
      ],
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10',
        );
        this.posts = response.data;
        this.isPostsLoading = false;
      } catch (error) {
        alert('Error');
      }
    },
  },
  mounted() {
    this.fetchPosts();
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

.app__buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>
