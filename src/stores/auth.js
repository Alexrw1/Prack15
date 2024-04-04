import axios from 'axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userId: null,
    cartId: null
  }),
  actions: {
    async login(email, password) {
      try {
        const { data } = await axios.post(`http://${import.meta.env.VITE_API}/users/login`, {
          email, 
          password
        })
        const mockUserId = data.user.id;
        this.isAuthenticated = true;
        this.userId = mockUserId;
        this.cartId = data.cartId;
      } catch(error) {
        throw new Error(error)
      }
    },
    async register(email, username, password) {
      try {
        const { data } = await axios.post(`http://${import.meta.env.VITE_API}/users/register`, {
          email,
          username,
          password
        })
        this.isAuthenticated = true;
        this.userId = data.user.id;
        this.cartId = data.cart.id;
      } catch(error) {
        throw new Error(error)
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.userId = null;
      this.cartId = null;
      localStorage.clear();
      location.reload()
    },
  },
});

export default useAuthStore;