import React from 'react'
import styled from 'styled-components'
import {Landing} from '../components/index'
import useFetch from '../fetch/useFetch'

const LandingPage = () => {
  const {data: platformData, error: platformDataError} = useFetch('/platform')
  const {data: bookFetched, loading: bookFetchedLoading, error: bookFetchedError} = useFetch('/books')
  const {data:courseFetched, loading:courseFetchedLoading, error:courseFetchedError} = useFetch('/courses')
  const {data:userFetched, loading:userFetchedLoading, error:userFetchedError} = useFetch('/users')
  const {data:blogFetched, loading:blogFetchedLoading, error:blogFetchedError} = useFetch('/blogs')
  return (
    <Wrapper>
    <div className='lannding'>
      <Landing platformData={platformData} booksData={bookFetched} courseData={courseFetched} userData={userFetched} blogFetched={blogFetched}/>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.lannding {
  background-color: var(--color-2);
}

`
export default LandingPage
