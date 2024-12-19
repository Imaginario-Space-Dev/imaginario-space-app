import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaPlusCircle } from "react-icons/fa";
import {FileInputVideo, InputsVideo, TextAreasVideo} from '../../index'

const DashboardBlogSection = ({currentUser, newPost, setNewPost}) => {
  const [hideShow, setHideShow] = useState(false)
  const [lng, setLng] = useState('EN')

  // const [data, SetData] = useState(changeData)
  const [initianlData, SetDataInitianl] = useState([])
  const [sectionNumberOnChange, SetSectionNumberOnChange] = useState('')
  const [blogTileOnChange, SetBlogTileOnChange] = useState('')
  const [imageLinkOnChange, SetImageLinkOnChange] = useState('')
  const [descriptionOnChange, SetDescriptionOnChange] = useState('')

  const [sectionChange, SetSectionChange] = useState({
    language: lng,
    sectionTitle: 'Test1', 
    sectionImage: '', 
    sectionDesc: '', 
    sectionShow: true
  })

  const getPost = (e, item, elem) => {

    if(item === 'section'){
      const findElem = {...newPost.sections.filter((item, index) => index === elem)[0], [e.target.id]: e.target.value}
      const updateElem = newPost.sections.toSpliced(elem, 1, findElem) 
      setNewPost({...newPost, sections: updateElem})
    }

    if([e.target.id] in newPost){
      setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))
    }
  }


  // SECTION
const handleSection = (handleType, action, elem) => {
    if(handleType == 'section'){
    if(action == 'add'){
      setNewPost({...newPost, sections: [...newPost.sections, sectionChange ]})
    
    }
    if(action == 'delete'){
      const newArr = newPost.sections.filter((item, index) => index !== elem)
      setNewPost({...newPost, sections: newArr})
      
    }
    if(action == 'edit'){
      const newArr = newPost.sections.filter((item, index) => index == elem)
      SetSectionChange({...newArr[0]})
    }
  }
  if(handleType == 'hideAndShow'){
    if(action == 'add'){
      const findElem = newPost.sections.filter((item, index) => index === elem)[0]
      const updateElem = newPost.sections.toSpliced(elem, 1, {...findElem, sectionShow: !findElem.sectionShow}) 
      setNewPost({...newPost, sections: updateElem})
    }
    if(action == 'delete'){
      const findElem = newPost.sections.filter((item, index) => index !== elem)
      setNewPost({...newPost, sections: findElem})
    }
    

  }
  }
  
  // console.log(newPost.sections)
  // console.log(newPost)
  return (
    <Wrapper>
    <div>
    <div  className='blog-section-container my-3'>
    <h3>Cover</h3>  
    <div className='blog-section-cover'>
      <div className='header-input'>
      <InputsVideo text={'Bog title'} inputId={'title'} newPost={newPost} getPost={getPost}/>
      <FileInputVideo text={'Upload Cover Image'} inputId={'coverImage'} newPost={newPost} getPost={getPost}/>
      </div>
      <TextAreasVideo text={'Blog Description'} inputId={'desc'} newPost={newPost} getPost={getPost}/>
    </div>
    </div>

    {newPost?.sections?.map((item, index) => {
      const {title, image, desc, sectionShow} = item
      return(
    <div key={index} className='blog-section-container my-3'>
    <h3>Section {index + 1}</h3>
    <div  className={sectionShow ? 'blog-section blog-section-show' : 'blog-section'}>
      <div className='header-input'>
      <InputsVideo text={'Blog section title'} inputId={'sectionTitle'} blogIndex={index} change={'section'} newPost={item} getPost={getPost}/>
      <FileInputVideo text={'Upload section Image'} inputId={'sectionImage'} blogIndex={index} change={'section'} newPost={item} getPost={getPost}/>
      </div>
      <TextAreasVideo text={'Section Description'} inputId={'sectionDesc'} blogIndex={index} change={'section'} newPost={item} getPost={getPost}/>
    </div>
    <div className='d-flex justify-content-between align-items-center mb-3'>
    <button type='button'
    onClick={() => handleSection('hideAndShow','delete', index)}>
      Delete</button>
    <button type='button' className='hide-show'
    onClick={() => handleSection('hideAndShow','add', index)}>
      {sectionShow ? 'Hide' : 'Show'}
    </button>
    </div>
    </div>
    
      )
  })
  }

  </div>
    <button type='button d-flex justify-content-center align-items-center'
    onClick={() => handleSection('section', 'add', '')}>
      <FaPlusCircle />  Add Section</button>
    </Wrapper>)
}

const Wrapper = styled.main`
.blog-section-container {
  border: 1px solid var(--color-12);
  border-top-left-radius: var(--borderRadius);
  border-top-right-radius: var(--borderRadius);
  border-bottom-left-radius: var(--borderRadius);
  background-color: var(--color-7);
  padding: 5px;
  h3{
    color: var(--color-12);
  }
.blog-section-cover{
 
  .header-input{
    display: grid;
  }


}
.blog-section {
  display: none;
  .header-input{
    display: grid;
  }
}
.blog-section-show {
  display: contents;
}
.hide-show{


}

}
button{
      border: none;
      border-bottom-left-radius: var(--borderRadius);
      border-bottom-right-radius: var(--borderRadius);
      padding: 2px 10px;
      background-color: var(--color-12);
      color: var(--color-1);
   }
   button:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.blog-section, .blog-section-cover {
  .header-input{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }
}
}



/* Large devices (desktops) */
@media (max-width: 991px) {
.blog-section, .blog-section-cover {
  .header-input{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.blog-section {
  .header-input{
    grid-template-columns: repeat(1,1fr);
    gap: 0px;
  }
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardBlogSection

