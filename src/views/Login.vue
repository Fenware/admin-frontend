<template>
  <div class="page bg-glass">
    <form @submit.prevent="login(user)" class="login">
      <h1>Login</h1>
      <span class="form-input">
        <input
          v-model="user.user"
          type="text"
          placeholder="Nombre de usuario o Email "
          required
        />
      </span>
      <span class="form-input">
        <input
          v-model="user.password"
          type="password"
          placeholder="Contraseña"
          required
        />
      </span>
      <input type="submit" class="form-button bg-glass" value="Ingresar" />
      <div class="box1 bg-glass"></div>
      <div class="box2 bg-glass"></div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
      user: {
        user: "administrador@admin.com",
        password: "mnoseadmin1234",
        type: "admin",
      },
    };
  },
  computed: {
    ...mapState(["API_URL"]),
  },
  mounted() {
    const box1 = document.querySelector(".box1");
    const box2 = document.querySelector(".box2");

    document.addEventListener("mousemove", (e) => {
      boxMove(e, box1, 3);
      boxMove(e, box2, -2);
    });

    function boxMove(e, box, speed) {
      let x = (window.innerWidth - e.pageX * speed) / 100;
      let y = (window.innerHeight - e.pageY * speed) / 100;

      box.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>

<style lang="scss" scoped>
/* .main{
    height: 100%;
    width: 100%;
    background: #4e54c8;
    background: -webkit-linear-gradient(to right, #4e54c8, #8f94fb);
    background: linear-gradient(to right, #4e54c8, #8f94fb);
} */

.page {
  padding: 1.8rem;
}
.login {
  height: 40rem;
  width: 40rem;
  span {
    margin: 4rem auto 4rem;
  }
}
.login::before {
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 2rem;
}
.login .box1 {
  position: absolute;
  z-index: 1;
  left: -5rem;
  top: -5rem;
  width: 10rem;
  height: 10rem;
}
.login .box2 {
  position: absolute;
  z-index: 1;
  right: -3rem;
  bottom: -3rem;
  width: 12rem;
  height: 12rem;
}
.box1,
.box2 {
  border-radius: 50% !important;
}
.login h1 {
  margin: 2rem 0;
  font-size: 4rem;
  color: #fff;
  text-align: center;
}
.form-input {
  display: block;
  width: 33rem;
  height: 5rem;
  margin-bottom: 2rem;
}
.form-input input {
  width: 100%;
  height: 100%;
  padding: 1.2rem 2rem;
  font-size: 16px;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border: 0;
  border-radius: 1.3rem;
  box-sizing: border-box;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}
input:hover,
input[type="text"]:focus,
input[type="password"]:focus {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
}
input:active,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="submit"]:focus {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 4px 4px 60px 8px rgba(255, 255, 255, 0.2);
  outline: none;
}
.form-input input::placeholder {
  color: white;
  transition: 0.3s;
}
.form-input input:focus::placeholder {
  opacity: 0;
}
.form-button {
  display: block;
  margin: 7rem auto;
  padding: 1.6rem 5rem;
  font-size: 1.6rem;
  color: #fff;
  border: 0;
  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
</style>
