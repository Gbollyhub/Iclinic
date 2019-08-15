import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import ViewDoctors from '@/views/ViewDoctor'
import AddDoctors from '@/views/AddDoctor'
import DoctorBio from '@/views/DoctorBio'
import Hospital from '@/views/Hospital'
import UserProfile from '@/views/UserProfile'
import Inbox from '@/views/Inbox'
import firebase from 'firebase'
import Admin from '@/views/AddHospital'
import DoctorHome from '@/views/DoctorHome'
import DoctorInbox from '@/views/DoctorInbox'
import DoctorProfile from '@/views/DoctorProfile'
import Pharmacy from '@/views/Pharmacy'
import Success from '@/views/Success'
import Report from '@/views/UserReport'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/user-records',
      name: 'Report',
      component: Report,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
      meta :{
        requiresAuth : true
      }
    },
     {
      path: '/pharmacy',
      name: 'Pharmacy',
      component: Pharmacy,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/doctor-profile',
      name: 'DoctorProfile',
      component: DoctorProfile,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/doctor-inbox',
      name: 'DoctorInbox',
      component: DoctorInbox,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/doctor-home',
      name: 'DoctorHome',
      component: DoctorHome,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/user-profile',
      name: 'UserProfile',
      component: UserProfile,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/hospitals',
      name: 'Hospitals',
      component: Hospital,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/doctor/:userId',
      name: 'DoctorBio',
      component: DoctorBio,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/register-doctors',
      name: 'addDoctors',
      component: AddDoctors,
      meta :{
        requiresGuest : true
      }
    },
    {
      path: '/view-doctors',
      name: 'viewDoctors',
      component: ViewDoctors,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta :{
        requiresGuest : true
      }
    },
    {
      path: '/register',
      name: 'Signup',
      component: Signup,
      meta :{
        requiresGuest : true
      }
    },
    {
    path: '*',
    redirect : '/'
  }
  ],
  mode: 'history'
})


router.beforeEach(
  (to, from, next) =>{
    if(to.matched.some(record => record.meta.requiresAuth)){
       if(!firebase.auth().currentUser){
         next({
           path: 'Login',
           query: {
             redirect: to.fullPath
           }
         })
       }
       else{
         next();
       }

    }
    else   if(to.matched.some(record => record.meta.requiresGuest)){
      if(firebase.auth().currentUser){
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      }
      else{
        next();
      }

   }
   else{
    next();
  }

  } 
  ); 

  export default router;