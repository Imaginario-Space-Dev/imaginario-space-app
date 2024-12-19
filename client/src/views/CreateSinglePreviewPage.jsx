import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {SingleCourse, SingleBook, SingleBlog, HeaderImgBackground, PreviewActionBtns} from '../components/index'
import {list, listBlogs} from '../data/carousel'
import { useLocation } from 'react-router-dom';

const CreateSinglePreviewPage = () => {
  const [language, setLanguage] = useState()


  const [trackProfileInstance, settrackProfileInstance] = useState(null)
  const location = useLocation();
  const path = location.pathname.split("/")[3]

  useEffect(() => {
      (path == 'book' || path == 'course' || path == 'blog') &&  settrackProfileInstance(path)
  }, [path])

  let blogPages = [{blogPage: true}]

  return (
    <Wrapper>
    
    {(path == 'book' || path == 'course') &&
    <div className='profiles-page'>

    <HeaderImgBackground list={list}/>

    <div className='book-cont'>
    {path == 'book' &&
     <div className=''>
     {/* <PreviewActionBtns setLanguage={setLanguage}/> */}
     <SingleBook previewBtns={true}/>
   </div> }

    {path == 'course' && 
     <div className=''>
      <PreviewActionBtns setLanguage={setLanguage}/>
      <SingleCourse />
    </div>
    }
    </div>
    </div>
    }

    {(path == 'blog') && 
    <div className='singleBlogsPage'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

    <div className='book-cont'>
    {path == 'blog' && 
     <div className=''>
     <PreviewActionBtns setLanguage={setLanguage}/>
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
  margin-top: 6rem;
  background-color: var(--color-2);

}
.singleBlogsPage {
  position: relative;
  margin-top: 6rem;
  /* background-color: var(--color-1); */

}


.book-cont{
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 0;
  /* overflow-y: scroll; */
}


/* Large devices (desktops) */
@media (max-width: 991px) {

}
`

export default CreateSinglePreviewPage
