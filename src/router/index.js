import { createRouter, createWebHistory } from 'vue-router'
import SignIn from "@/views/SignIn"
import Sidebar from "@/components/Sidebar"
import Settings from "@/views/Settings"
import Home from "@/views/Home"
import Lock from "@/views/Lock"
import Collapsed from "@/views/Collapsed"
import Quit from "@/views/Quit"
const routes = [
 {
  path:"/",
  name:"SignIn",
  component:SignIn
 },

  {
  path:"/main",
  components:{
    default:Sidebar,
    two:Home

  },
 },


 {
  path:"/settings",
  components:{
    default:Sidebar,
    two:Settings

  },
 },




 {
  path:"/lock",
  components:{
    default:Sidebar,
    two:Lock

  },
 },


 {
  path:"/collapsed",
  components:{
    default:Sidebar,
    two:Collapsed

  },
 },
  
 {
  path:"/quit",
  components:{
    default:Sidebar,
    two:Quit

  },
 },
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  activeClass:String
})

export default router
