import React, { useEffect, useState } from 'react'
import {NavLink, Outlet, useLocation} from 'react-router-dom';
import styled from 'styled-components'
import {PlatformLandingData, PlatformBookData, PlatformCourseData, PlatformBlogData, PlatformPublisherData, PlatformProfileData} from '../../index'
import {dashboardPlatformLinks} from '../../../utils/utils'

const PlatformData = ({FetchedPlatform, FetchedBook}) => {
  const [correctUrl, setCorrectUrl] = useState()
  const location = useLocation();
  const path = location.pathname.split("/")[3]
  const [selectedList, setSelectedList] = useState([])

    useEffect(() => {
       setCorrectUrl(path)
       setSelectedList([])
    }, [path])

  return (
    <Wrapper >
      <div className='url-btn'>
      {dashboardPlatformLinks?.map((item) => {
        const {id, url, text, icon} = item
        return(  
            <NavLink to={url} key={id}>
              <span className='text'>{text}</span>
              <span>{icon}</span>
            </NavLink>
        )
      })}
      </div>
    
    {correctUrl == 'landing' && <PlatformLandingData FetchedPlatform={FetchedPlatform} selectedList={selectedList} setSelectedList={setSelectedList}/>}
    {correctUrl == 'books' && <PlatformBookData FetchedPlatform={FetchedBook} selectedList={selectedList} setSelectedList={setSelectedList}/>}
    {correctUrl == 'courses' && <PlatformCourseData FetchedPlatform={FetchedPlatform} selectedList={selectedList} setSelectedList={setSelectedList}/>}
    {correctUrl == 'blogs' && <PlatformBlogData FetchedPlatform={FetchedPlatform} selectedList={selectedList} setSelectedList={setSelectedList}/>}
    {correctUrl == 'publishers' && <PlatformPublisherData FetchedPlatform={FetchedPlatform} selectedList={selectedList} setSelectedList={setSelectedList}/>}
    {correctUrl == 'profiles' && <PlatformProfileData FetchedPlatform={FetchedPlatform} selectedList={selectedList} setSelectedList={setSelectedList}/>}

  {/* <div  className='outlet'>
  <Outlet />
  </div> */}
    

    
    </Wrapper>)
}

const Wrapper = styled.main`
.outlet{
  margin-bottom: 3rem;
}
.url-btn{
  display: flex;
  align-items: center;
  a{
    padding: 3px 6px;
    background-color: var(--color-12);
    border-radius: var(--borderRadius);
    .text{
      margin-right: 6px;
    }
    a.active{
      background-color: var(--color-6);
    }
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.url-btn{
  justify-content: center;
  a{
   
    margin-left: 20px;
  }
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.url-btn{
  justify-content: space-around;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.url-btn{
  justify-content: space-between;
  a {
    .text{
      display: none;
    }
  }
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default PlatformData
