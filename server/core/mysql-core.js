class Select {
  constructor() {}
  /**
   * @name 查询 
   * @tablename 表格名字 
   * @tableitem 参数字段
   * */ 
  static fn({tablename,tableitem} ={}) {
    let select = 'SELECT '
    if(Array.isArray(tableitem)) {
      for(let i = 0;i<tableitem.length;i++) {
        let last = i === tableitem.length -1 ? ' ':','
        select += tableitem[i]+last
      }
      console.log(`${select} From ${tablename}`)
      return `${select} From ${tablename};`
    }
    return `SELECT * FROM ${tablename};`
  }
  static wherefn({tablename,tableitem = '*',wherevalue} = {}) {
    let sql =  this.fn({tablename,tableitem}).split(';')[0]
    return `${sql} WHERE ${wherevalue};`
  }
}
// @name: 添加
class Insert {
  static fn(tablename,value,tableitem = '') {
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