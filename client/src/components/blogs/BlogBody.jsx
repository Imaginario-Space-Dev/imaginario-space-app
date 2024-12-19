import React from 'react'
import styled from 'styled-components'
import {BlogPost} from '../index'

const BlogBody = ({list}) => {
  return (
    <Wrapper>
    <div className='post-container'>
        {list.slice(0, 6).map((item) => {
            const {id} = item
            return(
                <BlogPost  key={id} {...item} />
            )
        })}
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.post-container{
    margin: 0;
    display: grid;
    width: 100%;
    padding: 10px;
    gap: 20px;

}
@media (min-width: 991px) {
.post-container{
    grid-template-columns: repeat(3,1fr);
    width: 100%;
}
}


@media (max-width: 991px) {
.post-container{
    grid-template-columns: repeat(2,1fr);
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.post-container{
    grid-template-columns: repeat(1, 1fr) !important;
}
}
`

export default BlogBody
