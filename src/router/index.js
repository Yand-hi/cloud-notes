import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Notebooks from '../components/NotebookList'
import NoteDetail from '../components/NoteDetail'
import TrashDetail from '../components/TrashDetail'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch((error) => {
  });
};

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component: Notebooks
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    }
  ]
})
