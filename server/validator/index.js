const validator = require('validator')

class Rule {
  _assembleAllParams(ctx) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      path: ctx.params,
      header: ctx.request.header
    }
  }
}

module.exports = {
  Rule
}