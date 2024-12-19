import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useParams } from 'react-router-dom';
import {listPublishers} from '../../../data/carousel'
import {BookSimilar, FromTheSameAuthor, AuthorInfoDiv, 
  PublisherHeader, MyPixIsTo, ShareProfile, Niches, SinglePublishersFilter, Filter1} from '../../index'



const SinglePublisher = ({FetchedData, FetchedBook}) => {
  const { id } = useParams();

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
            <PublisherHeader FetchedData={FetchedData} FetchedBook={FetchedBook}/>
            <MyPixIsTo desc={FetchedData?.desc}/>
            <ShareProfile action={'share-publisher'}/>
            {/* <SinglePublishersFilter action={'publisher'} list={listPublishers} trackProfile={'/publisher/'}/> */}
            <Filter1 content={'single-publi-space'} mainUrl={mainUrl} modelUrl={modelUrl} imaSpace={true} 
            setCategoryData={setCategoryData} categoryData={categoryData} 
            setUrl={mainUrl === '/books?' ? '/publishers/' : mainUrl === '/courses?' ? '/publishers/' : '/'}
            imaUserId={id}/>
            <ShareProfile action={'share-publisher'}/>
            {/* <AuthorInfoDiv list={listPublishers}/> */}
            <Niches />
            {/* <BookSimilar list={listPublishers} title={'publisher'}/> */}
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

export default SinglePublisher
