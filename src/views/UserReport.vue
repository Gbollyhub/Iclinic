<template>
  <div>
    <Nav/>
   <div class="content">
     <h1 class="site-header">Medical Records</h1>
         <br>
     <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 class="post" v-for=" order in WOrders " :key = "order.id">
           <v-card class="post-card">
             <v-card-actions>
            <v-icon color="#f25d13" >account_box</v-icon>
            <h4 class="order-date">{{ order.UserId }}</h4>
             </v-card-actions>
            <v-list two-line>
               <template>
            <v-list-tile class="food-slot" :key="index" avatar ripple   >
              <v-list-tile-content>
                <v-list-tile-title class="food-name">Birth Month</v-list-tile-title>
              </v-list-tile-content>
            
              <v-list-tile-action>
              <h4 class="food-name">{{order.BirthDate}}th {{ order.BirthMonth }} </h4>  
              </v-list-tile-action>
            </v-list-tile>
     
               </template>     
        </v-list>

            <v-list two-line>
               <template>
            <v-list-tile class="food-slot" :key="index" avatar ripple   >
              <v-list-tile-content>
                <v-list-tile-title class="food-name">Temperament</v-list-tile-title>
              </v-list-tile-content>
            
              <v-list-tile-action>
              <h4 class="food-name">{{ order.Temperament }} </h4>  
              </v-list-tile-action>
            </v-list-tile>
     
               </template>     
        </v-list>

        <div style="padding:0px 15px 0px 15px;">
          <p>Recommendation</p>
          <p class="grey--text">{{ order.Recommendation }}</p>
        </div>
        <br>
         <div style="padding:0px 15px 0px 15px;">
          <p>Part B Values</p>
          <p class="grey--text">
            {{ order.Sadness }} | 
            {{order.LossofInterest}} |
             {{order.Cappetite}} |
         {{order.Concentration}} |
         {{order.Suicidal}} |
         {{order.Failure}} |
         {{order.Sleep}} |
         {{order.LossofEnergy}} |
         {{order.Irritability}}</p>
        </div>
        <br>
         <div style="padding:0px 15px 0px 15px;">
          <p>Depression Score</p>
          <p class="grey--text">{{ order.DepressionScore }}</p>
        </div>
        <div style="padding:0px 15px 0px 15px;">
          <p>Date</p>
          <p class="grey--text">{{ order.Date }}</p>
        </div>

              <v-card-actions class="footer-order">
                <v-btn flat>
                <v-icon color="#f25d13" class="ship-icon">report</v-icon>
            <h4>{{ order.DepressionLevel }}</h4></v-btn>
            <v-spacer></v-spacer>
            <div class="btn-a">
           <v-btn outline color="#f25d13" dark @click= "Delete(order.Id,index)" >Delete</v-btn> </div>
             </v-card-actions>
             
             
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
       data: () => ({
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify.js!',
          excerpt: 'Thank you for joining our community...'
        },
        {
          color: 'red',
          icon: 'people',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter'
        },
        {
          color: 'teal',
          icon: 'local_offer',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today'
        }
      ],
      lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'
    }),
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


