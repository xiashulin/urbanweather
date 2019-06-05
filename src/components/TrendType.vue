<template>
  <ve-line :data="chartTypeData"></ve-line>
</template>
<script>
export default {
  name: 'Trend',
  props: {
    chartTypeData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
