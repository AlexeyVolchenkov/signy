rootSelector = '[data-js-video-player]'

class VideoPlayer {
  selector = {
    root: rootSelector,
  }

  constructor (rootElement) {

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