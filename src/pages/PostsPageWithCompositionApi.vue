<template>
  <div>
    <h1>Page with posts</h1>
    <my-input
      v-focus
      v-model="searchQuery"
      placeholder="Enter search phrase..."
    />
    <div class="app__buttons">
      <my-button @click="showModal">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model:show="modalVisible"> </my-modal>
    <post-list v-if="!isPostsLoading" :posts="searchedAndSortedPosts" />
    <div v-else style="text-align: center">Loading...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyModal from '@/components/UI/MyModal.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import { ref } from 'vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSearchedAndSortedPosts from '@/hooks/useSearchedAndSortedPosts';

export default {
  components: {
    PostForm,
    PostList,
    MyModal,
    MyButton,
    MySelect,
    MyInput,
  },

  data() {
    return {
      modalVisible: false,
      sortOptions: [
        { value: 'title', name: 'Sort by title' },
        { value: 'body', name: 'Sort by description' },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoaded } = usePosts(10);

    const { sortedPosts, selectedSort } = useSortedPosts(posts);

    const { searchQuery, searchedAndSortedPosts } = useSearchedAndSortedPosts(
      sortedPosts,
    );

    return {
      posts,
      totalPages,
      isPostsLoaded,
      sortedPosts,
      selectedSort,
      searchQuery,
      searchedAndSortedPosts,
    };
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
