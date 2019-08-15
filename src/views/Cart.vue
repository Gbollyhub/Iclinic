<template>
<div class="cart"> 
 
    <v-data-table
    :headers="headers"
    :items="Basket"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">
    <v-btn fab dark color="#e61437" depressed class="meal-btn" @click="increaseQ(props)">
    <p>+</p>
    </v-btn>
     <span>{{ props.item.Quantity }}</span>
      <v-btn fab dark color="#e61437" depressed class="meal-btn" @click="decreaseQ(props)">
    <p>-</p>
    </v-btn>
    </td>

      <td class="text-xs-left">{{ props.item.Name }}</td>
      <td class="text-xs-left">₦ {{ props.item.Price * props.item.Quantity}}</td>
     
    </template>
   
  </v-data-table><br> 
  <div v-if= "Basket.length > 0">
     <div class="order-info">

     <v-chip>Order total:  ₦{{ total }}</v-chip>
     </div>
         <br>
    

 
   <center>
      <v-btn block color="#e61437" dark depressed @click= "addOrder">Place Order</v-btn>
   
   </center>
   </div>
     <v-dialog
      v-model="dialog"
      max-width="1000"
     
    >
   
      <v-card class="dialog">
        <v-btn icon dark @click="dialog = false">
            <v-icon color="#e61437" class="close">close</v-icon>
          </v-btn>
        <v-progress-linear :indeterminate="true" color="#e61437"></v-progress-linear> 
         <h2>ORDER DETAILS</h2>
         <br>
         <v-chip class="chip"> <h3>Ref: {{ orderId }}</h3> </v-chip>
        <v-chip class="chip"> <h3>Fullname: {{ user }}</h3> </v-chip>
        <v-chip class="chip"> <h3>Order Total: ₦{{ total }}</h3> </v-chip>
        <br>
        <br>
        <br>
         <br>
         <h2>DELIVERY ADDRESS</h2>
         <h3>{{address}}</h3>
         <br>
      
   <center>
<v-btn block color="#e61437" class="order-btn" @click="payOD"  depressed  dark>Pay({{total}})</v-btn>
   </center>
     
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
     
</template>

<script>
import db from './firebaseinit.js'
import {  firebaseinit } from './firebaseinit.js'
import firebase from 'firebase'
export default {
    props : ['Basket'],
     data () {
      return {
        otp: '76556',
        from_bank: 'support@vbank.com',
        dialog4: false,
        error: 0,
       address: "",
        Date: new Date(),
        orderTotal: 0,
        paymentStatus: 'Pending',
        deliveryStatus: 'In transit',
        orderId: '',
        user: '',
        paymentType:'',
        dialog: false,
 
          amount: 5000,
        headers: [
          {
            text: 'Quantity',
            align: 'left',
            sortable: false,
            value: 'Quantity'
          },
          { text: 'Item', value: 'Item' },
          { text: 'Total', value: 'Total' },
         
        ],
        currentUser: null,
        phone : null,
       

      }
     },
     
     created(){
            if(firebase.auth().currentUser){
                this.currentUser = firebase.auth().currentUser.email;
                      db.collection('users').where('Email', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Fullname
            this.address = doc.data().Address
            this.phone = doc.data().PhoneNumber
          })
              } 
      )
            }

            
     },
      computed:{
          total(){  
           var totalp = 0;
           var tot = 0
           for( var items in this.Basket ){
             var singleItem = this.Basket[items];
             totalp += singleItem.Quantity * singleItem.Price;
             this.orderTotal = totalp
           }
           return totalp;
           
         }
   },
     methods :{
            payOD(){ 
        db.collection('Orders').add({
                       PhoneNumber: this.phone,
                        Date: Date.now(),
                        Vendor: "Iclinic",
                        Email: this.currentUser,
                       Customer: this.user,
                     OrderId: this.orderId,
                     Address: this.address,
                     PaymentType: 'Pay on Delivery',
                     DeliveryStatus: this.deliveryStatus,
                     PaymentStatus: 'Pending',
                     OrderTotal: this.orderTotal,
                     AllOrders: this.Basket
                       })
                        db.collection('users').doc(this.currentUser).collection('Orders').add({
                           PhoneNumber: this.phone,
                        Date: Date.now(),
                        Vendor: "Iclinic",
                        Email: this.currentUser,
                       Customer: this.user,
                     OrderId: this.orderId,
                     Address: this.address,
                     PaymentType: 'Pay on Delivery',
                     DeliveryStatus: this.deliveryStatus,
                     PaymentStatus: 'Pending',
                     OrderTotal: this.orderTotal,
                     AllOrders: this.Basket
                       })
           
            this.$router.push({path: '/success'})
          },
      
            generate(){
         var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.orderId = text;
     },
      
        
       removeItem(props){
    this.Basket.splice(this.Basket.indexOf(props), 1);
    },
       increaseQ(props){
     props.item.Quantity++;
    },
    decreaseQ(props){
    props.item.Quantity--;
    if(props.item.Quantity == 0){
     this.removeItem(props);
    }
    },
    addOrder(){

      if(this.currentUser == null ){
              this.$router.push({ path: '/loginsignup' })
            }
            else {
            this.dialog = true;  
             this.generate()
            }
      }
     }
}
</script>
 
<style scoped>
.close {font-size:40px;}
.chip {background:#e61437; color: white }
.dialog{ padding: 30px 40px 30px 40px;}
.order-info {text-align: center;}
.order-btn {margin-top:20px; width: 310px;}
.meal-btn {width: 20px;height: 20px;}

     @media (max-width: 991px) {
       .order-info {text-align: center;}
.order-btn {margin-top:20px; width: 310px;}
.meal-btn {width: 20px;height: 20px;}

     }
     @media (max-width: 767px) {
       .order-info {text-align: left;}
.order-btn {margin-top:20px; width: 290px;}
.meal-btn {width: 20px;height: 20px;}

     }
      @media (max-width: 479px) {
        .order-info {text-align: left;}
.order-btn {margin-top:20px; width: 290px;}
.meal-btn {width: 20px;height: 20px;}

      }
</style>
