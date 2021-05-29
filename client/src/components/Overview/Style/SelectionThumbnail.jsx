import React from 'react';

const SelectionThumbnail = ({ styles, clearSize, selected }) => {
  const hide = {"visibility": "hidden"}
  const show = {"visibility": "visible"}
  return (
    <div className="style_thumbnails">
      {
        styles.map((style) => {
          return (
            <div key={style.style_id} className="thumbnail-container">
              <img
                id={style.style_id}
                className={'selector'}
                type="image"
                src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : "broken-image.jpg"}
                title={style.name}
                alt={style.name}
                onClick={clearSize}>
                </img>
                <i className="fas fa-check-circle fa-2x"
                  style={selected === style.style_id ? show : hide}></i>
            </div>
          )
        })
      }
    </div>
  )
}

export default SelectionThumbnail;