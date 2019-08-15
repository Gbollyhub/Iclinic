<template>
    <div class="login-pack">
        <center>
              <v-alert
      :value="isSubmit"
      type="success"
    >
      Account successfully created!!!
    </v-alert>
        <h1 class="login-header">i<span class="dot">.</span>c<span class="dot">.</span>l<span class="dot">.</span>i<span class="dot">.</span>n<span class="dot">.</span>i<span class="dot">.</span>c<span style="color:#e61437;font-size:30px"> Doctors</span></h1>
            
        <h2>Register for an account with us</h2>
        <br>
       <div class="form">
           <v-layout row wrap>
                 <v-flex xs12 sm12 md4 class="form-flex">
                 <v-text-field
                 :rules="rules"
                 v-model = "fullname"
            label="Full Name"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4>
            <v-select
            v-model="gender"
            :items="genderPack"
            label="Gender"
           color="#e61437"
           required
         ></v-select>
           </v-flex>
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
            :rules="emailRules"
            v-model="email"
            label="Email Address"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
            :rules="rules"
            v-model="address"
            label="Office Address"
            color="#e61437"
          ></v-text-field>
           </v-flex>
              <v-flex xs12 sm12 md4>
          <v-select
            v-model="state"
            :items="statePack"
            label="State"
           color="#e61437"
           required
         ></v-select>
           </v-flex>  
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model ="number"
            label="Phone Number"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model="qualifications"
            label="Qualifications eg MBBS, MD etc"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model="photourl"
            label="Photo Url e.g https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
             v-model="specialization"
            label="Specializaton eg Dentist, Surgeon etc"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
            type="password"
             :rules="rules"
             v-model="password"
            label="Password"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md8 class="form-flex">
            <v-textarea
            v-model="summary"
            color="#e61437"
          name="input-7-1"
          label="Tell us a little about you and your experiences"
        ></v-textarea>
           </v-flex>
           </v-layout>
         
    
          <br>
          <v-btn @click="register" block color="#e61437" dark large depressed>Create Account</v-btn>
          <br>
    <span class="slip">Already have an account?? <router-link to="/doctor-home">Login into your account</router-link> </span> 
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
            isSubmit: false,
            fullname: "",
            gender: "",
            email: "",
            address: "",
            state: "",
            number: "",
            qualifications: "",
            photourl: "",
            specialization: "",
            summary: "",
            genderPack: ["Male","Female","Others"],
            statePack: ["Lagos","Abuja"],
            Messagebox: [],
            Date: Date.now(),
            History: [],
            prescription:[],
            password: "",
            emailRules: [
        v => !!v || 'This field is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      rules: [
        v => !!v || 'This field is required',
      ]
        }
    },
    
    methods:{
              register(e){
                     db.collection('doctors').doc(this.email).set({
         Date: Date.now(),
          Fullname: this.fullname,
        Email: this.email, 
         Password: this.password,
         Address: this.address,
     State: this.state,
      PhoneNumber: this.number,
      Gender: this.gender,
      Photourl: this.photourl,
      Qualifications: this.qualifications,
      Specialization: this.specialization,
       Summary: this.summary,
       Messagebox: this.Messagebox,
       Date: this.Date,
       History: this.History,
       Prescription: this.prescription,
       Ratings: 3
       })
        .then(
         firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
          .then( user => {
               this.isSubmit = true
              this.clear();
              this.$router.go({ path: this.$router.path })
          },
          err => {
              alert(err.messspecialization);
          }
          )
       )
       .catch(error => console.log(err))
    e.preventDefault();
      },
      clear(){
         this.fullname = null
            this.gender= null
            this.email= null
            this.address= null
            this.state= null
            this.number= null
            this.qualifications= null
            this.photourl= null
            this.specialization= null
            this.summary= null
      }
    }
}
</script>

<style scoped>
.form-flex {padding-right: 10px; padding-left: 10px;}
.form {width:700px;}
.slip a { color: #e61437;}
.slip{ color: #e61437;}
.dot{ color: #e61437;}
.login-pack { padding-top:20px;}
.login-header {font-size: 100px;font-family: 'Shadows Into Light', cursive;}

     @media (max-width: 479px) {
.form-flex {padding-right: 10px; padding-left: 10px;}
.form {width:300px;}
.slip a { color: #e61437;}
.slip{ color: #e61437;}
.dot{ color: #e61437;}
.login-pack { padding-top:20px;}
.login-header {font-size: 80px;font-family: 'Shadows Into Light', cursive;}

     }
</style>

