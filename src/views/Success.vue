<template>
   <div class="success-content">
     <center> 
         <v-icon class="success-icon" color="#e61437">check_circle</v-icon>
         <br>
    <h1>Transaction Successful- Order Received</h1>
    <div class="pm">
       
     <p >if you have any questions or complains, click this link</p>
  
    </div>
   
    <br>

    <v-btn color="#e61437" dark @click="OrderAgain">Place Another Order</v-btn>
     
    </center> 
   </div> 
</template>
<script>
export default {
    methods:{
        OrderAgain(){
            window.location.assign('http://localhost:8080/pharmacy')
        },
            Track(){
                this.$router.push({path: '/dashboard'})
            }
    }
}
</script>

<style scoped>
.success-icon {font-size: 100px;}
.success-content {background: white; padding: 50px;}
.pm {font-size: 15px; color: rgb(184, 184, 184)}
.pm a {color: rgb(184, 184, 184);text-decoration: none;}
h1 {font-size: 45px;}
   @media (max-width: 991px) {
     .success-icon {font-size: 70px;}
.success-content {background: white; padding: 50px;}
.pm {font-size: 15px; color: rgb(184, 184, 184)}
.pm a {color: rgb(184, 184, 184);text-decoration: none;}
h1 {font-size: 30px;}
     }
     @media (max-width: 767px) {
   .success-icon {font-size: 70px;}
.success-content {background: white; padding: 50px;}
.pm {font-size: 15px; color: rgb(184, 184, 184)}
.pm a {color: rgb(184, 184, 184);text-decoration: none;}
h1 {font-size: 30px;}
     }
      @media (max-width: 479px) {
   .success-icon {font-size: 70px;}
.success-content {background: white; padding: 50px;}
.pm {font-size: 15px; color: rgb(184, 184, 184)}
.pm a {color: rgb(184, 184, 184);text-decoration: none;}
h1 {font-size: 30px;}
      }
</style>
