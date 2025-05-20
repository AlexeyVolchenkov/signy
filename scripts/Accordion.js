const rootSelector = '[data-js-accordion]'

class Accordion {
  selectors = {
    root: rootSelector,
    item: '[data-js-accordion-item]',
    button: '[data-js-accordion-button]',
    content: '[data-js-accordion-content]',
  }

  stateClasses = {
    isActive: 'is-active'
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.itemElements = this.rootElement.querySelectorAll(this.selectors.item)
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
    this.activeAccordion = {
      activeAccordionIndex: [...this.contentElements].findIndex((element) => {
        return element.classList.contains(this.stateClasses.isActive)
      })
    }

    this.activeAccordion = new Proxy({
      activeAccordionIndex: [...this.contentElements].findIndex((element) => {
        return element.classList.contains(this.stateClasses.isActive)
      })
    }, {
      get: (target, prop) => {
        return target[prop]
      },

      set: (target, prop, newValue) => {
        if (target[prop] !== newValue) {
          target[prop] = newValue
          this.updateUi()
        }

        return true
      }
    })

    this.bindEvents()
  }

  updateUi() {
    const { activeAccordionIndex } = this.activeAccordion

    this.contentElements.forEach((element, index) => {
      const isActive = activeAccordionIndex === index

      element.classList.toggle(this.stateClasses.isActive, isActive)
    })

    this.itemElements.forEach((element, index) => {
      const isActive = activeAccordionIndex === index

      element.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
    })
  }

  onButtonClick = (index) => {
    this.activeAccordion.activeAccordionIndex = index
  }

  bindEvents() {
    this.buttonElements.forEach((element, index) => {
      element.addEventListener('click', () => {
        this.onButtonClick(index)
      })
    })
  }
}

class AccordionCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Accordion(element)
    })
  }
}

export default AccordionCollection