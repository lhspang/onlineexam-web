import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/Home')
const About = () => import('views/About')
const Exam = () => import('views/Exam')
const Login = () => import('views/passport/Login')
const Register = () => import('views/passport/Register')
const Profile = () => import('views/profile/Profile')
const ProfileIndex = ()=>import('components/ProfileIndex')
const UserInfo = () => import('components/UserInfo')
const EditInfo = ()=>import('components/EditInfo')
//学生
const ExamList = () => import('views/profile/student/ExamList')
const Score = () => import('views/profile/student/Score')
//老师
const AddExam = () => import('views/profile/teacher/AddExam')
const QueryExam = () => import('views/profile/teacher/QueryExam')
const AddProblem = () => import('views/profile/teacher/AddProblem')
const QueryProblem = () => import('views/profile/teacher/QueryProblem')
const QueryScore = () => import('views/profile/teacher/QueryScore')
//管理员
const AddUser = () => import('views/profile/manager/AddUser')
const QueryUser = () => import('views/profile/manager/QueryUser')
const AddSubject = () => import('views/profile/manager/AddSubject')
const QuerySubject = () => import('views/profile/manager/QuerySubject')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      roles: ['', '管理员', '学生', '老师',]
    }
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
    path: '/exam',
    redirect:"/"
  },
  {
    path: '/exam/:id',
    name: 'Exam',
    component: Exam
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        component:ProfileIndex
      },
      {
        path: 'student/examlist',
        component: ExamList
      },
      {
        path: 'student/score',
        component: Score
      },
      {
        path: 'info',
        component: UserInfo
      },
      {
        path: 'edit',
        component: EditInfo
      },
      {
        path: 'problem/add',
        component: AddProblem
      },
      {
        path: 'problem/all',
        component: QueryProblem
      },
      {
        path: 'exam/add',
        component: AddExam
      },
      {
        path: 'exam/all',
        component: QueryExam
      },
      {
        path: 'user/add',
        component: AddUser
      },
      {
        path: 'user/all',
        component: QueryUser
      },
      {
        path: 'subject/add',
        component: AddSubject
      },
      {
        path: 'subject/all',
        component: QuerySubject
      },
      {
        path: 'score/all',
        component: QueryScore
      },
    ]
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
