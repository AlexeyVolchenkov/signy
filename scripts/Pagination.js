const rootSelector = '[data-js-pagination]'

class Pagination {
  selector = {
    root: rootSelector,
    button: '[data-js-pagination-button]',
    content: '[data-js-pagination-content]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  stateAttributes = {
    ariaCurrent: 'aria-current',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selector.button)
    this.contentElements = document.querySelectorAll(this.selector.content)
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

    this.contentElements.forEach((element, index) => {
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
  }
}

class PaginationCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Pagination(element);
      console.log(element);
    })
  }
}

export default PaginationCollection