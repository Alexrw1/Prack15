<template>
  <div class="login">
    <div class="login_container">
      <div class="block_left-side">
        <div class="auth_form">
          <h1 class="login_name">Войти</h1>
          <label class="login_label" for="email">Почта или Логин</label>
          <input
            class="login_input"
            placeholder="name@example.com"
            id="email"
            type="text"
            name="email"
            v-model="loginData.email"
          />
          <template v-if="isAuth === true">
            <label class="login_label" for="password">Логин</label>
          <input
            class="login_input"
            placeholder="Логин"
            id="email"
            type="text"
            name="email"
            v-model="loginData.email"
          />
          </template>
          <label class="login_label" for="password">Пароль</label>
          <input
            class="login_input"
            placeholder="Минимум 8 символов"
            id="password"
            type="password"
            name="password"
            v-model="loginData.password"
          />
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
          <div class="chackbox">
            <input class="chackbox_sign" type="checkbox" name="checkbox" v-model="checkbox"/>
            <div class="chackbox_text">Оставаться в системе</div>
          </div>
          <button @click="isAuth ? registerUser() : authUser()" class="button_login">{{isAuth ? 'Зарегистрироваться' : 'Войти'}}</button>
          <a href="#" class="button_forgot">Забыли пароль</a>
          <div class="sign" v-if="isAuth === false">
            <p>
              Нет аккаунта?<a href="#" class="sign_inner" @click="isAuth = true">
                Зарегистрироваться</a
              >
            </p>
          </div>
          <div class="sign" v-else>
            <p>
              Есть аккаунт?<a href="#" class="sign_inner" @click="isAuth = false">
                Войти</a
              >
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>

</template>

<script setup>
import useAuthStore from "../stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const checkbox = ref(false);

const isAuth = ref(false);

const passwordError = ref("");

const auth = useAuthStore();

async function authUser() {
  try {
    await auth.login(loginData.email, loginData.password);
    if (checkbox.value) {
      localStorage.setItem('userId', auth.userId);
      localStorage.setItem('cartId', auth.cartId);
      localStorage.setItem('isAuthenticated', auth.isAuthenticated);
    }
    router.push({ name: "restaurants" });
  } catch (error) {
    throw new Error(error);
  }
}

function validatePassword() {
  if (loginData.password.length < 8) {
    passwordError.value = "Пароль должен содержать минимум 8 символов";
  } else {
    passwordError.value = "";
  }
}

async function registerUser() {
  try {
    await auth.register(loginData.email, loginData.username, loginData.password);
    if (checkbox.value) {
      localStorage.setItem('userId', auth.userId);
      localStorage.setItem('cartId', auth.cartId);
      localStorage.setItem('isAuthenticated', auth.isAuthenticated);
    }
    router.push({ name: "restaurants" });
  } catch (error) {
    throw new Error(error);
  }
}

const loginData = {
  username: "",
  email: "",
  password: "",
};

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.centered-content {
  text-align: center;
  margin: auto;
}
/* DEFAULT*/
.login {
  margin: 0 auto;
  width: 100%;
}

.login_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
}

/*BLOCK_LIFT-SIDE*/
.block_left-side {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* FORM*/
.auth_form {
  max-width: 700px;
  width: 100%;
}

.login_name {
  width: 100%;
  font-size: 32px;
  line-height: 82px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1px;

  color: var(--dark);
}

.login_label {
  margin-bottom: 5px;
  width: 100%;
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: var(--black);
}

.login_input {
  width: 100%;
  margin-bottom: 30px;
  padding-left: 10px;
  height: 44px;
  display: block;
  border: 1px solid var(--grey-light);
  border-radius: 8px;
}

.chackbox {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.chackbox_sign {
  margin-right: 12px;
  width: 20px;
  height: 20px;

  border: 2px solid var(--grey-light);
  border-radius: 4px;
}

.chackbox_text {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;

  color: var(--dark);
}

.button_login {
  width: 100%;
  margin-bottom: 35px;
  padding: 12px 16px;
  display: block;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  align-items: center;
  text-align: center;

  color: var(--white);
  border: 0;
  background-color: var(--primary);
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(78, 96, 255, 0.16);

  cursor: pointer;
}

.button_login:hover {
  background-color: rgba(0, 0, 0, 0.35);
}

.button_forgot {
  margin-bottom: 100px;
  width: 100%;
  display: block;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: var(--primary);

  border: 0;
  background-color: var(--white);
}

.button_forgot:hover {
  color: var(--primary);
}

.sign {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--black);
  text-align: center;
}

.sign_inner {
  font-size: 14px;
  color: var(--primary);
}

/*BLOCK_RIGHT-SIDE*/
.block_right-side {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;

  background-color: var(--primary);
}

.block_right-inner {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0 auto;
}

.block_right--title {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;

  color: var(--white);
}

.block_right--text {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;

  color: var(--white);
}

.circle {
  margin: 54px 0;
}

.circle_inner {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.circle_item {
  width: 8px;
  height: 8px;
  margin: 0 5px;

  opacity: 0.3;
  border-radius: 50%;
  background-color: var(--white);
}

.active {
  opacity: 1;
}

.header__navbar {
  display: none;
}

@media screen and (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .header__menu {
    margin: 15px 0;
    width: 100%;
  }

  .header__navbar {
    display: block;
  }

  .login_container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  .block_right-side {
    display: none;
  }
}
</style>
