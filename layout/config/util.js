class Tip {
  constructor(text,type) {
    this.text = text || ''
    this.type = type || 'success'
  };
  show() {
    return {
      text: this.text,
      type: this.type,
      show: true
    }
  }
  hide() {
    return {
      show: false
    }
  }
}

export {
  Tip
}