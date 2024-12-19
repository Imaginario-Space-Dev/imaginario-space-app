import React, { useState } from 'react'
import styled from 'styled-components'
import {DashboardFilter} from '../../index'
import useFetch from '../../../fetch/useFetch' 

const PlatformCourseData = ({title, selectedList, setSelectedList}) => {
  const {data: FetchedData} = useFetch(`/courses`)
  const [data, setData] = useState('/courses?')
  const [newPost, setNewPost] = useState({
    displayPeriodStart: "",
    displayPeriodEnd: "",
    position: undefined,
    display: false,
    contentId: ""
  })

  const getPost = (e) => {
    setNewPost((prev) => ({...prev, [e.target.id]: e.target.id === 'position' ? parseInt(e.target.value) : e.target.id === 'display' ? JSON.parse(e.target.value) : e.target.value }))
  }



  return (
    <Wrapper>
    <div className='Platform-courses'>

    {/* <div className='header d-flex justify-content-start mt-3'>
        <h3>Background image</h3>
      </div> */}
      {/* <DashboardFilter data={FetchedPlatform} platform={true} /> */}

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Recommended</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={selectedList}
      setSelectedList={setSelectedList}
      content={'course'} mainUrl={data} modelUrl={'/courses'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'recommendedCourse'}
      FetchedDataItems={FetchedData}
        />
 

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Course of the Week</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={ selectedList}
      setSelectedList={setSelectedList}
      content={'course'} mainUrl={data} modelUrl={'/courses'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'courseOfTheWeek'}
      FetchedDataItems={FetchedData}
        />

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Top 10</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={ selectedList}
      setSelectedList={setSelectedList}
      content={'course'} mainUrl={data} modelUrl={'/courses'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'courseTop10'}
      FetchedDataItems={FetchedData}
        />

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Popular</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={ selectedList}
      setSelectedList={setSelectedList}
      content={'course'} mainUrl={data} modelUrl={'/courses'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'coursePopular'}
      FetchedDataItems={FetchedData}

        />
    
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.Platform-courses{
  .header{
    h3{
      color: var(--color-2);
    }
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default PlatformCourseData
