const { LinValidator, Rule } = require('../core/lin-validator-v2.js')
const { User } = require('../app/model/user')
const {NotUser,RepeatUser} = require('../core/http-exception')
class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.password = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        '密码不符合规范',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ]
    this.username = [
      new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 })
    ]
  }
  // // 自定义规则
  // validatePassword(values) {
  //   const password1 = values.body.password1;
  //   const password2 = values.body.password2;
  //   if (password1 !== password2) {
  //     throw new Error('两次输入的密码必须相同')
  //   }
  // }
  // 检查用户名是否重复
  async validateUser(values) {
    // values 用户名参数
    const user = await User.query(values);
    if (user.length>0) {
      throw new RepeatUser()
    }
  }

  async isHasUser(values) {
    // values 用户名参数
    const user = await User.query(values);
    if(user.length == 0) {
      throw new NotUser()
    }
  }
}

module.exports = {
  RegisterValidator
}