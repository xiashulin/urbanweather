<template>
  <div class="container-fluid">
    <div>
      <h3>
        {{ city }}
        {{ type }}
        <small>&nbsp;&nbsp;{{dw}}&nbsp;&nbsp;{{gw}}&nbsp;&nbsp;&nbsp;PM2.5：{{ pm25 }}</small>

        <small class="up">
          数据更新于&nbsp;&nbsp;{{ updatetime }}
          <br>
          <br>
          <router-link to="/HotCity">其他城市</router-link>
          &nbsp;&nbsp;
          <span v-show="toLocal" @click="getLocalWeather">看本地</span>
        </small>
      </h3>
      <hr>
      <h6>太阳于{{ rc }} 出，{{ rl }}落</h6>

      <h4>
        <small>{{ notice }}</small>
      </h4>

      <h5>空气湿度：{{sd}}</h5>

      <h5>感冒指数：{{ ganmao }}</h5>

      <h5>{{ fx}} {{ fl }}</h5>

      <h4 class="horizontal-center">未来五天气温趋势</h4>

      <Trend :chartData="chartData"></Trend>

      <!-- <TrendType :chartTypeData="chartTypeData"></TrendType> -->
    </div>
  </div>
</template>
<script>
import citys from '../data/_city.json'
import utils from '../lib/utils'
import Trend from '@/components/Trend.vue'
import TrendType from '@/components/TrendType.vue'

export default {
  name: 'Weather',
  data () {
    return {
      toLocal: false,
      city: '',
      updatetime: 0,
      info: 'test',
      ganmao: '',
      pm25: '',
      quality: '',
      type: '',
      notice: '',
      gw: 0,
      dw: 0,
      fx: '',
      fl: '',
      rc: '',
      rl: '',
      sd: '',
      chartTypeData: {
        columns: ['天气', '高温1', '低温1'],
        rows: [
          { '天气': '晴', '高温1': 22, '低温1': 8 },
          { '天气': '雨', '高温1': 25, '低温1': 7 },
          { '天气': '雪', '高温1': 18, '低温1': 11 }
        ]
      },
      chartData: {
        columns: ['日期', '高温', '低温'],
        rows: [
          { '日期': '今天', '高温': 22, '低温': 8 },
          { '日期': '明天', '高温': 25, '低温': 7 },
          { '日期': '后天', '高温': 18, '低温': 11 }
        ]
      }
    }
  },
  mounted () {
    this.getWeather()
  },
  methods: {
    getLocalWeather () {
      window.location.href = '/'
    },
    async getWeather () {
      console.log('来了')
      let citycode = await this.getCityCode()
      console.log('citycode', citycode)
      let response = await this.axios.get('/api/weather/city/' + citycode)

      this.info = response.data
      this.city = response.data.cityInfo.city
      this.updatetime = response.data.cityInfo.updateTime
      this.ganmao = response.data.data.ganmao
      this.pm25 = response.data.data.pm25
      this.quality = response.data.data.quality
      this.type = response.data.data.forecast[0].type
      this.notice = response.data.data.forecast[0].notice
      this.dw = response.data.data.forecast[0].low
      this.gw = response.data.data.forecast[0].high
      this.fx = response.data.data.forecast[0].fx
      this.fl = response.data.data.forecast[0].fl
      this.rc = response.data.data.forecast[0].sunrise
      this.rl = response.data.data.forecast[0].sunset
      this.sd = response.data.data.shidu
      this.chartData.rows = []
      this.chartTypeData.rows = []

      for (var i = 0; i < 5; i++) {
        var item = response.data.data.forecast[i]

        this.chartData.rows.push({
          '日期': item.ymd.substr(8) + '日' + item.type,
          '高温': Number(item.high.replace(/[^0-9]/gi, '')) / 10,
          '低温': Number(item.low.replace(/[^0-9]/gi, '')) / 10
        })

        this.chartTypeData.rows.push({
          '天气': item.type,
          '高温1': Number(item.high.replace(/[^0-9]/gi, '')) / 10,
          '低温1': Number(item.low.replace(/[^0-9]/gi, '')) / 10
        })
      }
    },
    getCityCode () {
      return new Promise((resolve) => {
        let paramcitycode = ''
        try {
          paramcitycode = utils.getUrlParam('c')
        } catch (e) {
          console.log('getUrlParam_exception', e.message)
        }
        if (!paramcitycode) {
          this.axios('/ip').then((response) => {
            if (response.status === 200) {
              let ipstr = response.data.split('=')[1]
              let ipcontent = ipstr.replace(';', '')
              ipcontent = ipcontent.trim()
              let ipdata = JSON.parse(ipcontent)

              for (let item of citys) {
                if (ipdata.cname.includes(item.city_name) && item.pid !== 0) {
                  console.log('ipdata', ipdata)
                  console.log('item', item)
                  // this.toLocal = true
                  resolve(item.city_code)
                  return
                }
              }
              resolve('101010100')
            }
          })
        } else {
          this.toLocal = true
          resolve(paramcitycode)
        }
      })
    }
  },
  components: {
    Trend,
    TrendType
  }
}
</script>
<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/v-charts/lib/style.min.css';
.up {
  float: right;
  font-size: 6px;
  color: lightgray;
  vertical-align: bottom;
}
h4,
h5 {
  line-height: 2.2;
}

.horizontal-center {
  text-align: center;
}
</style>
