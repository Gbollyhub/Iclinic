<template>
    <div class="login-pack">
        <center>
              <v-alert
      :value="isSubmit"
      type="success"
    >
      Operation Successful!!!
       <v-btn
        dark
        flat
        @click="isSubmit = false"
      >
        Close
      </v-btn>
    </v-alert>
        <h1 class="login-header">i<span class="dot">.</span>c<span class="dot">.</span>l<span class="dot">.</span>i<span class="dot">.</span>n<span class="dot">.</span>i<span class="dot">.</span>c<span style="color:#e61437;font-size:30px"> Admin</span></h1>
        <br>
  <v-tabs
      color="white"
      slider-color="#e61437"
      show-arrows
      fixed centered
      class="tabs"
    >
      <v-tab ripple>ADD HOSPITAL</v-tab>
       <v-tab ripple>ADD DRUGS</v-tab>
       <v-tab ripple>DRUGS ORDERS MANAGEMENT</v-tab>
       
       <v-tab-item>
         <v-card flat>
           <br><br>
            <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="form">
           <v-layout row wrap>
                 <v-flex xs12 sm12 md4 class="form-flex">
                 <v-text-field
                 :rules="rules"
                 v-model = "fullname"
            label="Hospital Name"
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
            v-model="hours"
            label="Open Hours"
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
           <v-flex xs12 sm12 md8 class="form-flex">
            <v-textarea
            v-model="summary"
            color="#e61437"
          name="input-7-1"
          label="A little summary about the hospital"
        ></v-textarea>
           </v-flex>
           </v-layout>
         
    
          <br>
          <v-btn @click="Add" block color="#e61437" dark large depressed>Add Hospital</v-btn>
          <br>
       </div>
      </v-flex>
         </v-layout>
         </v-card>
       </v-tab-item>
        <v-tab-item>
          <v-card flat>
           <br><br>
            <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="form">
           <v-layout row wrap>
                 <v-flex xs12 sm12 md6 class="form-flex">
                 <v-text-field
                 v-model = "Product"
            label="Product Name"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md6 class="form-flex">
            <v-text-field
            v-model.number = "Price"
            label="Price"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           <v-flex xs12 sm12 md6 class="form-flex">
            <v-text-field
            v-model = "Src"
            label= "Product Image Url eg e.g https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            color="#e61437"
          ></v-text-field>
           </v-flex>
           </v-layout>
         
    
          <br>
          <v-btn @click="AddDrugs" block color="#e61437" dark large depressed>Add Product</v-btn>
          <br>
       </div>
      </v-flex>
         </v-layout>
         </v-card>
        </v-tab-item>
       <v-tab-item>
          <v-card flat>
            <br><br>
             <div class="orders">
              
               <table id="customers">
  <tr>
    <th>Order Ref</th>
    <th>Food Item</th>
    <th>Prize</th>
    <th>Quantity</th>
    <th>Customer</th>
    <th>Phone Number</th>
    <th>Address</th>
    <th>Payment Type</th>
    <th>Payment Status</th>
    <th>Order Total</th>
    <th>Delivery Status</th>
  </tr>
   <tbody v-for= "(order, index) in WOrders " :key="order.id">
     <br>
     <strong>Date: {{ order.timestamp }}</strong>
     <br>
    <strong><em>Order Number: {{ index + 1 }} </em></strong>
    <tr v-for= "item in order.AllOrders" :key="item.id">
       <td> {{ order.OrderId }} </td>
   <td> {{ item.Name }} </td>
    <td>₦{{ item.Price }}</td>
  <td>{{ item.Quantity }}</td>
   <td>{{ order.Customer }}</td>
    <td>{{ order.PhoneNumber }}</td>
    <td>{{ order.Address }}</td>
     <td>{{ order.PaymentType }}</td>
      <td>{{ order.PaymentStatus }} <v-btn color="#e61437" flat dark >Change</v-btn></td>
       <td>{{ order.OrderTotal }}</td>
        <td>{{ order.DeliveryStatus }} <v-btn  color="#e61437" flat dark >Change</v-btn></td>

  </tr>
   </tbody>
 

</table>
         </div>
         </v-card>
       </v-tab-item>
       
      </v-tabs>
       </center>
    </div>
</template>

<script>
import db from './firebaseinit.js';
import firebase from 'firebase';
import { error } from 'util';
import moment from 'moment';
 
export default {
    data(){
        return{
          Price: 0,
          Product: "",
          Src: "",
          user: '',
          currentUser: null,
            WOrders : [],
            isSubmit: false,
            fullname: "",
            gender: "",
            address: "",
            state: "",
            number: "",
            hours: "",
            photourl: "",
            summary: "",
            statePack: ["Lagos","Abuja"],
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
    db.collection('Orders').orderBy('Date').get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            const data = {
              "PhoneNumber" : doc.data().PhoneNumber,
              'timestamp' :  moment(doc.data().Date).format('LLL'),
             'Address': doc.data().Address,
             'AllOrders': doc.data().AllOrders,
             'Customer': doc.data().Customer,
             'DeliveryStatus': doc.data().DeliveryStatus,
             'Email': doc.data().Email,
             'OrderId': doc.data().OrderId,
             'OrderTotal': doc.data().OrderTotal,
             'PaymentStatus': doc.data().PaymentStatus,
             'PaymentType': doc.data().PaymentType,
           }
           this.WOrders.push(data)
          })
        } 
      )
     }
     },
    
    methods:{
       AddDrugs(){
                     db.collection('pharmacy').doc(this.Product).set({
         Date: Date.now(),
          Product: this.Product,
         Price: this.Price,
         Src: this.Src
       })
        .then(
               this.isSubmit = true,
              this.Product = "",
              this.Price = "", 
              this.Src = "")
       .catch(error => console.log(err))
    
      },
              Add(){
                     db.collection('hospitals').doc(this.fullname).set({
         Date: Date.now(),
          Fullname: this.fullname,
         Address: this.address,
     State: this.state,
      PhoneNumber: this.number,
      Photourl: this.photourl,
      hours: this.hours,
       Summary: this.summary,
       Ratings: 3
       })
        .then(
               this.isSubmit = true,
              this.clear())
       .catch(error => console.log(err))
      },
      clear(){
         this.fullname = null
            this.email= null
            this.address= null
            this.state= null
            this.number= null
            this.hours= null
            this.photourl= null
            this.summary= null
      }
    }
}
</script>

<style scoped>
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #e61437;
  color: white;
}

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

