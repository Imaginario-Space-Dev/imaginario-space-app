import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, DashboardBlogSection, TextAreasVideo , PlatformLandingData} from '../../index'
import { Link } from 'react-router-dom'
import {UseGeneralContext} from '../../../mainIndex'

const DashboardSingleBlog = ({currentUser}) => {
  const {createBlog, createBlogData}  = UseGeneralContext()
  const [lng, setLng] = useState('EN')
  const [selectedList, setSelectedList] = useState([])

const [newPost, setNewPost] = useState({
  language: [lng],
  title: undefined,
  createdBy: currentUser?.username || 'Rogerio',
  author: undefined,
  category: undefined,
  targetAudience: undefined,
  status: undefined || "pending",
  visibility: undefined || "show",
  desc: undefined,
  coverImage: undefined,
  tags: undefined,
  creationDate: undefined,
  lastUpdateDate: undefined,
  sections: [],
  recommendedList: selectedList,
})

const getPost = (e, item) => {

  if([e.target.id] in newPost){
    setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))
  }
  }

  useEffect(() => {
    setNewPost((prev) => ({...prev, recommendedList: selectedList} ))
  }, [selectedList])

// console.log(selectedList)
// console.log(newPost)
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
        <select className='' name="" id="">
          <option value='EN'>EN</option>
          <option value='PT'>PT</option>
      </select>
      <div className='action-btn'>
        <Link to='preview' type='button' className=''>Preview</Link>
      </div>
      </div>

      <DashboardBlogSection list={createBlog} createBlogData={createBlogData} title={'Title'} imgLink={'Image Link'} desc={'Description'} 
      inputIdTitle={'author'} inputIdImg={'author'} inputIdDesc={'author'} newPost={newPost} setNewPost={setNewPost}/>
      
      <div className='inputs my-3'>
        <SelectsVideo text={'Visibility'} inputId={'languages'}
        selectItems={["Show","Hide"]} newPost={newPost}/>
        <InputsVideo text={'Author'} inputId={'author'} newPost={newPost}/>
        <SelectsVideo text={'Default Language'} inputId={'title'}
        selectItems={["English","French"]} newPost={newPost}/>
        <InputsVideo text={'Tags'} inputId={'title'} newPost={newPost}/>
      </div>

      <h2 className='m-0 my-2 text-dark'>Chose a related content</h2>

      <PlatformLandingData title={''}
      selectedList={selectedList}
      setSelectedList={setSelectedList}/>

      <div className='sections '>
      <h4 className='m-0 my-3 text-dark'>Extra</h4>
      <div >
      <TextAreasVideo text={'Tags'} inputId={'tags'} newPost={newPost} getPost={getPost}/>
      </div>
      </div>

    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.create-book-container{
  
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    select{
      border-radius: var(--borderRadius);
      background-color: var(--color-12);
      color: var(--color-1);
      padding: 2px 10px;
    }
  .action-btn{
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      border: none;
      border-radius: var(--borderRadius);
      padding: 2px 10px;
      background-color: var(--color-12);
      color: var(--color-1);
    }
    button:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
  .inputs, .inputs3 {
    display: grid;
   
  }

  .add-link-div{
    display: flex;
    justify-content: end;
    align-items: end;
  .add-link{
    border: none;
    background-color: var(--color-12);
    color: var(--color-1);
    border-radius: var(--borderRadius);
    padding: 5px 10px;
    width: 80%;
  }
  .add-link:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.create-book-container{
  .inputs{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }

  .inputs3{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.create-book-container{
  margin-bottom: 3rem;
  .inputs{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }
  .inputs3{
    grid-template-columns: repeat(3,1fr);
    gap: 20px;
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.create-book-container{
  .inputs{
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }
  .inputs3{
    grid-template-columns: repeat(2,1fr);
    gap: 0px;
  }
  .add-link-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  .add-link{
    padding: 5px 10px;
    width: 80%;
  }
}
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardSingleBlog
