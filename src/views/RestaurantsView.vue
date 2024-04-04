<template>
  <div class="restaurants">
    <div class="category__inner">
      <CategoryCard
        v-for="category in categories"
        :key="category.to.query.filter"
        :to="category.to"
        :src="category.src"
        :name="category.name"
        @click="toggleFilter(category.to.query.filter)"
      />
    </div>
    <h2 class="restaurants-title">Список ресторанов</h2>
    <div style="display: flex; justify-content: center; margin: 0 auto;">
      <Spinner v-if="vano.loading.restaurants" style="margin: 20px;"/>
    </div>
    <section class="products__list">
      <template v-if="!vano.loading.restaurants">
        <RestaurantCard
          v-for="rest in vano.filteredRestaurants"
          :key="rest.name"
          :name="rest.name"
          :src="rest.images"
          :label="rest.type"
          :to="`/restaurants/${rest.id}`"
        />
      </template>
    </section>
  </div>
</template>

<script setup>
import RestaurantCard from "@/components/Restaurants/RestaurantCard.vue";
import CategoryCard from "@/components/Category/CategoryCard.vue";
import categories from "./categories";
import Spinner from "@/components/Spinner.vue";
import { useRestaurantsStore } from "@/stores/restaurants";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const vano = useRestaurantsStore();
const route = useRoute();
const router = useRouter();

const toggleFilter = (filter) => {
  const currentFilter = route.query.filter;
  if (currentFilter === filter) {
    router.push({ name: 'restaurants', query: {} });
  } else {
    router.push({ name: 'restaurants', query: { filter } });
  }
};

watch(() => route.query, () => {
  if (route.query.filter) vano.filterRestaurants(route.query.filter);
  else vano.filterRestaurants('all');
});

onMounted(async () => {
  await vano.getRestaurants();
});
</script>

<style lang="scss" scoped>
.restaurants-title {
  font-size: 30px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
}
.products__list {
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}
.category__inner {
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;
}
@media screen and (max-width: 768px) {
  .container {
    padding: 0;
  }

  .category__inner {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 15px;
  }
}
</style>
