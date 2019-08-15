<template>
  <div>
    <Nav/>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" width="800px" >
  
      <v-card class="dialog">
        <v-card-title>
          <span class="headline">{{ fullname }}</span>
        </v-card-title>
        <v-layout row wrap>
            <v-flex xs12 sm12 md4>
              <img :src= photourl alt="" width="200px;">
            </v-flex>
            <v-flex xs12 sm12 md8>
 <v-card-text>Address : {{ address }}</v-card-text>
 <v-card-text>Hours : Opens {{ hours }}</v-card-text>
 <v-card-text>State : {{ state }}</v-card-text>
 <v-card-text>Summary : {{ Summary }}</v-card-text>
 
            </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="brown darken-1" flat="flat" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
   <div class="content">
     <h1 class="site-header">Hospitals</h1>
         <br>
         <v-flex xs12 sm12>
          <v-text-field
          color= "#e61437"
             prepend-inner-icon="search"
            solo
            label="Look for Hospitals close to you.eg. Lagos, Abuja, Lekki, Garki etc"
            clearable
          ></v-text-field>
        </v-flex>
     <v-layout row wrap>
        <v-flex xs12 sm12 md4 class="menu-flex" v-for=" doctor in hospitals" :key="doctor.id">
            <v-card class="menu-card" flat>
           <center>
                 <v-flex xs12 sm12 md12>
         <v-img
          :src="doctor.photourl"
          height="200px"
        >
        </v-img> 
            </v-flex>
              <br>
              <v-divider></v-divider>
              <br>
           </center>
           <h2>{{ doctor.fullname }}</h2>
           <p> Opens : {{ doctor.hours }}</p>
           <p>Address: {{ doctor.address }}</p>
             <v-card-actions>
        <v-chip>{{ doctor.state }}</v-chip>
          <v-spacer></v-spacer>
          <v-rating readonly v-model= "doctor.ratings" small color = "#f25d13" background-color="#f25d13"></v-rating>
        </v-card-actions>
        <v-btn @click="show(doctor)" block color="#e61437" dark large depressed>More Info</v-btn>
         </v-card> 
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
import Nav from '../views/Nav.vue'
  export default {
      data(){
          return{
              ratings:4,
              hospitals: [],
              dialog: false,
              fullname: "",
              hours: "",
              state: "",
              ratings: "",
              photourl: "",
              address: "",
              Summary: ""
          }
      },
       components: {
         Nav,
         Footer
       },
       created(){
  db.collection('hospitals').get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
             const data = {
           'fullname' : doc.data().Fullname,
           'hours' : doc.data().hours,
           'state' : doc.data().State,
          'ratings' : doc.data().Ratings,
          'photourl' : doc.data().Photourl,
          "address" : doc.data().Address
             }
             this.hospitals.push(data)
          })
        }
      )
},
methods:{
   show(doctor){
              db.collection('hospitals').where( "Address", "==", doctor.address).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
         
              this.fullname = doc.data().Fullname,
           this.hours = doc.data().hours,
           this.state = doc.data().State,
          this.ratings = doc.data().Ratings,
          this.photourl = doc.data().Photourl,
          this.address = doc.data().Address,
          this.Summary = doc.data().Summary
          })
        } 
      ).then( this.dialog = true)
      }
}
  }
</script>

<style scoped>
.dialog {padding: 30px; z-index: 999;}
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 30px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:40px;}
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


