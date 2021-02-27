import Vue  from 'vue'
import Day from 'dayjs'

Vue.filter('date',(value,format = 'YYYY-MM-DD HH:mm:ss')=>{
    return Day(value).format(format)
})