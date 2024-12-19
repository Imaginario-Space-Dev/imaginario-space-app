import React from 'react'
import styled from 'styled-components'
import {Films, CarouselBooks, HeaderImgBackground} from '../../components/index'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 

const FilmsPage = () => {
  const {data: fetchedContentList} = useFetch(`/books`)
  let backgroundImage = []
  if (fetchedContentList?.data){
    backgroundImage = fetchedContentList?.data?.filter(item => item?.bookOfTheWeek?.display === true 
      // && (new Date > new Date(item[`${option1}`]?.displayPeriodStart) &&
      //  new Date < new Date(item[`${option1}`]?.displayPeriodEnd))
      )
  }

  return (
    <Wrapper>
    <div className='films-page'>

      <HeaderImgBackground list={list} 
      BgImage={backgroundImage.length > 0 ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${backgroundImage.sort((a, b) => a.bookOfTheWeek?.positon - b.bookOfTheWeek?.positon)[0].coverImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-book.jpg'}/>
     
      <div className='book-cont'>
      <Films setUrl={'/books/'}/>
      </div>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.films-page {
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
  .films-page {
  margin-top: 0rem;
}
}
`

export default FilmsPage
