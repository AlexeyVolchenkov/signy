import articles from "./data/articles.js";

const rootElement = '[data-js-tabs]'

class PaginationBlog {
  selectors = {
    root: rootElement,
    tabsButton: '[data-js-tabs-button]',
    listArticles: '[data-js-tabs-list]',
    listTagsArticle: '[data-js-card-list-tags-article]',
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
    notActive: 'not-active',
  }

  chosenTab = {
    all: 'Все',
    news: 'Новости',
    training: 'Обучение',
    law: 'Законы',
  }

  constructor(rootElement) {
    this.articlesChosen = [...articles]
    this.rootElement = rootElement
    this.tabsButtonElements = this.rootElement.querySelectorAll(this.selectors.tabsButton)
    this.listArticlesElement = this.rootElement.querySelector(this.selectors.listArticles)
    this.paginationControlsElement = this.rootElement.querySelector(this.selectors.paginationControls)
    this.paginationControlsNumbersElement = this.rootElement.querySelector(this.selectors.paginationControlsNumbers)
    this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
    this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)

    this.states = new Proxy({
      chosenTab: this.chosenTab.all,
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
          <ul class="blog-card__list" data-js-card-list-tags-article>
          </ul>
          <div class="blog-card__description">
            <p>${description}</p>
          </div>
        </div>
      </div>
    `

    const listTagsArticleElement = liArticle.querySelector(this.selectors.listTagsArticle)
    
    tags.forEach((tag) => {
      const tagItem = document.createElement('li')
      tagItem.classList.add('blog-card__item')
      tagItem.innerHTML = `<div class="blog-card__tag">${tag}</div>`
      listTagsArticleElement.append(tagItem)
    })

    return liArticle
  }

  renderArticles(articlesOnPage) {
    articlesOnPage.forEach((article) => {
      this.appendArticle(this.renderArticle(article))
    })
  }

  renderPagination() {

    const pagesCount = Math.ceil(this.articlesChosen.length / this.states.articleCountOnPage)

    this.paginationControlsNumbersElement.innerHTML = ''

    for (let page = 1; page <= pagesCount; page++) {
      const paginationNumberElement = document.createElement('li')
      paginationNumberElement.classList.add(this.stateClasses.paginationControlsItem)
      paginationNumberElement.textContent = page
      paginationNumberElement.setAttribute('data-js-pagination-controls-number', '')
      paginationNumberElement.addEventListener('click', this.onNumberElementClick)

      if(this.states.currentPage === page) {
        paginationNumberElement.classList.add(this.stateClasses.isActive)
      }
      this.paginationControlsNumbersElement.append(paginationNumberElement)
      
    }

    if(this.articlesChosen.length === 0) {
      this.paginationControlsElement.classList.add(this.stateClasses.visuallyHidden)
    } else {
      this.paginationControlsElement.classList.remove(this.stateClasses.visuallyHidden)
    }
  }

  pagination() {
    this.listArticlesElement.innerHTML = ``
    const { articleCountOnPage, currentPage } = this.states

    const firstArticleIndex = articleCountOnPage * currentPage - articleCountOnPage
    const lastArticleIndex = firstArticleIndex + articleCountOnPage

    const articlesOnPage = this.articlesChosen.slice(firstArticleIndex, lastArticleIndex)

    this.prevButtonElement.classList.remove(this.stateClasses.notActive)
    this.nextButtonElement.classList.remove(this.stateClasses.notActive)
    
    if (this.states.currentPage === 1) {
      this.prevButtonElement.classList.add(this.stateClasses.notActive)
    }

    const countPages = Math.ceil(this.articlesChosen.length / this.states.articleCountOnPage)

    if (this.states.currentPage === countPages || countPages === 0) {
      this.nextButtonElement.classList.add(this.stateClasses.notActive)
    }

    this.renderArticles(articlesOnPage)
  }

  onNumberElementClick = (event) => {
    this.states.currentPage = parseInt(event.target.textContent)
    
    this.paginationControlsNumberElements = this.rootElement.querySelectorAll(this.selectors.paginationControlsNumber)

    this.paginationControlsNumberElements.forEach((element) => {
      element.classList.remove(this.stateClasses.isActive)
    })
    event.target.classList.add(this.stateClasses.isActive)
  }

  onPrevButtonClick = () => {
    this.states.currentPage = this.states.currentPage - 1
    this.paginationControlsNumberElements = this.rootElement.querySelectorAll(this.selectors.paginationControlsNumber)
    this.paginationControlsNumberElements.forEach((element, index) => {
      element.classList.remove(this.stateClasses.isActive)
      if (index + 1 === this.states.currentPage) {
        element.classList.add(this.stateClasses.isActive)
      }
    })
  }

  onNextButtonElement = () => {
    this.states.currentPage = this.states.currentPage + 1
    this.paginationControlsNumberElements = this.rootElement.querySelectorAll(this.selectors.paginationControlsNumber)
    this.paginationControlsNumberElements.forEach((element, index) => {
      element.classList.remove(this.stateClasses.isActive)
      if (index + 1 === this.states.currentPage) {
        element.classList.add(this.stateClasses.isActive)
      }
    })
  }

  onTabsButtonClick = ( {target} ) => {
    this.articlesChosen = []
    if (target.textContent.trim() === this.chosenTab.all) {
      this.articlesChosen = articles
    } else {
      articles.forEach((element) => {
      if (element.tags.includes(target.textContent.trim())) {
        this.articlesChosen.push(element)
      }
    })
    }

    if (this.articlesChosen.length === 0) {
      this.states.currentPage = 0
    } else {
      this.states.currentPage = 1
    }

    this.states.chosenTab = target.textContent.trim()
    this.renderPagination()
    this.bindEvents()
  }

  bindEvents() {
    this.paginationControlsNumberElements.forEach((numberElement) => {
      numberElement.addEventListener('click', this.onNumberElementClick)
    })

    this.prevButtonElement.addEventListener('click', this.onPrevButtonClick)
    this.nextButtonElement.addEventListener('click', this.onNextButtonElement)

    this.tabsButtonElements.forEach((tabsButtonElement) => {
      tabsButtonElement.addEventListener('click', this.onTabsButtonClick)
    })
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