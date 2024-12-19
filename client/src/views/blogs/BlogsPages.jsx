import React from 'react'
import styled from 'styled-components'
import {Blogs, HeaderImgBackground} from '../../components/index'
import {list} from '../../data/carousel'

const BlogsPages = () => {
  let blogPages = [{blogPage: true}]

  return (
    <Wrapper>
    <div className='blogsPages'>
      
      <HeaderImgBackground list={[...blogPages, ...list]}/>

      <div className='blogs-cont'>
      <Blogs />
      </div>
    
    </div>
    </Wrapper>)
}



const Wrapper = styled.main`
.blogsPages {
  position: relative;
  margin-top: 0rem;
  /* background-color: var(--color-1); */

}

.blogs-cont{
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: 0;
}


/* Large devices (desktops) */
@media (max-width: 991px) {
  .blogsPages {
  margin-top: 0rem;
}
}
`

export default BlogsPages
