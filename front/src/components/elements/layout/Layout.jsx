import React from 'react';
import three from '../../../assets-style/img/PNG/pngwing.com(2).png';
import castle from '../../../assets-style/img/PNG/pngwing.com(3).png';

/**
 * React functional component for rendering a layout with SVG and image assets.
 *
 * @returns {JSX.Element} The rendered layout.
 */

export const Layout = () => {
  return (
    <>
      <div className={'background-img__login'}>
        <img src={castle} alt="" />
      </div>
      <div
        style={{ position: 'absolute', zIndex: 2 }}
        className={'page__auth__right-cinder'}
      >
        <img src={three} alt="" />
      </div>

      {/* <div style={{ position: 'absolute', zIndex: 3 }} className={"page__auth__right-artorias"}> */}
      {/* <img src={seven} alt="" /> */}
      {/* </div> */}
    </>
  );
};
export default Layout;
