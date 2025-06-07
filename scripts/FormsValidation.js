const rootSelector = '[data-js-form]'

class FormsValidation {
  selectors = {
    root: rootSelector,
    button: '[data-js-form-button]',
    inner: '[data-js-form-inner]',
    already: '[data-js-form-already]',
    input: '[data-js-form-input]',
    error: '[data-js-form-fields-error]',
  }

  states = {
    invalid: 'invalid',
    visuallyHidden: 'visually-hidden',
  }

  constructor (rootElement) {
    this.rootElement = rootElement
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.innerElement = this.rootElement.querySelector(this.selectors.inner)
    this.inputElement = this.rootElement.querySelector(this.selectors.input)
    this.alreadyElement = this.rootElement.querySelector(this.selectors.already)
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

  onButtonClick = (event) => {
    event.preventDefault()
    if (this.inputElement.value.includes('@')) {
      this.innerElement.classList.toggle(this.states.visuallyHidden)
      this.alreadyElement.classList.toggle(this.states.visuallyHidden)
      const title = document.createElement('h2')
      title.classList.add('send-mail__title')
      title.textContent = 'Отлично!'

      const subtitle = document.createElement('h3')
      subtitle.classList.add('send-mail__subtitle')
      subtitle.textContent = `На адресс ${this.inputElement.value} теперь будут приходить самые важные новости`

      this.alreadyElement.append(title)
      this.alreadyElement.append(subtitle)
    } else {
      this.inputElement.classList.add(this.states.invalid);
    }
  }

  bindEvents() {
    document.addEventListener('blur', (event) => {
      this.onBlur(event)
    }, { capture: true })

    document.addEventListener('focus', (event) => {
      this.onFocus(event)
    }, { capture: true })

    if (this.buttonElement) {
      this.buttonElement.addEventListener('click', this.onButtonClick)
    }
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