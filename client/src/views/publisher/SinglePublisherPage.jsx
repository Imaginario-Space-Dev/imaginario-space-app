import React from 'react'
import styled from 'styled-components'
import {HeaderImgBackground, SinglePublisher} from '../../components/index'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 
import {useParams } from 'react-router-dom';

const SinglePublisherPage = () => {
  const { id } = useParams();
  const {data: fetchedContent} = useFetch(`/users/${id}`)
  const {data: fetchedBook} = useFetch(`/books`)

  return (
    <Wrapper>
    <div className='publisher-page'>

      <HeaderImgBackground list={list} 
      BgImage={fetchedContent?.data?.profileImage?.name ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${fetchedContent?.data?.profileImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>
     
      <div className='pub-cont'>
      <SinglePublisher FetchedData={fetchedContent?.data} FetchedBook={fetchedBook?.data}
      />
      </div>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.publisher-page {
  position: relative;
  margin-top: 0rem;
  background-color: var(--color-2);

}

.pub-cont{
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: 0;
}


/* Large devices (desktops) */
@media (max-width: 991px) {
  .publisher-page {
  margin-top: 0rem;
}
}
`

export default SinglePublisherPage
