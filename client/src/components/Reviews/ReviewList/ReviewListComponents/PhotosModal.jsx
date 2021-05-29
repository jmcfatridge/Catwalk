import React from 'react';
import Modal from 'react-modal';
import WidgetContext from '../../../WidgetContext.jsx';
if (process.env.NODE_ENV !== 'test') {Modal.setAppElement('#app');}

const PhotosModal = (props) => {
  var modalMargin = (window.innerHeight * 0.5) - 350;
  if (modalMargin < 0) {modalMargin = 0}

  return (
    <WidgetContext.Consumer>
      {({addWidgetName}) => {
        return (
          <Modal
            isOpen={props.show}
            ariaHideApp={false}
            contentLabel='Photo Expand'
            className='review-tile-photo-expand'
            onRequestClose={() => {props.setShow(false)}}
            style={{'content': {'marginTop': modalMargin + 'px'}}}
            >
            <div {...addWidgetName()} className='review-add-header'
            style={{'display': 'grid', 'gridTemplateColumns': 'auto'}}>

              <div {...addWidgetName()} className='btn-add-reviews-close' onClick={() => {props.setShow(false)}}>✕</div>

            </div>

            {/* ------------------------------------------------- */}

            <div {...addWidgetName()} className='review-tile-photo-expand-photo'>
              <img src={props.url}
              className='review-tile-photo-expand-photo'
              alt='review tile photo expanded'
              onError={function(e) {e.target.src='broken-image.jpg'; e.target.alt='broken image'}}
              style={{
                'maxHeight': '50vh',
                'maxWidth': '94%',
                'marginLeft': '3%',
                'marginTop': '3%',
                'marginBottom': '3%'
            }}/>
            </div>
          </Modal>
        )
      }}
    </WidgetContext.Consumer>
  );
}

export default PhotosModal;