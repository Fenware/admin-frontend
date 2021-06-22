<template>
  <div class="page bg-glass">
    <form v-on:submit.prevent="login" class="login">
        <h1>Login</h1>
        <span class="form-input">
            <input v-model="userNickName" type="text" placeholder="Nombre de usuario o Email " required>
        </span>
        <span class="form-input">
            <input v-model="userPassword" type="password" placeholder="Password" required>
        </span>
        <input type="submit" class="form-button bg-glass" value="Ingresar">
        <div class="box1 bg-glass"></div>
        <div class="box2 bg-glass"></div>
    </form>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios';
export default {
    name: 'Login',
	data: function() {
		return { 
			userNickName:"administrador@admin.com",
			userPassword:"mnoseadmin1234"
		}
	},
	computed: {
		...mapState([
			'API_URL'
		])
	},
    mounted(){
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
	methods:{
		async login(){
			let payload = {
				user: this.userNickName,
				password: this.userPassword,
				type: 'admin'
			}
			let headers = {
				'Content-Type': 'application/json'
			}
			console.log(payload);
			await this.axios.post(this.API_URL + "/auth", payload, {headers: headers}).then(response => {
					console.log(response);
			}).catch(err => {
				console.log(err.response);
			});
		}
	}
}
</script>

<style lang="scss" scoped>
/* .main{
    height: 100%;
    width: 100%;
    background: #4e54c8;
    background: -webkit-linear-gradient(to right, #4e54c8, #8f94fb);
    background: linear-gradient(to right, #4e54c8, #8f94fb);
} */
.page{
    padding:2rem;
}
.login{
    height:40rem;
    width: 40rem;
    span{
        margin: 4rem auto 4rem;
    }
}
.login::before {
	content: '';
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
.box1, .box2{
    border-radius: 50%!important;
}
.login h1 {
	margin: 2rem 0;
	font-size: 4rem;
	color: #fff;
	text-align: center;
}
.form-input {
	display: block;
	width: 30rem;
	height: 5rem;
	margin-bottom: 2rem;
}
.form-input input {
	width: 100%;
	height: 100%;
	padding: 1rem 2rem;
	font-size: 16px;
	color: #fff;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	border: 0;
	border-radius: 1rem;
	box-sizing: border-box;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	outline: none;
}

.form-input input::placeholder {
	color: white;
	transition: .3s;
}
.form-input input:focus::placeholder {
	opacity: 0;
}
.form-button {
	display: block;
	margin: 7rem auto;
	padding: 15px 3rem;
	font-size: 14px;
	text-transform: uppercase;
	color: #fff;
	border: 0;
	border-radius: 1rem;
	outline: none;
	cursor: pointer;
	transition: .3s ease-in-out;
}
.form-button:hover {
    background-color: rgba(126, 126, 126, 0.548);
}
</style>