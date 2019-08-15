<template>
  <div>
     <v-toolbar color="#1c1c1c" flat>
        <h1 class="logo-header" @click="toHome">i<span class="dot">.</span>c<span class="dot">.</span>l<span class="dot">.</span>i<span class="dot">.</span>n<span class="dot">.</span>i<span class="dot">.</span>c</h1>
    <v-toolbar-title>
    </v-toolbar-title>
    <v-spacer></v-spacer> 
    <v-btn depressed dark @click="back" color="#e61437">Go Back</v-btn>
    <v-toolbar-items class="hidden-sm-and-down">
     
      <v-btn flat dark>Hii Dr {{user}}</v-btn>
      <v-btn dark color="#e61437" depressed @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  </div>
</template>

<script>
import db from './firebaseinit.js'
import {  firebaseinit } from './firebaseinit.js'
import firebase from 'firebase'
  export default {
    data(){
        return {
          user:"",
          currentUser: ""
        }
    },
       created(){
                  if(firebase.auth().currentUser){
                this.currentUser = firebase.auth().currentUser.email;
                 db.collection('doctors').where('Email', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Fullname
          })
        } 
      )
            }
    },
  methods:{
          toHome(){
        this.$router.push("/doctor-home")
              },
           back(){
               this.$router.go(-1)
           },
      
       logout(){
           firebase.auth().signOut()
           .then(() => {
               this.$router.go({ path: this.$router.path })
           });
       }
    }
  }
</script>

<style scoped>
.form-flex {padding-right: 10px; padding-left: 10px;}
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #1c1c1c;}
.site-header{font-size:50px;}
.content {padding:50px 100px 50px 100px;}
.dot{ color: #ffffff;}
.logo-header {color:#e61437;font-size: 40px;font-family: 'Shadows Into Light', cursive; cursor: pointer;}
</style>


