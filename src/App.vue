<template>
  <div class="page">
    <post-form @create="createPost" />
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';

export default {
  components: { PostForm, PostList },

  data() {
    return {
      posts: [
        { id: 1, title: 'Post title', body: 'Post description' },
        { id: 2, title: 'Post title', body: 'Post description' },
        { id: 3, title: 'Post title', body: 'Post description' },
        { id: 4, title: 'Post title', body: 'Post description' },
      ],
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
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
