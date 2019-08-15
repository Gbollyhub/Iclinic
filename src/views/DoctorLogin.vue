<template>
    <div class="login-pack">
        <center>
             <h1 class="login-header">i<span class="dot">.</span>c<span class="dot">.</span>l<span class="dot">.</span>i<span class="dot">.</span>n<span class="dot">.</span>i<span class="dot">.</span>c<span style="color:#e61437;font-size:30px"> Doctors</span></h1>
        <h2>Login into your Account</h2>
        <br>
       <div class="form">
             <v-text-field
             v-model="email"
            label="Email Address"
            color="#e61437"
          ></v-text-field>
          <v-text-field
          type="password"
          v-model="password"
            label="Password"
            color="#e61437"
          ></v-text-field>
          <br>
          <v-btn @click="Login" block color="#e61437" dark large depressed>Login</v-btn>
          <br>
    <span class="slip">Dont have an account yet?? <router-link to="/register-doctors">Register for one</router-link> </span> 
       </div>
        
 </center>
    </div>
</template>

<script>
import db from './firebaseinit.js';
import firebase from 'firebase';
import { error } from 'util';
 
export default {
    data(){
        return{
            email: "",
            password: "",
        }
    },
     methods: {
            Login(e){

                 firebase.auth().signInWithEmailAndPassword(this.email,this.password)
          .then( user => {
               alert("You are Logged in");
              this.$router.go({ path: '/doctor-home' })
          },  err => {
              alert(err.message);
          }
          )
       e.preventDefault(); 
      }
}
}
</script>

<style scoped>
.form {width:300px;}
.slip a { color: #e61437;}
.slip{ color: #e61437;}
.dot{ color: #e61437;}
.login-pack { padding-top:100px;}
.login-header {font-size: 100px;font-family: 'Shadows Into Light', cursive;}

     @media (max-width: 479px) {
.form {width:300px;}
.slip a { color: #e61437;}
.slip{ color: #e61437;}
.dot{ color: #e61437;}
.login-pack { padding-top:100px;}
.login-header {font-size: 80px;font-family: 'Shadows Into Light', cursive;}
     }
</style>

