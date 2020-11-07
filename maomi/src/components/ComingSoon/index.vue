<template>
  <div class="movie_body">
      <Loading v-if="isLoading" />
        <Scroller v-else>
    <ul>
      <li v-for="data in datalist" :key="data.filmId" >
        <div class="pic_show" @tap="handleToDetail(data.filmId)"><img :src="data.poster" /></div>
        <div class="info_list">
          <h2 @tap="handleToDetail(data.filmId)">{{data.name}}</h2>
          <p><span class="person">观众评分</span> {{data.grade}}</p>
          <p>主演: {{data.actors | actorfilter}}</p>
          <p>即将上映</p>
        </div>
        <div class="btn_pre">预购</div>
      </li>

    </ul>
    </Scroller>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter('actorfilter', function (data) {
  // console.log(data);
  var newlist = data.map(item => item.name)
  return newlist.join(' ')
})
export default {
  name: 'ComingSoon',
  data () {
    return {
      datalist: [],
      isLoading: true,
      prevcityId: -1
    }
  },
  activated () {
    var cityId = this.$store.state.city.id
    if (this.prevCityId === cityId) { return }
    this.isLoading = true
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=4271989`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
      this.isLoading = false
      this.prevCityId = cityId
    })
  },
  methods: {
    handleToDetail (movieId) {
      this.$router.push('/movie/detail/2/' + movieId)
    }
  }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
