<template>
  <div>
    <Nav/>
   <div class="content">
     <h1 class="site-header">Inbox</h1>
         <br>
     <v-layout row wrap>
       <v-flex xs12 sm12 md12 class="menu-flex">
         <v-card class="menu-card" flat>
  <v-layout
    column
    justify-center
  >
   
<div   v-for="(message, i) in messages"
        :key="i">
   <v-subheader>{{message.Date}}</v-subheader>
    <v-expansion-panel popout>
      <v-expansion-panel-content
        hide-actions
      >
        <template v-slot:header>
          <v-layout
            align-center
            row
            spacer
          >
            <v-flex xs4 sm2 md1>
              <v-avatar
                size="36px"
              >
                <img
  
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  alt="Avatar"
                >
              </v-avatar>
            </v-flex>

            <v-flex sm5 md3 hidden-xs-only>
              <strong v-html="message.From"></strong>
            </v-flex>

            <v-flex no-wrap xs5 sm3>
              <strong v-html="message.title"></strong>
            </v-flex>

          </v-layout>
        </template>

        <v-card>
          <v-divider></v-divider>
          <v-card-text> {{ message.body }}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </div>
    <v-divider></v-divider>
  </v-layout>
         </v-card>
       </v-flex>
     </v-layout>
   </div>
   <Footer/>
    </div>
</template>

<script>
import moment from 'moment'
import db from './firebaseinit.js';
import firebase from 'firebase';
import Footer from '../views/DoctorFooter.vue'
import Nav from '../views/Nav2.vue'

  export default {
       data: () => ({
      messages: [],
  
    }),
    created(){
       if(firebase.auth().currentUser){
                this.getUser = firebase.auth().currentUser.email;
     }
            db.collection('doctors').where('Email', '==', this.getUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            
           this.messages = doc.data().Messagebox
          })
        }
      )
    },
       components: {
         Nav,
         Footer
       },
       methods: {
         toDoctor(){
           this.$router.push("/view-doctors")
         },
         toHospital(){
           this.$router.push("/hospitals")
         },
         toProfile(){
           this.$router.push("/user-profile")
         }
       }
  }
</script>

<style scoped>
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:40px;}
.content {padding:50px 100px 50px 100px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}

  @media (max-width: 479px) {
.menu-flex {padding-right: 0px; padding-left : 0px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 15px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:40px;}
.content {padding:50px 20px 50px 20px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}
     }
</style>


