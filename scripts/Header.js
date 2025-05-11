const rootSelector = '[data-js-header]'

class Header {
  selectors = {
    root: rootSelector,
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(rootSelector)
    this.overlayElemnt = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButton = this.rootElement.querySelector(this.selectors.burgerButton)
    this.bindEvents()
  }

  onClickBurgerButton = () => {
    this.overlayElemnt.classList.toggle(this.stateClasses.isActive)
    this.burgerButton.classList.toggle(this.stateClasses.isActive)
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  bindEvents() {
    this.burgerButton.addEventListener('click', this.onClickBurgerButton)
  }
}

export default Header