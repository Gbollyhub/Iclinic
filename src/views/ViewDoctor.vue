<template>
  <div>
    <Nav/>
   <div class="content">
     <h1 class="site-header">Available Doctors</h1>
         <br>
         <v-flex xs12 sm12>
          <v-text-field
          color= "#e61437"
             prepend-inner-icon="search"
            solo
            label="Filter Doctors.eg. Lagos, Abuja, Dermatologist, Dentist etc"
            clearable
          ></v-text-field>
        </v-flex>
     <v-layout row wrap>
        <v-flex xs12 sm12 md4 class="menu-flex" v-for=" doctor in doctors" :key="doctor.id">
    <div class="res-title">  <router-link
           :to="{
           name: 'DoctorBio',
           params: {userId: doctor.userId}
            }">         <v-card class="menu-card" flat>
           <center>
                 <v-flex xs12 sm12 md12>
          <v-avatar
                size="150px"
              >
                <img
                  :src="doctor.photourl"
                  alt="Avatar"
                >
              </v-avatar> 
            </v-flex>
              <br>
              <v-divider></v-divider>
              <br>
           </center>
           <h2>{{ doctor.fullname }}</h2>
           <p>{{ doctor.specialization }}</p>
             <v-card-actions>
        <v-chip>{{ doctor.state }}</v-chip>
          <v-spacer></v-spacer>
          <v-rating readonly v-model= "doctor.ratings" small color = "#f25d13" background-color="#f25d13"></v-rating>
        </v-card-actions>
         </v-card> </router-link></div>
       </v-flex>
     </v-layout>
   </div>
     <Footer/>
    </div>
</template>

<script>
import Footer from '../views/UserFooter.vue'
import db from './firebaseinit.js';
import firebase from 'firebase';
import { error } from 'util';
import Nav from '../views/Nav.vue';
  export default {
      data(){
          return{
              ratings:4,
              doctors: []
          }
      },
       components: {
         Nav,
          Footer
       },
       created(){
  db.collection('doctors').get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
             const data = {
            'userId' : doc.data().userId,
           'fullname' : doc.data().Fullname,
           'specialization' : doc.data().Specialization,
           'state' : doc.data().State,
          'ratings' : doc.data().Ratings,
          'photourl' : doc.data().Photourl
             }
             this.doctors.push(data)
          })
        }
      )
},
  }
</script>

<style scoped>
.res-title{ color:rgb(46, 46, 46); text-decoration: none;}
.res-title a { color:rgb(46, 46, 46); text-decoration: none;}
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 30px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:50px;}
.content {padding:50px 100px 50px 100px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}

     @media (max-width: 479px) {
.res-title{ color:rgb(46, 46, 46); text-decoration: none;}
.res-title a { color:rgb(46, 46, 46); text-decoration: none;}
.menu-flex {padding-right: 15px; padding-left : 15px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 30px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:50px;}
.content {padding:50px 15px 50px 15px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}
     }
</style>


