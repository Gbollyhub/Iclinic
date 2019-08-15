<template>
  <div>
      <div v-if="currentUser">
           <Nav/>
   <div class="content">
     <h1 class="site-header">Dashboard</h1>
         <br>
     <v-layout row wrap>
        <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat>
           <center>
              <v-icon class="icon">view_list</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Patient Records</h2>
           </center>
         </v-card>
       </v-flex>
        <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat @click="toInbox">
           <center>
              <v-icon class="icon">email</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Inbox</h2>
           </center>
         </v-card>
       </v-flex>
        <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat @click="toProfile">
           <center>
              <v-icon class="icon">person_pin</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Profile</h2>
           </center>
         </v-card>
       </v-flex>
     </v-layout>
   </div>
   <Footer/>
      </div>
      <div v-else>
       <DoctorLogin/>
      </div>
   
    </div>
</template>

<script>
import db from './firebaseinit.js';
import firebase from 'firebase';
import Footer from '../views/DoctorFooter.vue'
import Nav from '../views/Nav2.vue'
import DoctorLogin from '../views/DoctorLogin.vue'
  export default {
       components: {
         Nav,
         Footer,
         DoctorLogin
       },
       data(){
           return {
               currentUser: null
           }
       },
       created () {
                  if(firebase.auth().currentUser){
                this.currentUser = firebase.auth().currentUser.email;
            }
    },
       methods: {
         toInbox(){
           this.$router.push("/doctor-inbox")
         },
         toDoctor(){
           this.$router.push("/view-doctors")
         },
         toHospital(){
           this.$router.push("/hospitals")
         },
         toProfile(){
           this.$router.push("/doctor-profile")
         }
       }
  }
</script>

<style scoped>
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #1c1c1c;}
.site-header{font-size:40px;}
.content {padding:50px 100px 50px 100px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}

     @media (max-width: 479px) {
.menu-flex {padding-right: 15px; padding-left : 15px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #1c1c1c;}
.site-header{font-size:40px;}
.content {padding:50px 10px 50px 10px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}


     }
</style>


