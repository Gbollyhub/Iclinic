<template>
    <div class="login-pack">
        <center>
              <v-alert
      :value="isSubmit"
      type="success"
    >
      This is a success alert.
    </v-alert>
             <h1 class="login-header">i<span class="dot">.</span>c<span class="dot">.</span>l<span class="dot">.</span>i<span class="dot">.</span>n<span class="dot">.</span>i<span class="dot">.</span>c</h1>
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
            label="Residential Address"
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
            v-model="genotype"
            label="Genotype"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
            v-model="bloodgroup"
            label="Blood Group"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md4 class="form-flex">
            <v-text-field
             :rules="rules"
             v-model="age"
            label="How old are you?"
            color="#e61437"
          ></v-text-field>
           </v-flex>
            <v-flex xs12 sm12 md6 class="form-flex">
            <v-text-field
            type="password"
             :rules="rules"
             v-model="password"
            label="Password"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md6 class="form-flex">
            <v-textarea
            v-model="ailment"
            color="#e61437"
          name="input-7-1"
          label="Any past ailment we should know about?"
        ></v-textarea>
           </v-flex>
            <v-flex xs12 sm12 md12 class="form-flex">
            <v-text-field
             :rules="rules"
             v-model="photourl"
            label="Photourl"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           </v-layout>
         
    
          <br>
          <v-btn @click="register" block color="#e61437" dark large depressed>Register</v-btn>
          <br>
    <span class="slip">Already have an account?? <router-link to="/login">Login into your account</router-link> </span> 
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
            photourl: "",
            fullname: "",
            gender: "",
            email: "",
            address: "",
            state: "",
            number: "",
            genotype: "",
            bloodgroup: "",
            age: "",
            ailment: "",
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
                     db.collection('users').doc(this.email).set({
         Date: Date.now(),
          Fullname: this.fullname,
        Email: this.email, 
         Password: this.password,
         Address: this.address,
     State: this.state,
      PhoneNumber: this.number,
      Gender: this.gender,
      Bloodgroup: this.bloodgroup,
      Genotype: this.genotype,
      Age: this.age,
       Ailment: this.ailment,
       Messagebox: this.Messagebox,
       Date: this.Date,
       History: this.History,
       Prescription: this.prescription,
       Photourl : this.photourl
       })
        .then(
         firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
          .then( user => {
               this.isSubmit = true
              this.clear();
              this.$router.go({ path: this.$router.path })
          },
          err => {
              alert(err.message);
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
            this.genotype= null
            this.bloodgroup= null
            this.age= null
            this.ailment= null
            this.photourl = null
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

