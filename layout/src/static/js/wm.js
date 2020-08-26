class WM {
  static fn({ webfn = () => {}, mpfn = () => {} }) {
    if (process.env.isMiniprogram) {
      return mpfn()
    }
    return webfn()
  }
  static obj({ webobj, mpobj } = {}) {
    if (process.env.isMiniprogram) {
      return mpobj
    }
    return webobj
  }
}

export default WM
