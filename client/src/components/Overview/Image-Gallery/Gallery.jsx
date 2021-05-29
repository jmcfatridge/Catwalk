import React from 'react';
import $ from 'jquery';
import DefaultView from './GalleryVersions/DefaultView.jsx';
import Arrow from './GalleryVersions/Arrow.jsx';
import { WidgetProvider } from '../../WidgetContext.jsx';



class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageArray: null,
      thumbnailArray: null,
      currentIndex: 0,
      maxIndex: null,
      showExpanded: false,
      scrolled: 0,
      imageWidth: null,
      imageHeight: null
    }
    this.handleArrowClick = this.handleArrowClick.bind(this)
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this)
    this.handleArrowChange = this.handleArrowChange.bind(this)
    this.handleCloseExpanded = this.handleCloseExpanded.bind(this)
    this.handleOpenExpanded = this.handleOpenExpanded.bind(this)
    this.autoScroll = this.autoScroll.bind(this)
    this.getCursorPosition = this.getCursorPosition.bind(this)
  }

  componentDidUpdate(oldProps) {
    if (this.props.style !== oldProps.style) {
      var imageResult = [];
      var thumbResult = [];
      this.props.style.photos.forEach((image) => {
        imageResult.push(image.url);
        thumbResult.push(image.thumbnail_url);
      })
      this.setState({imageArray: imageResult, thumbnailArray: thumbResult})
      this.setState({maxIndex: (imageResult.length - 1)})
      this.setState({currentIndex: 0}, this.handleArrowChange)
    }
  }

  handleArrowClick(e) {
    if (e.target.id === "right" && this.state.currentIndex < this.state.maxIndex) {
      this.setState({currentIndex: this.state.currentIndex + 1}, this.handleArrowChange)
      this.autoScroll('right')
    } else if (e.target.id === "left" && this.state.currentIndex > 0) {
      this.setState({currentIndex: this.state.currentIndex - 1}, this.handleArrowChange)
      this.autoScroll('left')
    } else if (e.target.id === "up" && this.state.currentIndex > 0) {
      this.setState({currentIndex: this.state.currentIndex - 1}, this.handleArrowChange)
      this.autoScroll('up')
    } else if (e.target.id === "down" && this.state.currentIndex < this.state.maxIndex) {
      this.setState({currentIndex: this.state.currentIndex + 1}, this.handleArrowChange)
      this.autoScroll('down')
    }
  }

  handleArrowChange() {
    if (this.state.currentIndex !== 0) {
      document.querySelector('.left').style.visibility="visible"
      document.querySelector('.up').style.visibility="visible"
    } else {
      document.querySelector('.left').style.visibility="hidden"
      document.querySelector('.up').style.visibility="hidden"
    }
    if (this.state.currentIndex !== this.state.maxIndex) {
      document.querySelector('.right').style.visibility="visible"
      document.querySelector('.down').style.visibility="visible"
    } else {
      document.querySelector('.right').style.visibility="hidden"
      document.querySelector('.down').style.visibility="hidden"
    }
  }

  autoScroll(option) {
    var scroll = () => {
      document.getElementById('car-scroll').scrollTop = this.state.scrolled;
    }
    if (option === 'left' || option === 'up') {
      this.setState({scrolled: this.state.currentIndex * 9}, scroll())
    } else {
      this.setState({scrolled: this.state.currentIndex * 50}, scroll())
    }
  }

  handleThumbnailClick(e) {
    var num = Number.parseInt(e.target.name)
    this.setState({currentIndex: num}, this.handleArrowChange)
  }

  handleOpenExpanded() {
    this.setState({ showExpanded: true })
    $(".product-style-and-cart").toggle()
    var wide = $(".image-slide").width() *2.5;
    var high = $(".image-slide").height() * 2.5;
    this.setState({imageWidth: wide, imageHeight: high})
    $(".image-slide").css({"backgroundSize": `${wide}px ${high}px`})
    document.querySelector('.right').style.visibility="hidden"
    document.querySelector('.left').style.visibility="hidden"
  }

  handleCloseExpanded() {
    this.setState({ showExpanded: false })
    $(".product-style-and-cart").toggle()
    $(".image-slide").css({"backgroundSize": "100% 100%"})
    $(".image-slide").css({"backgroundPosition": "center"})
    document.querySelector('.right').style.visibility="visible"
    document.querySelector('.left').style.visibility="visible"
  }

  getCursorPosition(e) {
    var nativeX = e.nativeEvent.offsetX
    var nativeY = e.nativeEvent.offsetY
    if (e.target.offsetWidth > 800 && e.target.offsetWidth < 1000 ) {
      if (nativeX < (520)) {
        nativeX = 520;
      }
    } else if (e.target.offsetWidth > 1000) {
      if (nativeX < (770)) {
        nativeX = 770;
      }
    }
    if (nativeX > 1000) {
      nativeX = 1000;
    }
    var x = nativeX - this.state.imageWidth * .53
    var y = nativeY - this.state.imageHeight * .5
    $(".image-slide").css({"backgroundPositionX": x, "backgroundPositionY": y})
  }

  render() {
    if (!this.state.imageArray || !this.state.thumbnailArray) {
      return (<div className="image_gallery"></div>)
    }
    const defaultStyle = { "width": "50%" }
    const expandStyle = { "width": "100%" }
    return (
      <div className="image_gallery" style={this.state.showExpanded === true ? expandStyle : defaultStyle}>
        <DefaultView
          mainImage={this.state.imageArray[this.state.currentIndex]}
          handleArrowClick={this.handleArrowClick}
          thumbnails={this.state.thumbnailArray}
          handleThumbnailClick={this.handleThumbnailClick}
          showExpanded={this.state.showExpanded}
          handleCloseExpanded={this.handleCloseExpanded}
          handleOpenExpanded={this.handleOpenExpanded}
          currentSelected={this.state.currentIndex}
          getCursorPosition={this.getCursorPosition}
          altText={this.props.style.name}/>
      </div>
    )
  }
}

export default Gallery;