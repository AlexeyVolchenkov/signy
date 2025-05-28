const rootSelector = '[data-js-header]'

class Header {
  selectors = {
    root: rootSelector,
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
  }

  stateClasses = {
    headerOverlay: 'header__overlay',
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(rootSelector)
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButton = this.rootElement.querySelector(this.selectors.burgerButton)
    this.bindEvents()
  }

  onClickBurgerButton = () => {
    this.overlayElement.classList.toggle(this.stateClasses.isActive)
    this.burgerButton.classList.toggle(this.stateClasses.isActive)
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  onDocumnetClick = (event) => {
    const isClickOnMenu = this.overlayElement.contains(event.target)
    const isClickOnBurgerButton = this.burgerButton.contains(event.target)
    if (!isClickOnMenu && !isClickOnBurgerButton) {
      this.overlayElement.classList.remove(this.stateClasses.isActive)
      this.burgerButton.classList.remove(this.stateClasses.isActive)
      document.documentElement.classList.remove(this.stateClasses.isLock)
    }
  }

  bindEvents() {
    this.burgerButton.addEventListener('click', this.onClickBurgerButton)
    document.addEventListener('click', this.onDocumnetClick)
  }
}

export default Header