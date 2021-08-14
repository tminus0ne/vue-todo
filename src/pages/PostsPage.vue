<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-model="searchQuery" placeholder="Enter search phrase..." />
    <div class="app__buttons">
      <my-button @click="showModal">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model:show="modalVisible">
      <post-form @create="createPost" />
    </my-modal>
    <post-list
      v-if="!isPostsLoading"
      :posts="searchedAndSortedPosts"
      @remove="removePost"
    />
    <div v-else style="text-align: center">Loading...</div>
    <div ref="observer" class="observer"></div>

    <!-- <div class="page__wrapper">
      <my-button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          current__page: page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </my-button>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyModal from '@/components/UI/MyModal.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';

export default {
  components: { PostForm, PostList, MyModal, MyButton, MySelect, MyInput },

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
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          },
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );
        this.posts = response.data;
      } catch (error) {
        alert('Error');
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          },
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert('Error');
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
  },
  mounted() {
    this.fetchPosts();

    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },
    searchedAndSortedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
};
</script>

<style>
.app__buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  margin-right: 10px;
}

.current__page {
  border: 4px solid teal;
}

.observer {
  height: 30px;
}
</style>
