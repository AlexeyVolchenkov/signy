const rootSelector = '[data-js-pagination]'

class Pagination {
  selector = {
    root: rootSelector,
    button: '[data-js-pagination-button]',
    buttonExtra: '[data-js-pagination-button-extra]',
    contentImage: '[data-js-pagination-content-image]',
    contentSubtitle: '[data-js-pagination-content-subtitle]',
    contentDescription: '[data-js-pagination-content-description]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaCurrent: 'aria-current',
  }

  images = {
    firstBackground: '../images/hero/1.png',
    secondBackground: '../images/hero/2.png',
    thirdBackground: '../images/hero/3.png',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selector.button)
    this.buttonExtraElements = this.rootElement.querySelectorAll(this.selector.buttonExtra)
    this.contentImageElements = this.rootElement.querySelectorAll(this.selector.contentImage)
    this.contentSubtitleElements = this.rootElement.querySelectorAll(this.selector.contentSubtitle)
    this.contentDescriptionElements = this.rootElement.querySelectorAll(this.selector.contentDescription)


    this.state = {
      activePaginationIndex: [...this.buttonElements].findIndex(
        (element) => element.classList.contains(this.stateClasses.isActive)
      )
    }

    this.bindEvents()
  }

  updateUi() {
    const { activePaginationIndex } = this.state

    this.buttonElements.forEach((element, index) => {
      const isActive = activePaginationIndex === index
      element.classList.toggle(this.stateClasses.isActive, isActive)
      element.setAttribute(this.stateAttributes.ariaCurrent, isActive.toString())
    })

    this.buttonExtraElements.forEach((element, index) => {
      const isActive = activePaginationIndex === index
      element.classList.toggle(this.stateClasses.isActive, isActive)
      element.setAttribute(this.stateAttributes.ariaCurrent, isActive.toString())
    })


    this.contentImageElements.forEach((element, index) => {
      const isActive = activePaginationIndex === index
      const varExist = element.style.getPropertyValue('--bgImage') !== ''
      
      if (varExist) {
        element.style.setProperty('--bgImage', `url(../../images/hero/${activePaginationIndex + 1}.png)`)
      } else {
        element.classList.toggle(this.stateClasses.isActive, isActive)
      }
    })

    this.contentSubtitleElements.forEach((element, index) => {
      const isActive = activePaginationIndex === index

      element.classList.toggle(this.stateClasses.isActive, isActive)
    })

    this.contentDescriptionElements.forEach((element, index) => {
      const isActive = activePaginationIndex === index

      element.classList.toggle(this.stateClasses.isActive, isActive)
    })
  }

  onButtonClick = (index) => {
    this.state.activePaginationIndex = index
    this.updateUi()
  }

  bindEvents() {
    this.buttonElements.forEach((element, index) => {
      element.addEventListener('click', () => {
        this.onButtonClick(index)
      })
    })

    this.buttonExtraElements.forEach((element, index) => {
      element.addEventListener('click', () => {
        this.onButtonClick(index)
      })
    })
  }

}

class PaginationCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Pagination(element);
    })
  }
}

export default PaginationCollection