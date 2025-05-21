const rootSelector = '[data-js-form]'

class FormsValidation {
  selectors = {
    root: rootSelector,
    error: '[data-js-form-fields-error]',
  }

  states = {
    invalid: 'invalid',
  }

  constructor (rootElement) {
    this.rootElement = rootElement
    this.errorElement = this.rootElement.querySelector(this.selectors.error)
    this.bindEvents()
  }

  onBlur(event) {
    const { target } = event
    const isFormField = target.closest(this.selectors.root)
    const isRequired = target.required

    if (isFormField && isRequired) {
      const isValid = target.value.includes('@');
      target.classList.toggle(this.states.invalid, !isValid);
    }
  }

  onFocus(event) {
    event.target.classList.remove(this.states.invalid)
  }

  bindEvents() {
    document.addEventListener('blur', (event) => {
      this.onBlur(event)
    }, { capture: true })

    document.addEventListener('focus', (event) => {
      this.onFocus(event)
    }, { capture: true })
  }
}

class FormsValidationCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new FormsValidation(element)
    })
  }
}

export default FormsValidationCollection