import React from 'react'
import {StatsSingleElement, HeaderImgBackground} from '../components/index'
import styled from 'styled-components'
import {list} from '../data/carousel'

const StatsSingleElementPage = () => {
  let blogPages = [{blogPage: true}]
  
  return (
    <Wrapper>
    <div className='single-page'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

      <div className='book-cont'>
      <StatsSingleElement />
      </div>
    
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.single-page {
  position: relative;
  margin-top: 6rem;
  background-color: var(--color-1);
  
}

.book-cont{
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100vw;
  z-index: 0;
  padding-left: 60px;
  padding-right: 60px;
}


/* Large devices (desktops) */
@media (max-width: 991px) {
  .single-page {
  margin-top: 6rem;
}

.book-cont{
  padding-left: 20px;
  padding-right: 20px;
}
}
`

export default StatsSingleElementPage
