const rootSelector = '[data-js-form-modal]'

class Modal {
  stateClasses = {
    isLock: 'is-lock',
  }
  
  constructor(rootElement) {
    this.rootElement = rootElement

    this.bindEvents()
  }

  onClickBackdrop = (event) => {
    const isBackdrop = event.target === this.rootElement

    if (isBackdrop) {
      this.rootElement.close()
    }
  }

  onToggleModal = () => {
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onClickBackdrop)
    this.rootElement.addEventListener('toggle', this.onToggleModal)
  }
}

class ModalCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Modal(element)
    })
  }
}


export default ModalCollection