import articles from './data/articles.js'

const rootBlogPostSelector = '[data-js-blog-post]'
const rootSwitchesSelector = '[data-js-switchers]'

class BlogPost {
  selectors = {
    rootBlogPost: rootBlogPostSelector,
    rootSwitchers: rootSwitchesSelector,
    prevTitle: '[data-js-prev-title]',
    prevLink: '[data-js-prev-link]',
    nextTitle: '[data-js-next-title]',
    nextLink: '[data-js-next-link]',
  }

  constructor() {
    this.rootBlogPostElement = document.querySelector(this.selectors.rootBlogPost)
    
    if (this.rootBlogPostElement) {
      this.rootSwitchersElement = document.querySelector(this.selectors.rootSwitchers)
      this.prevTitleElement = this.rootSwitchersElement.querySelector(this.selectors.prevTitle)
      this.nextTitleElement = this.rootSwitchersElement.querySelector(this.selectors.nextTitle)
      this.prevLinkElement = this.rootSwitchersElement.querySelector(this.selectors.prevLink)
      this.nextLinkElement = this.rootSwitchersElement.querySelector(this.selectors.nextLink)

      this.urlParams = new URLSearchParams(window.location.search)
      this.articleId = this.urlParams.get('id')

      this.renderBlogPost()
    }
  }

  renderBlogPost() {
    const article = articles.find((item) => {
      return item.id === this.articleId
    })

    this.isArticleExist = this.articleId !== null && article !== undefined

    if (articles[this.articleId - 2]) {
      this.prevTitleElement.textContent = articles[+this.articleId - 2].title
      this.prevLinkElement.classList.remove('disabled')
      this.prevLinkElement.href = `blog-post.html?id=${+this.articleId - 1}`
    } else {
      this.prevLinkElement.classList.add('disabled')
    }

    if (articles[this.articleId]) {
      this.nextTitleElement.textContent = articles[+this.articleId].title
      this.nextLinkElement.classList.remove('disabled')
      this.nextLinkElement.href = `blog-post.html?id=${+this.articleId + 1}`
    } else {
        this.nextLinkElement.classList.add('disabled')
    }

    if (!this.isArticleExist) {
      this.rootBlogPostElement.innerHTML = `
        <div class="blog-post__inner container">
          <h1 class="blog-post__title" title="blog-post-title">
            Такой статьи не существует
          </h1>
        </div>
      `
    } else {
      const { id, tags, time, title } = article
      let { fullContent } = article

      if (fullContent === undefined) {
        fullContent = `
        <div class="blog-post__content">
          <b>У сатьи нет подробного описания</b>
        </div>
        `
      }

      this.rootBlogPostElement.innerHTML = `
        <div class="blog-post__inner container">
          <h1 class="blog-post__title" title="blog-post-title">
            ${title}
          </h1>

          <div class="blog-post__info">
            <time datetime="2020-05-28" class="blog-post__info-date">${time}</time>
            <div class="blog-post__tags">
              <ul class="blog-card__list">
              </ul>
            </div>
          </div>

          ${fullContent}
        </div>
      `

      const listTagsBlogCard = this.rootBlogPostElement.querySelector('.blog-card__list')

      tags.forEach((tag) => {
        const tagItem = document.createElement('li')
        tagItem.classList.add('blog-card__item')
        tagItem.innerHTML = `
          <div class="blog-card__tag">${tag}</div>
        `
        listTagsBlogCard.append(tagItem)
      })

      document.title = `Signy | Blog-${this.articleId}`
    }
  }
}

export default BlogPost