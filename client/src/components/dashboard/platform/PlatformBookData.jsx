import React, { useState } from 'react'
import styled from 'styled-components'
import {DashboardFilter} from '../../index'
import useFetch from '../../../fetch/useFetch' 

const PlaformBookData = ({title, selectedList, setSelectedList}) => {
  const {data: FetchedData} = useFetch(`/books`)
  const [data, setData] = useState('/books?')
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
    <div className='Platform-books'>

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
      content={'book'} mainUrl={data} modelUrl={'/books'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'recommendedBook'}
      FetchedDataItems={FetchedData}
        />
 

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Book of the Week</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={ selectedList}
      setSelectedList={setSelectedList}
      content={'book'} mainUrl={data} modelUrl={'/books'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'bookOfTheWeek'}
      FetchedDataItems={FetchedData}
        />

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Top 10</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={ selectedList}
      setSelectedList={setSelectedList}
      content={'book'} mainUrl={data} modelUrl={'/books'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'bookTop10'}
      FetchedDataItems={FetchedData}
        />

      <div className='header d-flex justify-content-start mt-3'>
        <h3>Popular</h3>
      </div>
      <DashboardFilter 
      data={data} platform={true} 
      selectedList={ selectedList}
      setSelectedList={setSelectedList}
      content={'book'} mainUrl={data} modelUrl={'/books'}
      setNewPost={setNewPost}
      newPost={newPost}
      getPost={getPost}
      itemName={'bookPopular'}
      FetchedDataItems={FetchedData}

        />
    
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.Platform-books{
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

export default PlaformBookData