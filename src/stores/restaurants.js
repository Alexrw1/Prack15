import { defineStore } from 'pinia';
import axios from 'axios';
import useAuthStore from './auth';

export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({ 
    restaurants: [], 
    loading: { restaurants: false, menu: false, cart: false, order: false },
    filteredRestaurants: [],
    currentMenu: {},
    cart: [],
    orders: []
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async getRestaurants() {
      this.loading.restaurants = true;
      try {
        const { data } = await axios.get(`http://${import.meta.env.VITE_API}/restaurants/get`)
        this.restaurants = data;
        this.filteredRestaurants = data;
      } catch(error) {
        throw new Error(error)
      } finally {
        this.loading.restaurants = false;
      }
    },
    filterRestaurants(filter) {
      if (filter === 'all') {
        this.filteredRestaurants = this.restaurants;
        return
      }
      this.filteredRestaurants = this.restaurants.filter((item) => {
        return item.type.includes(filter);
      })
    },
    async getMenuById(id) {
      this.loading.restaurants = true;
      try {
        const { data } = await axios.get(`http://${import.meta.env.VITE_API}/menu/${id}`);
        this.currentMenu = data;
        console.log(this.currentMenu);
        this.getTotalPrice();
      } catch (error) {
        throw new Error(error)
      } finally {
        this.loading.restaurants = false;
      }
    },

   async getTotalPrice(id) {
    try {
      const response = await axios.get(`http://localhost:8080/totalprice/${id}`);
      console.log('response.data.totalPrice:', response.data.totalPrice);
      return response.data.totalPrice;
    } catch (error) {
      console.error('Ошибка при получении общей суммы:', error);
      return 0; // или другое значение по умолчанию
    }
  },
    // async getCartByUserId(id) {
    //   this.loading.cart = true;
    //   try {
    //     const { data } = await axios.get(`http://${import.meta.env.VITE_API}/cart/${id}`);
    //     this.cart = data;
    //   } catch (error) {
    //     throw new Error(error)
    //   } finally {
    //     this.loading.cart = false;
    //   }
    // },
    // async addToCart(id) {
    //   this.loading.cart = true;
    //   const auth = useAuthStore();
    //   try {
    //     console.log(auth);
    //     const { data } = await axios.post(`http://${import.meta.env.VITE_API}/cart`, {
    //       cartId: auth.cartId,
    //       menuId: id,
    //       quantity: 1
    //     });
    //     this.cart = data;
    //   } catch (error) {
    //     throw new Error(error)
    //   } finally {
    //     this.loading.cart = false;
    //   }
    // },
    async addToCart(id) {
      this.loading.cart = true;
      const auth = useAuthStore();
      try {
        const existingItem = this.cart.find(item => item.id === id);
    
        if (existingItem) {
          // Если товар уже есть в корзине, увеличиваем его количество
          await axios.post(`http://${import.meta.env.VITE_API}/cart`, {
            cartId: auth.cartId,
            menuId: id,
            quantity: existingItem.quantity + 1
          });
        } else {
          // Если товара нет в корзине, добавляем новый
          await axios.post(`http://${import.meta.env.VITE_API}/cart`, {
            cartId: auth.cartId,
            menuId: id,
            quantity: 1
          });
        }
    
        // После изменений обновляем данные корзины
        await this.getCartByUserId(auth.userId);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading.cart = false;
      }
    },
    
    async getCartByUserId(id) {
      this.loading.cart = true;
      try {
        const { data } = await axios.get(`http://${import.meta.env.VITE_API}/cart/${id}`);
        this.cart = data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading.cart = false;
      }
    },

    async removeFromCart(itemId) {
      const auth = useAuthStore();
      this.loading.cart = true;
      try {
        await axios.post(`http://${import.meta.env.VITE_API}/cart/delete`, {
          itemId,
          cartId: auth.cartId,
        });
        this.getTotalPrice();
      } catch (error) {
        throw new Error(error)
      } finally {
        this.loading.cart = false;
        this.getTotalPrice();
      }
    },
    async makeOrder() {
      const auth = useAuthStore();
      this.loading.order = true;
      try {
        const deliveryAddress = this.deliveryAddress; // Получаем адрес доставки из data компонента
    
        // Передаем адрес доставки, userId и cartId на сервер
        await axios.post(`http://${import.meta.env.VITE_API}/order/place`, {
          userId: auth.userId,
          cartId: auth.cartId,
          deliveryAddress: deliveryAddress, // Передаем адрес доставки на сервер
        });
    
        await this.getCartByUserId(auth.userId);
        this.deliveryAddress = deliveryAddress;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading.order = false;
      }
    },

    async searchOrdersByRestaurantName(restaurantName) {
      this.loading.order = true;
    
      try {
        // Используем запрос к API для поиска заказов по имени ресторана
        const { data } = await axios.get(`http://${import.meta.env.VITE_API}/restaurants/search`, {
          params: {
            restaurantName: restaurantName,
          },
        });
    
        console.log(data);
        this.orders = data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading.order = false;
      }
    },
    
    async getOrders() {
      const auth = useAuthStore();
      this.loading.order = true;
      try {
       const {data} =  await axios.get(`http://${import.meta.env.VITE_API}/orders/${auth.userId}`);
       console.log(data);
       this.orders = data;
      } catch (error) {
        throw new Error(error)
      } finally {
        this.loading.order = false;
      }
    }
  },
})
