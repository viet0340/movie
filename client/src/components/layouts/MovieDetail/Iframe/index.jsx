import { iframeIsFalse } from 'components/redux/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

function Iframe() {
  const dispatch = useDispatch();

  const { iframe, url } = useSelector((state) => state.iframeReducer);

  let style = iframe
    ? { display: 'flex', zIndex: '999' }
    : { display: 'none', zIndex: '-1' };

  function handleCanner() {
    dispatch(iframeIsFalse());
    var iframe = document.getElementsByTagName('iframe')[0];

    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
  }
  return (
    <div className='iframe' style={style}>
      <iframe
        className='iframe-embed'
        title='film'
        width='100%'
        height='600'
        src={url}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
      <div className='canner' onClick={handleCanner}>
        X
      </div>
    </div>
  );
}

export default Iframe;
