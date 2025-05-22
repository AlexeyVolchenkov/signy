import articles from "./data/articles.js";

const rootElement = '[data-js-tabs-body]'

class PaginationBlog {
  selectors = {
    root: rootElement,
    listArticles: '[data-js-tabs-list]',
    paginationControls: '[data-js-pagination-controls]',
    paginationControlsNumbers: '[data-js-pagination-controls-numbers]',
    paginationControlsNumber: '[data-js-pagination-controls-number]',
    prevButton: '[data-js-pagination-controls-prev-button]',
    nextButton: '[data-js-pagination-controls-next-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    visuallyHidden: 'visually-hidden',
    paginationControlsItem: 'tabs__pagination-controls-item',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.listArticlesElement = this.rootElement.querySelector(this.selectors.listArticles)
    this.paginationControlsElement = this.rootElement.querySelector(this.selectors.paginationControls)
    this.paginationControlsNumbersElement = this.rootElement.querySelector(this.selectors.paginationControlsNumbers)
    this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
    this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)

    this.states = new Proxy({
      articleCountOnPage: 7,
      currentPage: 1,
    }, {
      get: (target, prop) => {
        return target[prop]
      },
      set: (target, prop, newValue) => {
        if(target[prop] !== newValue) {
          target[prop] = newValue
          this.pagination()
        }
        return true
      }
    })

    this.pagination()
    this.renderPagination()
    this.paginationControlsNumberElements = this.rootElement.querySelectorAll(this.selectors.paginationControlsNumber)
    this.bindEvents()
  }

  appendArticle(article) {
    this.listArticlesElement.append(article)
  }

  renderArticle({ id, time, title, tags, description}) {
    const liArticle = document.createElement('li')
    liArticle.classList.add('tabs__item')
    
    liArticle.innerHTML = `
      <div class="blog-card" id=${id}>
        <img 
          src="images/blog-card/headsets-on-table.jpg" 
          alt="" 
          class="blog-card__image"
          width="370" height="371"
        />
        <div class="blog-card__body">
          <time datetime="2020-03-05" class="blog-card__time">${time}</time>
          <h2 class="blog-card__title">${title}</h2>
          <ul class="blog-card__list">
            <li class="blog-card__item">
              <div class="blog-card__tag">про продукт</div>
            </li>
            <li class="blog-card__item">
              <div class="blog-card__tag">теги</div>
            </li>
          </ul>
          <div class="blog-card__description">
            <p>${description}</p>
          </div>
        </div>
      </div>
    `
    return liArticle
  }

  renderArticles(articlesOnPage) {
    articlesOnPage.forEach((article) => {
      this.appendArticle(this.renderArticle(article))
    })
  }

  renderPagination() {

    const pagesCount = Math.ceil(articles.length / this.states.articleCountOnPage)

    for (let page = 1; page <= pagesCount; page++) {
      const paginationNumberElement = document.createElement('li')
      paginationNumberElement.classList.add(this.stateClasses.paginationControlsItem)
      paginationNumberElement.textContent = page
      paginationNumberElement.setAttribute('data-js-pagination-controls-number', '')

      if(this.states.currentPage === page) {
        paginationNumberElement.classList.add(this.stateClasses.isActive)
      }

      this.paginationControlsNumbersElement.append(paginationNumberElement)
    }

    this.paginationControlsElement.classList.remove(this.stateClasses.visuallyHidden)
  }

  pagination() {
    this.listArticlesElement.innerHTML = ``
    const { articleCountOnPage, currentPage } = this.states

    const firstArticleIndex = articleCountOnPage * currentPage - articleCountOnPage
    const lastArticleIndex = firstArticleIndex + articleCountOnPage

    const articlesOnPage = articles.slice(firstArticleIndex, lastArticleIndex)

    this.prevButtonElement.classList.remove('not-active')
    this.nextButtonElement.classList.remove('not-active')
    
    if(this.states.currentPage === 1) {
      this.prevButtonElement.classList.add('not-active')
    }

    if(this.states.currentPage === Math.ceil(articles.length / this.states.articleCountOnPage)) {
      this.nextButtonElement.classList.add('not-active')
    }

    this.renderArticles(articlesOnPage)
  }

  onNumberElementClick = (event) => {
    this.states.currentPage = parseInt(event.target.textContent)

    this.paginationControlsNumberElements.forEach((element) => {
      element.classList.remove(this.stateClasses.isActive)
    })
    event.target.classList.add(this.stateClasses.isActive)
  }

  onPrevButtonClick = () => {
    this.states.currentPage = this.states.currentPage - 1
  }

  onNextButtonElement = () => {
    
    this.states.currentPage = this.states.currentPage + 1
  }

  bindEvents() {
    this.paginationControlsNumberElements.forEach((numberElement) => {
      numberElement.addEventListener('click', this.onNumberElementClick)
    })

    this.prevButtonElement.addEventListener('click', this.onPrevButtonClick)
    this.nextButtonElement.addEventListener('click', this.onNextButtonElement)
  }
}

class PaginationBlogCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootElement).forEach((element) => {
      new PaginationBlog(element)
    })
  }
}

export default PaginationBlogCollection