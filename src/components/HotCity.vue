<template>
  <div class="container-fluid">
    <h3>省（直辖市，自治区）</h3>
    <router-link class="btn btn-primary abtn" :to="getLinks(item)" @click.native="updateCitys(item)" v-for="item in sheng" :key="item.id" >{{ item.city_name }}</router-link>
    <h3>省（直辖市，自治区）辖市（区，县）</h3>
    <router-link class="btn btn-default abtn" :to="getLinks(item)" v-for="item in shi" :key="item.id" >{{ item.city_name }}</router-link>
    <br>
  </div>
</template>

<script>
import citys from '../data/_city.json'

export default {
  name: 'HotCity',
  data () {
    return {
      sheng: citys.filter(item => { return !item.pid }),
      shi: null
    }
  },
  methods: {
    updateCitys (item) {
      if (!item.city_code) {
        this.shi = citys.filter(currItem => { return item.id === currItem.pid })
      }
    },
    getLinks (item) {
      if (item.city_code) {
        return './Weather?c=' + item.city_code
      } else {
        return '#'
      }
    }
  }
}
</script>
<style>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css";
  .abtn{
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
