<template>
  <div>
    <div class="title">
      Корзина
    </div>
    <form @submit.prevent="makeOrder">
      <label for="deliveryAddress">Адрес доставки:</label>
      <input class="input" type="text" id="deliveryAddress" v-model="store.deliveryAddress" required>
      <button class="button is-link" type="submit">Сделать заказ</button>
    </form>
    <div style="display: flex; justify-content: center; margin: 0 auto;">
      <Spinner v-if="store.loading.cart" style="margin: 20px;" />
    </div>
    <div v-if="!store.loading.cart" class="products__list">
      <div v-for="item in store.cart" :key="item.id">
        <item-card
          :src="item.menu_item_images"
          :title="item.menu_item_name"
          :description="item.menu_item_description"
          :price="item.menu_item_price"
          :id="item.id"
          :quantity = "item.quantity"
        />
        <div>
     
    </div>
       
        <!-- Выводим количество товара -->
      </div>
   
    </div>
    <div v-if="store.cart.length <= 0" class="empty">
      Увы  пусто
    </div>
    Общая сумма: {{ totalPrice }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Spinner from '../components/Spinner.vue';
import ItemCard from "../components/Cards/ItemCard.vue";
import { useRestaurantsStore } from '../stores/restaurants';
import useAuthStore from '../stores/auth';

const store = useRestaurantsStore();
const auth = useAuthStore();

const makeOrder = async () => {
  try {
    await store.makeOrder(); // Используем метод makeOrder из хранилища
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error);
  }
};
const totalPrice = ref(0);


onMounted(async () => {
  await store.getCartByUserId(auth.userId);
  totalPrice.value = await store.getTotalPrice(auth.userId);
  console.log(auth.userId);
});
</script>

<style lang="scss" scoped>
.button-wrapper {
  text-align: center;
}

.title {
  text-align: center;
}

.empty {
  text-align: center;
  font-size: 20px;
}

.products__list {
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  place-items: center;
  align-items: center;
  justify-items: center;
 
}
</style>
