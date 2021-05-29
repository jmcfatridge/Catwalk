import React from 'react';
import Modal from 'react-modal';
import Arrow from './Arrow.jsx';
import GalleryThumbnail from './GalleryThumbnail.jsx';


const DefaultView = ({
  mainImage,
  handleArrowClick,
  handleThumbnailClick,
  thumbnails,
  showExpanded,
  handleOpenExpanded,
  handleCloseExpanded,
  currentSelected,
  getCursorPosition,
  altText
}) => {
  const expand = <div className="expand-button" onClick={handleOpenExpanded}></div>
  const compress = <div className="compress-button"
                      onClick={handleCloseExpanded}
                      onMouseMove={getCursorPosition}></div>
  const style = { "backgroundImage": `url(${mainImage ? mainImage : "broken-image.jpg"})`}
  return (
    <div className="image-slide" style={style}>
      <GalleryThumbnail
        handleThumbnailClick={handleThumbnailClick}
        thumbnails={thumbnails}
        handleArrowClick={handleArrowClick}
        currentSelected={currentSelected}
        altText={altText}/>
      <Arrow direction="left" handleArrowClick={handleArrowClick}/>
      {showExpanded === true ? compress : expand}
      <Arrow direction="right" handleArrowClick={handleArrowClick}/>
    </div>
  )
}

export default DefaultView;