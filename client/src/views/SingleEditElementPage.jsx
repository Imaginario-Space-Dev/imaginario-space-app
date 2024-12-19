import React from 'react'
import {EditSingleElement, HeaderImgBackground} from '../components/index'
import styled from 'styled-components'
import {list} from '../data/carousel'
import { useLocation } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import useFetch from '../fetch/useFetch' 
import {UseUserContext} from '../mainIndex'

const SingleEditElementPage = () => {
  const {currentUser} = UseUserContext()
  const { id } = useParams();
  const { userId } = useParams();

  // const {data: fetchedUser} = useFetch(`/users/${userId}`)

  const location = useLocation();
  const path = location.pathname.split("/")[3]
  const path2 = location.pathname.split("/")[4]

  const {data: fetchedContent} = useFetch(`${path && path === 'book' ? '/books/' : path === 'course' ? '/courses/' : undefined}${id}`)
  const {data: fetchedPlatforms} = useFetch('/platform')

  // const {data: fetchedContentList} = useFetch(`${path && path === 'book' ? '/books' : path === 'course' ? '/course' : undefined}`)

  let blogPages = [{blogPage: true}]  
  // console.log(fetchedContent)
  return (
    <Wrapper>
    <div className='single-page'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

      <div className='book-cont'>
      <EditSingleElement FetchedData={fetchedContent?.data} 
      FetchedPlatforms={fetchedPlatforms?.data?.length > 0 && fetchedPlatforms?.data[0]?.sellingPlatform} 
      FetchedCollab={fetchedContent?.data?.collabs?.filter(item => item?.collaboratorId?._id === currentUser?._id)[0]} 
      path={path} path2={path2} currentUser={currentUser}/>
      </div>
    
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.single-page {
  position: relative;
  margin-top: 6rem;
  height: calc(100vh - 10rem);
  /* height: 100%; */
  background-color: var(--color-1);
  overflow-y: scroll;
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

export default SingleEditElementPage
