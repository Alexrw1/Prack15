<script setup>
  import { RouterView } from 'vue-router';
  import { onBeforeMount } from "vue";
  import useAuthStore from "@/stores/auth";

  const auth = useAuthStore();

  onBeforeMount(() => {
  const userIdS = +localStorage.getItem('userId');
  const cartIdS = +localStorage.getItem('cartId');
  const isAuthenticatedS = Boolean(localStorage.getItem('isAuthenticated'));
  if(userIdS && cartIdS && isAuthenticatedS) {
    auth.userId = userIdS;
    auth.cartId = cartIdS;
    auth.isAuthenticated = isAuthenticatedS;
  }
});
</script>

<template>
  <router-view/>
  <notifications position="bottom right"/>
</template>
<style>
@import "bulma/css/bulma.css";
</style>
