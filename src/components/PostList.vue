<template>
  <div v-if="posts.length > 0">
    <h2>Posts List</h2>
    <transition-group name="posts-list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">Posts list is empty</h2>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  components: { PostItem },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}

.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.4s ease;
}
.posts-list-enter,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.posts-list-move {
  transition: transform 0.4s ease;
}
</style>
