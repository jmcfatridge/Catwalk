import React from 'react';
import Arrow from './Arrow.jsx';

const GalleryThumbnail = ({
  handleThumbnailClick,
  thumbnails,
  handleArrowClick,
  currentSelected,
  altText
}) => {
  const faded = { "filter": "grayscale(1)" }
  const onPoint = { "filter": "grayscale(0)", "border": "solid" }
  return (
    <div className="thumbnail-carousel">
      <Arrow direction="up" handleArrowClick={handleArrowClick}/>
        <div id="car-scroll" className="carousel-overview-container">
          {
            thumbnails.map((thumb, index) => {
              return (<div key={index}>
                       <img
                         id={index}
                         className={`gallery-thumbnail ${index}`}
                         type="image"
                         src={thumb ? thumb : "broken-image.jpg"}
                         name={index}
                         onClick={handleThumbnailClick}
                         alt={altText}
                         style={currentSelected === index ? onPoint : faded}></img>
                     </div>)
            })
          }
        </div>
      <Arrow direction="down" handleArrowClick={handleArrowClick}/>
    </div>
  )
}

export default GalleryThumbnail;