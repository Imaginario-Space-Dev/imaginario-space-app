import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useParams } from 'react-router-dom';
import {listProfiles} from '../../data/carousel'
import {BookSimilar, FromTheSameAuthor, AuthorInfoDiv, 
  ProfileHeader, MyPixIsTo, ShareProfile, Niches, SinglePublishersFilter, Filter1, PublisherHeader} from '../index'
  import useFetch from '../../fetch/useFetch' 


const ImaSpace = ({FetchedData, FetchedBook, FetchedCourse, idParams}) => {
  // const { id } = useParams();
  // const {data, loading, error} = useFetch(`/users/${id}`)
  const [categoryData, setCategoryData] = useState('')
  const [mainUrl, setMainUrl] = useState('/books?')
  const [modelUrl, setModelUrl] = useState('/books')

  useEffect(() => {
    if(categoryData === "book"){
      setMainUrl("/books?")
      setModelUrl('/books')
    }
    if(categoryData === "course"){
      setMainUrl("/courses?")
      setModelUrl('/courses')
    }

  }, [categoryData])

  return (
    <Wrapper>
      <div className='singlePublisher-container'>
            <div className='marginLR pb-3'>
            {/* <ProfileHeader FetchedData={data?.data}/> */}
            <PublisherHeader FetchedData={FetchedData}  FetchedBook={FetchedBook} FetchedCourse={FetchedCourse}/>
            <MyPixIsTo desc={FetchedData?.desc}/>
            {/* <SinglePublishersFilter action={'profile'} list={listProfiles} trackProfile={'/profile/'}/> */}
            <Filter1 content={'single-space'} mainUrl={mainUrl} modelUrl={modelUrl} imaSpace={true} 
            setCategoryData={setCategoryData} categoryData={categoryData} 
            setUrl={mainUrl === '/books?' ? '/imaginario-spaces/' : mainUrl === '/courses?' ? '/imaginario-spaces/' : '/'}
            imaUserId={idParams} idParams={idParams}/>
            {/* <button type='button' className='bg-white border-0 p-1'>Save recommendation</button> */}
            <ShareProfile action={'share-profile'}/>
            {/* <AuthorInfoDiv list={listProfiles}/> */}
            <Niches />
            {/* <BookSimilar list={listProfiles} title={'publisher'}/> */}
            </div>
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`
@media (min-width: 991px) {
.marginLR{
  margin-left: 60px;
  margin-right: 60px;
}
}

@media (max-width: 991px) {
.marginLR{
  margin-left: 20px;
  margin-right: 20px;
}
}

`

export default ImaSpace
