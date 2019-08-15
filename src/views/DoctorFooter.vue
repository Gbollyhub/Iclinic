<template>
<div>
      <!-- <div  class = "hidden-md-and-up"> Active: {{ bottomNav }}</div> -->
    <v-bottom-nav
      
      :value="true"
      absolute
      color="#1c1c1c"
      style ="position: fixed;"
      class = "hidden-md-and-up"
    >
   <v-btn
        color="white"
        flat
        value="recent"
       @click="toHome"
      >
        <v-icon color="white">home</v-icon>
      </v-btn> 

   <v-btn
        color="white"
        flat
        value="nearby"
       @click="toInbox"
      >
       <v-icon   color="white">email</v-icon>
      </v-btn>
      <v-btn
        color="white"
        flat
        value="nearby"
      >
       <v-icon   color="white">view_list</v-icon>
      </v-btn>
      <v-btn
        color="white"
        flat
        value="nearby"
       @click="toProfile"
      >
       <v-icon   color="white">person_pin</v-icon>
      </v-btn>

    </v-bottom-nav> 
</div>
 
</template>

<script>

export default {
  data () {
    return {
      bottomNav: 'recent'
    }
  },
  methods:{
    toHome(){
       this.$router.push('/doctor-home')
    },
     toHistory(){
      this.$router.push('/history')
    },
    toInbox(){
    this.$router.push('/doctor-inbox')
    },
    toProfile(){
    this.$router.push("/doctor-profile")
    },

  }
}
</script>
