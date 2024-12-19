import React from 'react'
import styled from 'styled-components'
import {Profiles, HeaderImgBackground} from '../../components/index'
import {list} from '../../data/carousel'
import useFetch from '../../fetch/useFetch' 

const ProfilePage = () => {
  const {data: fetchedContentList} = useFetch(`/users?role=regular&role=collaborator`)
  let backgroundImage = []
  if (fetchedContentList?.data){
    backgroundImage = fetchedContentList?.data?.filter(item => item?.userOfTheWeek?.display === true 
      // && (new Date > new Date(item[`${option1}`]?.displayPeriodStart) &&
      //  new Date < new Date(item[`${option1}`]?.displayPeriodEnd))
      )
  }

  console.log(backgroundImage)
  return (
    <Wrapper>
    <div className='profiles-page'>

      <HeaderImgBackground list={list}
      BgImage={backgroundImage.length > 0 ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${backgroundImage.sort((a, b) => a.userOfTheWeek?.positon - b.userOfTheWeek?.positon)[0].profileImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>
     
      <div className='book-cont'>
      <Profiles />
      </div>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.profiles-page {
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
  .profiles-page {
  margin-top: 0rem;
}
}
`

export default ProfilePage
