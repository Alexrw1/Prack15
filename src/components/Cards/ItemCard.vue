<template>
  <div class="product__card">
    <div
      class="card__preview"
      :style="{ 'background-image': `url(${props.src})` }"
    ></div>
    <div class="card__content">
      <div class="card__content-left"></div>
    </div>
    <div class="card__content--title">{{ props.title }}</div>
    <div class="card__content--title">{{ props.description }}</div>
    
    <p>{{ props.price }}₽</p>
    <div  v-if="$route.name === 'cart'" class="card__content--title">Кол-во: {{ props.quantity }}</div>
    <div style="margin: 10px">
      <button v-if="$route.name === 'single-restaurant'" class="button is-link" @click="addToCart(props.title, props.id)">В корзину</button>
      <button v-if="$route.name === 'cart'" class="button is-danger" @click="deleteItemFromCart(props.title, props.id)">Удалить</button>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";
import { useRestaurantsStore } from "@/stores/restaurants";
import useAuthStore from "../../stores/auth";

const restStore = useRestaurantsStore();
const auth = useAuthStore();
const { notify }  = useNotification();

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const addToCart = async (name, id) => {
  try {
    await restStore.addToCart(id);
    notify({
      type: "success",
      title: `${name} добавлен(а) в корзину`,
      text: "Для оформления заказа перейдите в корзину",
    });
    await restStore.getCartByUserId(auth.userId);
  } catch (error) {
    throw new Error(error);
  }
}
const deleteItemFromCart = async (name, id) => {
  await restStore.removeFromCart(id);
  notify({
    type: "error",
    title: `${name} удален(а) из корзины`,
  });
  await restStore.getCartByUserId(auth.userId);
}
</script>

<style lang="scss" scoped>

.product__card {
  min-width: 250px;
  border: 1px solid var(--grey-lightest);
  border-radius: 16px;
  max-width: 250px;
  text-align: center;
}
.card__preview {
  position: relative;
  height: 160px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 999;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.card__preview--badge {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 11px;
  color: var(--white);
  text-transform: uppercase;
  border-radius: 0 16px;
  background-color: var(--primary);
}

.card__content {
  position: relative;
  z-index: -1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
}

.card__content--title {
  font-size: 18px;
  line-height: 24px;
  color: var(--dark);
  margin-bottom: 6px;
}

.card__content--info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 14px;
}

.card__content--cook-time,
.card__content--price {
  display: inline-block;
  margin-right: 8px;
  font-size: 12px;
  line-height: 16px;
  color: var(--grey);
}

.card__content--tag-dot {
  display: inline-block;
  width: 3px;
  height: 3px;
  background-color: var(--primary);
  border-radius: 50%;
  margin-right: 8px;
}

.card__content--hashtags {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card__content--hashtag {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  border-radius: 100px;
  color: var(--grey-darker);
  background-color: var(--grey-lightest);
  margin-right: 8px;
}

.card__content--hashtag img {
  width: 12px;
  height: 12px;
  margin-right: 8px;
}

.card__content--bag {
  position: relative;
}

.card__content--bag svg {
  width: 20px;
  height: 20px;
}

.card__content--bag-count {
  position: absolute;
  top: -12px;
  right: 0;
  font-size: 10px;
  line-height: 1;
  font-weight: bold;
  color: var(--white);
  background-color: var(--primary);
  padding: 2px;
  min-width: 14px;
  text-align: center;
  border-radius: 5px;
}
</style>
