<template>
  <div>
    <div>{{ count }}</div>
    <button @click="increment">+</button>
  </div>
</template>
<script>
export default {
  name: "Yk",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
