import React from 'react'
import {SingleBook, HeaderImgBackground} from '../../components/index'
import styled from 'styled-components'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 
import {useParams } from 'react-router-dom';

const FilmsSinglePage = () => {

  const { id } = useParams();

  const {data: fetchedContent} = useFetch(`/books/${id}`)
  const {data: fetchedContentList} = useFetch(`/books`)

    //  // Check if fetched data exists
    //  if (!fetchedContent?.data) return <p>Loading...</p>;
  const {data: fetchedUser} = useFetch(`/users/${fetchedContent?.data?.createdBy && fetchedContent?.data?.createdBy}`)


  return (
    <Wrapper>
    <div className='single-films-page'>

    <HeaderImgBackground list={list} 
    BgImage={fetchedContent?.data?.coverImage?.name ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${fetchedContent?.data?.coverImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>

      <div className='book-cont'>
      <SingleBook list={fetchedContent?.data} 
      fetchedContentList={fetchedContentList?.data} 
      imaUserContent={fetchedUser?.data}
      setUrl={'/books/'} />
      </div>
    
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.single-films-page {
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
  .single-films-page {
  margin-top: 0rem;
}
}
`

export default FilmsSinglePage
