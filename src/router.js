import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
          path: '/',
          redirect: '/love'
        },
        {
            path: '*',
            redirect: '/love'
        },
        {
            path: '/love',
            component: resolve => require(['@/love/love.vue'], resolve),
            meta: { title: 'love' },
        }

    ]
})
