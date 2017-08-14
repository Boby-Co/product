import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Hello = resolve => require (['@/components/Hello'], resolve)
const NotFoundComponent = resolve => require (['@/page/404'], resolve)
export default new Router({
  routes: [
    {path: '*', component: NotFoundComponent},
    {
      path: '/',
      name: 'home',
      component: Hello
    }
  ]
})
