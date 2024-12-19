import React from 'react'
import styled from 'styled-components'
import {FilmsHomeContainer} from '../index'

const BookSimilar = ({list, contentType, title, trackProfile, setUrl}) => {

  // Check if fetched data exists
  if (!list) return <p>Loading...</p>;
  return (
    <Wrapper>
    <div className={contentType == 'blog' ? 'contentSimilar-blog pb-2' : 'contentSimilar pb-2'}>
    <h3 className='my-3 p-0 '>
      {contentType == 'blog' ? `${title}` :
      contentType == 'book' ? `${title}` :
      contentType == 'video' ? title :
      title
      }
      </h3>

      {list.length > 0 ? <FilmsHomeContainer films={list} trackProfile={trackProfile}/> :
      <p className='d-flex justify-content-center text-white'>No data to display</p>}
      
    </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.contentSimilar{
  h3{
    color: var(--color-1);
  }
  
}

.contentSimilar-blog{
  h3{
    color: var(--color-2);
  }
}

`
export default BookSimilar
