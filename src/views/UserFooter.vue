<template>
<div>
      <!-- <div  class = "hidden-md-and-up"> Active: {{ bottomNav }}</div> -->
    <v-bottom-nav
      
      :value="true"
      absolute
      color="#e61437"
      style ="position: fixed;"
      class = "hidden-md-and-up"
    >
   <v-btn
        color="white"
        flat
        value="recent"
       @click="toHome"
      >
        <v-icon>home</v-icon>
      </v-btn> 

   <v-btn
        color="white"
        flat
        value="nearby"
       @click="toInbox"
      >
       <v-icon>email</v-icon>
      </v-btn>
      <v-btn
        color="white"
        flat
        value="nearby"
       @click="toHistory"
      >
       <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn
        color="white"
        flat
        value="nearby"
       @click="toProfile"
      >
       <v-icon>person_pin</v-icon>
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
       this.$router.push('/')
    },
    toDoctor(){
      this.$router.push('/view-doctors')
    },
    toHospital(){
      this.$router.push('/events')
    },
     toHistory(){
      this.$router.push('/user-records')
    },
    toInbox(){
    this.$router.push('/inbox')
    },
    toProfile(){
    this.$router.push("/user-profile")
    },
    toPharmacy(){
    this.$router.push("/pharmacy")
    },

  }
}
</script>
