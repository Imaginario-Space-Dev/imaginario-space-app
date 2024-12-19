import React from 'react'
import {EditSingleProfile, HeaderImgBackground} from '../components/index'
import styled from 'styled-components'
import {list} from '../data/carousel'
import {useLocation, useParams} from 'react-router-dom';
import useFetch from '../fetch/useFetch' 
import {UseUserContext} from '../mainIndex'

const EditSingleProfilePage = () => {
  const {userId} = useParams()
  const {data: fetchedContent, loading, error } = useFetch(`/users/${userId}`)
  const {currentUser} = UseUserContext()
  const location = useLocation();
  const path = location.pathname.split("/")[1]
  
  let blogPages = [{blogPage: true}]
  console.log(fetchedContent)
  return (
    <Wrapper>
    <div className='single-page'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

      <div className='book-cont'>
      <EditSingleProfile path={path} FetchedData={fetchedContent} currentUser={currentUser}/>
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

export default EditSingleProfilePage
