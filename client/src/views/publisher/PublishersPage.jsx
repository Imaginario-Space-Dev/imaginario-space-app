import React from 'react'
import styled from 'styled-components'
import {HeaderImgBackground, Publishers} from '../../components/index'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 

const PublishersPage = () => {
  const {data: fetchedContentList} = useFetch(`/users?role=publisher`)
  let backgroundImage = []
  if (fetchedContentList?.data){
    backgroundImage = fetchedContentList?.data?.filter(item => item.userOfTheWeek?.display === true 
      // && (new Date > new Date(item[`${option1}`]?.displayPeriodStart) &&
      //  new Date < new Date(item[`${option1}`]?.displayPeriodEnd))
      )
  }

  console.log(backgroundImage)
  return (
    <Wrapper>
    <div className='publisher-page'>

      <HeaderImgBackground list={list}
      BgImage={backgroundImage.length > 0 ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${backgroundImage.sort((a, b) => a.userOfTheWeek?.positon - b.userOfTheWeek?.positon)[0].profileImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>
     
      <div className='pub-cont'>
      <Publishers />
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

export default PublishersPage
