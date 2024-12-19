import React from 'react'
import styled from 'styled-components'
import {SingleBlog, HeaderImgBackground} from '../../components/index'
import {list, listBlogs} from '../../data/carousel'

const SingleBlogPage = () => {
  let blogPages = [{blogPage: true}]

  return (
    <Wrapper>
    <div className='singleBlogsPage'>
      
      <HeaderImgBackground list={[...blogPages, ...list]}/>

      <div className='blogs-cont'>
      <SingleBlog list={listBlogs}/>
      </div>
    
    </div>
    </Wrapper>)
}



const Wrapper = styled.main`
.singleBlogsPage {
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
  .singleBlogsPage {
  margin-top: 0rem;
}
}
`

export default SingleBlogPage
