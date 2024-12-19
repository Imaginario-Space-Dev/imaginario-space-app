import React from 'react'
import styled from 'styled-components'
import {Courses, CarouselBooks, HeaderImgBackground} from '../../components/index'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 

const SeriesPage = () => {
  const {data: fetchedContentList} = useFetch(`/course`)
  let backgroundImage = []
  if (fetchedContentList?.data){
    backgroundImage = fetchedContentList?.data?.filter(item => item?.courseOfTheWeek?.display === true 
      // && (new Date > new Date(item[`${option1}`]?.displayPeriodStart) &&
      //  new Date < new Date(item[`${option1}`]?.displayPeriodEnd))
      )
  }

  return (
    <Wrapper>
    <div className='films-page'>

      <HeaderImgBackground list={list} 
      BgImage={backgroundImage.length > 0 ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${backgroundImage.sort((a, b) => a.courseOfTheWeek?.positon - b.courseOfTheWeek?.positon)[0].coverImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-course.jpg'}/>
     
      <div className='book-cont'>
      <Courses setUrl={'/courses/'}/>
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

export default SeriesPage
