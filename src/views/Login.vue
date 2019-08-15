<template>
    <div class="login-pack">
        <center>
             <h1 class="login-header">i<span class="dot">.</span>c<span class="dot">.</span>l<span class="dot">.</span>i<span class="dot">.</span>n<span class="dot">.</span>i<span class="dot">.</span>c</h1>
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
    <span class="slip"><router-link to="/register">Register for an account</router-link></span> 
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
            password: ""
        }
    },
     methods: {
            Login(e){

                 firebase.auth().signInWithEmailAndPassword(this.email,this.password)
          .then( user => {
              this.snackbar = true
              this.$router.go({ path: this.$router.path })
             
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

