<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin?'Sign in':'Sign up'}}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
          <nuxt-link v-else to="/register">Need an account?</nuxt-link>
        </p>

        <ul class="error-messages">
            <template v-for="(messages,field) in errorMsg">
              <li v-for="(message,index) in messages" :key="index">{{field}} {{message}}</li>
            </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input class="form-control form-control-lg" type="text" v-model="user.username" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="email" v-model="user.email" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" minlength="8" v-model="user.password" placeholder="Password" required>
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin?'Sign in':'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login,register } from '@/api/user'
const Cookie = process.client?require('js-cookie'):null
export default {
    middleware:'notAuthenticate',
    data(){
        return {
            user:{
                username:'',
                email:'',
                password:''
            },
            errorMsg:{
            }
        }
    },
    computed:{
        isLogin(){
            return this.$route.name === 'login'
        }
    },
    methods:{
        async onSubmit(){
            try {
                const { data } = this.isLogin?
                await login({
                    user:this.user
                }):
                await register({
                    user:this.user
                })

                // 保存登陆状态
                this.$store.commit('setUser',data.user)
                Cookie.set('user',data.user)
                this.$router.push('/')
            } catch (error) {
                this.errorMsg = error.response.data.errors
            }
        }
    }
}
</script>

<style>

</style>