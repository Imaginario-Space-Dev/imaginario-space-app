import React from 'react'
import styled from 'styled-components'
import {FilmsHomeContainer} from '../index'

const FromTheSameAuthor = ({list, setUrl, imaUserId, currentItem, title}) => {
   // Check if fetched data exists
   if (!list) return <p></p>;
   if (!currentItem) return <p></p>;
   const {contentType } = currentItem

  return (
    <Wrapper>
      {/* {list?.filter(item => item.authorName === currentItem.authorName && item._id !== currentItem._id).length > 0 &&  */}
    <div className=''>
      <h3 className='my-3 p-0 '>
      {contentType == 'blog' ? `${title}` :
      contentType == 'book' ? `${title}` :
      contentType == 'course' ? `${title}` :
      ""
      }
      </h3>
        <FilmsHomeContainer films={list} setUrl={setUrl} imaUserId={imaUserId}/>
    </div>
    {/* } */}
    </Wrapper>)
    }
const Wrapper = styled.div`
        
    
`

export default FromTheSameAuthor
