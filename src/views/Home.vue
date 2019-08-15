<template>
  <div>
    <Nav/>
   <div class="content">
     <h1 class="site-header">Dashboard</h1>
     <div v-for= "item in apiData" :key="item.id">
       <p> {{apiData}} </p>
     </div>
         <br>
     <v-layout row wrap>
       <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat @click="toDoctor">
           <center>
              <v-icon class="icon">supervised_user_circle</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Search for doctors close to you</h2>
           </center>
         </v-card>
       </v-flex>
        <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat @click="toHospital">
           <center>
              <v-icon class="icon">map</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Look for hospitals close to you</h2>
           </center>
         </v-card>
       </v-flex>
        <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat @click="toRecords">
           <center>
              <v-icon class="icon">view_list</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Medical Reports</h2>
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
       <v-flex xs12 sm12 md4 class="menu-flex">
         <v-card class="menu-card" flat @click="toPharmacy">
           <center>
              <v-icon class="icon">local_pharmacy</v-icon>
              <br>
              <v-divider></v-divider>
              <br>
              <h2>Pharmacy</h2>
           </center>
         </v-card>
       </v-flex>
     </v-layout>
   </div>
   <Footer/>
    </div>
</template>

<script>
import Footer from '../views/UserFooter.vue'
import Nav from '../views/Nav.vue'
  export default {
    data(){
      return {
         apiData: ""
      }
    },
       components: {
         Nav,
         Footer
       },
       created() {
      return fetch("http://localhost:8080/users", {
                method : "GET"
            })
            .then( response => {
                return response.json()
            })
            .then(data => {
                if(data.error){
                  console.log(data.error)
                }
                else{
                  this.apiData = data
                }
            })
       },
       methods: {
         toInbox(){
           this.$router.push("/inbox")
         },
         toDoctor(){
           this.$router.push("/view-doctors")
         },
         toHospital(){
           this.$router.push("/hospitals")
         },
         toProfile(){
           this.$router.push("/user-profile")
         },
          toPharmacy(){
           this.$router.push("/pharmacy")
         },
         toRecords(){
           this.$router.push("/user-records")
         },
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


    @media (max-width: 991px) {

    }

    @media (max-width: 767px) {

    }

     @media (max-width: 479px) {
.menu-flex {padding-right: 15px; padding-left : 15px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:40px;}
.content {padding:50px 10px 50px 10px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}


     }
</style>


