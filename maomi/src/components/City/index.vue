<template>
<div class="city_body">
  <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller v-else ref="city_List">
            <div class="city_List">
                <div>

                    <div class="city_sort" ref="city_sort">
                        <div v-for="data in datalist" :key="data.index">
                            <h2 id="aa">{{ data.index }}</h2>
                            <ul>
                                <li v-for="data in data.list" :key="data.cityId" @tap="handleToCity(data.name , data.cityId)">{{ data.name}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(data,index) in datalist" :key="data.index" @touchstart="handleToIndex(index)">{{ data.index }}</li>
            </ul>
        </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'City',

  data () {
    return {
      datalist: [],
      isLoading: true
    }
  },
  mounted () {
    var datalist = window.localStorage.getItem('datalist')
    if (datalist) {
      this.datalist = JSON.parse(datalist)
      this.isLoading = false
    } else {
      axios({
        url: 'https://m.maizuo.com/gateway?k=9502566',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
          'X-Host': 'mall.film-ticket.city.list'

        }
      }).then((res) => {
        //   console.log(res.data)
        this.datalist = this.handleCity(res.data.data.cities)
        this.isLoading = false
        window.localStorage.setItem('datalist', JSON.stringify(this.datalist))
      })
    }
  },
  methods: {
    handleCity (datalist) {
      console.log(datalist)
      var letterArr = []
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      // console.log(letterArr)

      var newlist = []
      for (var j = 0; j < letterArr.length; j++) {
        var arr = datalist.filter(item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase())
        // console.log(arr)
        if (arr.length > 0) {
          newlist.push({
            index: letterArr[j],
            list: arr
          })
        }
      }
      console.log(newlist)
      return newlist
    },

    handleToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')

      this.$refs.city_List.toScrollTop(-h2[index].offsetTop)
    },
    handleToCity (nm, id) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      window.localStorage.setItem('nowNm', nm)
      window.localStorage.setItem('nowId', id)
      this.$router.push('/movie/nowPlaying')
      window.location.reload()
    }

  }
}
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;

  font-size: 14px;
}
</style>
