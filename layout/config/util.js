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

class Dialog {
  static show({title,desc,diaBtn,show = true} = {}) {
    return {
      title,
      desc,
      show,
      diaBtn
    }
  }
  static hide() {
    return {
      show: false
    }
  }
}

class Toast {
  static show({title,time = 0,type = 'success',show = true} = {}) {
    return {
      title,
      show,
      type,
      time
    }
  }
  static hide() {
    return {
      show: false,
    }
  }
}

export {
  Tip,
  Dialog,
  Toast
}