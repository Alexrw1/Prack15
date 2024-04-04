<template>
  <header class="header__menu">
    <div class="container">
    <div class="header__menu--left-side">
      <div class="header__navbar">

          <router-link to="/" active-class="">
            <img
              class="header__menu--logo"
              src="../../assets/imgs/header/main_logo.svg"
              alt="Food delivery website logo"
            />
          </router-link>
          </div>
        <div class="header__menu--right-side">
          <nav class="header__menu--link">
            <router-link
              class="menu_link"
              :class="{active: $route.name.includes('restaurant')}"
              :to="{ name: 'restaurants' }"
              >Рестораны</router-link>
            <!-- <router-link class="menu_link" :to="{name: 'deals'}" active-class="active">Deals</router-link> -->
            <span class="header__menu--divider-vertical"></span>
            <router-link
              class="menu_link"
              :class="{active: $route.name === 'orders'}"
              :to="{ name: 'orders' }"
              >Мои заказы</router-link
            >
          </nav>
          <div class="header__menu--icon">
            <router-link :to="{ name: 'cart' }"
              ><img
                class="header__menu--icon-item"
                src="@/assets/imgs/header/shopping_bag.svg"
                alt="shopping bag icon"
              />
            </router-link>
          </div>
          <button @click="auth.logout" class="button is-danger my-btn">Выход</button>

          <span class="header__menu--divider-vertical"></span>
          <img
            class="header__menu--icon-mobile menu-icon"
            src="@/assets/imgs/header/menu.svg"
            alt=" header menu icon "
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useRestaurantsStore } from "../../stores/restaurants";
import useAuthStore from "../../stores/auth";

const store = useRestaurantsStore();
const auth = useAuthStore();
</script>

<style lang="scss" scoped>
.my-btn {
  margin-bottom: 7px;
}
.header__menu {
  margin-top: 5px;
  position: sticky;
  top: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.header__menu--left-side {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.header__menu--logo {
  width: 500px;
  height: 80px;
}

/*  Here you can define styles how to create menu right side  */

.header__menu--right-side {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.header__menu--link {
  display: flex;
  align-items: center;
}

.menu_link {
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: var(--dark);
  list-style: none;
  margin: 0 28px;
}

.active {
  color: var(--primary);
}

.menu_link:hover {
  color: var(--primary);
  transition: 0.5s;
}

.header__navbar {
  display: flex;
  justify-content: space-between;
}

.header__menu--divider-vertical {
  height: 32px;
  border-right: 1px solid var(--grey-lightest);
}

.header__menu--icon {
  position: relative;
  margin-right: 12px;
}

.header__menu--icon-item {
  background-color: var(--primary-light);
  padding: 16px;
  border-radius: 16px;
}

.header__menu--icon-number {
  position: absolute;
  background-color: #4e60ff;
  border-radius: 8px;
  padding: 2px 6px;
  color: var(--white);
  right: -6px;
  top: -6px;
}

.header__menu--useravatar {
  border: 2px solid #edeef2;
  border-radius: 16px;
  padding: 2px;
}

.header__menu--icon-mobile {
  display: none;
}

.logo {
  margin-left: 30px;
  cursor: pointer;
}

/* sidebar menu */

.sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  height: 100%;
  width: 260px;
  padding: 20px 0;
  background-color: #fff;
  box-shadow: 0 5px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.header__menu.open .sidebar {
  left: 0;
}

.sidebar .sidebar-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 16px;
}

.sidebar-content .list {
  list-style: none;
}

.list .nav-link {
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 14px 12px;
  border-radius: 8px;
  text-decoration: none;
}

.lists {
  padding: 0;
}

.lists .nav-link:hover {
  background-color: #4070f4;
}

.nav-link .icon {
  margin-right: 14px;
  font-size: 20px;
  color: #707070;
}

.nav-link .link {
  font-size: 16px;
  color: #707070;
  font-weight: 400;
}

.lists .nav-link:hover .icon,
.lists .nav-link:hover .link {
  color: #fff;
}

.overlay {
  position: fixed;
  top: 0;
  left: -100%;
  height: 1000vh;
  width: 200%;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
  background: rgba(0, 0, 0, 0.3);
}

.header__menu.open ~ .overlay {
  opacity: 1;
  left: 260px;
  pointer-events: auto;
}
h1 {
  height: 1000px;
}

/* Here you can define styles how to change on mobile  */
@media screen and (max-width: 768px) {
  .header__menu--search {
    display: none;
  }

  .header__menu--logo {
    padding-left: 15px;
  }

  .header__menu--link {
    display: none;
  }

  .header__navbar {
    display: flex;
  }

  .header__menu--icon {
    margin-left: 59px;
  }

  .header__menu--useravatar {
    border: 2px solid var(--primary);
    margin-left: 12px;
  }

  .header__menu--divider-vertical {
    margin: 0 19px;
    border: 1px solid var(--grey-lightest);
    height: 32px;
    color: var(--grey);
  }

  .header__menu--icon-mobile {
    display: block;
    background: #edeef2;
    border-radius: 16px;
    padding: 14px;
    cursor: pointer;
    border: 1px solid var(--white);
  }

  .header__menu--icon-mobile:hover {
    border: 1px solid var(--primary);
  }
}

@media screen and (max-width: 1140px) {
  .container {
    padding: 0 15px;
  }
}
</style>
