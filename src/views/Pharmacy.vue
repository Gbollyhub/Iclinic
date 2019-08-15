<template>
  <div>
    <Nav/>
   <div class="content">
      <v-snackbar
   color="green"
      v-model="snackbar"
      :top="y === 'top'"
    >Added to Cart
    <v-btn
        color="blue"
        flat
       @click="showCart"
      >
        View Cart
      </v-btn>
     <v-btn
        color="red"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
     <h1 class="site-header">Pharmacy </h1>
         <br>
         <v-flex xs12 sm12>
          <v-text-field
          color= "#e61437"
             prepend-inner-icon="search"
            solo
            label="Search"
            clearable
          ></v-text-field>
        </v-flex>
     <v-layout row wrap>
        <v-flex xs12 sm12 md4 class="menu-flex" v-for=" item in Pharmacy" :key="item.id">
    <div class="res-title"><v-card class="menu-card" flat>
           <center>
                 <v-flex xs12 sm12 md12>
         <v-img
          :src="item.src"
          height="200px"
        >
        </v-img> 
            </v-flex>
              <br>
              <v-divider></v-divider>
              <br>
           </center>
           <h2>{{ item.product }}</h2>
           <p style="font-size:15px;">₦{{ item.price }}</p>
             <v-card-actions>
               <v-btn @click="Tobasket(item)" color="#e61437" dark>Add to Cart</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
         </v-card></div>
       </v-flex>
     </v-layout>
   </div>
    <v-dialog
      v-model="dialog"
      max-width="350"
      
    >
      <v-card class="dialog">
        <v-btn icon dark @click="dialog = false">
            <v-icon color="#e61437" class="close">close</v-icon>
          </v-btn>
       <center> Your Cart</center> 
           <br>
           <Cart :Basket = 'basket'></Cart>
        <v-card-actions>  
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <Footer/>
    </div>
</template>

<script>
import Footer from '../views/UserFooter.vue'
import db from './firebaseinit.js';
import firebase from 'firebase';
import { error } from 'util';
import Nav from '../views/Nav.vue';
import Cart from './Cart.vue'
  export default {
      data(){
          return{
              ratings:4,
              Pharmacy: [],
              user: null,
        currentUser: null,
        y: "top",
        snackbar: false,
        alarm: false,
       basket: [],
       dialog: false
          }
      },
       components: {
         Cart,
         Nav,
          Footer
       },
       created(){
  db.collection('pharmacy').get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
             const data = {
           'product' : doc.data().Product,
           'price' : doc.data().Price,
           'src' : doc.data().Src
             }
             this.Pharmacy.push(data)
          })
        }
      )
},

methods:{
  showCart(){
            this.dialog =true;
        },
 Tobasket(item){ 
        this.snackbar = true
        this.alarm =true
         this.basket.push({
          Name: item.product,
          Price: item.price,
          Quantity: 1
        })
      }
}
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


