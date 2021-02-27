<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link class="nav-link" exact  :class="{active:tab==='your_feed'}" :to="{
                name:'home',
                query:{
                  tab:'your_feed'
                }
              }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item" :class="{active:tab==='global_feed'}">
              <nuxt-link exact class="nav-link" :to="{
                name:'home',
                query:{
                  tab:'global_feed'
                }
              }">Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link class="nav-link" :class="{active:tab==='tag'}" :to="{
                name:'home',
                query:{
                  tab:'tag',
                  tag:tag
                }
              }">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key='article.slug'>
          <div class="article-meta">
            <nuxt-link :to="{name:'profile',params:{
              username:article.author.username
            }}"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link :to="{name:'profile',params:{
              username:article.author.username
            }}" class="author">{{article.author.username}}</nuxt-link>
              <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
            </div>
            <button @click.stop="onFavorite(article)" :class='{active:article.favorited}' class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{name:'article',params:{
            slug:article.slug
          }}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <!--分页-->
        <nav>
          <ul class="pagination">
            <li :class="{
              active: page === item
              }" v-for="item in totalPage" :key="item" class="page-item">
              <nuxt-link :to="{
                name:'home',
                query:{
                  page:item,
                  tag:$route.query.tag,
                  tab:tab
                }
              }" class="page-link">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{
              name:'home',
              query:{
                tag:item,
                tab:'tag'
              }
            }" v-for="item in tags" :key="item" class="tag-pill tag-default">{{item}}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles,getFeedArticles,addFavorite,deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
    name:'HomeIndex',
    async asyncData({query,store}){
      const page = parseInt(query.page || 1)
      const limit = 10
      const { tag } = query
      const tab = query.tab || 'global_feed'
      const loadArticles = store.state.user  && tab === 'your_feed'
      ? getFeedArticles: getArticles
      const [ articleRes, tagRes] = await Promise.all([
        loadArticles({
          limit:limit,
          offset:(page-1)*limit,
          tag
        }),
        getTags()
      ])
      const { articlesCount,articles } = articleRes.data
      const { tags } = tagRes.data
      return {
        articles,
        articlesCount,
        tags,
        limit,
        page,
        tag,
        tab:query.tab||'global_feed'
      }
    },
    computed:{
      ...mapState(['user']),
      totalPage(){
        return Math.ceil(this.articlesCount / this.limit)
      }
    },
    methods:{
      async onFavorite(article){
        if(article.favorited){
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1

        }else{
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount +=1
        }
      }
    },
    watchQuery:['page','tag','tab']
}
</script>

<style>

</style>