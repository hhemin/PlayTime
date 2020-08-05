class Select {
  constructor() {}
  /**
   * @name 查询 
   * @tablename 表格名字 
   * @Arrayvalue 参数字段
   * */ 
  static fn(tablename,Arrayvalue) {
    let select = 'SELECT '
    if(Array.isArray(Arrayvalue)) {
      for(let i = 0;i<Arrayvalue.length;i++) {
        let last = i === Arrayvalue.length -1 ? ' ':','
        select += Arrayvalue[i]+last
      }
      console.log(`${select} From ${tablename}`)
      return `${select} From ${tablename};`
    }
    return `SELECT * FROM ${tablename};`
  }
  static wherefn(tablename,Arrayvalue,wherevalue) {
    let selet =  this.fn(tablename,Arrayvalue).split(';')[0]
    return `${selet+wherevalue};`
  }
}
// @name: 添加
class Insert {
  static fn(tablename,value,tableitem = '') {
    console.log(`INSERT INTO ${tablename} ${tableitem} VALUES ${value};` )
    return `INSERT INTO ${tablename} ${tableitem} VALUES ${value};` 
  }
}

// @name: 更新
class Updata {
  static fn(tablename,value,wherevalue) {
    return `UPDATE ${tablename} SET ${value} WHERE ${wherevalue};`
  }
}

module.exports = {
  Select,
  Insert,
  Updata
}