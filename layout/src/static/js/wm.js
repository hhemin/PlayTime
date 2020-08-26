class WM {
  static fn({webfn = function() {},mpfn = function() {}}) {
    if (process.env.isMiniprogram) {
      return mpfn() 
    } else {
      return webfn()
    } 
  }
  static obj({webobj,mpobj} = {}) {
    if(process.env.isMiniprogram) {
      return mpobj
    } else {
      return webobj
    }
  }
}

export default WM
