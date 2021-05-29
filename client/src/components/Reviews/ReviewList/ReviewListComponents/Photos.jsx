import React, { useState } from 'react';
import PhotosModal from './PhotosModal.jsx';

const Photos = (props) => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');
  return (
    <div className='review-tile-photos review-tile-element'>
      {props.photoList.map((val, i) => {
        return (
          <img className={'review-tile-photos review-tile-photo-' + i}
            key={'photo-' + val.id} src={val.url}
            onClick={() => {setShow(true); setUrl(val.url)}}
            alt={'photo ' + i + ': ' + val.id}
            onError={function(e) {e.target.src='broken-image.jpg'; e.target.alt='broken image'}}
            style={{
              'height': '50px',
              'width': '50px',
              'marginRight': '4px',
              'border': '1px solid #ddd',
              'padding': '3px',
              'borderRadius': '2px'
          }}></img>
        )
      })}
      <PhotosModal
        url={url}
        setShow={setShow}
        show={show}/>

    </div>
  )
};

export default Photos;