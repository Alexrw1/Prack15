<template>
  <div class="flex">
    <div v-for="order in store.orders" >
      <span class="sasha">Заказ номер:</span> {{ order.id }}
      <span class="sasha">Статус заказа:</span> {{ order.status }}
      <span class="sasha">Адрес доставки:</span> {{ order.delivery_address }}
    </div>
  </div>
</template>

<script setup>
import { useRestaurantsStore } from '../stores/restaurants';
import { onMounted } from 'vue';

const store = useRestaurantsStore();

onMounted(async () => {
  await store.getOrders()
});
</script>

<style lang="scss" scoped>
.flex {
  margin-top:40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.sasha {
  color: rgba(227, 0, 0, 0.22);
  font-weight: bold;;
}
</style>