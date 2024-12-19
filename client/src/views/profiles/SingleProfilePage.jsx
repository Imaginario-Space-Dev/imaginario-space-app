import React from 'react'
import {SingleProfile, HeaderImgBackground} from '../../components/index'
import styled from 'styled-components'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 

const SingleProfilePage = () => {
  const {data: fetchedContent, loading, error } = useFetch(`/auth/me`)

   // Check if fetched data exists
   if (error) return <p>{error}</p>;

  return (
    <Wrapper>
    <div className='single-profile-page'>

    <HeaderImgBackground list={list}
    BgImage={fetchedContent?.data?.profileImage?.name ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${fetchedContent?.data?.profileImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>

      <div className='book-cont'>
      <SingleProfile FetchedData={fetchedContent?.data}/>
      </div>
    
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.single-profile-page {
  position: relative;
  margin-top: 0rem;
  background-color: var(--color-2);
}

.book-cont{
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: 0;
}


/* Large devices (desktops) */
@media (max-width: 991px) {
  .single-profile-page {
  margin-top: 0rem;
}
}
`

export default SingleProfilePage
