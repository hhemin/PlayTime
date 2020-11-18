const request = require('request');

const {APPID,SECRET} = require('../config/index')

let Token = '';
let Id = '';

class WXGET {
  // 获取openID
  static getOpenId(jscode) {
    return new Promise(resolve => {
      request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${jscode}&grant_type=authorization_code`,function(err, response, body){
        // console.log(JSON.parse(body))  
        let {openid} = JSON.parse(body);
        Id = openid
        resolve(openid)
      })
    })
  }
  // 获取access_token
  static getAccessToken() {
    return new Promise(resolve => {
      request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`,function(err,response,body) {
        let {access_token} = JSON.parse(body);
        Token = access_token
        resolve(access_token)
      })
    })
  }
  // 信息推送
  static sendMessage({template = {}} = {}) {
    const requestData = {
      touser: Id,
      template_id: "jA0qxa0VMQxdyzGasm-dyZfj4tBtTMcmfOOXI4zjYYg",
      miniprogram_state:"developer",
      lang:"zh_CN",
      // "page": "index",
      "data": {
        "thing2": {
            "value": "66666666"
        },
        "time5": {
            "value": "2015年01月05日"
        },
      }
    };
    Object.assign(requestData,template)
    return new Promise((resolve, reject) => {
      request({
        url:`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${Token}`,
        method:'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData,
      }, function(error, response, body) {
        console.log('>>>>>')
        console.log(body)
        resolve(body)
      })
    });
  }
}

module.exports = {
  WXGET
}