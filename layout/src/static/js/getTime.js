class GetTime {
  // time [h,min,s]
  constructor(time) {
    this.time = time
  }
  static getFormat(v) {
    switch(v) {
      case 'hour':
        this.getHour()
      break
      case 'min':
        this.getMin()
      break
      case 'second':
        this.getSecond()
      break
      default:
        throw new Error('没有这个参数哦')
    }
  }
  // 时间格式 1 时 0 分 0 秒
  getHour() {
    return `${this.time[0]}时 ${this.time[1]}分 ${this.time[2]}秒`
  }
  // 时间格式 60 分 01 秒 
  getMin() {
    let _v = 0
    if(this.time[0] != 0) _v += this.time[0]*60
    if(this.time[1] != 0) _v += this.time[1]
    return `${_v} 分 ${this.time[2] > 9 ? this.time[2]:'0'+this.time[2]} 秒`
  }
  // 时间格式 100 秒 
  getSecond() {
    let _v = 0
    if(this.time[0] != 0) _v += this.time[0]*60*60
    if(this.time[1] != 0) _v += this.time[1]*60
    _v += this.time[2]
    return `${_v} 秒`
  }
}