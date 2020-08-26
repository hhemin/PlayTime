/* eslint-disable */
/**
 * @name 倒计时
 */
import moment from 'moment'
class GetTime {
  constructor() {
    this.TIMEVALUE = '00:00:00' // HH:MM:SS 格式
    this.interval = null // 定时器
  }
  static _six(value) {
    if(value == 0) value = 60
    value -= 1
    // console.log('six'+value)
    return value
  }
  static _fn(value) {
    let timeForm = moment(value, "hhmmss"),
    hour = Number(timeForm.format("HH")),
    min =  Number(timeForm.format("mm")),
    second =  Number(timeForm.format("ss")),
    arr = [second,min,hour],
    time = ''
    // console.log(arr)
    if((arr.filter((item) => item === 0)).length === 3) {
      this.stopTime()
      return moment(`${hour}:${min}:${second}`, "hhmmss").format("HH:mm:ss")
    } //结束
    second = this._six(second)
    if(second === 59) {
      if(min === 0) {
        min = this._six(min)
        hour = hour - 1 < 0 ? 0 : hour - 1
      } else {
        min = min - 1
        hour = hour
      }
    }
    time = moment(`${hour}:${min}:${second}`, "hhmmss").format("HH:mm:ss")
    return time
  }
  // 暴露出去给获取倒计时value
  static getValue() {
    return this.TIMEVALUE
  }
  // 开始倒计时
  static startTime(time) {
    this.TIMEVALUE = time
    this.interval = setInterval(()=> {
      this.TIMEVALUE = this._fn(this.TIMEVALUE)
      // console.log('进行着倒计时' +this.TIMEVALUE)
    }, 1000)
  }
  // 暂停
  static stopTime() {
    clearInterval(this.interval)
    this.interval = null
    // console.log('G暂停' + this.TIMEVALUE)
  }
}

export {
  GetTime
}
