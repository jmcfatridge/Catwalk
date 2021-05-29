import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div className='header-container'>
        <div className='header-logo-info'
        style={{
          width: '100%',
          padding: '25px 0',
          backgroundColor: 'rgb(101, 128, 77)',
          fontSize: '28px',
          color: 'white',
          display: 'grid',
          gridTemplateColumns: 'auto auto'
          }}>
            <div className='header-logo' style={{paddingLeft: '25px'}}>
              <em><b>Project Catwalk</b></em>
            </div>
            <div className='header-search'
              style={{justifySelf: 'end', paddingRight: '25px'}}>
              _________&nbsp;&nbsp;
              <i className="fas fa-search"
              style={{fontSize: '17px'}}></i>
            </div>
        </div>
        <div className='header-page-info'
        style={{
          textAlign: 'center',
          padding: '20px'
          }}>
            <em>SITE-WIDE-ANNOUCEMENT MESSAGE! —
              SALE / DISCOUNT <b>OFFER</b> —&nbsp;
              <u>NEW PRODUCT HIGHLIGHT</u></em>
          </div>
      </div>
    )
  }
}
export default Header;