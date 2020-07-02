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
const EditPass = ()=>import('components/EditPass')
const FindPass = ()=>import('components/FindPass')
//学生
const ExamList = () => import('views/profile/student/ExamList')
const Score = () => import('views/profile/student/Score')
//老师
const AddExam = () => import('views/profile/teacher/AddExam')
const QueryExam = () => import('views/profile/teacher/QueryExam')
const AddProblem = () => import('views/profile/teacher/AddProblem')
const QueryProblem = () => import('views/profile/teacher/QueryProblem')
const QueryScore = () => import('views/profile/teacher/QueryScore')
const ExamInfo = () => import('views/profile/teacher/ExamInfo')
//管理员
const AddUser = () => import('views/profile/manager/AddUser')
const QueryUser = () => import('views/profile/manager/QueryUser')
const AddSubject = () => import('views/profile/manager/AddSubject')
const QuerySubject = () => import('views/profile/manager/QuerySubject')
const EditUserSubject = () => import('views/profile/manager/EditUserSubject')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/find-pass',
    name: 'FindPass',
    component: FindPass,
    meta: {
      title: '找回密码'
    }
  },
  {
    path: '/exam',
    redirect:"/"
  },
  {
    path: '/exam/:id',
    name: 'Exam',
    component: Exam,
    meta: {
      title: '考试'
    }
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
        component:ProfileIndex,
        meta: {
          title: '个人中心'
        },
      },
      {
        path: 'student/examlist',
        component: ExamList,
        meta: {
          title: '考试列表'
        },
      },
      {
        path: 'student/score',
        component: Score,
        meta: {
          title: ''
        },
      },
      {
        path: 'info',
        component: UserInfo,
        meta: {
          title: ''
        },
      },
      {
        path: 'edit',
        component: EditInfo,
        meta: {
          title: ''
        },
      },
      {
        path: 'pass',
        component: EditPass,
        meta: {
          title: ''
        },
      },
      {
        path: 'problem/add',
        component: AddProblem,
        meta: {
          title: ''
        },
      },
      {
        path: 'problem/all',
        component: QueryProblem,
        meta: {
          title: ''
        },
      },
      {
        path: 'exam/add',
        component: AddExam,
        meta: {
          title: ''
        },
      },
      {
        path: 'exam/all',
        component: QueryExam,
        meta: {
          title: ''
        },
      },
      {
        path: 'exam/:id',
        component: ExamInfo,
        meta: {
          title: ''
        },
      },
      {
        path: 'user/add',
        component: AddUser,
        meta: {
          title: ''
        },
      },
      {
        path: 'user/all',
        component: QueryUser,
        meta: {
          title: ''
        },
      },
      {
        path: 'user/subject/:id',
        component: EditUserSubject,
        meta: {
          title: ''
        },
      },
      {
        path: 'subject/add',
        component: AddSubject,
        meta: {
          title: ''
        },
      },
      {
        path: 'subject/all',
        component: QuerySubject,
        meta: {
          title: ''
        },
      },
      {
        path: 'score/all',
        component: QueryScore,
        meta: {
          title: ''
        },
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

const url = ['', 'login', 'register', 'zhibo', 'kecheng', 'about']
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()

})

export default router
