<template>
  <router-link :to="props.to" class="category__item" :class="{active: $route.query.filter === props.name}">
    <div class="category__photo">
      <img class="category__img" :src="props.src" alt="" />
    </div>
    <div class="category__name">{{ props.name }}</div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  to: {
    type: Object,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.category {
  max-width: var(--breakpoint-desktop);
  width: 100%;
  margin: 0 auto;
}

.category__item {
  height: 80px;
  border: 1px solid var(--grey-lightest);
  border-radius: 16px;
  background: var(--white);
  text-align: center;
  transition: background 0.25s linear, border 0.25s linear;
}

.category__item:hover {
  border: 1px solid var(--primary);
  cursor: pointer;
  background-color: var(--grey-lightest);
}

.active {
  border: 1px solid var(--primary);
  cursor: pointer;
  background-color: var(--grey-lightest);
  color: var(--bluw-light);
}

.category__img {
  margin: 10px 0;
  width: 24px;
  height: 24px;
}

.category__name {
  font-size: 13px;
  font-style: 13px;
  font-weight: 700;
  color: var(--black);
  font-style: normal;
  line-height: 18px;
  letter-spacing: 0.1px;
}

.category__name:hover {
  color: var(--bluw-light);
}
</style>
