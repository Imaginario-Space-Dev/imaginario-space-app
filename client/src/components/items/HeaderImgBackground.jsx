import React from 'react'
import styled from 'styled-components'
import {UseGeneralContext} from '../../mainIndex'

const HeaderImgBackground = ({list, BgImage}) => {
  const {isDashboard} = UseGeneralContext()
  return (
    <Wrapper>
    <div className={
      list[0]?.blogPage ? 
    isDashboard ?
      'header-background header-background-dashboard header-background-blogs': 
      'header-background header-background-blogs':
      isDashboard ?
      'header-background header-background-dashboard':
      'header-background'
      }>
        <img src={BgImage} className='img-fundo'/>
            <div className={list[0]?.blogPage == true ? 'header-background-layer header-background-layer-blogs' : 'header-background-layer'}>
        </div>
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.header-background {
  position: fixed;
  top: 0rem;
  right: 0;
  height: 30vh;
  width: 100%;
  z-index: 0;
  background-color: var(--color-2);

  .img-fundo {
    position: relative;
    width: 100%;
    height: 30vh;
    opacity: 0.2;
    object-fit: cover;
}
.header-background-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 0;
  background-image: linear-gradient(to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, .9),
    rgba(0, 0, 0, .8),
    rgba(0, 0, 0, .6),
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, 0)
);
background-color: transparent;
}

.header-background-blogs {
  background-color: var(--color-1);
}
.header-background-layer-blogs {
  height: 100%;
  background-image: linear-gradient(to top,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, .9),
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, .6),
    rgba(255, 255, 255, .2),
    rgba(255, 255, 255, 0)
);
}
}

.header-background-dashboard {
  top: 3rem;
}
`
export default HeaderImgBackground
