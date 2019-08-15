<template>
  <div>
      <Nav/>
   <div class="content">
     <h1 class="site-header">Hospitals</h1>
         <br>
   <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d507400.37386892916!2d3.4946898380044087!3d6.513403981008197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospitals!5e0!3m2!1sen!2sng!4v1561098983863!5m2!1sen!2sng" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
   </div>
    </div>
</template>

<script>
import Nav from '../views/Nav.vue'
  export default {
       components: {
         Nav
       }
  }
</script>

<style scoped>
.menu-flex {padding-right: 30px; padding-left : 10px;margin-top: 30px;margin-bottom: 30px;}
.menu-card{padding: 50px;border-radius: 20px;box-shadow: 1px 5px 30px -3px #e6e6e6;}
.icon{font-size:150px;color: #e61437;}
.site-header{font-size:50px;}
.content {padding:50px 100px 50px 100px;}
.dot{ color: #ffffff;}
.logo-header {color:white;font-size: 30px;font-family: 'Shadows Into Light', cursive;}
</style>


