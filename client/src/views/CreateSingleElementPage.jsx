import React from 'react'
import {CreateSingleElement, HeaderImgBackground} from '../components/index'
import styled from 'styled-components'
import {list} from '../data/carousel'
import { useLocation } from 'react-router-dom';
import {UseUserContext} from '../mainIndex'

const CreateSingleElementPage = () => {
  const {currentUser} = UseUserContext()
  const location = useLocation();
  const path = location.pathname.split("/")[3]

  let blogPages = [{blogPage: true}]
  
  return (
    <Wrapper>
    <div className='single-page'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

      <div className='book-cont'>
      <CreateSingleElement currentUser={currentUser} path={path}/>
      </div>
    
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.single-page {
  /* position: relative; */
 height: 100%;
  background-color: var(--color-1);
}

.book-cont{
  position: relative;
  top: 0rem;
  margin-top: 6rem;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
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

export default CreateSingleElementPage
