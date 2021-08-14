<template>
  <select v-model="modelValue" @change="changeOption" class="select">
    <option disabled value="">Chose option</option>
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(evt) {
      this.$emit('update:modelValue', evt.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  background: none;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 5px;
}
</style>
