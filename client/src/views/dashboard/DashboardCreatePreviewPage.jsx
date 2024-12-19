import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {SingleCourse, SingleBook, SingleBlog, HeaderImgBackground, PreviewActionBtns} from '../../components/index'
import {list, listBlogs} from '../../data/carousel'
import { useLocation } from 'react-router-dom';

const DashboardCreatePreviewPage = () => {
  const [language, setLanguage] = useState()


  const [trackProfileInstance, settrackProfileInstance] = useState(null)
  const location = useLocation();
  const path = location.pathname.split("/")[2]

  useEffect(() => {
      (path == 'book' || path == 'course' || path == 'blog') &&  settrackProfileInstance(path)
  }, [path])

  let blogPages = [{blogPage: true}]

  return (
    <Wrapper>
    
    {(path == 'books' || path == 'courses') &&
    <div className='profiles-page'>

    <HeaderImgBackground list={list}/>

    <div className='book-cont'>
    {path == 'books' &&
     <div className=''>
      <div className='btn-actions'>
      <PreviewActionBtns setLanguage={setLanguage}/>
      </div>
     
     <SingleBook />
   </div> }

    {path == 'courses' && 
     <div className=''>
      <div className='btn-actions'>
      <PreviewActionBtns setLanguage={setLanguage}/>
      </div>
      <SingleCourse />
    </div>
    }
    </div>
    </div>
    }

    {(path == 'blogs') && 
    <div className='singleBlogsPage'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

    <div className='book-cont'>
    {path == 'blogs' && 
     <div className=''>
     <div className='btn-actions'>
      <PreviewActionBtns setLanguage={setLanguage}/>
      </div>
     <SingleBlog list={listBlogs} />
   </div>
    
    
    }
    </div>
    </div>
    }
    
      
    
    </Wrapper>)
}

const Wrapper = styled.main`
.profiles-page {
  position: relative;
  margin-top: 3rem;
  background-color: var(--color-2);

}
.singleBlogsPage {
  position: relative;
  margin-top: 3rem;
  /* background-color: var(--color-1); */

}


.book-cont{
  position: relative;
  top: 0;
  right: 0;
 
  width: 100%;
  z-index: 0;
  /* overflow-y: scroll; */
  div {
    .btn-actions{
      margin-right: 60px;
      margin-left: 60px;
    }
  }
}


/* Large devices (desktops) */
@media (max-width: 991px) {

}
`

export default DashboardCreatePreviewPage
