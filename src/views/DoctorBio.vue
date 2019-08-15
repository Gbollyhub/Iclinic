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
              <h1 class="site-header"> Dr. {{ Fullname }}</h1>
              <br>
              <p class="site-sub">{{ Summary }}</p>
          <v-rating readonly v-model= "Ratings" large color = "#FFD700" background-color="#FFD700"></v-rating>
            </v-flex>
  </center>
    </div>
   <div class="content">
     <v-layout row wrap>
          <v-flex xs12 sm12 md4 class="menu-flex" >
         <v-card class="menu-card" flat>
            <v-card-actions>
       <p>NAME</p> 
          <v-spacer></v-spacer>
        <p>Dr. {{Fullname}}</p> 
        </v-card-actions> <br><v-divider></v-divider><br>
           <v-card-actions>
       <p>QUALIFICATIONS</p> 
          <v-spacer></v-spacer>
        <p>{{Qualifications}}</p> 
        </v-card-actions><br><v-divider></v-divider><br>
           <v-card-actions>
       <p>SPECIALIZATION</p> 
          <v-spacer></v-spacer>
        <p>{{Specialization}}</p> 
        </v-card-actions><br><v-divider></v-divider><br>
         <v-card-actions>
       <p>STATE</p> 
          <v-spacer></v-spacer>
        <p>{{State}}</p> 
        </v-card-actions><br><v-divider></v-divider><br>
         </v-card>
       </v-flex>
        <v-flex xs12 sm12 md8 class="menu-flex" v-if="show" >
         <v-card class="menu-card" flat>
           <h1>Dr. {{Fullname}} is just one click away, reach out to him</h1>
            <v-flex xs12 sm12 md12 class="form-flex">
            <v-text-field
             v-model="title"
            label="Title of Consultation"
            color="#e61437"
          ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12 class="form-flex">
            <v-textarea
            v-model="body"
            color="#e61437"
          name="input-7-1"
          label="Describe in details what you need help with"
        ></v-textarea>
           </v-flex>
           <br>
            <v-btn @click="send" block color="#e61437" dark large depressed>Start Discussion</v-btn>
         </v-card>
         
       </v-flex>
         <v-flex xs12 sm12 md8 class="menu-flex" v-else >
         <v-card class="menu-card" flat>
           <h1>Your Message has been sent!! Check your message box for follow up</h1>
           <br>
           <v-btn outline color="#1c1c1c" @click="show = true">Send another Message</v-btn>
         </v-card>
         
       </v-flex>
       <br>
       <v-flex xs12 sm12 md12 class="menu-flex" >
         <v-card class="menu-card" flat>
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
                  show: true,
              doctors: [],
              userId: "",
              Fullname: "",
              Summary: "",
              Ratings: 0,
              Specialization: "",
              Qualifications: "",
              State: "",
              Photourl: "",
              title: "",
              body: "",
              getUser: ""
          }
      },
       components: {
         Nav,
          Footer
       },
          beforeRouteEnter (to, from, next) {
      db.collection('doctors').where('userId', '==', to.params.userId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            next(vm => {
               vm.userId = doc.data().userId
            vm.Fullname = doc.data().Fullname
            vm.Summary = doc.data().Summary
            vm.Ratings = doc.data().Ratings
            vm.Specialization = doc.data().Specialization
            vm.Qualifications = doc.data().Qualifications
            vm.State = doc.data().State
            vm.Photourl = doc.data().Photourl
            })
           
          })
        }
      )
  },
  created(){
     if(firebase.auth().currentUser){
                this.getUser = firebase.auth().currentUser.email;
     }
  db.collection('doctors').get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
             const data = {
            'userId' : doc.data().userId,
           'fullname' : doc.data().Fullname,
           'specialization' : doc.data().Specialization,
           'state' : doc.data().State,
          'ratings' : doc.data().Ratings.doctors,
          'photourl' : doc.data().Photourl
             }
             this.doctors.push(data)
          })
        }
      )
},
   watch: {
    '$route' : 'fetchData'
  },
   methods:{
     send(){
      let message = [{ "title" : this.title, "body" : this.body , "Date" : Date.now() , "From" : this.getUser  }]
     db.collection('doctors').where('userId', '==', this.userId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            doc.ref.update(
            {
             Messagebox : message
            }
            )
       .then(docRef => this.show = false)
       .catch(error => console.log(err))
        this.title = ""
        this.body = ""
      })
        }
           )
     },

    fetchData(){
      db.collection('doctors').where('userId', '==', this.$route.params.userId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
           this.userId = doc.data().userId
            this.Fullname = doc.data().Fullname
            this.Summary = doc.data().Summary
            this.Ratings = doc.data().Ratings
            this.Specialization = doc.data().Specialization
            this.Qualifications = doc.data().Qualifications
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


