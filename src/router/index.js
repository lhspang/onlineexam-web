import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/Home')
const About = () => import('views/About.vue')
const Login = () => import('views/passport/Login')
const Register = () => import('views/passport/Register')
const Profile = ()=>import('views/profile/Profile')

const routes = [
  {
    path: "/1",
    redirect: "/"
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: "Profile",
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})
const url = ['', 'login', 'register', 'zhibo', 'kecheng', 'about']
router.beforeEach((to, from, next) => {
  /*for (let u of url) {
    console.log(u);
    if (to.path === '/' + u) {
      next();
    }
  }*/
  /*console.log(to.path);
  let token = localStorage.getItem('Authorization');
  if (token === null || token === '') {
    next('/login');
  } else {
    next();
  }*/
  next()

})

export default router
