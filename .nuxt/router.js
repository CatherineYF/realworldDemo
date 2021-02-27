import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _81c6f06c = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _20a5ad02 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _06304ec9 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _147e9109 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _0c93a0c3 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _9964a3e6 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _096e5754 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _81c6f06c,
    children: [{
      path: "",
      component: _20a5ad02,
      name: "home"
    }, {
      path: "/login",
      component: _06304ec9,
      name: "login"
    }, {
      path: "/register",
      component: _06304ec9,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _147e9109,
      name: "profile"
    }, {
      path: "/settings",
      component: _0c93a0c3,
      name: "settings"
    }, {
      path: "/editor",
      component: _9964a3e6,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _096e5754,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
