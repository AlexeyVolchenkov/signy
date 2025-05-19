const rootSelector = '[data-js-video-player]'

class VideoPlayer {
  selector = {
    root: rootSelector,
    video: '[data-js-video-player-video]',
    panel: '[data-js-video-player-panel]',
    playButton: '[data-js-video-player-play-button]',
  }
  
  stateClasses = {
    isActive: 'is-active',
  }

  constructor (rootElement) {
    this.rootElement = rootElement
    this.videoElement = this.rootElement.querySelector(this.selector.video)
    this.panelElement = this.rootElement.querySelector(this.selector.panel)
    this.playButtonElement = this.panelElement.querySelector(this.selector.playButton)
    this.bindEvents()
  }

  onPlayButtonClick = (event) => {
    event.preventDefault();
    if (this.videoElement.paused) {
      this.videoElement.play();
      this.videoElement.controls = true
      this.panelElement.classList.remove(this.stateClasses.isActive)
    } else {
      this.videoElement.pause();
    }
  }

  onVideoPause = () => {
    this.videoElement.controls = false
    this.panelElement.classList.add(this.stateClasses.isActive)
  }

  bindEvents() {
    this.playButtonElement.addEventListener('click', this.onPlayButtonClick)
    this.videoElement.addEventListener('click', this.onPlayButtonClick)
    this.videoElement.addEventListener('pause', this.onVideoPause)
  }
}

class VideoPlayerCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new VideoPlayer(element)
    })
  }
}

export default VideoPlayerCollection