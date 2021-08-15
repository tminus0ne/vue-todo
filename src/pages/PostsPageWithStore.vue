<template>
  <div>
    <h1>Page with posts</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Enter search phrase..."
    />
    <div class="app__buttons">
      <my-button @click="showModal">Create post</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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
    <div v-intersection="loadMorePosts" class="observer"></div>

    <div class="page__wrapper">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
      modalVisible: false,
    };
  },

  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
    }),

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
  mounted() {
    this.fetchPosts();
  },

  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchedAndSortedPosts: 'post/searchedAndSortedPosts',
    }),
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

p {
  margin: 0;
  padding: 0;
  font-size: 24px;
}
</style>
