<template>
  <div>
    <Nav/>
    <div class="banner">
  <center>
        <v-flex xs12 sm12 md12>
              <v-avatar
                size="250px"
              >
                <img
                  :src= "Photourl"
                  alt="Avatar"
                >
              </v-avatar>
              <h1 class="site-header">{{ Fullname }}</h1>
              <br>
            </v-flex>
  </center>
    </div>
   <div class="content">
     <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="menu-flex" >
         <v-card class="menu-card" flat>
            <div class="form">
           <v-layout row wrap>
                 <v-flex xs12 sm12 md4 class="form-flex">
                 <v-text-field
                 :rules="rules"
                 v-model = "Fullname"
            label="Full Name"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4>
            <v-select
            v-model="Gender"
            :items="genderPack"
            label="Gender"
           color="#e61437"
           required
         ></v-select>
           </v-flex>
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
            :rules="emailRules"
            v-model="Email"
            label="Email Address"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
            :rules="rules"
            v-model="Address"
            label="Residential Address"
            color="#e61437"
          ></v-text-field>
           </v-flex>
              <v-flex xs12 sm12 md4>
          <v-select
            v-model="State"
            :items="statePack"
            label="State"
           color="#e61437"
           required
         ></v-select>
           </v-flex>  
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model ="Phonenumber"
            label="Phone Number"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model="Genotype"
            label="Genotype"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model="Bloodgroup"
            label="Blood Group"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
             v-model="Age"
            label="How old are you?"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md6 class="form-flex">
            <v-textarea
            v-model="Ailment"
            color="#e61437"
          name="input-7-1"
          label="Any past ailment we should know about?"
        ></v-textarea>
           </v-flex>
            <v-flex xs12 sm12 md12 class="form-flex">
            <v-text-field
             :rules="rules"
             v-model="Photourl"
            label="Photourl"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           </v-layout>
         
    
          <br>
          <v-btn @click="update" block color="#e61437" dark large depressed>Update</v-btn>
          </div>
         </v-card>
         
       </v-flex>
     </v-layout><v-btn block depressed dark @click="logout" color="#1c1c1c">Logout</v-btn>
   </div>
   <br><br>
   <Footer/>
    </div>
</template>

<script>
import Footer from '../views/DoctorFooter.vue'
import db from './firebaseinit.js';
import firebase from 'firebase';
import { error } from 'util';
import Nav from '../views/Nav2.vue'
  export default {
      data(){
          return{

              doctors: [],
              userId: "",
              Fullname: "",
              Summary: "",
              Ratings: 0,
              Age: "",
              Gender: "",
              State: "",
              Photourl: "",
              currentUser: "",
              Genotype: "",
              Bloodgroup: "",
              Ailment: "",
              Phonenumber: "",
              Address: ""
          }
      },
       components: {
         Nav,
         Footer
       },

  created(){
     if(firebase.auth().currentUser){
                this.currentUser = firebase.auth().currentUser.email;
                 db.collection('users').where('Email', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Fullname
          })
        } 
      )
          db.collection('doctors').where('Email', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.userId = doc.data().userId
            this.Fullname = doc.data().Fullname
            this.Summary = doc.data().Summary
            this.Ratings = doc.data().Ratings
            this.Age = doc.data().Age
            this.Gender = doc.data().Gender
            this.State = doc.data().State
            this.Photourl = doc.data().Photourl
          })
        }
      )
            }

},
   methods:{
      logout(){
           firebase.auth().signOut()
           .then(() => {
               this.$router.go({ path: this.$router.path })
           });
       },
     update() {
       
     },
    fetchData(){
      db.collection('doctors').where('userId', '==', this.$route.params.userId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
           this.userId = doc.data().userId
            this.Fullname = doc.data().Fullname
            this.Summary = doc.data().Summary
            this.Ratings = doc.data().Ratings
            this.Age = doc.data().Age
            this.Gender = doc.data().Gender
            this.State = doc.data().State
            this.Photourl = doc.data().Photourl
          })
        }
      )
    }
   }
  }
</script>

<style scoped>
.form-flex {padding-right: 10px; padding-left: 10px;}
.banner {height: auto; padding:50px 300px;background:#e61437; }
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:40px; color: white;}
.site-sub{font-size:18px; color: white;}
.content {padding:50px 100px 50px 100px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}

  @media (max-width: 479px) {
.banner {height: auto; padding:50px 20px;background:#e61437; }
.menu-flex {padding-right: 15px; padding-left : 15px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 30px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:30px;}
.content {padding:50px 15px 50px 15px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}
     }
</style>


