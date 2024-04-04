<template>
  <div class="title"> Меню </div>
  <div style="display: flex; justify-content: center; margin: 0 auto;">
      <Spinner v-if="store.loading.restaurants" style="margin: 20px;"/>
  </div>
  <div class="text" v-if="store.currentMenu.length <= 0">
    Меню пока нет...
  </div>
  <div  v-if="!store.loading.restaurants" class="products__list">
    <item-card 
      v-for="item in store.currentMenu"
      :key="item.id"
      :src="item.images"
      :title="item.name"
      :price="item.price"
      :id="item.id"
    />
  </div>
</template>

<script setup>
import Spinner from "../components/Spinner.vue";
import { onMounted } from "vue";
import { useRestaurantsStore } from "@/stores/restaurants.js";
import { useRoute } from "vue-router";
import ItemCard from "../components/Cards/ItemCard.vue";

const store = useRestaurantsStore();
const route = useRoute();

onMounted(() => {
  store.getMenuById(route.params.id);
});
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}

.text {
  text-align: center;
  font-size: 25px;
}
.products__list {
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  place-items: center;
}
</style>
